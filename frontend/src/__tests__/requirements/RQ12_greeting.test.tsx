// RQ12: The system shall greet any users i.e. "Hey Gorgeous!".
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "../../components/WelcomePage";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Welcome" element={<WelcomePage />} />
        <Route path="/BetterThanIMDB" element={<div>Main app</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('RQ12: The system shall greet any users i.e. "Hey Gorgeous!"', () => {
  it.each(["/", "/Welcome"])('greets the user with "Hey Gorgeous!" at %s', (path) => {
    renderAt(path);
    expect(screen.getByRole("heading", { name: "Hey Gorgeous!" })).toBeInTheDocument();
  });

  it("tells the user how to continue", () => {
    renderAt("/");
    expect(screen.getByText(/press any key to go to betterthanimdb/i)).toBeInTheDocument();
  });

  it("takes the user to the app after any key press", () => {
    renderAt("/");
    fireEvent.keyDown(window, { key: "Enter" });
    expect(screen.getByText("Main app")).toBeInTheDocument();
    expect(screen.queryByText("Hey Gorgeous!")).not.toBeInTheDocument();
  });

  it("takes the user to the app after a click", () => {
    renderAt("/");
    fireEvent.click(window);
    expect(screen.getByText("Main app")).toBeInTheDocument();
  });
});
