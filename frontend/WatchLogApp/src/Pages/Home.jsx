import React, { useContext, useEffect } from "react";
import MoviesContext from "../context/movie";
import TvShowsContext from "../context/tvshow";

function Home() {
  const { movies, fetchMovies, updateWatchStatusMovie } =
    useContext(MoviesContext);
  const { tvShows, fetchTvShows, updateWatchStatusTvShow } =
    useContext(TvShowsContext);

  useEffect(() => {
    fetchMovies();
    fetchTvShows();
  }, []);

  const handleAddThisClickTvShow = async (tvShowId) => {
    const confirmed = window.confirm(
      "Bu diziyi eklemek istediğinize emin misiniz?"
    );
    if (confirmed) {
      const newWatchStatus = true; // Add the TV show
      await updateWatchStatusTvShow(tvShowId, newWatchStatus);
      alert("Dizi başarıyla eklendi!");
    }
  };

  const handleRemoveThisClickTvShow = async (tvShowId) => {
    const confirmed = window.confirm(
      "Bu diziyi kaldırmak istediğinize emin misiniz?"
    );
    if (confirmed) {
      const newWatchStatus = false; // Remove the TV show
      await updateWatchStatusTvShow(tvShowId, newWatchStatus);
      alert("Dizi başarıyla kaldırıldı!");
    }
  };

  const handleAddThisClickMovie = async (movieId) => {
    const confirmed = window.confirm(
      "Bu diziyi eklemek istediğinize emin misiniz?"
    );
    if (confirmed) {
      const newWatchStatus = true; // Add the TV show
      await updateWatchStatusMovie(movieId, newWatchStatus);
      alert("Dizi başarıyla eklendi!");
    }
  };

  const handleRemoveThisClickMovie = async (movieId) => {
    const confirmed = window.confirm(
      "Bu filmi kaldırmak istediğinize emin misiniz?"
    );
    if (confirmed) {
      const newWatchStatus = false; // Remove the TV show
      await updateWatchStatusMovie(movieId, newWatchStatus);
      alert("Film başarıyla kaldırıldı!");
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Tv Series </h2>

        <table className="table table-striped">
          <tbody>
            {tvShows?.map((tvShow) => (
              <tr key={tvShow.id}>
                <td>{tvShow.title}</td>
                <td>{tvShow.genre}</td>
                <td>
                  <img
                    src={`${tvShow.imageBase64}`}
                    alt={tvShow.title}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>{tvShow.watchStatus ? "Watched" : "Not Watched"}</td>
                <td>
                  <button
                    className="btn btn-success"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleAddThisClickTvShow(tvShow.id)} // Add This button
                  >
                    Add This
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleRemoveThisClickTvShow(tvShow.id)} // Remove This button
                  >
                    Remove This
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Movies</h2>

        <table className="table table-striped">
          <tbody>
            {movies?.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td>
                  <img
                    src={`${movie.imageBase64}`}
                    alt={movie.title}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>{movie.watchStatus ? "Watched" : "Not Watched"}</td>
                <td>
                  <button
                    className="btn btn-success"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleAddThisClickMovie(movie.id)} // Add This button
                  >
                    Add This
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleRemoveThisClickMovie(movie.id)} // Remove This button
                  >
                    Remove This
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
