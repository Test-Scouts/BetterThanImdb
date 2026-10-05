// RQ6: The system shall recommend quickly enough so that user is not bored.
import { fireEvent, render, screen } from "@testing-library/react";
import MovieFilter from "../../components/MovieFilter";
import { filterMoviesByGenre, filterMoviesByName, filterMoviesByRating, sortMoviesByRating } from "../../utils/filter";
import { Movie } from "../../types/Movie";

// Commonly cited limit for a response to feel immediate
const INSTANT_MS = 100;
const ACCEPTABLE_MS = 1000;

const manyMovies: Movie[] = Array.from({ length: 10_000 }, (_, i) => ({
  movieName: `Movie ${i}`,
  movieRating: (i % 100) / 10,
  genres: i % 2 ? ["Action"] : ["Drama"],
  posterUrl: "",
}));

const timeIt = (fn: () => void) => {
  const start = performance.now();
  fn();
  return performance.now() - start;
};

describe("RQ6: The system shall respond quickly enough so the user is not bored", () => {
  it("filters and sorts 10,000 movies instantly", () => {
    const elapsed = timeIt(() => {
      let result = filterMoviesByName(manyMovies, "movie");
      result = filterMoviesByGenre(result, "action");
      result = filterMoviesByRating(result, 5, 10);
      sortMoviesByRating(result, false);
    });
    expect(elapsed).toBeLessThan(INSTANT_MS);
  });

  it("updates the filtered list within a second when the user changes filters", () => {
    const onFilter = jest.fn();
    render(<MovieFilter movieList={manyMovies} onFilter={onFilter} />);
    const elapsed = timeIt(() => {
      fireEvent.change(screen.getByPlaceholderText("Enter genre..."), { target: { value: "action" } });
      fireEvent.change(screen.getByRole("combobox"), { target: { value: "rating-desc" } });
    });
    expect(elapsed).toBeLessThan(ACCEPTABLE_MS);
    const result: Movie[] = onFilter.mock.calls[onFilter.mock.calls.length - 1][0];
    expect(result).toHaveLength(5_000);
    expect(result[0].movieRating).toBe(9.9);
  });

  it("shows the user how long filtering took", () => {
    render(<MovieFilter movieList={manyMovies} onFilter={jest.fn()} />);
    expect(screen.getByText(/Filter time: [\d.]+ms/)).toBeInTheDocument();
  });
});
