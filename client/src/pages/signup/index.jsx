import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.scss";
import apiRequest from "../../lib/apiRequest";

const Signup = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      // add alert on successful registration and redirect to login page
      window.alert("Account created successfully! Please login to continue.");
      console.log("Response register: ", response.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            autoComplete="on"
            type="text"
            placeholder="Username"
          />
          <input
            name="email"
            autoComplete="on"
            type="text"
            placeholder="Email"
          />
          <input
            name="password"
            autoComplete="on"
            type="password"
            placeholder="Password"
          />
          <button disabled={loading}>Register</button>
          {error && <span className="error">{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Signup;
