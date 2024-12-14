import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import GoogleIcon from "../assets/google_icon.png";
import AppleIcon from "../assets/apple_icon.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        { fullname: name, email, password },
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 h-screen bg-[#151515] font-poppins">
      <h1 className="font-extrabold text-4xl m-8 text-[#F7F9F2]">Sign Up</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <input
          className="px-4 py-2 rounded-lg border bg-[#151515] text-[#F7F9F2] placeholder:text-[#F7F9F2]"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          <p className="font-medium text-sm text-[#F7F9F2] pl-1">
            I agree to FLOOK's{" "}
            <a href="#" className="text-[#FFDB00]">
              terms of services
            </a>
          </p>
        </div>
        <div className="flex w-full items-start justify-start mt-2">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="mt-1"
          />
          <p className="font-medium text-sm text-[#F7F9F2] pl-1">
            I accept FLOOK’s use of my data for the service and everything
            else described in the{" "}
            <a href="#" className="text-[#FFDB00]">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#FFDB00]">
              Data Processing Agreement
            </a>
          </p>
        </div>
        <button
          type="submit"
          className="bg-[#FFDB00] py-2 my-2 rounded-lg text-black font-medium hover:opacity-70"
          onClick={handleSubmit}
        >
          Continue
        </button>
        <div className="flex items-center justify-center text-xs mt-2 text-[#F7F9F2]">
          <h1 className="mr-1">Already have an account?</h1>
          <Link to="/login" className="font-semibold text-[#FFDB00]">
            Sign In!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
