import React, { useState } from "react";
import "./Navbar.css";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [isOpen, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery("");
    console.log(onSearch);
  };

  const navigateToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <div className="Links">
          {/* <Link to={"/"}> */}
          <img
            onClick={navigateToHome}
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt=""
          />
          {/* </Link> */}
          <Link to={"/movies/popular"}>
            {" "}
            <span>Popular</span>{" "}
          </Link>
          <Link to={"/movies/top_rated"}>
            {" "}
            <span>Top Rated</span>{" "}
          </Link>
        </div>
        <div className="">
          <form onSubmit={handleForm}>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="search"
              type="text"
              placeholder="Search Movie"
            />
            <button style={{ display: "none" }} type="submit"></button>
          </form>
        </div>
        <div className="ham">
          <Hamburger
            onClick={() => setOpen(!isOpen)}
            className="hamburger"
            toggled={isOpen}
            toggle={setOpen}
          />
          {isOpen ? (
            <div className="resLinks">
              <Link to={"/movies/popular"}>
                {" "}
                <span>Popular</span>{" "}
              </Link>
              <Link to={"/movies/top_rated"}>
                {" "}
                <span>Top Rated</span>{" "}
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
