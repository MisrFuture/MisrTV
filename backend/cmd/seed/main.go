package main

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"strings"

	"github.com/MisrFuture/MisrTV/backend/internal/database"
	"github.com/MisrFuture/MisrTV/backend/internal/models"
)

type SeedMovie struct {
	ID            string   `json:"id"`
	Slug          string   `json:"slug"`
	TitleEn       string   `json:"titleEn"`
	TitleAr       string   `json:"titleAr"`
	OverviewEn    string   `json:"overviewEn"`
	OverviewAr    string   `json:"overviewAr"`
	Year          int      `json:"year"`
	Runtime       int      `json:"runtime"`
	Genres        []string `json:"genres"`
	GenresAr      []string `json:"genresAr"`
	Country       string   `json:"country"`
	CountryAr     string   `json:"countryAr"`
	Director      string   `json:"director"`
	DirectorAr    string   `json:"directorAr"`
	Cast          []string `json:"cast"`
	CastAr        []string `json:"castAr"`
	AgeRating     string   `json:"ageRating"`
	ContentRating string   `json:"contentRating"`
	Status        string   `json:"status"`
	ReleaseDate   string   `json:"releaseDate"`
	Poster        string   `json:"poster"`
	Backdrop      string   `json:"backdrop"`
	Financials    struct {
		Budget    int64 `json:"budget"`
		BoxOffice int64 `json:"boxOffice"`
		Marketing int64 `json:"marketing"`
	} `json:"financials"`
	Ratings struct {
		Imdb           float64 `json:"imdb"`
		RottenTomatoes int     `json:"rottenTomatoes"`
		Misrtv         float64 `json:"misrtv"`
		Audience       int     `json:"audience"`
	} `json:"ratings"`
	Tags []string `json:"tags"`
}

type TMDBImport struct {
	LastSync string     `json:"last_sync"`
	Count    int        `json:"count"`
	Movies   []SeedMovie `json:"movies"`
}

func main() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo})))

	if err := database.Connect(); err != nil {
		slog.Error("Database connection failed", "error", err)
		os.Exit(1)
	}

	// Check if data already exists
	var count int64
	database.DB.Model(&models.Movie{}).Count(&count)
	if count > 0 {
		slog.Info("Database already has data", "count", count)
		if os.Getenv("FORCE_SEED") != "true" {
			fmt.Println("Use FORCE_SEED=true to re-seed")
			return
		}
	}

	slog.Info("Seeding database...")

	allowedDirs := []string{"src/data", "data", "scripts/output", "."}

	isSafePath := func(p string) bool {
		abs, err := filepath.Abs(p)
		if err != nil {
			return false
		}
		for _, d := range allowedDirs {
			allowedAbs, _ := filepath.Abs(d)
			if strings.HasPrefix(abs, allowedAbs) {
				return true
			}
		}
		return false
	}

	// Try loading from TMDB import first
	tmdbPath := os.Getenv("TMDB_JSON_PATH")
	if tmdbPath == "" {
		tmdbPath = "src/data/tmdb_movies.json"
	}
	if !isSafePath(tmdbPath) {
		slog.Warn("TMDB_JSON_PATH outside allowed directories, using default", "path", tmdbPath)
		tmdbPath = "src/data/tmdb_movies.json"
	}
	if data, err := os.ReadFile(tmdbPath); err == nil {
		var imp TMDBImport
		if err := json.Unmarshal(data, &imp); err == nil && len(imp.Movies) > 0 {
			slog.Info("Found TMDB data", "count", len(imp.Movies), "source", tmdbPath)
			importMovies(imp.Movies)
			return
		}
	}

	mockPath := os.Getenv("MOCK_DATA_PATH")
	if mockPath == "" {
		mockPath = "src/data/movies.ts"
	}
	if !isSafePath(mockPath) {
		slog.Warn("MOCK_DATA_PATH outside allowed directories, using default", "path", mockPath)
		mockPath = "src/data/movies.ts"
	}
	slog.Info("TMDB data not found. Use seed from frontend mock data or TMDB import", "tmdb_path", tmdbPath)

	// Fallback: seed a few sample movies directly
	seedSampleMovies()
	slog.Info("Seeding complete (sample data)")
}

func importMovies(movies []SeedMovie) {
	var added int
	for _, m := range movies {
		if m.TitleEn == "" {
			continue
		}
		movie := models.Movie{
			TMDBID:         hashID(m.ID),
			Title:          m.TitleEn,
			TitleAr:        m.TitleAr,
			Overview:       m.OverviewEn,
			OverviewAr:     m.OverviewAr,
			Year:           m.Year,
			Runtime:        m.Runtime,
			Poster:         m.Poster,
			Backdrop:       m.Backdrop,
			Genres:         strings.Join(m.Genres, ", "),
			GenresAr:       strings.Join(m.GenresAr, ", "),
			Country:        m.Country,
			CountryAr:      m.CountryAr,
			Director:       m.Director,
			DirectorAr:     m.DirectorAr,
			Cast:           strings.Join(m.Cast, ", "),
			CastAr:         strings.Join(m.CastAr, ", "),
			AgeRating:      m.AgeRating,
			ContentRating:  m.ContentRating,
			Status:         m.Status,
			ReleaseDate:    m.ReleaseDate,
			Budget:         m.Financials.Budget,
			BoxOffice:      m.Financials.BoxOffice,
			Marketing:      m.Financials.Marketing,
			IMDBRating:     m.Ratings.Imdb,
			RottenTomatoes: m.Ratings.RottenTomatoes,
			MisrTVRating:   m.Ratings.Misrtv,
			AudienceRating: m.Ratings.Audience,
			Tags:           strings.Join(m.Tags, ", "),
		}

		if err := database.DB.Where("tmdb_id = ?", movie.TMDBID).FirstOrCreate(&movie).Error; err != nil {
			slog.Warn("Failed to import movie", "title", movie.Title, "error", err)
			continue
		}
		added++
	}

	slog.Info("Imported movies", "added", added)
	logSync(added, "TMDB import completed")
}

func seedSampleMovies() {
	movies := []models.Movie{
		{
			TMDBID: 1, Title: "El Warsha", TitleAr: "الورشة",
			Overview: "A gripping drama inside a Cairo metal workshop.", Year: 2025,
			Runtime: 142, Genres: "Drama, Arab Cinema", AgeRating: "PG-13",
			ContentRating: "excellent", Status: "released", ReleaseDate: "2025-01-15",
			IMDBRating: 8.4, MisrTVRating: 9.1, VoteCount: 1500,
		},
		{
			TMDBID: 2, Title: "Oppenheimer", TitleAr: "أوبنهايمر",
			Overview: "The story of J. Robert Oppenheimer and the atomic bomb.", Year: 2023,
			Runtime: 180, Genres: "Biography, Drama, History", AgeRating: "R",
			ContentRating: "excellent", Status: "released", ReleaseDate: "2023-07-21",
			IMDBRating: 8.4, MisrTVRating: 9.5, VoteCount: 50000,
		},
	}

	for _, m := range movies {
		database.DB.Where("tmdb_id = ?", m.TMDBID).FirstOrCreate(&m)
	}

	logSync(len(movies), "Sample seed completed")
}

func logSync(added int, message string) {
	database.DB.Create(&models.SyncLog{
		Status:      "success",
		MoviesAdded: added,
		Message:     message,
	})
}

func hashID(id string) int {
	h := 0
	for _, c := range id {
		h = h*31 + int(c)
	}
	return h

}
