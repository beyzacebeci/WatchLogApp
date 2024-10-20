import React, { useContext, useEffect } from "react";
import TvShowsContext from "../context/tvshow";
import { useNavigate } from "react-router-dom";

function TvShowsTable() {
  const navigate = useNavigate();
  const { tvShows, fetchTvShows, deleteTvShow } = useContext(TvShowsContext);
  useEffect(() => {
    fetchTvShows();
  }, []);

  const handleDeleteClick = (id) => {
    deleteTvShow(id);
  };
  const handleEditClick = (id) => {
    navigate(`/edit-tvshow/${id}`);
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Image</th>
            <th>Settings</th>
          </tr>
        </thead>
        <tbody>
          {tvShows?.map((tvShow) => (
            <tr key={tvShow.id}>
              <td>{tvShow.id}</td>
              <td>{tvShow.title}</td>
              <td>{tvShow.genre}</td>
              <td>
                <img
                  src={`${tvShow.imageBase64}`}
                  alt={tvShow.title}
                  style={{ width: "100px" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditClick(tvShow.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(tvShow.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TvShowsTable;
