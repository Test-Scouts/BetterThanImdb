import { useState, useEffect } from "react";
import { Movie } from "../types/Movie";
import { filterMoviesByRating } from "../utils/filter";

interface Props{
    movieList: Movie[];
}

function MovieFilter({movieList, onFilter }: Props & {onFilter: (filteredMovies: Movie[]) => void}) {
    
    // initialize a state variable with default value 0 and provides a setter function
    const [minRating, SetMinRating] = useState(0)

    // useEffect hook runs a side effect whenever minRating, movieList or onFilter dependencies change.
    useEffect(() => {
        const filteredMoviesByRating = filterMoviesByRating(movieList, minRating);
        onFilter(filteredMoviesByRating); // Pass filtered movies to parent
    }, [minRating, movieList, onFilter]);

    return (
        <div>
            <label>
                Min Rating: {minRating}
                <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={minRating}
                onChange={(e) => SetMinRating(parseFloat(e.target.value))}
                />
            </label>
        </div>
    );
}

export default MovieFilter
