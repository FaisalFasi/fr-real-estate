import React from "react";
import "./filter.scss";
const Filter = () => {
  return (
    <div className="filter">
      <h1>
        Search results for <b>London</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="any">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property">
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
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input type="text" id="bedroom" name="bedroom" placeholder="any" />
        </div>
        <button>
          <img src="/search.png" alt="Search image" />
        </button>
      </div>
    </div>
  );
};

export default Filter;
