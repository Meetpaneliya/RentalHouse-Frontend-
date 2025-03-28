import React, { useState, useEffect, useRef } from 'react';
import axios from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { Pencil, Upload } from 'lucide-react';
import Navbar from '../components/Navbar2';
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    isVerified: false,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/v1/user/me');
        const userData = response.data.user;
        setUser(userData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          role: userData.role || '',
          isVerified: userData.isVerified,
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error("Failed to load user data");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put('/api/v1/user/update', {
        name: formData.name,
        email: formData.email,
      });
      toast.success('Profile updated successfully!');
      // Redirect to same page to refresh
      navigate(0);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(error?.response?.data?.message || 'Failed to update profile');
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
      const res = await axios.put('/api/v1/user/update-image', imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log("Upload Success", res.data);
  
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: res.data.profilePicture,
      }));
  
      toast.success("Profile picture updated successfully!");
      navigate(0);
  
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      toast.error(err?.response?.data?.message || "Failed to upload picture");
    } finally {
      setUploading(false);
    }
  };
  
  

  if (!user) return <div className="text-center p-8">Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      
      {/* Main Content */}
      <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-lg flex flex-col md:flex-row overflow-hidden w-full max-w-[700px] relative border border-gray-100">
        {/* Verified Badge */}
        <div className="absolute top-4 right-4 z-10">
          {user.isVerified ? (
            <span className="bg-green-500 text-white px-3 py-2 rounded-full text-sm shadow-md">Verified </span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-2 rounded-full text-sm shadow-md">Not Verified </span>
          )}
        </div>

        {/* Left - Avatar */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 flex flex-col justify-center items-center p-6 w-full md:w-1/3 text-white relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10"></div>
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : `https://ui-avatars.com/api/?name=${user.name}&background=random`
            }
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-lg relative z-10"
          />
          <h2 className="text-xl font-semibold text-center relative z-10">{user.name}</h2>
          <p className="capitalize mt-1 text-center relative z-10">{user.role}</p>

          {/* Edit Icon */}
          <div className="mt-3 relative z-10">
            <button
              className="flex items-center bg-white/90 hover:bg-white text-pink-500 px-3 py-2 rounded-full text-xs transition-all duration-200 shadow-md"
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-1" />
              {uploading ? 'Uploading...' : 'Change Picture'}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>

        {/* Right - User Info */}
        <div className="p-6 flex-1 relative w-full md:w-2/3 bg-white">
          <h2 className="text-2xl text-blue-600 font-semibold mb-4">User Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
              ) : (
                <p className="break-words text-gray-800">{user.name}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
              ) : (
                <p className="break-words text-gray-800">{user.email}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Role</label>
              <p className="capitalize break-words text-gray-800">{user.role}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-all duration-200 shadow-md"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition-all duration-200 shadow-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center transition-all duration-200 shadow-md"
              >
                <Pencil className="w-4 h-4 mr-1" /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Profile;
