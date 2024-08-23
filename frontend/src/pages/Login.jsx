import React, { useState } from "react";
import axios from "axios";
import images from "../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { VscError } from "react-icons/vsc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true); // Start loading
    setErrorMessage(""); // Clear previous error messages

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        { email, password }
      );
      sessionStorage.setItem("token", response.data.token);
      navigate("/"); // Redirect to /User Home after successful login
      setIsLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="px-16 flex items-center h-screen bg-darkBlue">
      <div className="flex justify-around w-full h-[70%]">
        <div className="w-[50%] flex justify-end relative">
          <img
            src={images.login}
            alt="Login"
            className="h-full relative z-10"
          />
          <img
            src={images.blob}
            alt="Login"
            className="h-full w-[80%] mx-[10%] absolute z-1"
          />
        </div>
        <div className="w-[50%] relative overflow-hidden">
          <div className="absolute bg-customNeutral h-full w-full opacity-20 z-1"></div>
          <form
            onSubmit={handleLogin}
            className="relative z-10 px-16 py-8 rounded-sm"
          >
            {errorMessage && (
              <div className="mb-4 flex items-center justify-center text-darkBlue text-center font-semibold text-2xl bg-lightOrange py-3 rounded-lg">
                <VscError className="text-3xl mr-1 mt-0.5" /> {errorMessage}
              </div>
            )}
            <h1 className="text-yellow-400 text-4xl font-bold mb-6 text-center">
              HouseHold Hero
            </h1>
            <div className="mb-6 flex flex-col">
              <label
                className="text-lightOrange text-2xl font-semibold mb-2"
                htmlFor="email"
              >
                Email -
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="input text-black text-lg font-semibold input-bordered w-full bg-white border-[3px] rounded-sm focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label
                className="text-lightOrange text-2xl font-semibold mb-2"
                htmlFor="password"
              >
                Password -
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className="input text-black text-lg font-semibold input-bordered w-full bg-white border-[3px] focus:outline-none rounded-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="my-6 h-12 bg-yellow-400 font-bold text-darkBlue rounded-sm text-xl w-full bg-hotPink border-none hover:text-white transition-all duration-500 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner text-darkBlue"></span>
              ) : (
                "Login"
              )}
            </button>

            <p className="mb-6 text-hotPink font-semibold text-center text-lightOrange">
              <Link to="/signup">Don't have an account? Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
