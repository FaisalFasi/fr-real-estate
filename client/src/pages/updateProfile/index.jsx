import React from "react";
import "./updateProfile.scss";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import UploadWidget from "../../components/UploadWidget/UploadWidget";

const UpdateProfile = () => {
  const { currentUserInfo, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const { username, email, password } = Object.fromEntries(formData);

      const res = await apiRequest.put(`/users/${currentUserInfo.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });

      console.log("Update user Response: ", res?.data);

      updateUser(res?.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="relative w-full h-full min-h-[600px] max-h-[830px]">
        <img
          src="/images/bgSignUp.jpg"
          alt="BG"
          className="absolute top-0 left-0 w-full min-h-[600px] max-h-[830px] object-cover bg-black "
        />
        <div className="relative w-full h-fit flex  ">
          <div className="formContainer ">
            <form onSubmit={handleSubmit}>
              <h1>Update Profile</h1>
              <div className="item">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  defaultValue={currentUserInfo.username}
                />
              </div>
              <div className="item">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={currentUserInfo.email}
                />
              </div>
              <div className="item">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="true"
                />
              </div>
              <button>Update</button>
              {error && <span>error</span>}
            </form>
          </div>
        </div>
      </div>

      <div className="sideContainer relative">
        <img
          src={avatar[0] || currentUserInfo.avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "faisalrehman",
            uploadPreset: "real-estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
};

export default UpdateProfile;

// import React from "react";
// import "./updateProfile.scss";
// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import apiRequest from "../../lib/apiRequest.js";
// import UploadWidget from "../../components/UploadWidget/UploadWidget";

// const UpdateProfile = () => {
//   const { currentUserInfo, updateUser } = useContext(AuthContext);
//   const [error, setError] = useState("");
//   const [avatar, setAvatar] = useState([]);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData(e.target);
//       const { username, email, password } = Object.fromEntries(formData);

//       const res = await apiRequest.put(`/users/${currentUserInfo.id}`, {
//         username,
//         email,
//         password,
//         avatar: avatar[0],
//       });

//       console.log("Update user Response: ", res?.data);

//       updateUser(res?.data);
//       navigate("/profile");
//     } catch (err) {
//       console.log(err);
//       setError(err.response?.data?.message);
//     }
//   };

//   return (
//     <div className="profileUpdatePage">
//       <div className="formContainer">
//         <form onSubmit={handleSubmit}>
//           <h1>Update Profile</h1>
//           <div className="item">
//             <label htmlFor="username">Username</label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               defaultValue={currentUserInfo.username}
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               defaultValue={currentUserInfo.email}
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="true"
//             />
//           </div>
//           <button>Update</button>
//           {error && <span>error</span>}
//         </form>
//       </div>
//       <div className="sideContainer">
//         <img
//           src={avatar[0] || currentUserInfo.avatar || "/noavatar.jpg"}
//           alt=""
//           className="avatar"
//         />
//         <UploadWidget
//           uwConfig={{
//             cloudName: "faisalrehman",
//             uploadPreset: "real-estate",
//             multiple: false,
//             maxImageFileSize: 2000000,
//             folder: "avatars",
//           }}
//           setState={setAvatar}
//         />
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;
