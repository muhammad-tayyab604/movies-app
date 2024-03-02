import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState();
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);
  const getData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=9f254777f795212a76e05938f127fbbe`
    );
    const data = await response.json();
    setMovieDetails(data);
    console.log(data);
  };
  console.log(movieDetails);

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            movieDetails ? movieDetails.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                movieDetails ? movieDetails.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {movieDetails ? movieDetails.original_title : ""}
            </div>
            <div className="movie__tagline">
              {movieDetails ? movieDetails.tagline : ""}
            </div>
            <div className="movie__rating">
              {movieDetails ? movieDetails.vote_average : ""}{" "}
              <i class="fas fa-star" />
              <span className="movie__voteCount">
                {movieDetails ? "(" + movieDetails.vote_count + ") votes" : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {movieDetails ? movieDetails.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {movieDetails ? "Release date: " + movieDetails.release_date : ""}
            </div>
            <div className="movie__genres">
              {movieDetails && movieDetails.genres
                ? movieDetails.genres.map((genre) => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{movieDetails ? movieDetails.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {movieDetails && movieDetails.homepage && (
          <a
            href={movieDetails.homepage}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {movieDetails && movieDetails.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + movieDetails.imdb_id}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {movieDetails &&
          movieDetails.production_companies &&
          movieDetails.production_companies.map((company) => (
            <>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    className="movie__productionComapany"
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default MovieDetails;
