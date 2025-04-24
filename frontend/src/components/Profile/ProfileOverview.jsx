import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileSection from "./ProfileSection";
import RecentListings from "./RecentListings";
import StatisticsSection from "./StatisticsSection";
import RecentBookings from "./RecentBookings";
import { useMyprofileQuery } from "../../redux/APi/api";
const ProfileOverview = () => {
  const { user } = useSelector((state) => state.auth);
  const isLandlord = user?.role === "landlord";

  const handleUpdateProfile = async ({ name, email }) => {
    try {
      await axios.put("/api/v1/user/update", name, email);
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating profile:", error);
      return Promise.reject(
        error?.response?.data?.message || "Failed to update profile"
      );
    }
  };

  const handleUpdateImage = async (file) => {
    const imageFormData = new FormData();
    imageFormData.append("profilePicture", file);

    try {
      await axios.put("/api/v1/user/update-image", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating profile picture:", error);
      return Promise.reject(
        error?.response?.data?.message || "Failed to update profile picture"
      );
    }
  };

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
          {isLandlord ? <RecentListings /> : <RecentBookings />}
        </div>
      </div>
    </>
  );
};

export default ProfileOverview;
