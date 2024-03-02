import React, { useEffect, useRef, useState } from "react";
import "./MovieList.css";
import { useParams } from "react-router-dom";
import Cards from "../Card/Cards";

const MovieList = ({ searchQuery }) => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();
  const movieListRef = useRef();

  useEffect(() => {
    getData();
  }, [searchQuery]);
  useEffect(() => {
    getData();
  }, [type]);
  const getData = async () => {
    let apiUrl;

    if (searchQuery) {
      // If there's a search query, use the search API
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=9f254777f795212a76e05938f127fbbe&query=${searchQuery}`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=9f254777f795212a76e05938f127fbbe`;
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    setMovieList(data.results);
    if (searchQuery && movieListRef.current) {
      movieListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "popular").toUpperCase()}</h2>
      <div className="list__cards">
        {movieList &&
          movieList.map((movie) => <Cards ref={movieListRef} movie={movie} />)}
      </div>
    </div>
  );
};

export default MovieList;
