import axios from "axios";
import { createContext, useState } from "react";

const TvShowsContext = createContext();

function TvShowProvider({ children }) {
  const [tvShows, setTvShows] = useState([]);

  const fetchTvShows = async () => {
    const response = await axios.get("https://localhost:7087/api/TvShow");
    setTvShows(response.data);
  };

  const fetchOneTvShow = async (id) => {
    try {
      const response = await axios.get(`/api/TvShow/${id}`); // API'ye GET isteği
      return response.data; // Film verisini döndür
    } catch (error) {
      console.error("Error fetching the tv show:", error);
      return null; // Hata durumunda null döndür
    }
  };

  // Update an existing tvshow
  const updateTvShow = async (id, updatedTvShow) => {
    const response = await axios.put(
      `https://localhost:7087/api/TvShow/${id}`,
      updatedTvShow
    );
    setTvShows((prevTvShows) =>
      prevTvShows.map((tvShow) => (tvShow.id === id ? response.data : tvShow))
    );
  };

  const addTvShow = async (newTvShow) => {
    const response = await axios.post(
      "https://localhost:7087/api/TvShow",
      newTvShow
    );
    setTvShows((prevTvShows) => [...prevTvShows, response.data]);
  };

  const deleteTvShow = async (id) => {
    await axios.delete(`https://localhost:7087/api/TvShow/${id}`);
    setTvShows((prevTvShows) =>
      prevTvShows.filter((tvShow) => tvShow.id !== id)
    );
  };

  const updateWatchStatusTvShow = async (id, newWatchStatus) => {
    try {
      console.log("Updating watch status:", id, newWatchStatus); // Debugging için log ekleyin
      const response = await axios.put(
        `https://localhost:7087/api/TvShow/${id}/watchstatus`,
        JSON.stringify(newWatchStatus), // Değeri JSON formatına çevirin
        { headers: { "Content-Type": "application/json" } } // İçerik türünü belirtin
      );
      setTvShows((prevTvShows) =>
        prevTvShows.map((tvShow) =>
          tvShow.id === id
            ? { ...tvShow, watchStatus: response.data.watchStatus }
            : tvShow
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
    tvShows,
    fetchTvShows,
    fetchOneTvShow,
    addTvShow,
    deleteTvShow,
    updateTvShow,
    updateWatchStatusTvShow,
  };

  return (
    <TvShowsContext.Provider value={sharedValuesandMethods}>
      {children}
    </TvShowsContext.Provider>
  );
}

export { TvShowProvider };
export default TvShowsContext;
