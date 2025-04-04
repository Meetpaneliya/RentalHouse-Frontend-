import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../redux/reducers/Auth";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { userForm } = useSelector((state) => state.auth);

  const handleChange = (index, value) => {
    if (!/\d/.test(value) && value !== "") return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedOtp = e.clipboardData.getData("Text");
    if (/^\d{6}$/.test(pastedOtp)) {
      // Only proceed if the pasted content is exactly 6 digits
      setOtp(pastedOtp.split(""));
      inputRefs.current[5]?.focus(); // Focus on the last field after pasting
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) return toast.error("Please enter all 6 digits.");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/register`,
        {
          email: userForm.email,
          name: userForm.name,
          password: userForm.password,
          role: userForm.role,
          otp: otpValue,
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
        error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage, {
        duration: 3000,
        position: "top-left",
        style: {
          background: "#FF0000",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <div className="bg-gray-300 p-8 rounded-lg shadow-xl max-w-lg w-full text-center text-gray-800">
        <h2 className="text-3xl font-bold mb-6">Verify Your Email</h2>
        <p className="text-gray-800 mb-6 text-lg">
          Enter the OTP sent to your email
        </p>
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
              onPaste={handlePaste}
            />
          ))}
        </div>
      
        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-gray-900 transition duration-300"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
