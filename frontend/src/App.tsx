import "./App.css";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";

function App() {
  const appName: string = "BetterThanIMDB";

  const interstellarName: string = "Interstellar";
  const interstellarRating: number = 4.999;
  const interstellarPlatfs: string[] = ["Netflix", "Disney+"];

  return (
    <>
      <Header appName={appName} />
      <MovieCard
        movieName={interstellarName}
        movieRating={interstellarRating}
        streamingPlatforms={interstellarPlatfs}
      />
    </>
  );
}

export default App;
