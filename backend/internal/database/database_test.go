package database

import (
  "os"
  "testing"
)

func TestGetDSN(t *testing.T) {
  os.Setenv("DB_USER", "test")
  os.Setenv("DB_PASSWORD", "test")
  os.Setenv("DB_HOST", "localhost")
  os.Setenv("DB_PORT", "5432")
  os.Setenv("DB_NAME", "testdb")
  os.Setenv("DB_SSLMODE", "disable")

  dsn := getDSN()
  if dsn == "" {
    t.Error("expected non-empty DSN")
  }
}

func getDSN() string {
  return "host=" + os.Getenv("DB_HOST") +
    " user=" + os.Getenv("DB_USER") +
    " password=" + os.Getenv("DB_PASSWORD") +
    " dbname=" + os.Getenv("DB_NAME") +
    " port=" + os.Getenv("DB_PORT") +
    " sslmode=" + os.Getenv("DB_SSLMODE")
}
