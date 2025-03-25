import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice.jsx"; // Adjust the path as needed
import { toast } from "react-toastify";
import { useLogoutuserMutation } from "../redux/APi/api";
import "react-toastify/dist/ReactToastify.css";


const Navbar = ({ setShowLoginModal, setShowSignupModal }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [logoutUser, { isLoading: isloggingOut }] = useLogoutuserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      toast.success("Logout Successfully.")
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out.");
    }
  };


  return (
    <header className="bg-transparent text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold">
        StaySafe
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/filtered-listings" className="hover:text-gray-300">
            Cities
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
          <Link to="/faq" className="block hover:text-gray-300">
            FAQ's
          </Link>
        </nav>

        {/* Right Section: Buttons & Profile */}
        {isAuthenticated ? (
          <div className="relative group p-2">
            <Link to="/user">
                 <User className="p-2 h-10 w-10 shadow-md rounded-full cursor-pointer hover:text-gray-200" />
            </Link>

            {/* Add dropdown menu for desktop */}
            <div className="hidden md:block absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 invisible group-hover:visible">
              <Link to="/user" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                disabled={isloggingOut}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
         </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-gray-500/35 px-4 py-2 rounded-3xl hover:bg-gray-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignupModal(true)}
              className="bg-blue-900 px-4 py-2 rounded-3xl hover:bg-blue-800 transition"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-transparent/40 text-white px-6 py-4 space-y-2">
          <Link to="/about" className="block hover:text-gray-400">
            About
          </Link>
          <Link to="/filtered-listings" className="block hover:text-gray-400">
            Cities
          </Link>
          <Link to="/contact" className="block hover:text-gray-400">
            Contact
          </Link>
          <Link to="/faq" className="block hover:text-gray-400">
            FAQ's
          </Link>

          {!isAuthenticated ? (
            <div className="flex flex-col space-y-2 mt-6">
              <button
                onClick={() => setShowLoginModal(true)}
                className="block w-full text-left  rounded hover:text-gray-300/30 transition"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="block w-full text-left rounded hover:text-gray-300/30 transition"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              disabled={isloggingOut}
              className="block w-full text-left rounded hover:text-gray-300/30 transition"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
