import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/\d/.test(value) && value !== "") return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 4) return toast.error("Please enter all 4 digits.");

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("OTP Verified Successfully!");
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("OTP verification failed. Try again later.");  
      console.error("OTP verification failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <div className="bg-gray-400 p-8 rounded-lg shadow-xl max-w-md w-full text-center text-gray-800">
        <h2 className="text-3xl font-bold mb-6 ">Verify Your Email</h2>
        <p className="text-gray-800 mb-6 text-lg">Enter the OTP sent to your email</p>
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              className="w-16 h-16 text-center border border-gray-600 bg-slate-200 rounded-lg text-2xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg hover:bg-gray-900 transition duration-300"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;