import { useEffect, useState } from "react";
import { Logo, Navbar, NumResults, SearchBar } from "./Navbar";
import Summary, { ListBox, Main, MoviesList } from "./Main";
import { StarRating } from "./StarRating";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = "a18f169d";
export default function App() {
  const [query, setQuery] = useState("seven");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedId, setSelectedId] = useState(false);

  useEffect(function () {
    (async function () {
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
        console.log(e);
        setErrorMessage(e.message);
      } finally {
        setIsLoading(false);
      }
    })();
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
              <MoviesList movies={watched} />
            </ListBox>
            : <ListBox>
              <MoviePreview movieId={selectedId} onCloseMovie={handleCloseMovieDetail} />
            </ListBox>
        }
      </Main>

    </>
  );
}

function Loader({ children }) {
  return (<p className="loader">Loading...</p>);
}
function Error({ msg }) {
  return (<p className="error">🛑{msg}</p>);
}