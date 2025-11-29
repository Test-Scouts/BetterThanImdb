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
  const moviesPerPage = 50; // Reduced to show pagination with fewer movies
  
  // The function that transforms TMDb API JSON data to Movie type
  const jsonToMovie = (apiData :any, genreMap: Map<number, string>): Movie[] => {
    
    // API Data is empty
    if (!apiData || !apiData.results) return [];
    
    // TMDb API returns movies in a 'results' array
    // Each movie has: title, vote_average (rating 0-10), genre_ids (array of genre IDs)
    // We map genre IDs to genre names using the genreMap
    return apiData.results.map((item: any) => ({
      movieName: item.title || item.name || 'Unknown',
      movieRating: item.vote_average 
        ? Math.round(item.vote_average * 10) / 10  // Round to 1 decimal place (e.g., 7.436 → 7.4)
        : 0, // TMDb ratings are 0-10 scale
      genres: item.genre_ids 
        ? item.genre_ids.map((id: number) => genreMap.get(id) || `Genre ${id}`).filter(Boolean)
        : [] // Convert genre IDs to genre names
    }));
  };

  useEffect(() => {
    async function readApiData() {
      try {
        // Read access token from environment variable
        // In Vite, environment variables must be prefixed with VITE_ to be exposed to client
        const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
        
        if (!accessToken || accessToken === '<<access_token>>') {
          console.error('TMDb access token not found. Please set VITE_TMDB_ACCESS_TOKEN in your .env file');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        };

        // Step 1: Fetch genre list to create ID to name mapping
        const genreResponse = await fetch('https://api.themoviedb.org/3/genre/movie/list', {
          method: 'GET',
          headers: headers
        });

        if (!genreResponse.ok) {
          throw new Error(`Genre API Error: ${genreResponse.status} ${genreResponse.statusText}`);
        }

        const genreData = await genreResponse.json();
        console.log("Genre data:", genreData);
        
        // Create a Map for fast genre ID to name lookup
        const genreMap = new Map<number, string>();
        if (genreData.genres && Array.isArray(genreData.genres)) {
          genreData.genres.forEach((genre: { id: number; name: string }) => {
            genreMap.set(genre.id, genre.name);
          });
        }
        console.log("Genre map created with", genreMap.size, "genres");

        // Step 2: Fetch popular movies from multiple pages
        // TMDb API returns 20 movies per page, so we'll fetch multiple pages to get more movies
        // Fetching pages 1-5 to get 100 movies
        const pagesToFetch = 5; // Fetch 5 pages = 100 movies. Mind the rate limit of API provider.
        const allMovies: any[] = [];
        
        // Fetch movies from multiple pages in parallel
        const pagePromises = Array.from({ length: pagesToFetch }, (_, i) => {
          const page = i + 1;
          return fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}`, {
            method: 'GET',
            headers: headers
          }).then(response => {
            if (!response.ok) {
              throw new Error(`Movies API Error for page ${page}: ${response.status} ${response.statusText}`);
            }
            return response.json();
          });
        });

        const pageResults = await Promise.all(pagePromises);
        
        // Combine all movies from all pages
        pageResults.forEach((pageData, index) => {
          if (pageData.results && Array.isArray(pageData.results)) {
            allMovies.push(...pageData.results);
            console.log(`Page ${index + 1}: ${pageData.results.length} movies`);
          }
        });

        console.log("Total movies fetched from all pages:", allMovies.length);
        console.log("First movie:", allMovies[0]);
        
        // Create a mock API response structure for the transformation function
        const combinedApiData = { results: allMovies };
        
        const transformedMovieData = jsonToMovie(combinedApiData, genreMap);           // Transform data from JSON to Movie type with genre mapping
        console.log("Transformed data count:", transformedMovieData.length);
        console.log("Sample movie with genres:", transformedMovieData[0]);
        
        setMovies(transformedMovieData);                                                // Set variable "movies" 
        setFilteredMovies(transformedMovieData);                                        // Set variable "filteredMovies"        
      }
      catch(error){
        console.error("Error fetching movies from TMDb API:", error)
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
