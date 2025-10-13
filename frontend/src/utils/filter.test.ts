import { filterMoviesByRating } from "./filter";

describe("filterMoviesByRating", () => {
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

    it("Shall return movies with rating higher than 9.0", () => {
        const result = filterMoviesByRating(movies, 9.0);
        expect(result).toEqual([
            { movieName: "The Dark Knight", movieRating: 9.5, streamingPlatforms: ["Netflix", "Disney+", "Amazon Prime"] },
            { movieName: "Interstellar", movieRating: 9.0, streamingPlatforms: ["Netflix"] },
            { movieName: "The Matrix", movieRating: 9.8, streamingPlatforms: ["Netflix"] },
        ]);
    })
});

