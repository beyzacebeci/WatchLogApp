import React, { useContext, useEffect } from "react";
import MoviesContext from "../context/movie";

function MyMovies() {
  const { movies, fetchMovies, updateWatchStatusMovie } =
    useContext(MoviesContext);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleRemoveThisClick = async (movieId) => {
    const confirmed = window.confirm(
      "Bu filmi kaldırmak istediğinize emin misiniz?"
    );
    if (confirmed) {
      const newWatchStatus = false; // Remove the movie
      await updateWatchStatusMovie(movieId, newWatchStatus);
      alert("Film başarıyla kaldırıldı!");
    }
  };

  const watchedMovies = movies.filter((movie) => movie.watchStatus === true);

  return (
    <div className="container mt-5">
      <h2>My Movies</h2>
      <div className="row">
        {watchedMovies.length === 0 ? (
          <p>No watched movies found.</p>
        ) : (
          watchedMovies.map((movie) => (
            <div className="col-md-2" key={movie.id}>
              <div className="card mb-4">
                <img
                  src={`${movie.imageBase64}`}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.genre}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveThisClick(movie.id)}
                  >
                    Remove This
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyMovies;
