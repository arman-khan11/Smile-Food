"use client";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/User/UserConext";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";

interface UserDetails {
  Email: string;
  Username: string;
  location: string;
}

const DeliveryPage: React.FC = () => {
  const router = useRouter();
  const { user } = useContext(UserContext) || {};
  const email = user?.email;

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && email && !userDetails) {
      const getUserDetails = async () => {
        try {
          setLoading(true);
          const response = await axios.post("/api/users/userDetail", { Email: email });
          const data = response.data.user;
          setUserDetails({
            Email: data.email,
            Username: data.username,
            location: data.location,
          });
          setError(null);
        } catch (error) {
          if (error instanceof Error) {
            setError("Error fetching user details.");
            console.error("Error fetching user details:", error.message);
          }
        } finally {
          setLoading(false);
        }
      };

      getUserDetails();
    }
  }, [user, email, userDetails]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/main");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-8">
      <motion.p
        className="text-lg md:text-2xl font-bold text-red-600 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Delivery on the way! You will be redirected in 5 seconds.
      </motion.p>

      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md flex flex-col items-center space-y-4 relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <Image src="/Delivery Boy.gif" alt="Delivery in progress" height={150} width={150} />
        </div>

        {loading ? (
          <p className="text-gray-500">Loading user details...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          userDetails && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner w-full text-center border border-red-600 space-y-2">
              <h2 className="text-xl font-semibold text-red-600">User Details</h2>
              <p className="text-gray-700">
                <strong>Email:</strong> {userDetails.Email}
              </p>
              <p className="text-gray-700">
                <strong>Username:</strong> {userDetails.Username}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {userDetails.location}
              </p>
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default DeliveryPage;
