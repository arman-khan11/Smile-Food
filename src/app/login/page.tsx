"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/User/UserConext";

const Login = () => {
  const router = useRouter();
  const userContext = React.useContext(UserContext);

  const [Disable, setDisable] = useState(false);
  const [User, setUser] = useState({
    Email: "",
    Password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error message

  // Ensure userContext is not null or undefined before accessing it
  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { setuser } = userContext;

  // Handle input change with correct typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const loginHandle = async (e: React.FormEvent) => {
    setDisable(true);
    
    e.preventDefault(); // Prevent the default form behavior

    try {
      const res = await axios.post('/api/users/login', User);

      // Check the response and take action accordingly
      if (res.data.message === "User not exist") {
        setUser({
          Email: "",
          Password: "",
        });
        // Set the error message to inform the user
        setErrorMessage("User not found. Please check your credentials.");
      } else if (res.data.message === "login successful") {
        const userDetail = {
          email: User.Email,
        };
        setErrorMessage("");
        setuser(userDetail);
        setDisable(false)

        router.push("/main");
      }
    } catch (error) {
      if (error instanceof Error) console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex mb-10 w-fit items-center justify-center shadow-xl">
          <p className="text-red-600 font-extrabold border border-red-600 text-2xl font-sans pl-2">Smile-</p>
          <p className="bg-red-600 font-extrabold font-sans text-2xl text-white px-2">Food</p>
        </div>
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {/* Display error message if it exists */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form className="mt-4 space-y-4" onSubmit={loginHandle}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={handleChange}
              type="email"
              value={User.Email} // Bind the input value to the state
              placeholder="Example@gmail.com"
              required
              name="Email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={handleChange}
              type="password"
              value={User.Password} // Bind the input value to the state
              required
              placeholder="....."
              name="Password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <p className="text-gray-400 text-sm">
              Do not have an account? <span className="text-blue-900"><Link href="/signup">Signup</Link></span>
            </p>
          </div>
          <button
            type="submit"  // Submit button type should be submit, and it triggers the form submission.
            className="w-full py-2 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          >
           {Disable ? "Wait..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
