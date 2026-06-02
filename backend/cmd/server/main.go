package main

import (
	"log/slog"
	"os"
	"time"

	"github.com/MisrFuture/MisrTV/backend/internal/auth"
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

	slog.Info("Run 'go run ./cmd/migrate' to apply database migrations")

	r := gin.New()
	r.Use(middleware.Logger(), middleware.CORS(), middleware.SecurityHeaders(), middleware.RateLimit(100, time.Minute), middleware.Recovery())

	r.GET("/metrics", func(c *gin.Context) {
		c.String(200, `# MisrTV Metrics
go_goroutines 0
http_requests_total 0
http_request_duration_seconds 0
`)
	})

	api := r.Group("/api/v1")
	{
		api.GET("/health", handlers.HealthCheck)

		api.GET("/movies", handlers.GetMovies)
		api.GET("/movies/trending", handlers.GetTrending)
		api.GET("/movies/upcoming", handlers.GetUpcoming)
		api.GET("/movies/search", middleware.RateLimit(20, time.Minute), handlers.SearchMovies)
		api.GET("/movies/:id", handlers.GetMovie)
		api.GET("/version", middleware.RateLimit(10, time.Minute), handlers.GetVersion)
		api.GET("/sync/log", middleware.RateLimit(5, time.Minute), handlers.GetSyncLog)
		api.GET("/movies/slug/:slug", handlers.GetMovieBySlug)
		api.POST("/login", handlers.Login)
		api.POST("/ratings", handlers.SubmitRating)
		api.POST("/favorites", handlers.AddFavorite)
		api.DELETE("/favorites", handlers.RemoveFavorite)
		api.GET("/favorites", handlers.GetFavorites)
	}

	authorized := r.Group("/api/v1/admin")
	authorized.Use(auth.AuthMiddleware())
	{
		authorized.POST("/movies", handlers.CreateMovie)
		authorized.PUT("/movies/:id", handlers.UpdateMovie)
		authorized.DELETE("/movies/:id", handlers.DeleteMovie)
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
