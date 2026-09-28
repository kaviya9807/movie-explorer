import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovieGrid from "../components/MovieGrid";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import { searchMovies } from "../services/movieApi";

function SearchResults() {
  const [searchParams] =
    useSearchParams();

  const query =
    searchParams.get("query") || "";

  const [movies, setMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchSearchResults =
      async () => {

        if (!query.trim()) {
          setMovies([]);
          setLoading(false);
          return;
        }

        setLoading(true);
        setError("");

        try {
          const data =
            await searchMovies(query);

          setMovies(data.results || []);

        } catch (err) {
          setError(err.message);

        } finally {
          setLoading(false);
        }
      };

    fetchSearchResults();

  }, [query]);

  return (
    <main className="page-container">

      <div className="search-heading">

        <h1>Search Results</h1>

        <p>
          Results for:{" "}
          <strong>{query}</strong>
        </p>

      </div>

      {loading && <Loader />}

      {!loading && error && (
        <ErrorMessage message={error} />
      )}

      {!loading && !error && (
        <MovieGrid movies={movies} />
      )}

    </main>
  );
}

export default SearchResults;