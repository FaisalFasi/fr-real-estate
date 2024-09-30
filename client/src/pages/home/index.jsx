import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  return (
    <section className="relative w-full h-screen bg-gray-100">
      <img
        src="/images/bgHouse.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative flex flex-col items-center justify-center w-full h-full p-6">
        <div className="text-center z-10">
          <h1 className="text-4xl font-extrabold text-white mb-6 relative z-10">
            <span className="absolute inset-0 bg-gradient-to-r from-black to-transparent -z-10 blur-sm"></span>
            <span className="relative text-shadow-lg">
              Find Real Estate & Get Your Dream Place
            </span>
          </h1>

          <SearchBar />
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-12 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80 text-center hover:bg-blue-50 transition duration-300">
            <h1 className="text-3xl font-bold text-blue-600">16+</h1>
            <h2 className="text-lg font-medium text-gray-600">
              Years of Experience
            </h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80 text-center hover:bg-blue-50 transition duration-300">
            <h1 className="text-3xl font-bold text-blue-600">100</h1>
            <h2 className="text-lg font-medium text-gray-600">Awards Gained</h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80 text-center hover:bg-blue-50 transition duration-300">
            <h1 className="text-3xl font-bold text-blue-600">15,000+</h1>
            <h2 className="text-lg font-medium text-gray-600">
              Properties Ready
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

// import React from "react";
// import "./home.scss";
// import SearchBar from "../../components/SearchBar/SearchBar";

// const Home = () => {
//   return (
//     <section className="home">
//       <div className="relative w-full h-full">
//         <img
//           src="/images/bgHouse.png"
//           alt="BG"
//           className="absolute top-0 left-0 w-full min-h-[370px] max-h-[430px] object-cover bg-black "
//         />
//         <div className="relative w-full h-full ">
//           <div className="textContainer">
//             <div className="wrapper">
//               <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
//               <SearchBar />
//             </div>
//             <div className="boxes">
//               <div className="box">
//                 <h1>16+</h1>
//                 <h2>Years of Experience</h2>
//               </div>
//               <div className="box">
//                 <h1>100</h1>
//                 <h2>Award Gained</h2>
//               </div>
//               <div className="box">
//                 <h1>15000+</h1>
//                 <h2>Property Ready</h2>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Home;
