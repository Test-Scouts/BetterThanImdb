import "./App.css";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import MovieFilter from "./components/MovieFilter.tsx";
import { Movie } from "./types/Movie.tsx";
import { useState, useEffect, useCallback } from "react";

function App() {
  const appName: string = "BetterThanIMDB";

  // The variable "movies" is an array of type Movie, setMovie is the function that alters this variable.
  // The variable "movies" is initialized as an empty array.
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const moviesPerPage = 20; // Reduced to show pagination with fewer movies
  
  // The function that transforms JSON type data to MovieCard
  const jsonToMovie = (apiData :any): Movie[] => {
    
    // API Data is empty
    if (!apiData) return [];
    
    return apiData.titles.map((item: any) => ({
      movieName: item.primaryTitle,
      movieRating: item.rating?.aggregateRating || 0,
      genres: item.genres || []}));
  };

  useEffect(() => {
    async function readApiData() {
      try {
        const apiResponse = await fetch("https://api.imdbapi.dev/titles?types=MOVIE");  // Fetching data via API Call
        const apiResponseJson = await apiResponse.json();                               // Parsing the response body as JSON
        console.log("raw api data:", apiResponseJson)
        console.log("Total movies from API:", apiResponseJson.titles?.length || 0)
        console.log("first movie: ", apiResponseJson.titles?.[0])
        const transformedMovieData = jsonToMovie(apiResponseJson);                      // Transform data from JSON to Movie type               
        console.log("Transformed data:", transformedMovieData); 
        console.log("Transformed data count:", transformedMovieData.length); 
        setMovies(transformedMovieData);                                                // Set variable "movies" 
        setFilteredMovies(transformedMovieData);                                        // Set variable "filteredMovies"        
      }
      catch(error){
        console.error(error)
      }
    }

    readApiData();
  }, []);


  const handleFilterChange = useCallback((filteredMovies: Movie[]) => {
    setFilteredMovies(filteredMovies);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = filteredMovies.slice(startIndex, endIndex);

  const renderMovieCards = (moviesToRender: Movie[]) => {
    return moviesToRender.map((movie, index) => (
      <MovieCard
        key={`${movie.movieName}-${index}`}
        movieName={movie.movieName}
        movieRating={movie.movieRating}
        genres={movie.genres}
      />
    ));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header appName={appName} />
      <div className="container mx-auto px-4 py-8">

        {/* Filtering Section */}
        <div className="mb-8 pt-32">
          <MovieFilter movieList={movies} onFilter={handleFilterChange} />
        </div>

        {/* Movie Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> 
          {currentMovies.length > 0 ? renderMovieCards(currentMovies) : 'No movies found.'}         
        </div>

        {/* Pagination Controls */}
        {filteredMovies.length > 0 && (
          <div className="mt-12 mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredMovies.length)} of {filteredMovies.length} movies
              </span>
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-purple-950 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-900 transition-colors"
                >
                  Previous
                </button>
                
                {/* Page Number Buttons */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded-md transition-colors ${
                          currentPage === pageNum
                            ? 'bg-purple-950 text-gray-700'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-purple-950 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-900 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
            
            {totalPages === 1 && filteredMovies.length > 0 && (
              <div className="text-center text-sm text-gray-500">
                All {filteredMovies.length} movies displayed on this page
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
