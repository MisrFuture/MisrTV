package main

import (
	"log/slog"
	"os"

	"github.com/MisrFuture/MisrTV/backend/internal/database"
	"github.com/MisrFuture/MisrTV/backend/internal/handlers"
	"github.com/MisrFuture/MisrTV/backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func main() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	})))

	if err := database.Connect(); err != nil {
		slog.Error("Database connection failed", "error", err)
		os.Exit(1)
	}

	if err := database.Migrate(); err != nil {
		slog.Error("Database migration failed", "error", err)
		os.Exit(1)
	}
	slog.Info("Database migrated")

	r := gin.New()
	r.Use(middleware.Logger(), middleware.CORS(), middleware.Recovery())

	api := r.Group("/api/v1")
	{
		api.GET("/health", handlers.HealthCheck)

		api.GET("/movies", handlers.GetMovies)
		api.GET("/movies/trending", handlers.GetTrending)
		api.GET("/movies/upcoming", handlers.GetUpcoming)
		api.GET("/movies/search", handlers.SearchMovies)
		api.GET("/movies/:id", handlers.GetMovie)
	api.GET("/version", handlers.GetVersion)
	api.GET("/sync/log", handlers.GetSyncLog)
		api.GET("/movies/slug/:slug", handlers.GetMovieBySlug)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	slog.Info("Server starting", "port", port)
	if err := r.Run(":" + port); err != nil {
		slog.Error("Server failed", "error", err)
		os.Exit(1)
	}
}
