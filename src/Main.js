import { useState } from "react";
import { tempWatchedData, average } from "./App";
export function Main({ movies }) {
    const [watched, setWatched] = useState(tempWatchedData);
    return (
        <main className="main">
            <ListBox movies={movies} />
            <ListBox movies={watched}>
                <Summary movies={watched} />
            </ListBox>
        </main>);
}
export function ListBox({ movies, children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box">
            <ToggleButton isOpen={isOpen} onToggle={() => setIsOpen((open => !open))} />
            {isOpen && (
                <>
                    {children}
                    <MoviesList movies={movies} />
                </>
            )}
        </div>
    );
}


export function MoviesList({ movies }) {

    return (
        <ul className="list">
            {movies.map((movie) => (
                <Movie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    );
}
function Movie({ movie }) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    );

}
function ToggleButton({ isOpen, onToggle }) {
    return (
        <button
            className="btn-toggle"
            onClick={onToggle}
        >
            {isOpen ? "–" : "+"}
        </button>
    );
}


function Summary({ movies }) {
    const avgImdbRating = average(movies.map((movie) => movie.imdbRating));
    const avgUserRating = average(movies.map((movie) => movie.userRating));
    const avgRuntime = average(movies.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{movies.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}