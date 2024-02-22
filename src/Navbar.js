import { useState } from "react";

export function Navbar({ children }) {
    return (
        <nav className="nav-bar">
            {children}
        </nav>);
}


export function NumResults({ numOfMovies }) {
    return (
        <p className="num-results">
            Found <strong>{numOfMovies}</strong> results
        </p>
    );
}
export function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}
export function SearchBar() {

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