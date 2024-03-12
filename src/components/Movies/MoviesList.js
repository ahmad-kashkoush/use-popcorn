import { MovieItem } from "./MovieItem";

export function MoviesList({ movies, onClickPreview }) {

    return (
        <ul className="list">
            {movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} onClickPreview={onClickPreview} />
            ))}
        </ul>
    );
}
