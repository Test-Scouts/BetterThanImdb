// RQ1: The system shall show movies and ratings.
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import MovieCard from "../../components/MovieCard";
import { filterMoviesByRating, sortMoviesByRating } from "../../utils/filter";
import { names, sampleMovies } from "../../test/fixtures";
import { mockTmdbFetch, silenceConsole } from "../../test/tmdbMock";

const movieTitles = () => screen.queryAllByRole("heading", { level: 3 }).map((h) => h.textContent);

beforeEach(() => {
  mockTmdbFetch();
  silenceConsole();
  window.scrollTo = jest.fn();
});
afterEach(() => jest.restoreAllMocks());

describe("RQ1: The system shall show movies and ratings", () => {
  describe("a single movie", () => {
    const props = {
      movieName: "Interstellar",
      movieRating: 8.4,
      genres: ["Adventure", "Drama"],
      posterUrl: "https://image.tmdb.org/t/p/original/interstellar.jpg",
    };

    it("shows the movie title", () => {
      render(<MovieCard {...props} />);
      expect(screen.getByRole("heading", { name: "Interstellar" })).toBeInTheDocument();
    });

    it("shows the movie rating", () => {
      render(<MovieCard {...props} />);
      expect(screen.getByText("8.4")).toBeInTheDocument();
    });

    it("shows the movie poster", () => {
      render(<MovieCard {...props} />);
      expect(screen.getByRole("img", { name: "Interstellar" })).toHaveAttribute("src", props.posterUrl);
    });

    it("still shows the movie when it has no poster", () => {
      render(<MovieCard {...props} posterUrl="" />);
      expect(screen.getByText("No Image Available")).toBeInTheDocument();
      expect(screen.getByText("Interstellar")).toBeInTheDocument();
    });

    it("shows a rating of 0", () => {
      render(<MovieCard {...props} movieRating={0} />);
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("the movie list", () => {
    it("loads popular movies from TMDb and shows them", async () => {
      render(<App />);
      expect(await screen.findByText("Movie 1")).toBeInTheDocument();
      expect(global.fetch).toHaveBeenCalledWith("https://api.themoviedb.org/3/movie/popular?page=1", expect.anything());
    });

    it("shows each movie's rating rounded to one decimal place", async () => {
      render(<App />);
      const card = (await screen.findByRole("heading", { name: "Movie 3" })).closest("div.border") as HTMLElement;
      expect(within(card).getByText("3")).toBeInTheDocument(); // 3.04 from the API
    });

    it("shows each movie's poster from TMDb", async () => {
      render(<App />);
      const card = (await screen.findByRole("heading", { name: "Movie 3" })).closest("div.border") as HTMLElement;
      expect(within(card).getByRole("img")).toHaveAttribute("src", "https://image.tmdb.org/t/p/original/p3.jpg");
    });

    it("shows 50 movies per page and lets the user browse the rest", async () => {
      render(<App />);
      await screen.findByText("Movie 1");
      expect(movieTitles()).toHaveLength(50);
      expect(screen.getByText("Showing 1-50 of 100 movies")).toBeInTheDocument();

      await userEvent.click(screen.getByRole("button", { name: "Next" }));
      expect(movieTitles()[0]).toBe("Movie 51");
      expect(screen.getByText("Showing 51-100 of 100 movies")).toBeInTheDocument();
    });

    it("tells the user when no movies could be loaded", async () => {
      mockTmdbFetch({ fail: true });
      render(<App />);
      await waitFor(() => expect(console.error).toHaveBeenCalled());
      expect(screen.getByText("No movies found.")).toBeInTheDocument();
    });
  });

  describe("filtering and sorting by rating", () => {
    it("keeps only movies inside the rating range, inclusive", () => {
      expect(names(filterMoviesByRating(sampleMovies, 9.0, 9.8))).toEqual(["The Dark Knight", "Interstellar", "The Matrix"]);
    });

    it("returns nothing when no movie is in the range", () => {
      expect(filterMoviesByRating(sampleMovies, 0, 5)).toEqual([]);
    });

    it("sorts movies by rating in both directions", () => {
      expect(sortMoviesByRating(sampleMovies).map((m) => m.movieRating)).toEqual([7.5, 7.7, 8.5, 8.8, 9.0, 9.5, 9.8]);
      expect(sortMoviesByRating(sampleMovies, false).map((m) => m.movieRating)).toEqual([9.8, 9.5, 9.0, 8.8, 8.5, 7.7, 7.5]);
    });
  });
});
