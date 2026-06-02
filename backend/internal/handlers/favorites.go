package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/MisrFuture/MisrTV/backend/internal/database"
	"github.com/MisrFuture/MisrTV/backend/internal/models"
)

type FavoriteRequest struct {
	UserID  string `json:"user_id" binding:"required"`
	MovieID string `json:"movie_id" binding:"required"`
}

func AddFavorite(c *gin.Context) {
	var req FavoriteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	favorite := models.Favorite{UserID: req.UserID, MovieID: req.MovieID}
	database.DB.Where("user_id = ? AND movie_id = ?", req.UserID, req.MovieID).FirstOrCreate(&favorite)
	c.JSON(http.StatusOK, gin.H{"status": "added"})
}

func RemoveFavorite(c *gin.Context) {
	userID := c.Query("user_id")
	movieID := c.Query("movie_id")
	database.DB.Where("user_id = ? AND movie_id = ?", userID, movieID).Delete(&models.Favorite{})
	c.JSON(http.StatusOK, gin.H{"status": "removed"})
}

func GetFavorites(c *gin.Context) {
	userID := c.Query("user_id")
	var favorites []models.Favorite
	database.DB.Where("user_id = ?", userID).Find(&favorites)
	c.JSON(http.StatusOK, favorites)
}
