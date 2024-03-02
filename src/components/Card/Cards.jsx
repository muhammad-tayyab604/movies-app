import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "./Cards.css";

const Cards = ({ movie, movieListRef }) => {
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      isLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {loading ? (
        <div className="cards">
          <SkeletonTheme baseColor="black" highlightColor="#444">
            <Skeleton height={300} durations={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div ref={movieListRef} className="cards" key={movie.id}>
            <img
              className="cards__img"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt=""
            />
            <div className="cards__overlay">
              <div className="card__title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="card__runtime">
                {movie ? movie.release_dat : ""}
                <span className="card__rating">
                  {movie ? movie.vote_average : ""}
                </span>
              </div>
              <div className="card__description">
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
