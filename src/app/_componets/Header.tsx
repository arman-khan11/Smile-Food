"use client";
import { Search, ShoppingCart } from "lucide-react";
import React, { useContext, useState, useRef, useEffect, useCallback } from "react";
import { UserContext } from "../context/User/UserConext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserDetails {
  email: string;
  username: string;
  location: string;
}

const Header: React.FC = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const Email = user?.email || ""; // Fallback to an empty string
  const [btnDisable, setBtnDisable] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: "",
    username: "",
    location: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getUserDetails = useCallback(async () => {
    try {
      const response = await axios.post<{ user: UserDetails | null }>(
        "/api/users/userDetail",
        { Email:Email }
      );
      const data = response.data?.user;

      if (data) {
        setUserDetails({
          email: data.email || "",
          username: data.username || "",
          location: data.location || "",
        });
        
      } else {
        console.warn("User data is undefined or empty.");
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  }, [Email]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const logout = useCallback(async () => {
    setBtnDisable(true)
    try {
      const res = await axios.get<{ message: string }>("/api/users/logout");

      if (res.data.message === "User logout successfully") {
        setBtnDisable(false);
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [router]);

  useEffect(() => {
    if (user) getUserDetails();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user, getUserDetails]);

  return (
    <div className="flex justify-between items-center px-2 py-5 shadow-xl">
      {/* Logo Section */}
      <div className="logo flex">
        <p className="text-red-600 font-extrabold border border-red-600 text-2xl font-sans pl-2">
          Smile-
        </p>
        <p className="bg-red-600 font-extrabold font-sans text-2xl text-white px-2">
          Food
        </p>
      </div>

      {/* Search Input */}
      <div className="w-80 rounded-md py-1 px-2 hidden md:flex bg-gray-200">
        <input
          type="search"
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
        />
        <Search />
      </div>

      {/* Profile Section */}
      <div className="flex gap-2 items-center relative" ref={dropdownRef}>
        {user ? (
          <>
            <Button className="bg-red-600" onClick={toggleDropdown}>
              Details <span className="ml-2">&#x25BC;</span>
            </Button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-32 w-60 bg-white rounded-md shadow-lg overflow-hidden z-10">
                <div className="flex justify-center">
                  <div className="w-56 m-2 p-2 rounded-md border border-gray-500">
                    <p className="font-semibold">{userDetails.username}</p>
                    <p className="text-sm text-gray-600">{userDetails.email}</p>
                    <p className="text-sm text-gray-600">{userDetails.location}</p>
                  </div>
                </div>
                <div className="ml-2 mb-3">
                  <Button>
                    <Link href="/Cart">
                      <ShoppingCart />
                    </Link>
                  </Button>
                </div>
                <Button
                  onClick={logout}
                  className="w-full bg-red-600 rounded-none text-left p-2 hover:bg-gray-100"
                >
                 {btnDisable ? "Wait..." : " Logout"}
                </Button>
              </div>
            )}
          </>
        ) : (
          <Button>Profile</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
