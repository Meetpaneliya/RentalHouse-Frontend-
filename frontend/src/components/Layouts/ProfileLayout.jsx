import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Profile/Header";
import Sidebar from "../Profile/Sidebar";
import CreateListingButton from "../Profile/CreateListingButton";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <Header
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          title="Dashboard"
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet /> {/* This will render nested routes */}
        </main>
      </div>

      <CreateListingButton />
    </div>
  );
};

export default DashboardLayout;