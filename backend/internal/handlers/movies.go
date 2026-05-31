package handlers

import (
	"math"
	"net/http"
	"strconv"
	"strings"

	"github.com/MisrFuture/MisrTV/backend/internal/database"
	"github.com/MisrFuture/MisrTV/backend/internal/models"
	"github.com/gin-gonic/gin"
)

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

	result := make([]gin.H, len(movies))
	for i, m := range movies {
		result[i] = movieToMap(m)
	}

	c.JSON(http.StatusOK, models.PaginatedResponse{
		Data:       result,
		Page:       page,
		PerPage:    perPage,
		Total:      total,
		TotalPages: int(math.Ceil(float64(total) / float64(perPage))),
	})
}

func GetMovie(c *gin.Context) {
	id := c.Param("id")
	var movie models.Movie
	if err := database.DB.First(&movie, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Movie not found"})
		return
	}
	c.JSON(http.StatusOK, movieToMap(movie))
}

func GetMovieBySlug(c *gin.Context) {
	slug := c.Param("slug")
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
	q := c.Query("q")
	if q == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Query parameter q is required"})
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
		c.JSON(http.StatusServiceUnavailable, gin.H{"status": "error", "message": err.Error()})
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
	c.JSON(http.StatusOK, VersionInfo{
		Version:    "1.0.0",
		BuildDate:  "2026-05-31",
		Commit:     "development",
		APIVersion: "v1",
	})
}

func GetSyncLog(c *gin.Context) {
	var logs []models.SyncLog
	database.DB.Order("created_at DESC").Limit(20).Find(&logs)
	c.JSON(http.StatusOK, logs)
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
