const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log("API KEY FOUND:", !!API_KEY);
const request = async (endpoint) => {
  if (!API_KEY) {
    throw new Error(
      "TMDB API key is missing. Please check your .env file."
    );
  }

  const separator = endpoint.includes("?") ? "&" : "?";

  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch movie data.");
  }

  return response.json();
};

export const getPopularMovies = () => {
  return request("/movie/popular?language=en-US&page=1");
};

export const getTopRatedMovies = () => {
  return request("/movie/top_rated?language=en-US&page=1");
};

export const getNowPlayingMovies = () => {
  return request("/movie/now_playing?language=en-US&page=1");
};

export const getUpcomingMovies = () => {
  return request("/movie/upcoming?language=en-US&page=1");
};

export const searchMovies = (query) => {
  return request(
    `/search/movie?language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
      query
    )}`
  );
};

export const getMovieDetails = (id) => {
  return request(
    `/movie/${id}?language=en-US&append_to_response=credits,videos`
  );
};