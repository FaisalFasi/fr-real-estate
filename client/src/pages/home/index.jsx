import React from "react";
import "./home.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
import Modal from "../../components/Modal/Modal";
import ChatModal from "../../components/ChatModal/ChatModal";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  // const [isOpenModal, setIsOpenModal] = React.useState(false);

  // const handleCloseModal = () => {
  //   setIsOpenModal(false);
  // };
  // const handleOpenModal = () => {
  //   setIsOpenModal(true);
  // };
  return (
    <section className="home">
      {/* <Modal isOpen={isOpenModal} onClose={handleCloseModal} title="Chat">
        Close
      </Modal> */}
      {/* <ChatModal isOpen={isOpenModal} onClose={handleCloseModal} />
      <div onClick={handleOpenModal}>Open modal </div>{" "} */}
      <div className="relative w-full h-full">
        <img
          src="/images/bgHouse.png"
          alt="BG"
          className="absolute top-0 left-0 w-full min-h-[370px] max-h-[430px] object-cover bg-black "
        />
        <div className="relative w-full h-full ">
          <div className="textContainer">
            <div className="wrapper">
              <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
              <SearchBar />
            </div>
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
      </div>
    </section>
  );
};

export default Home;
