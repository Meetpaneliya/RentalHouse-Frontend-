import React, { useState, useEffect, useRef } from 'react';
import axios from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { Pencil, Upload } from 'lucide-react';
import Navbar from '../components/Navbar2';
import Footer from "../components/Footer";

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
      alert('Profile updated successfully!');
      // Redirect to same page to refresh
      navigate(0);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update profile');
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
  
      alert("Profile picture updated!");
      navigate(0);
  
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      alert("Failed to upload picture");
    } finally {
      setUploading(false);
    }
  };
  
  

  if (!user) return <div className="text-center p-8">Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg flex overflow-hidden w-[700px] relative">
        {/* Verified Badge */}
        <div className="absolute top-4 right-4">
          {user.isVerified ? (
            <span className="bg-green-500 text-white px-3 py-2 rounded-full text-sm">Verified </span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-2 rounded-full text-sm">Not Verified </span>
          )}
        </div>

        {/* Left - Avatar */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-400 to-pink-400 flex flex-col justify-center items-center p-6 w-1/3 text-white relative">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : `https://ui-avatars.com/api/?name=${user.name}&background=random`
            }
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white"
          />
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="capitalize mt-1">{user.role}</p>

          {/* Edit Icon */}
          <div className="mt-3">
            <button
              className="flex items-center bg-white text-pink-500 px-2 py-2 rounded-full text-xs"
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
        <div className="p-6 flex-1 relative">
          <h2 className="text-2xl text-blue-600 font-semibold mb-4">User Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              ) : (
                <p>{user.name}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Role</label>
              <p className="capitalize">{user.role}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded mr-3"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
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
