export type AgeRating = "G" | "PG" | "PG-13" | "R" | "18+" | "NR";

export type ContentRating = "excellent" | "good" | "mixed" | "poor";

export type MovieStatus = "released" | "upcoming" | "in_production";

export interface Financials {
  budget: number;
  boxOffice: number;
  marketing?: number;
}

export interface MovieRatings {
  imdb: number;
  rottenTomatoes: number;
  misrtv: number;
  audience: number;
}

export interface Movie {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  overviewEn: string;
  overviewAr: string;
  poster: string;
  backdrop: string;
  year: number;
  runtime: number;
  genres: string[];
  genresAr: string[];
  country: string;
  countryAr: string;
  director: string;
  directorAr: string;
  cast: string[];
  castAr: string[];
  ageRating: AgeRating;
  contentRating: ContentRating;
  status: MovieStatus;
  releaseDate: string;
  financials: Financials;
  ratings: MovieRatings;
  tags: string[];
  trailer?: string;
  gallery?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  avatar: string;
  bio: string;
  bioAr: string;
  region: string;
  regionAr: string;
  joined: string;
  likedMovieIds: string[];
  watchlistIds: string[];
}
