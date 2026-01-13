import React from "react";
import "./home.scss";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  return (
    <section className="home">
      <div className="homeContainer">
        <div className="backgroundImage">
          <img src="/images/bgHouse.png" alt="Beautiful Real Estate Background" />
          <div className="overlay"></div>
        </div>
        
        <div className="content">
          <div className="heroSection">
            <h1 className="heroTitle">
              Find Real Estate & Get Your Dream Place
            </h1>
            <p className="heroSubtitle">
              Discover the perfect property that matches your lifestyle and budget
            </p>
            <div className="searchContainer">
              <SearchBar />
            </div>
          </div>

          <div className="statsSection">
            <div className="statCard">
              <div className="statIcon">🏆</div>
              <div className="statContent">
                <h1 className="statNumber">16+</h1>
                <h2 className="statLabel">Years of Experience</h2>
              </div>
            </div>
            <div className="statCard">
              <div className="statIcon">⭐</div>
              <div className="statContent">
                <h1 className="statNumber">100</h1>
                <h2 className="statLabel">Awards Gained</h2>
              </div>
            </div>
            <div className="statCard">
              <div className="statIcon">🏠</div>
              <div className="statContent">
                <h1 className="statNumber">15,000+</h1>
                <h2 className="statLabel">Properties Ready</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
