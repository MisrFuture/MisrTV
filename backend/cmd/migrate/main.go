package main

import (
	"log/slog"
	"os"

	"github.com/MisrFuture/MisrTV/backend/internal/database"
)

func main() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo})))

	if err := database.Connect(); err != nil {
		slog.Error("Database connection failed", "error", err)
		os.Exit(1)
	}

	if err := database.Migrate(); err != nil {
		slog.Error("Migration failed", "error", err)
		os.Exit(1)
	}

	slog.Info("Database migration completed successfully")
}
