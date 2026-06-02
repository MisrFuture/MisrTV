package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/MisrFuture/MisrTV/backend/internal/database"
	"github.com/MisrFuture/MisrTV/backend/internal/models"
)

type CommentRequest struct {
	UserID  string `json:"user_id" binding:"required"`
	MovieID string `json:"movie_id" binding:"required"`
	Content string `json:"content" binding:"required"`
}

func AddComment(c *gin.Context) {
	var req CommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	comment := models.Comment{UserID: req.UserID, MovieID: req.MovieID, Content: req.Content}
	database.DB.Create(&comment)
	c.JSON(http.StatusCreated, comment)
}

func GetComments(c *gin.Context) {
	movieID := c.Query("movie_id")
	var comments []models.Comment
	database.DB.Where("movie_id = ?", movieID).Order("created_at desc").Find(&comments)
	c.JSON(http.StatusOK, comments)
}
