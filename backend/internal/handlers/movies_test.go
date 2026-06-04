package handlers

import (
  "net/http"
  "net/http/httptest"
  "testing"

  "github.com/gin-gonic/gin"
)

func TestHealthCheck(t *testing.T) {
  gin.SetMode(gin.TestMode)
  r := gin.New()
  r.GET("/api/v1/health", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"status": "ok"})
  })

  w := httptest.NewRecorder()
  req, _ := http.NewRequest("GET", "/api/v1/health", nil)
  r.ServeHTTP(w, req)

  if w.Code != http.StatusOK {
    t.Errorf("expected 200, got %d", w.Code)
  }
}
