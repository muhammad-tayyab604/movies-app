import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import NoPage from "./pages/NoPage/NoPage";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList/MovieList";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route
          path="/movies/:type"
          element={<MovieList searchQuery={searchQuery} />}
        />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
