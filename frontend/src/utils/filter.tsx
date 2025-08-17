export function filterMovies(movies: Movie[], search: string): Movie[] {
  return movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));
}
