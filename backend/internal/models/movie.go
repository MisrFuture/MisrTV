package models

import "time"

type Movie struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	TMDBID         int       `gorm:"uniqueIndex;not null" json:"tmdb_id"`
	Title          string    `gorm:"not null" json:"title"`
	TitleAr        string    `json:"title_ar"`
	Overview       string    `gorm:"type:text" json:"overview"`
	OverviewAr     string    `gorm:"type:text" json:"overview_ar"`
	Year           int       `gorm:"index" json:"year"`
	Runtime        int       `json:"runtime"`
	Poster         string    `json:"poster"`
	Backdrop       string    `json:"backdrop"`
	Genres         string    `json:"genres"`
	GenresAr       string    `json:"genres_ar"`
	Country        string    `json:"country"`
	CountryAr      string    `json:"country_ar"`
	Director       string    `json:"director"`
	DirectorAr     string    `json:"director_ar"`
	Cast           string    `json:"cast"`
	CastAr         string    `json:"cast_ar"`
	AgeRating      string    `json:"age_rating"`
	ContentRating  string    `json:"content_rating"`
	Status         string    `gorm:"index" json:"status"`
	ReleaseDate    string    `json:"release_date"`
	Budget         int64     `json:"budget"`
	BoxOffice      int64     `json:"box_office"`
	Marketing      int64     `json:"marketing"`
	IMDBRating     float64   `json:"imdb_rating"`
	RottenTomatoes int       `json:"rotten_tomatoes"`
	MisrTVRating   float64   `json:"misrtv_rating"`
	AudienceRating int       `json:"audience_rating"`
	VoteCount      int       `json:"vote_count"`
	Tags           string    `json:"tags"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

type MovieResponse struct {
	ID            uint    `json:"id"`
	TMDBID        int     `json:"tmdb_id"`
	Title         string  `json:"title"`
	TitleAr       string  `json:"title_ar"`
	Overview      string  `json:"overview"`
	OverviewAr    string  `json:"overview_ar"`
	Year          int     `json:"year"`
	Runtime       int     `json:"runtime"`
	Poster        string  `json:"poster"`
	Backdrop      string  `json:"backdrop"`
	Genres        []string `json:"genres"`
	GenresAr      []string `json:"genres_ar"`
	Country       string  `json:"country"`
	CountryAr     string  `json:"country_ar"`
	Director      string  `json:"director"`
	DirectorAr    string  `json:"director_ar"`
	Cast          []string `json:"cast"`
	CastAr        []string `json:"cast_ar"`
	AgeRating     string  `json:"age_rating"`
	ContentRating string  `json:"content_rating"`
	Status        string  `json:"status"`
	ReleaseDate   string  `json:"release_date"`
	IMDBRating    float64 `json:"imdb_rating"`
	MisrTVRating  float64 `json:"misrtv_rating"`
	VoteCount     int     `json:"vote_count"`
}

type PaginatedResponse struct {
	Data       any    `json:"data"`
	Page       int    `json:"page"`
	PerPage    int    `json:"per_page"`
	Total      int64  `json:"total"`
	TotalPages int    `json:"total_pages"`
}

type Favorite struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    string    `gorm:"index;not null" json:"user_id"`
	MovieID   string    `gorm:"not null" json:"movie_id"`
	CreatedAt time.Time `json:"created_at"`
}

type SyncLog struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	Status     string    `json:"status"`
	MoviesAdded int      `json:"movies_added"`
	Message    string    `json:"message"`
	CreatedAt  time.Time `json:"created_at"`
}
