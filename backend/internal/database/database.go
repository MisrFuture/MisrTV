package database

import (
	"fmt"
	"log/slog"
	"os"
	"time"

	"github.com/MisrFuture/MisrTV/backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Connect() error {
	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		slog.Error("DB_PASSWORD environment variable not set")
		return fmt.Errorf("DB_PASSWORD is required")
	}

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		getEnv("DB_HOST", "localhost"),
		getEnv("DB_PORT", "5432"),
		getEnv("DB_USER", "misrtv"),
		password,
		getEnv("DB_NAME", "misrtv"),
		getEnv("DB_SSLMODE", "require"),
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn),
	})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	sqlDB, _ := DB.DB()
	sqlDB.SetMaxOpenConns(25)
	sqlDB.SetMaxIdleConns(5)
	sqlDB.SetConnMaxLifetime(5 * time.Minute)

	slog.Info("Database connected", "host", getEnv("DB_HOST", "localhost"))

	return nil
}

func Migrate() error {
	return DB.AutoMigrate(
		&models.Movie{},
		&models.SyncLog{},
		&models.Favorite{},
	)
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
