package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/MisrFuture/MisrTV/backend/internal/database"
	"github.com/MisrFuture/MisrTV/backend/internal/models"
)

type RatingRequest struct {
	UserID  string  `json:"user_id" binding:"required"`
	MovieID string  `json:"movie_id" binding:"required"`
	Score   float64 `json:"score" binding:"required,min=0,max=10"`
}

func SubmitRating(c *gin.Context) {
	var req RatingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	var rating models.Rating
	database.DB.Where("user_id = ? AND movie_id = ?", req.UserID, req.MovieID).First(&rating)
	rating.UserID = req.UserID
	rating.MovieID = req.MovieID
	rating.Score = req.Score
	database.DB.Save(&rating)
	c.JSON(http.StatusOK, gin.H{"status": "rated", "score": req.Score})
}
