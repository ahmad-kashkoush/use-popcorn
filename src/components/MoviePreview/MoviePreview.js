import { useEffect, useState } from "react";
import { StarRating } from "./StarRating";
import { key, Error, Loader } from "./../App";

export function MoviePreview({ movieId, onCloseMovie, onAddWatched, watched }) {

  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // derived state
  const isWatched = watched.map(movie => movie.imdbID).includes(movieId);
  const watchedUserRating = watched.find(movie => movie.imdbID === movieId)?.userRating;
  const {
    Title: title, Year: year, Released: released, Runtime: runtime, Genre: genre, imdbRating, Plot: plot, Poster: poster, imdbID, Actors: actors, Director: director,



  } = movie;
  function handleAdd() {
    const newWatchedMovie = {
      title, year, released, runtime, genre,
      imdbRating, imdbID, poster, userRating: userRating
    };
    onAddWatched(newWatchedMovie);
    console.log(newWatchedMovie);
    onCloseMovie();
  }
  // function handleRemove() {
  //   onRemoveWatched(movie.imdbID);
  // }
  function handleUserRating(value) {
    setUserRating(value);
  }
  useEffect(function () {

    (async function () {
      try {
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movieId}`);
        if (!res.ok)
          throw new Error("Internet Connection Faild");
        const data = await res.json();
        if (!data.Response)
          throw new Error("Movie Not Found");

        setMovie(data);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }(movie));

  }, [movieId]);


  // ! Change Title
  useEffect(function () {
    if (!title) return;
    document.title = `Movie: ${title}`;
    // cleanup function
    return function () {
      document.title = `usePopcorn`;
      // title will be remembered despite of componenet being unmounted
      // this will happen because of closure
      // console.log(`returning from Movie${title}`);
    }
  }, [title]);
  // add close movie preview on escape key
  useEffect(function () {
    const handleEscapeKey = function (e) {
      if (e.code === 'Escape') {
        onCloseMovie();
        // console.log('escape');
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return function () {
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [onCloseMovie]);
  return <>
    {isLoading ? <Loader />
      : <div className="details">
        <header>
          <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
          <img src={poster} />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>{released} &bull;{runtime}</p>
            <p>{genre}</p>
            <p> <span>⭐</span> {imdbRating} imdbRating Rating</p>
          </div>
        </header>
        <section>
          <div className="rating">
            {!isWatched ?
              <>
                <StarRating defaultRating={userRating} maxRating={10} size={24} onSetRating={handleUserRating} />
                {userRating > 0 && <button className="btn-add" onClick={handleAdd}>Add</button>}
              </>
              :
              <p>Your rating is {watchedUserRating} ⭐</p>}
          </div>
          <p>
            <em>{plot}</em>
          </p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>


      </div>} </>;

}
