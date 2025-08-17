import "./App.css";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";

function App() {
  const appName: string = "BetterThanIMDB";

  const movies = [
    { movieName: "The Dark Knight", movieRating: 9.5, streamingPlatforms: ["Netflix", "Disney+", "Amazon Prime"] },
    { movieName: "Interstellar", movieRating: 9.0, streamingPlatforms: ["Netflix"] },
    { movieName: "Inside Out", movieRating: 8.5, streamingPlatforms: ["Disney+"] },
    { movieName: "Titanic", movieRating: 7.5, streamingPlatforms: ["Netflix"] },
    { movieName: "Pulp Fiction", movieRating: 8.8, streamingPlatforms: ["Amazon Prime"] },
    { movieName: "Forrest Gump", movieRating: 8.8, streamingPlatforms: ["Netflix"] },
    { movieName: "Inception", movieRating: 7.7, streamingPlatforms: ["Netflix"] },
    { movieName: "Se7en", movieRating: 8.8, streamingPlatforms: ["Amazon Prime"] },
    { movieName: "The Matrix", movieRating: 9.8, streamingPlatforms: ["Netflix"] },
  ];

  const renderMovieCards = () => {
    return movies.map((movie, index) => (
      <MovieCard
        key={index}
        movieName={movie.movieName}
        movieRating={movie.movieRating}
        streamingPlatforms={movie.streamingPlatforms}
      />
    ));
  };

  return (
    <>
      <Header appName={appName} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{renderMovieCards()}</div>
    </>
  );
}

export default App;
