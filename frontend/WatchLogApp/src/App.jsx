import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AdminPanel from "./Pages/AdminPanel";
import AddMoviePage from "./Pages/AddMoviePage";
import AddTvShowPage from "./Pages/AddTvShowPage";
import MyTvSeries from "./Pages/MyTvSeries";
import MyMovies from "./Pages/MyMovies";
import EditMoviePage from "./Pages/EditMoviePage";
import EditTvShowPage from "./Pages/EditTvShowPage";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-movies" element={<MyMovies />} />
          <Route path="/my-tvseries" element={<MyTvSeries />} />

          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/add-movie" element={<AddMoviePage />} />

          <Route path="/edit-movie/:id" element={<EditMoviePage />} />
          <Route path="/edit-tvshow/:id" element={<EditTvShowPage />} />

          <Route path="/add-tvshow" element={<AddTvShowPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
