import React, { useState, useRef } from "react";
import { Pencil, Upload, Check } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProfileSection = ({ onUpdateProfile, onUpdateImage }) => {
  const { user } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await onUpdateProfile(formData);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await onUpdateImage(file);
      toast.success("Profile picture updated successfully!");
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      toast.error("Failed to upload picture");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Profile Information
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Update your account details and profile picture.
        </p>
      </div>

      {/* Content */}
      <div className="px-8 py-6 flex flex-col md:flex-row gap-10">
        {/* Profile Picture */}
        <div className="flex flex-col items-center justify-between md:items-start w-full md:w-1/3">
          <div className="relative w-32 h-32">
            <img
              src={
                user?.profilePicture ||
                `https://ui-avatars.com/api/?name=${user?.name}&background=random`
              }
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
            />

            {(user?.isVerified || user?.kycStatus === "verified") && (
              <div className="absolute -bottom-2 -right-2 mb-1 mr-4 bg-green-500 text-white p-1 rounded-full shadow-md">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>

          <button
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-1 rounded text-sm transition-all duration-200 shadow"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="w-5 h-5" />
            {uploading ? "Uploading..." : "Change Picture"}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {/* User Details */}
        <div className="flex-1 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1 text-gray-900">{user?.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border overflow-ellipsis border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ) : (
              <p className="mt-1 text-gray-900">{user?.email}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <p className="mt-1 text-gray-900 capitalize">{user?.role}</p>
          </div>

          {/* Verification */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Verification Status
            </label>
            <div className="mt-1 flex gap-2 flex-wrap">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user?.isVerified
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user?.isVerified ? <Check className="h-4 w-4 mr-1" /> : null}
                {user?.isVerified ? "Account Verified" : "Not Verified"}
              </span>

              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user?.kycStatus === "verified"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user?.kycStatus === "verified" ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : null}
                {user?.kycStatus === "verified"
                  ? "KYC Verified"
                  : "KYC Not Verified"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4">
            {editMode ? (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 rounded-md shadow-sm transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition"
              >
                <Pencil className="h-4 w-4 mr-2" /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
