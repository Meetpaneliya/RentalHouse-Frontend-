import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  User,
  Building,
  PlusSquare,
  Bell,
  MessageCircle,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { useSelector } from "react-redux";

const SIDEBAR_ITEMS = [
  {
    key: "profile",
    label: "Profile",
    icon: <User className="mr-3 h-5 w-5" />,
    path: "/user",
    role: "all", // Visible to all roles
  },
  {
    key: "listings",
    label: "My Listings",
    icon: <Building className="mr-3 h-5 w-5" />,
    path: "/user/listings",
    role: "landlord",
  },
  {
    key: "create-listing",
    label: "Create Listing",
    icon: <PlusSquare className="mr-3 h-5 w-5" />,
    path: "/user/create-listing",
    role: "landlord",
  },
  {
    key: "bookings",
    label: "My Bookings",
    icon: <Building className="mr-3 h-5 w-5" />,
    path: "/user/bookings",
    role: "tenant",
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: <Bell className="mr-3 h-5 w-5" />,
    path: "/user/notifications",
    role: "all",
  },
  {
    key: "chat",
    label: "Chat",
    icon: <MessageCircle className="mr-3 h-5 w-5" />,
    path: "/user/chat",
    role: "all",
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-xl z-30 transition-all duration-300 ease-in-out 
      ${isOpen ? "w-64" : "w-20"} md:w-64 flex flex-col`}
    >
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        {(isOpen || window.innerWidth >= 768) && (
          <span className="ml-2 text-sm font-medium">Go Back</span>
        )}
      </button>

      {/* Profile section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={
              user?.profilePicture ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name || "User"
              )}&background=random`
            }
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          {(isOpen || window.innerWidth >= 768) && (
            <div>
              <h2 className="text-sm font-medium truncate">{user?.name}</h2>
              <p className="text-xs text-gray-500 capitalize truncate">
                {user?.role}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Menu items */}
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            // Skip items not available for user's role
            if (item.role !== "all" && item.role !== user?.role) return null;

            return (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center w-full text-left px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                {item.icon}
                {(isOpen || window.innerWidth >= 768) && (
                  <span>{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
