import { WatchedMovieItem } from "./WatchedMovieItem";

export function WatchedMoviesList({ movies, onClickPreview, onClickDelete }) {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <WatchedMovieItem
          key={movie.imdbID}
          movie={movie}
          onClickPreview={onClickPreview}
          onClickDelete={onClickDelete} />
      ))}
    </ul>
  );
}
