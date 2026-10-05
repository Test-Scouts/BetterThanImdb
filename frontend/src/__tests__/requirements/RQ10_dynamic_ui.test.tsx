// RQ10: The system shall have a dynamic UI.
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import MovieCard from "../../components/MovieCard";
import { mockTmdbFetch, silenceConsole } from "../../test/tmdbMock";

beforeEach(() => {
  mockTmdbFetch();
  silenceConsole();
  window.scrollTo = jest.fn();
});
afterEach(() => jest.restoreAllMocks());

const loadApp = async () => {
  render(<App />);
  await screen.findByText("Movie 1");
};

describe("RQ10: The system shall have a dynamic UI", () => {
  it("shows movies once they finish loading, without a page reload", async () => {
    render(<App />);
    expect(screen.getByText("No movies found.")).toBeInTheDocument();
    expect(await screen.findByText("Movie 1")).toBeInTheDocument();
  });

  it("updates the list while the user types a title", async () => {
    await loadApp();
    await userEvent.type(screen.getByPlaceholderText("Enter movie name..."), "Movie 42");
    expect(screen.getByText("Movie 42")).toBeInTheDocument();
    expect(screen.getByText("Showing 1-1 of 1 movies")).toBeInTheDocument();
  });

  it("re-orders the list when the user changes sorting", async () => {
    await loadApp();
    await userEvent.selectOptions(screen.getByRole("combobox"), "rating-desc");
    const firstCard = screen.getAllByRole("heading", { level: 3 })[0].closest("div.border") as HTMLElement;
    expect(firstCard).toHaveTextContent("9");
  });

  it("updates the rating label as the slider moves", async () => {
    await loadApp();
    fireEvent.change(screen.getAllByRole("slider")[0], { target: { value: "7" } });
    expect(screen.getByText("Rating Range: 7 - 10")).toBeInTheDocument();
  });

  it("does not let the minimum rating pass the maximum", async () => {
    await loadApp();
    const [min, max] = screen.getAllByRole("slider");
    fireEvent.change(max, { target: { value: "5" } });
    fireEvent.change(min, { target: { value: "7" } });
    expect(screen.getByText("Rating Range: 0 - 5")).toBeInTheDocument();
  });

  it("goes back to the first page when a filter changes", async () => {
    await loadApp();
    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Showing 51-100 of 100 movies")).toBeInTheDocument();
    await userEvent.type(screen.getByPlaceholderText("Enter genre..."), "drama");
    expect(screen.getByText(/^Showing 1-/)).toBeInTheDocument();
  });

  it("enables and disables page buttons depending on the current page", async () => {
    await loadApp();
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
  });

  it("hides pagination and shows a message when nothing matches", async () => {
    await loadApp();
    await userEvent.type(screen.getByPlaceholderText("Enter genre..."), "western");
    expect(screen.getByText("No movies found.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Next" })).not.toBeInTheDocument();
  });

  it("replaces a broken poster with a placeholder", () => {
    render(<MovieCard movieName="Heat" movieRating={8.3} genres={[]} posterUrl="https://broken/heat.jpg" />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("No Image")).toBeInTheDocument();
  });
});
