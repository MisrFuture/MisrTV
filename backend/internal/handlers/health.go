package handlers

import (
	"net/http"
	"runtime"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/MisrFuture/MisrTV/backend/internal/database"
)

type HealthResponse struct {
	Status     string `json:"status"`
	Uptime     string `json:"uptime"`
	Database   string `json:"database"`
	Goroutines int    `json:"goroutines"`
	Version    string `json:"version"`
}

var startTime = time.Now()

func DetailedHealth(c *gin.Context) {
	dbStatus := "ok"
	sqlDB, err := database.DB.DB()
	if err != nil || sqlDB.Ping() != nil {
		dbStatus = "error"
	}

	resp := HealthResponse{
		Status:     "ok",
		Uptime:     time.Since(startTime).Round(time.Second).String(),
		Database:   dbStatus,
		Goroutines: runtime.NumGoroutine(),
		Version:    "1.0.0",
	}
	c.JSON(http.StatusOK, resp)
}
