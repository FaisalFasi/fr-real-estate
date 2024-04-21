import React from "react";
import "./filter.scss";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState({
    type: searchParams.get("type") || "any",
    city: searchParams.get("city") || "",
    property:
      ["apartment", "house", "condo", "land"].includes(
        searchParams.get("property")
      ) && searchParams.get("property")
        ? searchParams.get("property")
        : "apartment",
    // property: searchParams.get("property") || "apartment",
    minPrice: searchParams.get("minPrice") || "100",
    maxPrice: searchParams.get("maxPrice") || "1000000",
    bedroom: searchParams.get("bedroom") || "1",
  });
  console.log(query);
  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };
  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="any">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            min={0}
            placeholder="Min Price"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            min={0}
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="Search image" />
        </button>
      </div>
    </div>
  );
};

export default Filter;
