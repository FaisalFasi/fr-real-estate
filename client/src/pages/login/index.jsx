import React from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { updateUser } = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username");
    // const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await apiRequest.post("/auth/login", {
        username,
        // email,
        password,
      });

      // add localStorage to store user data
      // adding user also adds the cookie( jwt token) coming from the server
      // localStorage.setItem("user", JSON.stringify(response.data));

      updateUser(response.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required type="text" placeholder="Username" />
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
          />
          <button disabled={loading}>Login</button>
          {error && <span className="error">{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
