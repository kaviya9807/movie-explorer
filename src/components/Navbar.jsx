import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          🎬 MovieExplorer
        </Link>

        <SearchBar />

        <nav className="nav-links">
          <Link to="/">
            Home
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;