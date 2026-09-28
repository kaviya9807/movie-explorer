import { Link } from "react-router-dom";
import Rating from "./Rating";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="poster-container">
        <img
          src={poster}
          alt={movie.title}
        />

        <div className="movie-rating">
          <Rating rating={movie.vote_average} />
        </div>
      </div>

      <div className="movie-card-content">
        <h3>{movie.title}</h3>

        <p>{releaseYear}</p>
      </div>
    </Link>
  );
}

export default MovieCard;