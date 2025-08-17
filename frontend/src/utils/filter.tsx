import { Movie } from "../types/Movie";

export function filterMoviesByName(movies: Movie[], keyword: string): Movie[] {
  return movies.filter((movie) => movie.movieName.toLowerCase().includes(keyword.toLowerCase()));
}

export function filterMoviesByRating(movies: Movie[], minRating: number): Movie[] {
  return movies.filter((movie) => movie.movieRating >= minRating);
}
