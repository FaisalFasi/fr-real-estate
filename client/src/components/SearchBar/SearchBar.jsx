import React from "react";
import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["rent", "buy"];

const SearchBar = () => {
  const [query, setQuery] = useState({
    city: "",
    type: "rent",
    location: "",
    miniPrice: 100,
    maxPrice: 10000,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form action="">
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <input
          type="number"
          name="miniPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.miniPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <img src="/search.png" alt="Search Icon" />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchBar;
