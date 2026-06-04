package middleware

import (
  "net/http"
  "net/http/httptest"
  "testing"

  "github.com/gin-gonic/gin"
)

func TestSecurityHeaders(t *testing.T) {
  gin.SetMode(gin.TestMode)
  r := gin.New()
  r.Use(SecurityHeaders())
  r.GET("/test", func(c *gin.Context) {
    c.String(http.StatusOK, "ok")
  })

  w := httptest.NewRecorder()
  req, _ := http.NewRequest("GET", "/test", nil)
  r.ServeHTTP(w, req)

  headers := []string{
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Strict-Transport-Security",
    "Content-Security-Policy",
  }
  for _, h := range headers {
    if w.Header().Get(h) == "" {
      t.Errorf("missing security header: %s", h)
    }
  }
}
