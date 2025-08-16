import "./App.css";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";

function App() {
  const appName: string = "BetterThanIMDB";

  const movies = [
    {
      movieName: "The Dark Knight",
      rating: 9.5,
      streamingPlatforms: ["Netflix", "Disney+"],
    },
    { movieName: "Interstellar", rating: 9.0, streamingPlatforms: ["Netflix"] },
    { movieName: "Inside Out", rating: 8.5, streamingPlatforms: ["Disney+"] },
    { movieName: "Titanic", rating: 7.5, streamingPlatforms: ["Netflix"] },
    {
      movieName: "Pulp Fiction",
      rating: 8.8,
      streamingPlatforms: ["Amazon Prime"],
    },
    { movieName: "Forrest Gump", rating: 8.8, streamingPlatforms: ["Netflix"] },
    { movieName: "Inception", rating: 7.7, streamingPlatforms: ["Netflix"] },
    { movieName: "Se7en", rating: 8.8, streamingPlatforms: ["Amazon Prime"] },
    { movieName: "The Matrix", rating: 9.8, streamingPlatforms: ["Netflix"] },
  ];

  const renderMovieCards = () => {
    return movies.map((movie, index) => (
      <MovieCard
        key={index}
        movieName={movie.movieName}
        movieRating={movie.rating}
        streamingPlatforms={movie.streamingPlatforms}
      />
    ));
  };

  return (
    <>
      <Header appName={appName} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderMovieCards()}
      </div>
    </>
  );
}

export default App;
