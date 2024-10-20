import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MoviesProvider } from "./context/movie.jsx";
import { TvShowProvider } from "./context/tvshow.jsx";
import CustomNavbar from "./Components/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TvShowProvider>
      <MoviesProvider>
        <CustomNavbar />
        <App />
      </MoviesProvider>
    </TvShowProvider>
  </BrowserRouter>
);
