import axios from "axios";
import { createContext, useState } from "react";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);

  // Fetch all movies
  const fetchMovies = async () => {
    const response = await axios.get("https://localhost:7087/api/Movie");
    setMovies(response.data);
  };

  const fetchOneMovie = async (id) => {
    try {
      const response = await axios.get(`/api/Movie/${id}`); // API'ye GET isteği
      return response.data; // Film verisini döndür
    } catch (error) {
      console.error("Error fetching the movie:", error);
      return null; // Hata durumunda null döndür
    }
  };

  // Add a new movie
  const addMovie = async (newMovie) => {
    const response = await axios.post(
      "https://localhost:7087/api/Movie",
      newMovie
    );
    setMovies((prevMovies) => [...prevMovies, response.data]);
  };

  // Update an existing movie
  const updateMovie = async (id, updatedMovie) => {
    const response = await axios.put(
      `https://localhost:7087/api/Movie/${id}`,
      updatedMovie
    );
    setMovies((prevMovies) =>
      prevMovies.map((movie) => (movie.id === id ? response.data : movie))
    );
  };

  // Delete a movie
  const deleteMovie = async (id) => {
    await axios.delete(`https://localhost:7087/api/Movie/${id}`);
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const updateWatchStatusMovie = async (id, newWatchStatus) => {
    try {
      console.log("Updating watch status:", id, newWatchStatus); // Debugging için log ekleyin
      const response = await axios.put(
        `https://localhost:7087/api/Movie/${id}/watchstatus`,
        JSON.stringify(newWatchStatus), // Değeri JSON formatına çevirin
        { headers: { "Content-Type": "application/json" } } // İçerik türünü belirtin
      );
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === id
            ? { ...movie, watchStatus: response.data.watchStatus }
            : movie
        )
      );
      return response.data; // Başarılı güncellemeyi döndür
    } catch (error) {
      console.error(
        "Error updating watch status:",
        error.response?.data || error
      ); // Hata durumunda daha fazla bilgi ver
      throw error; // Hata durumunda hatayı fırlat
    }
  };

  const sharedValuesandMethods = {
    movies,
    fetchMovies,
    fetchOneMovie,
    addMovie,
    updateMovie,
    deleteMovie,
    updateWatchStatusMovie,
  };

  return (
    <MoviesContext.Provider value={sharedValuesandMethods}>
      {children}
    </MoviesContext.Provider>
  );
}

export { MoviesProvider };
export default MoviesContext;
