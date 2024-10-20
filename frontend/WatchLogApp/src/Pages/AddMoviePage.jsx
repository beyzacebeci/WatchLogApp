import React, { useState, useContext } from "react";
import MoviesContext from "../context/movie"; // Gerekirse import yolunu ayarlayın
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddMoviePage() {
  const navigate = useNavigate();
  const { addMovie } = useContext(MoviesContext);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [imageBase64, setImageBase64] = useState("");

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

    const newMovie = {
      title,
      genre,
      imageBase64,
      isDeleted,
    };

    await addMovie(newMovie);
    // Formu temizle
    setTitle("");
    setGenre("");
    setImageBase64("");
    setIsDeleted(false);

    navigate(`/admin-panel`);
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-4">Add New Movie</h4>
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
                required
              />
            </Form.Group>

            <Button type="submit" className="btn btn-primary">
              Add Movie
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddMoviePage;
