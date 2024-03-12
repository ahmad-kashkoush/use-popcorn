import { average } from "./../App";

export function Summary({ movies }) {
    const avgImdbRating = +average(movies.map((movie) => movie.imdbRating).filter(i => isFinite(i))).toFixed(2);
    const avgUserRating = +average(movies.map((movie) => movie.userRating)).toFixed(2);
    const avgRuntime = +average(movies.map((movie) => {
        // console.log(typeof movie.runtime);
        if (typeof movie.runtime === 'number')
            return movie.runtime;
        return +movie.runtime.split(' ')[0];
    })).toFixed(2);
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
