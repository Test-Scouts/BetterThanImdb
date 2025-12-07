interface Props {
  movieName: string;
  movieRating: number;
  genres: Array<string>;
  posterUrl: string;
}

function MovieCard({ movieName, movieRating, genres, posterUrl }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Movie Poster */}
      {posterUrl ? (
        <div className="w-full bg-gray-200 overflow-hidden">
          <img 
            src={posterUrl} 
            alt={movieName}
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">No Image</div>';
              }
            }}
          />
        </div>
      ) : (
        <div className="w-full bg-gray-300 flex items-center justify-center text-gray-500">
          No Image Available
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-3 pr-2">{movieName}</h3>

        {/* Spacer div to push content to bottom */}
        <div className="flex-grow"></div>
      
      {/* Genres */}
      <div className="mb-3">
        <div className="flex flex-wrap gap-1">
          {genres.map((genre,index) => (
            <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-ts rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/*Star Ratings*/}
      <div className="flex items-center justify-end gap-1 mt-auto">
        {/* Star Icon*/}
        <svg
          className="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
        <span className="text-sm font-medium text-gray-700">
          {movieRating}
        </span>
      </div>
      </div>
    </div>
  );
}

export default MovieCard;