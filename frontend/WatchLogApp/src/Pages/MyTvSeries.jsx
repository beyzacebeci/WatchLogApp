import React, { useContext, useEffect } from "react";
import TvShowsContext from "../context/tvshow";

function MyTvSeries() {
  const { tvShows, fetchTvShows, updateWatchStatusTvShow } =
    useContext(TvShowsContext);

  useEffect(() => {
    fetchTvShows();
  }, [fetchTvShows]);

  const handleRemoveThisClick = async (tvShowId) => {
    const confirmed = window.confirm(
      "Bu diziyi kaldırmak istediğinize emin misiniz?"
    );
    if (confirmed) {
      const newWatchStatus = false; // Remove the movie
      await updateWatchStatusTvShow(tvShowId, newWatchStatus);
      alert("Dizi başarıyla kaldırıldı!");
    }
  };

  const watchedTvShows = tvShows.filter(
    (tvShow) => tvShow.watchStatus === true
  );
  return (
    <div className="container mt-5">
      <h2>My TV Series</h2>
      <div className="row">
        {watchedTvShows.length === 0 ? (
          <p>No watched TV Series found.</p>
        ) : (
          watchedTvShows.map((tvShow) => (
            <div className="col-md-2" key={tvShow.id}>
              <div className="card mb-4">
                <img
                  src={`${tvShow.imageBase64}`}
                  className="card-img-top"
                  alt={tvShow.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{tvShow.title}</h5>
                  <p className="card-text">{tvShow.genre}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveThisClick(tvShow.id)}
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

export default MyTvSeries;
