-- Migration 001: Initial schema
CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  tmdb_id INTEGER UNIQUE,
  title VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255),
  overview TEXT,
  overview_ar TEXT,
  year INTEGER,
  runtime INTEGER,
  poster VARCHAR(500),
  backdrop VARCHAR(500),
  genres TEXT[],
  genres_ar TEXT[],
  country VARCHAR(100),
  country_ar VARCHAR(100),
  director VARCHAR(255),
  director_ar VARCHAR(255),
  cast TEXT[],
  cast_ar TEXT[],
  age_rating VARCHAR(10),
  content_rating VARCHAR(20),
  status VARCHAR(20),
  release_date DATE,
  budget BIGINT,
  box_office BIGINT,
  marketing BIGINT,
  imdb_rating DECIMAL(3,1),
  rotten_tomatoes INTEGER,
  misrtv_rating DECIMAL(3,1),
  audience_rating DECIMAL(3,1),
  vote_count INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sync_logs (
  id SERIAL PRIMARY KEY,
  status VARCHAR(20),
  movies_added INTEGER DEFAULT 0,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  movie_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  movie_id VARCHAR(255) NOT NULL,
  score DECIMAL(3,1) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  movie_id VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
