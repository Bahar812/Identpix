import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import GoogleIcon from "../assets/google_icon.png";
import AppleIcon from "../assets/apple_icon.png";

const Login = ({ user_id }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
      console.log(response.data);
      user_id(response.data.data[0]);
      navigate(`/home/${response.data.data[0]}`);
    } catch (error) {
      console.error("Error logging in", error);
      // Handle login error
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 h-screen bg-[#151515] font-poppins">
      <h1 className="font-extrabold text-4xl m-8 text-[#F7F9F2]">Sign In</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <input
          className="px-4 py-2 rounded-lg border bg-[#151515] text-[#F7F9F2] placeholder:text-[#F7F9F2]"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-4 py-2 rounded-lg border bg-[#151515] text-[#F7F9F2] placeholder:text-[#F7F9F2]"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="#" className="text-xs font-medium text-[#FFDB00]">
          Forget your password?
        </a>
        <div className="flex w-full items-center justify-start mt-2">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="mt-1"
          />
          <p className="font-medium text-sm text-[#F7F9F2] pl-1">Remember me</p>
        </div>
        {errorMessage && (
          <p className="flex w-full items-center justify-center text-red-700">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className="bg-[#FFDB00] py-2 my-2 rounded-lg text-black font-medium hover:opacity-70"
          onClick={handleLogin}
        >
          Continue
        </button>
        <div className="flex items-center justify-center text-xs mt-2 text-[#F7F9F2]">
          <h1 className="mr-1">Don't have an account?</h1>
          <Link to="/register" className="font-semibold text-[#FFDB00]">
            Sign Up now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
