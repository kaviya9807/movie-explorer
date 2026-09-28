import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Rating from "../components/Rating";

import { getMovieDetails } from "../services/movieApi";

const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/w780";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await getMovieDetails(id);

        setMovie(data);

      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    fetchMovie();

  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }

  if (!movie) {
    return (
      <ErrorMessage
        message="Movie not found."
      />
    );
  }

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/780x1170?text=No+Poster";

  const releaseYear =
    movie.release_date
      ? movie.release_date.substring(0, 4)
      : "N/A";

  return (
    <main className="details-page">

      <div className="details-container">

        <Link
          to="/"
          className="back-button"
        >
          ← Back to Movies
        </Link>

        <div className="movie-details">

          <div className="details-poster">

            <img
              src={poster}
              alt={movie.title}
            />

          </div>

          <div className="details-content">

            <h1>{movie.title}</h1>

            {movie.tagline && (
              <p className="tagline">
                "{movie.tagline}"
              </p>
            )}

            <div className="details-rating">

              <Rating
                rating={movie.vote_average}
              />

              <span>
                {movie.vote_count
                  ?.toLocaleString() || 0}{" "}
                votes
              </span>

            </div>

            <div className="movie-meta">

              <span>
                📅 {releaseYear}
              </span>

              {movie.runtime && (
                <span>
                  ⏱️ {movie.runtime} minutes
                </span>
              )}

            </div>

            <div className="genres">

              {movie.genres?.map(
                (genre) => (
                  <span
                    key={genre.id}
                    className="genre"
                  >
                    {genre.name}
                  </span>
                )
              )}

            </div>

            <section className="overview">

              <h2>Overview</h2>

              <p>
                {movie.overview ||
                  "No overview is available for this movie."}
              </p>

            </section>

            {movie.credits?.cast
              ?.length > 0 && (

              <section className="cast-section">

                <h2>Top Cast</h2>

                <div className="cast-list">

                  {movie.credits.cast
                    .slice(0, 8)
                    .map((person) => (

                      <div
                        className="cast-card"
                        key={person.id}
                      >

                        {person.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                            alt={person.name}
                          />
                        ) : (
                          <div className="no-profile">
                            No Image
                          </div>
                        )}

                        <h3>
                          {person.name}
                        </h3>

                        <p>
                          {person.character}
                        </p>

                      </div>

                    ))}

                </div>

              </section>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}

export default MovieDetails;