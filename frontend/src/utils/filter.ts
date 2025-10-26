import { Movie } from "../types/Movie";

export function filterMoviesByName(movies: Movie[], keyword: string): Movie[] {
  return movies.filter((movie) => movie.movieName.toLowerCase().includes(keyword.toLowerCase()));
}

export function filterMoviesByRating(movies: Movie[], minRating: number, maxRating: number): Movie[] {
  return movies.filter((movie) => movie.movieRating >= minRating && movie.movieRating <= maxRating);
}

export function filterMoviesByGenre(movies: Movie[], keyword: string): Movie[] {
  const keywordNoSpace = keyword.toLocaleLowerCase().trim(); // " Action " becomes "action"

  // early return in case of empty search
  if(!keywordNoSpace)
    return movies;
  
  // Creates a new array with only movies that satisfy the condition.
  // If movie has a 'null' or 'undefined' genre, use an empty array instead.
  // If genre, i.e., "act" in included any of the movie's genres list, return that item. 
  return movies.filter((movie) => (movie.genres ?? []).some((genre) =>genre.toLowerCase().includes(keywordNoSpace)));
}

// [...movies] creates a shallow copy of movies array by "Spread Operator". 
// Since sort operation modifies the array in-place and we want to keep original as it is
// ... is like unpacking the movies array content into another array
export function sortMoviesByRating(movies: Movie[], ascending: boolean = true): Movie[]{
  return [...movies].sort((item1,item2) => {

    // computes difference between the ratings
    const ratingDifference = item1.movieRating - item2.movieRating;

    // if ascending True, return comparison
    // if ascending False, return -comparison
    return ascending ? ratingDifference : -ratingDifference
  })
}