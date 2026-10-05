// RQ2: The system shall allow selecting genres.
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import MovieCard from "../../components/MovieCard";
import MovieFilter from "../../components/MovieFilter";
import { filterMoviesByGenre } from "../../utils/filter";
import { Movie } from "../../types/Movie";
import { makeMovie, names, sampleMovies } from "../../test/fixtures";
import { mockTmdbFetch, silenceConsole } from "../../test/tmdbMock";

describe("RQ2: The system shall allow selecting genres", () => {
  it("shows the genres of each movie", () => {
    render(<MovieCard movieName="Heat" movieRating={8.3} genres={["Action", "Crime"]} posterUrl="" />);
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Crime")).toBeInTheDocument();
  });

  describe("genre filter logic", () => {
    it("keeps only movies of the selected genre", () => {
      expect(names(filterMoviesByGenre(sampleMovies, "Crime"))).toEqual(["The Dark Knight", "Pulp Fiction"]);
    });

    it("ignores case and surrounding spaces", () => {
      expect(names(filterMoviesByGenre(sampleMovies, "  roMANce "))).toEqual(["Titanic"]);
    });

    it("matches part of a genre name", () => {
      expect(names(filterMoviesByGenre(sampleMovies, "sci"))).toEqual(["Interstellar", "Inception", "The Matrix"]);
    });

    it("shows every movie when no genre is selected", () => {
      expect(filterMoviesByGenre(sampleMovies, "")).toEqual(sampleMovies);
      expect(filterMoviesByGenre(sampleMovies, "   ")).toEqual(sampleMovies);
    });

    it("shows no movies for a genre nobody has", () => {
      expect(filterMoviesByGenre(sampleMovies, "Western")).toEqual([]);
    });

    it("skips movies without genres", () => {
      const list = [makeMovie({ movieName: "None", genres: [] }), makeMovie({ movieName: "Scary", genres: ["Horror"] })];
      expect(names(filterMoviesByGenre(list, "horror"))).toEqual(["Scary"]);
    });
  });

  describe("genre filter control", () => {
    const setup = () => {
      const onFilter = jest.fn();
      render(<MovieFilter movieList={sampleMovies} onFilter={onFilter} />);
      const lastResult = (): Movie[] => onFilter.mock.calls[onFilter.mock.calls.length - 1][0];
      return { lastResult, genreInput: screen.getByPlaceholderText("Enter genre...") };
    };

    it("offers a genre search field", () => {
      setup();
      expect(screen.getByText("Search by Genre")).toBeInTheDocument();
    });

    it("filters the movies by the genre the user types", async () => {
      const { genreInput, lastResult } = setup();
      await userEvent.type(genreInput, "crime");
      expect(names(lastResult())).toEqual(["The Dark Knight", "Pulp Fiction"]);
    });

    it("shows all movies again when the genre is cleared", async () => {
      const { genreInput, lastResult } = setup();
      await userEvent.type(genreInput, "romance");
      await userEvent.clear(genreInput);
      expect(lastResult()).toEqual(sampleMovies);
    });

    it("combines the genre with a title search", async () => {
      const { genreInput, lastResult } = setup();
      await userEvent.type(genreInput, "action");
      await userEvent.type(screen.getByPlaceholderText("Enter movie name..."), "the");
      expect(names(lastResult())).toEqual(["The Dark Knight", "The Matrix"]);
    });
  });

  describe("in the app", () => {
    beforeEach(() => {
      mockTmdbFetch();
      silenceConsole();
    });
    afterEach(() => jest.restoreAllMocks());

    it("shows TMDb genre names instead of genre IDs", async () => {
      render(<App />);
      await screen.findByText("Movie 1");
      expect(screen.getAllByText("Drama").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Action").length).toBeGreaterThan(0);
    });

    it("shows only movies of the selected genre", async () => {
      render(<App />);
      await screen.findByText("Movie 1");
      await userEvent.type(screen.getByPlaceholderText("Enter genre..."), "action");
      expect(screen.getByText("Showing 1-50 of 50 movies")).toBeInTheDocument();
      expect(screen.queryByText("Movie 1")).not.toBeInTheDocument(); // Drama
      expect(screen.getByText("Movie 2")).toBeInTheDocument(); // Action
    });
  });
});
