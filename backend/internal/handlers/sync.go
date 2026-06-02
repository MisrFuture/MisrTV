package handlers

import (
	"net/http"
	"os/exec"

	"github.com/gin-gonic/gin"
)

func TriggerSync(c *gin.Context) {
	cmd := exec.Command("python3", "scripts/scraper.py", "--oneshot")
	err := cmd.Start()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to trigger sync"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "sync triggered", "pid": cmd.Process.Pid})
}
