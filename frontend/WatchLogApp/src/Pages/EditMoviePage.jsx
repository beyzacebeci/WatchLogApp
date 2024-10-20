import React, { useContext, useEffect, useState } from "react";
import MoviesContext from "../context/movie";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function EditMoviePage() {
  const { updateMovie, movies, fetchMovies } = useContext(MoviesContext);
  const { id } = useParams(); // URL'den film ID'sini al
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  useEffect(() => {
    // Eğer filmler yüklü değilse fetchMovies ile tüm filmleri çek
    if (movies.length === 0) {
      fetchMovies();
    }
  }, [movies, fetchMovies]);

  useEffect(() => {
    // ID ile filmi bul ve formu doldur
    const movieToEdit = movies.find((movie) => movie.id === parseInt(id));
    if (movieToEdit) {
      setTitle(movieToEdit.title);
      setGenre(movieToEdit.genre);
      setImageBase64(movieToEdit.imageBase64);
    }
  }, [movies, id]);

  // Dosya yükleme ve base64'e çevirme işlemi
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // Base64 string burada ayarlanıyor
      };
      reader.readAsDataURL(file); // Dosya base64'e çevriliyor
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedMovie = {
      title,
      genre,
      imageBase64,
    };

    // Mevcut filmi güncelle
    await updateMovie(id, updatedMovie);

    // Düzenleme sonrası film listesine yönlendir
    navigate("/admin-panel");
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-4">Edit Movie</h4>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label className="text-start">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="genre">
              <Form.Label className="text-start">Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageBase64">
              <Form.Label className="text-start">Image Upload</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imageBase64 && (
                <img
                  src={imageBase64}
                  alt="Movie"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
            </Form.Group>

            <Button type="submit" className="btn btn-primary">
              Update Movie
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditMoviePage;
