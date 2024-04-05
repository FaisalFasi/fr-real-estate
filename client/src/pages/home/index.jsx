import React from "react";
import "./home.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { currentUserInfo } = useContext(AuthContext);
  console.log(currentUserInfo);

  return (
    <div className="home">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            sapiente facilis similique eos inventore, molestias tenetur dicta
            eaque quia porro placeat quisquam illum quis delectus tempora.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>100</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>15000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="BG" />
      </div>
    </div>
  );
};

export default Home;
