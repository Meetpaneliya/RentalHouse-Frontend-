import React, { useState, useRef } from "react";
import { Pencil, Check, Camera } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

const ProfileSection = () => {
  const { user } = useSelector((state) => state.auth);
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [, setUploading] = useState(false);
  const [, setUser] = useState(user);
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
      await axios.put(
        'http://localhost:4000/api/v1/user/update',
        {
          name: formData.name,
          email: formData.email,
        },
        {
          withCredentials: true,
        }
      );
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Profile Picture Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append("profilePicture", file);
  
    try {
      setUploading(true);
      console.log("uploading image error 1")
      const res = await axios.put(
        "http://localhost:4000/api/v1/user/update-image",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Upload Success", res.data);
  
      // ✅ Update user state immediately:
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: res.data.profilePicture, 
      }));
      toast.success("Profile picture updated!");

    } catch (err) {
      console.error("Error uploading profile picture:", err);
      toast.error("Failed to upload picture");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-6 text-white">
        <h3 className="text-xl font-bold">Profile Information</h3>
        <p className="mt-1 text-sm text-blue-100">
          Manage your personal information and account settings
        </p>
      </div>

      {/* Profile Content */}
      <div className="px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left Column - Profile Picture */}
          <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="relative w-24 h-24">
                <img
                  src={user.profilePicture ? 
                          user.profilePicture : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&size=128&background=random`}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover ring-4 ring-white shadow-lg"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </div>
              {(user?.isVerified || user?.kycStatus === "verified") && (
                <div className="absolute bottom-1 right-1 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                  <Check className="w-2 h-2" />
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <div className="text-center">
              <h4 className="font-semibold text-gray-900">{user?.name}</h4>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Right Column - User Details */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    editMode 
                      ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      : 'border-gray-200 bg-gray-50'
                  } transition-colors duration-200`}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    editMode 
                      ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      : 'border-gray-200 bg-gray-50'
                  } transition-colors duration-200`}
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <p className="text-gray-900 capitalize">{user?.role}</p>
            </div>

            {/* Verification Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Status
              </label>
              <div className="flex flex-wrap gap-3">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  user?.isVerified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user?.isVerified ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5" />
                      Verified Account
                    </>
                  ) : 'Pending Verification'}
                </span>
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  user?.kycStatus === "verified"
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user?.kycStatus === "verified" ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5" />
                      KYC Verified
                    </>
                  ) : 'KYC Pending'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200 disabled:opacity-70"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;