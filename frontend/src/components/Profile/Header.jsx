import React from "react";
import { Bell, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

const Header = ({ isOpen, toggleSidebar, title }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <h1 className="ml-4 md:ml-0 text-xl font-semibold text-gray-800">
            {title}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <img
              src={
                user?.profilePicture ||
                `https://ui-avatars.com/api/?name=${user?.name}&background=random`
              }
              alt="Avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
