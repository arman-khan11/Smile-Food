"use client";
import React, { useRef, useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { useRouter } from 'next/navigation';

const OTPInput: React.FC = () => {
  
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(4).fill('')); // For 4-digit OTP
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]); // To hold refs of each input

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    // Allow only numeric input
    if (!/^\d*$/.test(value)) {
      return; // Do nothing if the value is not a number
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if the current one is filled
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace to move focus to the previous input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join(''); // Combine OTP digits into a string


    try {
      // Save the token to the database
      const response = await axios.post('/api/users/verifyEmail', { token: otpString });
      if (response.data.message === "User not found") {
        e.preventDefault();
        router.push('/verifyEmail');
      }
      if (response.data.message === "Email verified successfully") {
        router.push("/login")
      }
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex mb-10 w-fit items-center justify-center shadow-xl">
          <p className="text-red-600 font-extrabold border border-red-600 text-2xl font-sans pl-2">Smile-</p>
          <p className="bg-red-600 font-extrabold font-sans text-2xl text-white px-2">Food</p>
        </div>
        <h2 className="text-2xl font-semibold text-center">Verify Email</h2>
        <br />
        <form className="flex justify-center items-center" onSubmit={handleSubmit}>
          {otp.map((digit, index) => (
            <div key={`otp-input-${index}`} className="">
              <input
                className="mt-1 block p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                ref={(el) => {
                  if (el) {
                    inputsRef.current[index] = el; // Safe assignment if `el` is defined
                  }
                }}
                type="text"
                maxLength={1} // Only allow one character per input
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputMode="numeric" // Mobile keyboard shows numbers
                pattern="[0-9]*" // Enforce numeric input on some browsers
                style={{ width: '40px', textAlign: 'center', marginRight: '5px' }}
              />
            </div>
          ))}
        </form>
        <button
          onClick={handleSubmit}
          className="w-full py-2 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          type="submit"
        >
          Submit OTP
        </button>
      </div>
    </div>
  );
};

export default OTPInput;
