import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../redux/reducers/Auth";
import ClipLoader from "react-spinners/ClipLoader";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { userForm } = useSelector((state) => state.auth);

  const handleChange = (index, value) => {
    if (!/\d/.test(value) && value !== "") return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedOtp = e.clipboardData.getData("Text");
    if (/^\d{4}$/.test(pastedOtp)) {
      // Only proceed if the pasted content is exactly 4 digits
      setOtp(pastedOtp.split(""));
      inputRefs.current[3]?.focus(); // Focus on the last field after pasting
    }
  };

  const handleVerify = async () => {

    setIsLoading(true);
    const otpValue = otp.join("");
    if (otpValue.length < 4) return toast.error("Please enter all 4 digits.");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/register`,
        {
          email: userForm.email,
          name: userForm.name,
          password: userForm.password,
          role: userForm.role,
          otp: otpValue.toString(),
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.success) {
        dispatch(login(data.user));
        toast.success("OTP Verified Successfully!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      const errorMessage =
      error?.response?.data?.message || "otp verification failed";
      toast.error(errorMessage, {
        duration: 3000,
        position: "top-left",
        style: {
          background: "#FF0000",
          color: "#fff",
        },
      });
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-2 text-slate-300">🔐 OTP Verification</h2>
        <p className="text-gray-400 mb-6 text-base">
          We’ve sent a 4-digit verification code to your email.
        </p>
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onPaste={handlePaste}
            />
          ))}
        </div>
  
        {/* <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-800 transition duration-300 font-semibold shadow-lg"
        >
          Verify OTP
        </button> */}
        <button
              disabled={isLoading}
              onClick={handleVerify}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-800 transition duration-300 font-semibold shadow-lg ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <ClipLoader
                    color="#ffffff"
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className="mr-2"
                  />
                  OTP Verified...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
      </div>
    </div>
  );
  
  
};

export default OTPVerification;
