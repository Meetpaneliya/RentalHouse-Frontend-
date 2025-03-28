import React, { useState } from "react";
import { useForgetpasswordMutation } from "../../redux/APi/api";
import { useAsyncMutation } from "../../hooks/useError";
import Navbar from "../Navbar2";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [state, setState] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [ForgetPasswordLink, isForgetPasswordLoading] = useAsyncMutation(
    useForgetpasswordMutation
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!state.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      await ForgetPasswordLink("Password reset link sent to your email", {
        email: state.email,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div 
          className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaEnvelope className="text-blue-600 text-2xl" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-600">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isForgetPasswordLoading}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 ${
                  isForgetPasswordLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                }`}
              >
                {isForgetPasswordLoading ? "Sending Link..." : "Send Reset Link"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <FaArrowLeft className="mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
