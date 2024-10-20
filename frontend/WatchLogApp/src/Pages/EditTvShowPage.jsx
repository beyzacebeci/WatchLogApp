import React, { useContext, useEffect, useState } from "react";
import TvShowsContext from "../context/tvshow";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function EditTvShowPage() {
  const { updateTvShow, tvShows, fetchTvShows } = useContext(TvShowsContext);
  const { id } = useParams(); // URL'den film ID'sini al
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  useEffect(() => {
    if (tvShows.length === 0) {
      fetchTvShows();
    }
  }, [tvShows, fetchTvShows]);

  useEffect(() => {
    // ID ile filmi bul ve formu doldur
    const tvShowToEdit = tvShows.find((tvShow) => tvShow.id === parseInt(id));
    if (tvShowToEdit) {
      setTitle(tvShowToEdit.title);
      setGenre(tvShowToEdit.genre);
      setImageBase64(tvShowToEdit.imageBase64);
    }
  }, [tvShows, id]);

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

    const updatedTvShow = {
      title,
      genre,
      imageBase64,
    };

    await updateTvShow(id, updatedTvShow);

    navigate("/admin-panel");
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-4">Edit Tv Show</h4>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label className="text-start">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tv series title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="genre">
              <Form.Label className="text-start">Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tv series genre"
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
                  alt="Tv Show"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
            </Form.Group>

            <Button type="submit" className="btn btn-primary">
              Update Tv Show
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditTvShowPage;
