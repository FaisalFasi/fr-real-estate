import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.scss";
import apiRequest from "../../lib/apiRequest.js";
import { z } from "zod";

const Signup = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupSchema = useCallback(
    () =>
      z.object({
        username: z
          .string()
          .min(3, "Username must be at least 3 characters long."),
        email: z.string().email("Please enter a valid email address."),
        password: z
          .string()
          .min(8, "Password must be at least 8 characters long.")
          .regex(/\d/, "Password must contain at least one number.")
          .regex(
            /[@$!%*?&#]/,
            "Password must contain at least one special character."
          ),
      }),
    []
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const data = {
      username,
      email,
      password,
    };

    const validation = signupSchema().safeParse(data);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const response = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      // or we can also pass data instead of username, email, password as an object like this
      // const response = await apiRequest.post("/auth/register", data);

      // add alert on successful registration and redirect to login page
      window.alert("Account created successfully! Please login to continue.");
      console.log("Response register: ", response.data);
      if (response?.data) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="relative w-full h-full min-h-[500px] max-h-[630px]">
        <img
          src="/images/bgSignIn.jpg"
          alt="BG"
          className="absolute top-0 left-0 w-full min-h-[500px] max-h-[630px] object-cover bg-black "
        />
        <div className="relative w-full h-fit flex  ">
          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              <h1 className="text-xl font-bold">Sign Up</h1>
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
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Signup;
