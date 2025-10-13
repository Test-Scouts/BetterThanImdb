interface Props {
  movieName: string;
  movieRating: number;
}

function MovieCard({ movieName, movieRating }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-3 pr-2">{movieName}</h3>

      {/* Spacer div to push content to bottom */}
      <div className="flex-grow"></div>

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
  );
}

export default MovieCard;