import { Movie } from "../types/Movie";

export const makeMovie = (overrides: Partial<Movie> = {}): Movie => ({
  movieName: "Untitled",
  movieRating: 5,
  genres: [],
  posterUrl: "",
  ...overrides,
});

export const sampleMovies: Movie[] = [
  makeMovie({ movieName: "The Dark Knight", movieRating: 9.5, genres: ["Action", "Crime", "Drama"] }),
  makeMovie({ movieName: "Interstellar", movieRating: 9.0, genres: ["Adventure", "Drama", "Science Fiction"] }),
  makeMovie({ movieName: "Inside Out", movieRating: 8.5, genres: ["Animation", "Family", "Comedy"] }),
  makeMovie({ movieName: "Titanic", movieRating: 7.5, genres: ["Drama", "Romance"] }),
  makeMovie({ movieName: "Pulp Fiction", movieRating: 8.8, genres: ["Thriller", "Crime"] }),
  makeMovie({ movieName: "Inception", movieRating: 7.7, genres: ["Action", "Science Fiction"] }),
  makeMovie({ movieName: "The Matrix", movieRating: 9.8, genres: ["Action", "Science Fiction"] }),
];

export const names = (movies: Movie[]) => movies.map((m) => m.movieName);
