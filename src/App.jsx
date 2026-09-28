import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/search"
          element={<SearchResults />}
        />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        <Route
          path="*"
          element={
            <div className="not-found">

              <h1>404</h1>

              <p>
                Page not found.
              </p>

            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;