"use client";
import axios from "axios";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "../context/User/UserConext";

const Signup = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  const [btnDisable, setBtnDisable] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>(""); // Added string type for error message
  const [User, setUser] = useState({
    Email: "",
    Username: "",
    Password: "",
    Firstname: "",
    Lastname: "",
    location: "",
  });

  // Ensure userContext exists before destructuring
  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { setuser } = userContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

  const Signup = async () => {
    setBtnDisable(true);
    setErrorMessage(""); // Clear any existing error message

    try {
      const response = await axios.post("/api/users/signup", User);

      if (response.status === 200) {
        router.push("/verifyEmail");
        const userDetail = {
          email: User.Email,
        };
        setuser(userDetail);
        localStorage.setItem("user", JSON.stringify(userDetail));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrorMessage("User already exists. Please use a different email.");
      } else if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "An error occurred during signup."
        );
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }

    setBtnDisable(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg mt-10 shadow-md w-full max-w-md">
        <div className="flex mb-10 w-fit items-center justify-center shadow-xl">
          <p className="text-red-600 font-extrabold border border-red-600 text-2xl font-sans pl-2">
            Smile-
          </p>
          <p className="bg-red-600 font-extrabold font-sans text-2xl text-white px-2">
            Food
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            Signup();
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="example@gmail.com"
              name="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              onChange={handleChange}
              type="text"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              name="Username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              onChange={handleChange}
              type="text"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              name="location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Optional"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              name="Firstname"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Optional"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              name="Lastname"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              name="Password"
              placeholder="********"
            />
          </div>

          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <span className="text-blue-900">
              <Link href="/login">Login</Link>
            </span>
          </p>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          >
              {btnDisable ? "Wait..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
