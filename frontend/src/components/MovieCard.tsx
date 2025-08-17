import netflixLogo from "c:\\Users\\MertYurdakul\\Desktop\\BetterThanImdb\\frontend\\public\\netflix_logo.jpg";
import amazonPrimeLogo from "c:\\Users\\MertYurdakul\\Desktop\\BetterThanImdb\\frontend\\public\\amazon_prime_logo.jpg";
import hboLogo from "c:\\Users\\MertYurdakul\\Desktop\\BetterThanImdb\\frontend\\public\\hbo_logo.jpg";
import disneyLogo from "C:\\Users\\MertYurdakul\\Desktop\\BetterThanImdb\\frontend\\public\\disney_logo.jpg";

interface Props {
  movieName: string;
  movieRating: number;
  streamingPlatforms: string[];
}

function MovieCard({ movieName, movieRating, streamingPlatforms }: Props) {
  const logoMap: Record<string, string> = {
    ["Netflix"]: netflixLogo,
    ["Amazon Prime"]: amazonPrimeLogo,
    ["HBO"]: hboLogo,
    ["Disney+"]: disneyLogo,
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-3 pr-2">{movieName}</h3>

      {/* Spacer div to push content to bottom */}
      <div className="" flex-grow></div>

      {/*Streaming Platforms*/}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-wrap gap-2 items-center">
          {streamingPlatforms.map((platform, index) => (
            <div key={index} className="flex items-center gap-1">
              {logoMap[platform] && (
                <img
                  src={logoMap[platform]}
                  alt={`${platform} logo`}
                  className="w-8 h-8 object-contain"
                />
              )}
            </div>
          ))}
        </div>

        {/*Star Ratings*/}
        <div className="flex items-center gap-1">
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
