package handlers

import (
	"log/slog"
	"math"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/MisrFuture/MisrTV/backend/internal/database"
	"github.com/MisrFuture/MisrTV/backend/internal/models"
	"github.com/gin-gonic/gin"
)

func CreateMovie(c *gin.Context) {
	var movie models.Movie
	if err := c.ShouldBindJSON(&movie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Create(&movie).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create movie"})
		return
	}
	c.JSON(http.StatusCreated, movie)
}

func UpdateMovie(c *gin.Context) {
	id := c.Param("id")
	var movie models.Movie
	if err := database.DB.First(&movie, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "movie not found"})
		return
	}
	if err := c.ShouldBindJSON(&movie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Save(&movie).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update movie"})
		return
	}
	c.JSON(http.StatusOK, movie)
}

func DeleteMovie(c *gin.Context) {
	id := c.Param("id")
	if err := database.DB.Delete(&models.Movie{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete movie"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

func GetMovies(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "20"))
	year := c.Query("year")
	genre := c.Query("genre")
	status := c.DefaultQuery("status", "released")
	q := c.Query("q")

	if page < 1 {
		page = 1
	}
	if perPage < 1 || perPage > 100 {
		perPage = 20
	}
	if len(q) > 200 {
		q = q[:200]
	}
	if len(genre) > 100 {
		genre = genre[:100]
	}
	if len(year) > 4 {
		year = ""
	}

	query := database.DB.Model(&models.Movie{})
	if year != "" {
		query = query.Where("year = ?", year)
	}
	if genre != "" {
		query = query.Where("genres ILIKE ?", "%"+genre+"%")
	}
	if status == "all" {
		// no filter
	} else if status == "upcoming" {
		query = query.Where("status = ?", "upcoming")
	} else {
		query = query.Where("status = ?", "released")
	}
	if q != "" {
		query = query.Where("title ILIKE ? OR title_ar ILIKE ?", "%"+q+"%", "%"+q+"%")
	}

	var total int64
	query.Count(&total)

	var movies []models.Movie
	offset := (page - 1) * perPage
	query.Order("year DESC, misrtv_rating DESC").Offset(offset).Limit(perPage).Find(&movies)

	result := make([]models.MovieResponse, len(movies))
	for i, m := range movies {
		result[i] = movieToResponse(m)
	}

	c.JSON(http.StatusOK, models.PaginatedMovieResponse{
		Data:       result,
		Page:       page,
		PerPage:    perPage,
		Total:      total,
		TotalPages: int(math.Ceil(float64(total) / float64(perPage))),
	})
}

func GetMovie(c *gin.Context) {
	id := c.Param("id")
	if _, err := strconv.Atoi(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid movie ID"})
		return
	}
	var movie models.Movie
	if err := database.DB.First(&movie, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Movie not found"})
		return
	}
	c.JSON(http.StatusOK, movieToMap(movie))
}

func GetMovieBySlug(c *gin.Context) {
	slug := c.Param("slug")
	if len(slug) > 500 || slug == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid slug"})
		return
	}
	var movie models.Movie
	// Handle slug lookup by title
	if err := database.DB.Where("LOWER(title) = ? OR LOWER(title_ar) = ?",
		strings.ReplaceAll(slug, "-", " "),
		strings.ReplaceAll(slug, "-", " "),
	).First(&movie).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Movie not found"})
		return
	}
	c.JSON(http.StatusOK, movieToMap(movie))
}

func GetTrending(c *gin.Context) {
	var movies []models.Movie
	database.DB.Where("status = ?", "released").
		Order("misrtv_rating DESC, vote_count DESC").
		Limit(12).
		Find(&movies)

	result := make([]gin.H, len(movies))
	for i, m := range movies {
		result[i] = movieToMap(m)
	}
	c.JSON(http.StatusOK, result)
}

func GetUpcoming(c *gin.Context) {
	var movies []models.Movie
	database.DB.Where("status = ?", "upcoming").
		Order("release_date ASC").
		Limit(20).
		Find(&movies)

	result := make([]gin.H, len(movies))
	for i, m := range movies {
		result[i] = movieToMap(m)
	}
	c.JSON(http.StatusOK, result)
}

func SearchMovies(c *gin.Context) {
	q := strings.TrimSpace(c.Query("q"))
	if q == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Query parameter q is required"})
		return
	}
	if len(q) > 200 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Search query too long (max 200 characters)"})
		return
	}

	var movies []models.Movie
	database.DB.Where("title ILIKE ? OR title_ar ILIKE ? OR overview ILIKE ?",
		"%"+q+"%", "%"+q+"%", "%"+q+"%").
		Order("misrtv_rating DESC").
		Limit(20).
		Find(&movies)

	result := make([]gin.H, len(movies))
	for i, m := range movies {
		result[i] = movieToMap(m)
	}
	c.JSON(http.StatusOK, result)
}

