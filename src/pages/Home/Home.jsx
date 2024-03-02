import React, { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FcRating } from "react-icons/fc";
import { Link } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

const Home = ({ searchQuery }) => {
  const [apiData, setApiData] = useState([]);

  const fetchPopularMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=9f254777f795212a76e05938f127fbbe"
    );
    const data = await response.json();
    setApiData(data.results);
    console.log(data);
  };

  // console.log(apiData);

  useEffect(() => {
    fetchPopularMovies();
  }, []);
  return (
    <div className="poster">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {apiData.map((movie) => (
          <Link
            key={movie.id}
            style={{ textDecoration: "none", color: "white" }}
            to={`/movie/${movie.id}`}
          >
            <div className="posterImage">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie && movie.backdrop_path
                }`}
                alt=""
              />
            </div>
            <div className="posterImage__overlay">
              <div className="posterImage__title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="posterImage__runtime">
                {movie ? movie.release_date : ""}
                <span
                  style={{ marginLeft: "15px" }}
                  className="posterImage_rating"
                >
                  {movie ? movie.vote_average : ""}
                  <FcRating size={20} />
                </span>
              </div>
              <div className="posterImage__description">
                {movie ? movie.overview : ""}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
      <MovieList searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
