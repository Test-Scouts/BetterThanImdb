import { useState, useEffect } from "react";
import { Movie } from "../types/Movie";
import { filterMoviesByRating, filterMoviesByName, sortMoviesByRating, filterMoviesByGenre } from "../utils/filter";

interface Props{
    movieList: Movie[];
}

type sortingsOptions = 'rating-desc' | 'rating-asc' | 'none';

function MovieFilter({movieList, onFilter }: Props & {onFilter: (filteredMovies: Movie[]) => void}) {
    
    // initialize some state variables with default values and provide corresponding setter function
    const [ratingRange, setRatingRange] = useState({min: 0, max: 10});
    const [sortingsOptions, setsortingsOptions] = useState('none');
    const [searchTitleKeyword, setSearchTitleKeyword] = useState('');
    const [searchGenreKeyword, setSearchGenreKeyword] = useState('');
    const [filterTime, setFilterTime] = useState<number>(0);


    // useEffect hook runs a side effect whenever dependencies change.
    useEffect(() => {
        // Skip timing on initial load when movieList is empty
        if (movieList.length === 0) {
            onFilter([]);
            return;
        }

        const startTime = performance.now();

        let filteredMovies = [...movieList];

        // Filtering movie titles by a keyword
        if(searchTitleKeyword.trim()){
            filteredMovies = filterMoviesByName(filteredMovies, searchTitleKeyword);
        }

        // Filtering movie genres by a keyword
        if(searchGenreKeyword.trim()){
            filteredMovies = filterMoviesByGenre(filteredMovies, searchGenreKeyword);
        }

        // Filtering movies by rating range
        if(ratingRange.min > 0 || ratingRange.max < 10){
            filteredMovies = filterMoviesByRating(filteredMovies, ratingRange.min, ratingRange.max);
        }

        // Apply sorting
        switch(sortingsOptions){
            case 'rating-desc':
                filteredMovies = sortMoviesByRating(filteredMovies, false);
                break;
            case 'rating-asc':
                filteredMovies = sortMoviesByRating(filteredMovies, true);
                break;
            case 'none':
                break;
        }

        const endTime = performance.now();
        const duration = Math.round((endTime - startTime) * 100) / 100; // Round to 2 decimal places
        
        // Only update timing if it's a meaningful change (not just initial render)
        if (duration > 0) {
            setFilterTime(duration);
        }

        onFilter(filteredMovies);
    }, [ratingRange.min, ratingRange.max, searchTitleKeyword, searchGenreKeyword, sortingsOptions, movieList, onFilter]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Filter & Sort Movies</h2>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    Filter time: {filterTime}ms
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Search column: Name and Genre stacked */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search by Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter movie name..."
                        value={searchTitleKeyword}
                        onChange={(e) => setSearchTitleKeyword(e.target.value)}
                        className="w-full px-3 py-2 border border-violet-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-250 focus:border-transparent mb-4"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search by Genre
                    </label>
                    <input
                        type="text"
                        placeholder="Enter genre..."
                        value={searchGenreKeyword}
                        onChange={(e) => setSearchGenreKeyword(e.target.value)}
                        className="w-full px-3 py-2 border border-violet-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-250 focus:border-transparent"
                    />
                </div>

                {/* Filter by Rating Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating Range: {ratingRange.min} - {ratingRange.max}
                    </label>
                    
                    {/* Minimum Rating */}
                    <div className="mb-3">
                        <label className="block text-xs text-gray-600 mb-1">
                            Min Rating: {ratingRange.min}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={ratingRange.min}
                            onChange={(e) => {
                                const newMin = parseFloat(e.target.value);
                                if (newMin <= ratingRange.max) {
                                    setRatingRange(prev => ({...prev, min: newMin}));
                                }
                            }}
                            className="w-full accent-purple-950"
                            style={{
                                background: `linear-gradient(to right, rgb(88 28 135) 0%, rgb(88 28 135) ${(ratingRange.min / 10) * 100}%, rgb(229 231 235) ${(ratingRange.min / 10) * 100}%, rgb(229 231 235) 100%)`
                            }}
                        />
                    </div>
                    
                    {/* Maximum Rating */}
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">
                            Max Rating: {ratingRange.max}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={ratingRange.max}
                            onChange={(e) => {
                                const newMax = parseFloat(e.target.value);
                                if (newMax >= ratingRange.min) {
                                    setRatingRange(prev => ({...prev, max: newMax}));
                                }
                            }}
                            className="w-full accent-purple-950"
                            style={{
                                background: `linear-gradient(to right, rgb(88 28 135) 0%, rgb(88 28 135) ${(ratingRange.max / 10) * 100}%, rgb(229 231 235) ${(ratingRange.max / 10) * 100}%, rgb(229 231 235) 100%)`
                            }}
                        />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>0</span>
                        <span>10</span>
                    </div>
                </div>

                {/* Sort Options */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                    </label>
                    <select
                        value={sortingsOptions}
                        onChange={(e) => setsortingsOptions(e.target.value as sortingsOptions)}
                        className="w-full px-3 py-2 border border-violet-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="none">No Sorting</option>
                        <option value="rating-asc">Ascending (Low to High)</option>
                        <option value="rating-desc">Descending (High to Low)</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default MovieFilter
