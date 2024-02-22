import { useState } from "react";

export function Navbar({ numOfMovies }) {
    return (
        <nav className="nav-bar">
            <Logo />
            <SearchBar />
            <NumResults numOfMovies={numOfMovies} />
        </nav>);
}


function NumResults({ numOfMovies }) {
    return (
        <p className="num-results">
            Found <strong>{numOfMovies}</strong> results
        </p>
    );
}
function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}
function SearchBar() {

    const [query, setQuery] = useState("");
    return (
        < input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} />
    );
}