import { useEffect, useState } from "react";
import { Logo, Navbar, NumResults, SearchBar } from "./navbar/Navbar";
import { Main } from "./Main";
import { ListBox } from "./ListBox";
import { Summary } from "./Watched/Summary"
import { MoviesList } from "./Movies/MoviesList";
import { MoviePreview } from "./MoviePreview/MoviePreview";
import { WatchedMoviesList } from "./Watched/WatchedMoviesList";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    title: "Inception",
    Year: "2010",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    title: "The Matrix",
    year: "1999",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    title: "Parasite",
    year: "2019",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export const tempWatchedData = [
  {
    imdbID: "tt1375666",
    title: "Inception",
    year: "2010",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    title: "Back to the Future",
    year: "1985",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const key = "a18f169d";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(function () {
    async function fetchMoviesData() {
      try {
        setIsLoading(true)
        setErrorMessage("interneet Connection");
        let res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s="${query}`);
        if (!res.ok)
          throw new Error("Failed Internet Connection");
        res = await res.json();
        if (res.Response === 'False')
          throw new Error("Movie not found");
        setMovies(res.Search);
        setErrorMessage("");
      } catch (e) {
        setErrorMessage(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (movies.length) {
      setErrorMessage("");
    }
    fetchMoviesData();
  }, [query]);

  function handleChangeQuery(value) {
    setQuery(value);
  }
  function handleSelectedId(newSelectedId) {
    setSelectedId((id) => id === newSelectedId ? null : newSelectedId);
  }
  function handleCloseMovieDetail() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched(w => [...w, movie]);
  }
  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} onChange={handleChangeQuery} />
        <NumResults numOfMovies={movies.length} />
      </Navbar>
      <Main>
        <ListBox>
          {isLoading && <Loader />}
          {!errorMessage && !isLoading && <MoviesList movies={movies} preview={selectedId} onClickPreview={handleSelectedId} />}
          {!isLoading && errorMessage && <Error msg={errorMessage} />}

        </ListBox>
        {
          !selectedId
            ?
            <ListBox>
              <Summary movies={watched} />
              <WatchedMoviesList
                movies={watched}
                onClickPreview={handleSelectedId}
            </ListBox>
            : <ListBox>
              <MoviePreview
                movieId={selectedId}
                onCloseMovie={handleCloseMovieDetail}
                onAddWatched={handleAddWatched}

                watched={watched} />
            </ListBox>
        }
      </Main>

    </>
  );
}
function getLocalMovieData(id) {
  const movie = tempMovieData.find((movie) => movie.imdbID === id);
  return {
    ...movie,
    runtime: "207 mins",
    imdbRating: 7.8,
    Plot: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit voluptatum ipsa aperiam nihil pariatur cum rem. Quas veritatis dolor excepturi exercitationem inventore rem facere incidunt eveniet minus, accusantium sed expedita!",

  }
}
export function Loader({ children }) {
  return (<p className="loader">Loading...</p>);
}
export function Error({ msg }) {
  return (<p className="error">🛑{msg}</p>);
}
