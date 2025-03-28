import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to an API
    // For now, just show a success message
    toast.success("Your message has been sent successfully!");
    
    // Clear form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: ''
    });
  };

  return (
    <div>
    <div className="flex flex-col min-h-screen">
      {/* ✅ Navbar is at the top, not affecting layout */}
      <Navbar2 />

      {/* ✅ Contact Section properly centered */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-8 py-10 w-full">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-900 text-center">Contact</h1>
        <h2 className="text-lg font-semibold text-gray-900 text-center mt-2">
          Why landlords choose <span className="text-black">StaySafe Homes</span>
        </h2>
        <p className="text-gray-600 text-center max-w-lg mx-auto mt-2">
        StaySafe Homes is a national housing brand and operator that specializes in flexible furnished rentals for the new generation of renters.
        </p>

        {/* ✅ Contact Form */}
        <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-indigo-900 text-center">Schedule a call</h3>
          <p className="text-gray-500 text-center text-sm mb-6">Fill this form to learn more about StaySafe</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm">First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-indigo-400 rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-indigo-400 rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-indigo-400 rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm">Phone</label>
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-indigo-400 rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm">City</label>
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-indigo-400 rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-800 text-white py-3 rounded-lg hover:bg-indigo-900 transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </form>
        </div>
      </div>

      
    
      
    </div>
    <div>
        <Footer/>
      </div>
    </div>
    
  );
};

export default ContactUs;
