import "./App.css";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import { Movie } from "./types/Movie.tsx";
import { useState, useEffect } from "react";

function App() {
  const appName: string = "BetterThanIMDB";

  // The variable "movies" is an array of type Movie, setMovie is the function that alters this variable.
  // The variable "movies" is initialized as an empty array.
  const [movies, setMovies] = useState<Movie[]>([]);

  // The function that transforms JSON type data to MovieCard
  const JsonToMovie = (apiData :any): Movie[] => {
    
    // API Data is empty
    if (!apiData) return [];
    
    return apiData.titles.map((item: any) => ({
      movieName: item.primaryTitle,
      movieRating: item.rating?.aggregateRating || 0 }));
  };

  useEffect(() => {
    async function readApiData() {
      try {
        const apiResponse = await fetch("https://api.imdbapi.dev/titles?types=MOVIE");  // Fetching data via API Call
        const apiResponseJson = await apiResponse.json();                               // Parsing the response body as JSON
        console.log("raw api data:", apiResponseJson)
        console.log("first movie: ", apiResponseJson.titles?.[0])
        const transformedMovieData = JsonToMovie(apiResponseJson);                      // Transform data from JSON to Movie type               
        console.log("Transformed data:", transformedMovieData); 
        setMovies(transformedMovieData);                                                // Set variable "movies"                  
      }
      catch(error){
        console.error(error)
      }
    }

    readApiData();
  }, []);


  const renderMovieCards = (moviesToRender: Movie[]) => {
    return moviesToRender.map((movie, index) => (
      <MovieCard
        key={index}
        movieName={movie.movieName}
        movieRating={movie.movieRating}
      />
    ));
  };

  return (
    <>
      <Header appName={appName} />
      <div className="container mx-auto px-4 py-8 pt-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> 
          {movies.length > 0 ? renderMovieCards(movies) : 'Loading...'}         
        </div>
      </div>
    </>
  );
}

export default App;
