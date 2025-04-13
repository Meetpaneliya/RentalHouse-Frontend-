import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice.jsx"; // Adjust the path as needed
import toast from "react-hot-toast";
import { useLogoutuserMutation } from "../redux/APi/api";

const Navbar = ({ setShowLoginModal, setShowSignupModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [logoutUser, { isLoading: isloggingOut }] = useLogoutuserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      toast.success("Logout Successfully.", {
        duration: 3000,
        position: "top-left",
        style: {
          background: '#4CAF50',
          color: '#fff',
        },
      });
      // Add a small delay before navigation
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out.", {
        duration: 3000,
        position: "top-left",
        style: {
          background: '#4CAF50',
          color: '#fff',
        },
      });
    }
  };

  // Helper function to get user initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-transparent text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold">
          Cozzi Roam
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
          <div className="relative group p-2 hidden md:block">
            <User className="p-2 h-10 w-10 shadow-md rounded-full cursor-pointer hover:text-gray-200" />

            {/* Add dropdown menu for desktop */}
            <div className="hidden md:block absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 text-gray-700 invisible group-hover:visible border border-gray-100 z-50">
              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {getInitials(user?.name)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {user?.name || "Guest User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || "No email provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Menu Items */}
              <div className="py-1">
                <Link
                  to="/user"
                  className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <i className="fas fa-user-circle w-5 text-gray-400"></i>
                  <span className="ml-3">My Profile</span>
                </Link>
              </div>

              {/* Help Center Section */}
              <div className="py-1 border-t border-gray-100">
                <Link
                  to="/contact"
                  className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <i className="fas fa-question-circle w-5 text-gray-400"></i>
                  <span className="ml-3">Help Center</span>
                </Link>
              </div>

              {/* Logout Section */}
              <div className="py-1 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  disabled={isloggingOut}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
                >
                  <i className="fas fa-sign-out-alt w-5"></i>
                  <span className="ml-3">
                    {isloggingOut ? "Logging out..." : "Logout"}
                  </span>
                </button>
              </div>
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
          <Link to="/user" className="block hover:text-gray-400">
            My Profile
          </Link>
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
            <div className="mt-6">
              <button
                onClick={handleLogout}
                disabled={isloggingOut}
                className="block w-full text-left rounded hover:text-gray-300/30 transition"
              >
                {isloggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
