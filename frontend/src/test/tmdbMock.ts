// Fake TMDb API used to render <App /> without network access.

export const GENRES = { genres: [{ id: 28, name: "Action" }, { id: 18, name: "Drama" }] };

// One "popular" page of 20 movies; even numbers are Action, odd numbers are Drama
export const popularPage = (page: number) => ({
  results: Array.from({ length: 20 }, (_, i) => {
    const n = (page - 1) * 20 + i + 1;
    return { title: `Movie ${n}`, vote_average: (n % 10) + 0.04, genre_ids: [n % 2 ? 18 : 28], poster_path: `/p${n}.jpg` };
  }),
});

const jsonResponse = (body: unknown, ok = true) =>
  Promise.resolve({ ok, status: ok ? 200 : 500, statusText: ok ? "OK" : "Server Error", json: () => Promise.resolve(body) });

export const mockTmdbFetch = ({ fail = false } = {}) => {
  const fetchMock = jest.fn((url: string) => {
    if (url.includes("/genre/movie/list")) return jsonResponse(GENRES, !fail);
    return jsonResponse(popularPage(Number(new URL(url).searchParams.get("page"))));
  });
  global.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
};

export const silenceConsole = () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
};
