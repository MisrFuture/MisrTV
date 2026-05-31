import { movies, getTrendingMovies, getUpcomingMovies } from "@/data/movies";
import type { Movie } from "@/types/movie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface APIMovie {
  id: number;
  title: string;
  title_ar: string;
  overview: string;
  year: number;
  runtime: number;
  poster: string;
  backdrop: string;
  genres: string[];
  genres_ar: string[];
  country: string;
  country_ar: string;
  director: string;
  director_ar: string;
  cast: string[];
  cast_ar: string[];
  age_rating: string;
  content_rating: string;
  status: string;
  release_date: string;
  imdb_rating: number;
  misrtv_rating: number;
  vote_count: number;
}

function apiMovieToMovie(a: APIMovie, id: string): Movie {
  return {
    id,
    slug: a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    titleEn: a.title,
    titleAr: a.title_ar || a.title,
    overviewEn: a.overview,
    overviewAr: "",
    poster: a.poster || `https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop`,
    backdrop: a.backdrop || `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=800&fit=crop`,
    year: a.year,
    runtime: a.runtime || 120,
    genres: a.genres,
    genresAr: a.genres_ar,
    country: a.country,
    countryAr: a.country_ar,
    director: a.director,
    directorAr: a.director_ar,
    cast: a.cast,
    castAr: a.cast_ar,
    ageRating: (a.age_rating as any) || "PG-13",
    contentRating: (a.content_rating as any) || "good",
    status: a.status === "upcoming" ? "upcoming" : "released",
    releaseDate: a.release_date || "2025-01-01",
    financials: { budget: 0, boxOffice: 0 },
    ratings: {
      imdb: a.imdb_rating || 0,
      rottenTomatoes: 0,
      misrtv: a.misrtv_rating || 0,
      audience: 0,
    },
    tags: [],
  };
}

function isApiAvailable(): boolean {
  return !!API_URL;
}

async function fetchFromAPI<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getMoviesAPI(params?: {
  page?: number;
  year?: string;
  genre?: string;
  status?: string;
  q?: string;
}): Promise<Movie[]> {
  if (!isApiAvailable()) return [];

  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.year) searchParams.set("year", params.year);
  if (params?.genre) searchParams.set("genre", params.genre);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.q) searchParams.set("q", params.q);

  const data = await fetchFromAPI<{ data: APIMovie[] }>(`/movies?${searchParams}`);
  if (!data) return [];
  return data.data.map((m, i) => apiMovieToMovie(m, `api-${m.id}`));
}

export async function getTrendingAPI(): Promise<Movie[]> {
  if (!isApiAvailable()) return [];
  const data = await fetchFromAPI<APIMovie[]>("/movies/trending");
  if (!data) return [];
  return data.map((m, i) => apiMovieToMovie(m, `api-${m.id}`));
}

export async function getUpcomingAPI(): Promise<Movie[]> {
  if (!isApiAvailable()) return [];
  const data = await fetchFromAPI<APIMovie[]>("/movies/upcoming");
  if (!data) return [];
  return data.map((m, i) => apiMovieToMovie(m, `api-${m.id}`));
}

export function useBackend() {
  if (isApiAvailable()) {
    return {
      getMovies: getMoviesAPI,
      getTrending: getTrendingAPI,
      getUpcoming: getUpcomingAPI,
    };
  }
  return {
    getMovies: async () => movies,
    getTrending: async () => getTrendingMovies(),
    getUpcoming: async () => getUpcomingMovies(),
  };
}
