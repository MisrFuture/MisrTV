package handlers

import (
	"net/http"

	"github.com/MisrFuture/MisrTV/backend/internal/database"
	"github.com/MisrFuture/MisrTV/backend/internal/models"
	"github.com/gin-gonic/gin"
)

func GetStats(c *gin.Context) {
	var totalMovies int64
	var totalReleases int64
	var totalUpcoming int64
	var avgRating float64

	database.DB.Model(&models.Movie{}).Count(&totalMovies)
	database.DB.Model(&models.Movie{}).Where("status = ?", "released").Count(&totalReleases)
	database.DB.Model(&models.Movie{}).Where("status = ?", "upcoming").Count(&totalUpcoming)
	database.DB.Model(&models.Movie{}).Select("AVG(misrtv_rating)").Scan(&avgRating)

	var byYear []struct {
		Year  int `json:"year"`
		Count int `json:"count"`
	}
	database.DB.Model(&models.Movie{}).Select("year, COUNT(*) as count").Group("year").Order("year desc").Scan(&byYear)

	c.JSON(http.StatusOK, gin.H{
		"total_movies":   totalMovies,
		"total_released": totalReleases,
		"total_upcoming": totalUpcoming,
		"avg_rating":     avgRating,
		"by_year":        byYear,
	})
}
