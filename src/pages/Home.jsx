import { useEffect, useState } from "react";

import CategoryFilter from "../components/CategoryFilter";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import MovieGrid from "../components/MovieGrid";

import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../services/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);

  const [activeCategory, setActiveCategory] =
    useState("popular");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError("");

      try {
        let data;

        switch (activeCategory) {
          case "top-rated":
            data = await getTopRatedMovies();
            break;

          case "now-playing":
            data = await getNowPlayingMovies();
            break;

          case "upcoming":
            data = await getUpcomingMovies();
            break;

          default:
            data = await getPopularMovies();
        }

        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [activeCategory]);

  return (
    <main className="home-page">

      <section className="hero">
        <div className="hero-content">

          <h1>
            Discover Your Next Movie
          </h1>

          <p>
            Search thousands of movies, explore
            ratings, and find something great to
            watch.
          </p>

        </div>
      </section>

      <section className="movies-section">

        <div className="section-header">

          <h2>Movies</h2>

          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

        </div>

        {loading && <Loader />}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading && !error && (
          <MovieGrid movies={movies} />
        )}

      </section>

    </main>
  );
}

export default Home;