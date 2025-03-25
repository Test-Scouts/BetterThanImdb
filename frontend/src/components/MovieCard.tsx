interface Props {
  movieName: string;
  movieRating: number;
  streamingPlatforms: string[];
}

function MovieCard({ movieName, movieRating, streamingPlatforms }: Props) {
  return (
    <div>
      <p>
        {movieName}.{" "}
        <button type="button" disabled>
          {movieRating}
        </button>
      </p>
      {streamingPlatforms.map((item) => (
        <li>{item}</li>
      ))}
    </div>
  );
}

export default MovieCard;
