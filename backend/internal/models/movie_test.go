package models

import (
  "testing"
  "time"
)

func TestMovieDefaults(t *testing.T) {
  m := Movie{
    Title: "Test",
    Year:  2024,
  }
  if m.Title != "Test" {
    t.Errorf("expected Test, got %s", m.Title)
  }
  if m.Year != 2024 {
    t.Errorf("expected 2024, got %d", m.Year)
  }
}

func TestFavoriteModel(t *testing.T) {
  f := Favorite{
    UserID:  "user1",
    MovieID: "movie1",
  }
  if f.UserID != "user1" {
    t.Errorf("expected user1, got %s", f.UserID)
  }
  if f.MovieID != "movie1" {
    t.Errorf("expected movie1, got %s", f.MovieID)
  }
}

func TestRatingModel(t *testing.T) {
  r := Rating{
    UserID:  "user1",
    MovieID: "movie1",
    Score:   8.5,
  }
  if r.Score != 8.5 {
    t.Errorf("expected 8.5, got %f", r.Score)
  }
}

func TestCommentModel(t *testing.T) {
  c := Comment{
    UserID:  "user1",
    MovieID: "movie1",
    Content: "Great film",
  }
  if c.Content != "Great film" {
    t.Errorf("expected 'Great film', got %s", c.Content)
  }
}

func TestMovieTimestamps(t *testing.T) {
  m := Movie{}
  if !m.CreatedAt.IsZero() {
    t.Error("expected zero CreatedAt")
  }
  m.CreatedAt = time.Now()
  if m.CreatedAt.IsZero() {
    t.Error("expected non-zero CreatedAt")
  }
}
