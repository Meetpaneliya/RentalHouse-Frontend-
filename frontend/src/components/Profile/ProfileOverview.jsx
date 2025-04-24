import React from "react";
import { useSelector } from "react-redux";
import ProfileSection from "./ProfileSection";
import RecentListings from "./RecentListings";
import StatisticsSection from "./StatisticsSection";


const ProfileOverview = () => {
  const { user } = useSelector((state) => state.auth);
  const isLandlord = user?.role === "landlord";

  return (
    <>
      {/* User Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.name?.split(" ")[0]}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your{" "}
          {isLandlord ? "properties" : "account"} today.
        </p>
      </div>
      <StatisticsSection />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <ProfileSection />
        </div>

        {/* Listings Section */}
        <div className="lg:col-span-2">
          {isLandlord ? (
            <RecentListings />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Account Summary
              </h3>
              <p className="text-gray-600 mb-3">
                You are currently logged in as a tenant. Explore available
                properties and manage your applications.
              </p>
              <div className="flex space-x-3 mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                  Browse Properties
                </button>
                <button className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-4 py-2 rounded-md transition-colors">
                  View Applications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileOverview;
