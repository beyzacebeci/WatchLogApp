import React, { useContext, useEffect } from "react";
import MoviesContext from "../context/movie";
import { useNavigate } from "react-router-dom";

function MoviesTable() {
  const navigate = useNavigate();

  const { movies, fetchMovies, deleteMovie } = useContext(MoviesContext);

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDeleteClick = (id) => {
    deleteMovie(id);
  };

  const handleEditClick = (id) => {
    navigate(`/edit-movie/${id}`);
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
            <th>Settings </th>
          </tr>
        </thead>
        <tbody>
          {movies?.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>
                <img
                  src={`${movie.imageBase64}`}
                  alt={movie.title}
                  style={{ width: "100px" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditClick(movie.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(movie.id)}
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

export default MoviesTable;