func HealthCheck(c *gin.Context) {
	sqlDB, err := database.DB.DB()
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"status": "error", "message": "database not available"})
		return
	}
	if err := sqlDB.Ping(); err != nil {
		slog.Error("Health check failed", "error", err)
		c.JSON(http.StatusServiceUnavailable, gin.H{"status": "error", "message": "database health check failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "ok", "service": "MisrTV API"})
}

type VersionInfo struct {
	Version   string `json:"version"`
	BuildDate string `json:"build_date"`
	Commit    string `json:"commit"`
	APIVersion string `json:"api_version"`
}

func GetVersion(c *gin.Context) {
	commit := os.Getenv("GIT_COMMIT")
	if commit == "" {
		commit = "development"
	}
	buildDate := os.Getenv("BUILD_DATE")
	if buildDate == "" {
		buildDate = "development"
	}
	c.JSON(http.StatusOK, VersionInfo{
		Version:    "1.0.0",
		BuildDate:  buildDate,
		Commit:     commit,
		APIVersion: "v1",
	})
}

func SearchSuggestions(c *gin.Context) {
	q := c.Query("q")
	if len(q) < 2 {
		c.JSON(http.StatusOK, []string{})
		return
	}
	var titles []string
	database.DB.Model(&models.Movie{}).
		Where("title ILIKE ? OR title_ar ILIKE ?", "%"+q+"%", "%"+q+"%").
		Limit(8).
		Pluck("title", &titles)
	c.JSON(http.StatusOK, titles)
}

func GetSyncLog(c *gin.Context) {
	var logs []models.SyncLog
	database.DB.Order("created_at DESC").Limit(20).Find(&logs)
	c.JSON(http.StatusOK, logs)
}

func movieToResponse(m models.Movie) models.MovieResponse {
	return models.MovieResponse{
		ID:            m.ID,
		TMDBID:        m.TMDBID,
		Title:         m.Title,
		TitleAr:       m.TitleAr,
		Overview:      m.Overview,
		OverviewAr:    m.OverviewAr,
		Year:          m.Year,
		Runtime:       m.Runtime,
		Poster:        m.Poster,
		Backdrop:      m.Backdrop,
		Genres:        splitComma(m.Genres),
		GenresAr:      splitComma(m.GenresAr),
		Country:       m.Country,
		CountryAr:     m.CountryAr,
		Director:      m.Director,
		DirectorAr:    m.DirectorAr,
		Cast:          splitComma(m.Cast),
		CastAr:        splitComma(m.CastAr),
		AgeRating:     m.AgeRating,
		ContentRating: m.ContentRating,
		Status:        m.Status,
		ReleaseDate:   m.ReleaseDate,
		IMDBRating:    m.IMDBRating,
		MisrTVRating:  m.MisrTVRating,
		VoteCount:     m.VoteCount,
	}
}

func movieToMap(m models.Movie) gin.H {
	return gin.H{
		"id":             m.ID,
		"tmdb_id":        m.TMDBID,
		"title":          m.Title,
		"title_ar":       m.TitleAr,
		"overview":       m.Overview,
		"overview_ar":    m.OverviewAr,
		"year":           m.Year,
		"runtime":        m.Runtime,
		"poster":         m.Poster,
		"backdrop":       m.Backdrop,
		"genres":         splitComma(m.Genres),
		"genres_ar":      splitComma(m.GenresAr),
		"country":        m.Country,
		"country_ar":     m.CountryAr,
		"director":       m.Director,
		"director_ar":    m.DirectorAr,
		"cast":           splitComma(m.Cast),
		"cast_ar":        splitComma(m.CastAr),
		"age_rating":     m.AgeRating,
		"content_rating": m.ContentRating,
		"status":         m.Status,
		"release_date":   m.ReleaseDate,
		"imdb_rating":    m.IMDBRating,
		"misrtv_rating":  m.MisrTVRating,
		"vote_count":     m.VoteCount,
		"tags":           splitComma(m.Tags),
	}
}

func splitComma(s string) []string {
	if s == "" {
		return []string{}
	}
	parts := strings.Split(s, ",")
	for i := range parts {
		parts[i] = strings.TrimSpace(parts[i])
	}
	return parts
}
