import React from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Building,
  PlusSquare,
  Bell,
  MessageCircle,
  ArrowLeft
} from "lucide-react";
import { useSelector } from "react-redux";

const SIDEBAR_ITEMS = [
  { key: "profile", label: "Profile", icon: User, path: "/user", role: "all" },
  { key: "listings", label: "My Listings", icon: Building, path: "/user/listings", role: "landlord" },
  { key: "create-listing", label: "Create Listing", icon: PlusSquare, path: "/user/create-listing", role: "landlord" },
  { key: "notifications", label: "Notifications", icon: Bell, path: "/user/notifications", role: "all" },
  { key: "chat", label: "Chat", icon: MessageCircle, path: "/user/chat", role: "all" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={`fixed md:relative top-0 left-0 h-full bg-white shadow-md z-50 md:z-40 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
        w-60`}
    >
      {/* Profile Section */}
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <img
          src={
            user?.profilePicture ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random`
          }
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="transition-all">
          <h2 className="text-sm font-medium truncate">{user?.name}</h2>
          <p className="text-xs text-gray-500 capitalize truncate">{user?.role}</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col mt-4 space-y-1 px-2">
        {SIDEBAR_ITEMS.map((item) => {
          if (item.role !== "all" && item.role !== user?.role) return null;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.key}
              to={item.path}
              onClick={() => window.innerWidth < 768 && toggleSidebar()}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <Icon className="h-5 w-5 min-w-[20px]" />
              <span className="ml-3">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Back Button */}
      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="ml-3">Back to Home</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;