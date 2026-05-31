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
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		getEnv("DB_HOST", "localhost"),
		getEnv("DB_PORT", "5432"),
		getEnv("DB_USER", "misrtv"),
		getEnv("DB_PASSWORD", "misrtv"),
		getEnv("DB_NAME", "misrtv"),
		getEnv("DB_SSLMODE", "disable"),
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
	)
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
