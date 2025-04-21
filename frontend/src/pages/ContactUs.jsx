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

  const [errors, setErrors] = useState({
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
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
    } else {
      toast.error("Please fill all required fields correctly");
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar2 />

         {/* whatsapp chat feature
         <div>
          <a href="https://api.whatsapp.com/send?phone=919999999999&text=Hello%20I%20need%20help" target="_blank" rel="noopener noreferrer">
            <img
              src="/assets/whatsapp.png"
              alt="WhatsApp Chat"
              className="fixed bottom-4 right-4 w-16 h-16 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
            />
          </a>
        </div> */}

        <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-8 py-10 w-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-900 text-center">Contact</h1>
          <h2 className="text-lg font-semibold text-gray-900 text-center mt-2">
            Why landlords choose <span className="text-black">Cozzi Roam Homes</span>
          </h2>
          <p className="text-gray-600 text-center max-w-lg mx-auto mt-2">
            Cozzi Roam Homes is a national housing brand and operator that specializes in flexible furnished rentals for the new generation of renters.
          </p>

          <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-indigo-900 text-center">Schedule a call</h3>
            <p className="text-gray-500 text-center text-sm mb-6">Fill this form to learn more about Cozzi Roam</p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 text-sm">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-indigo-400'} rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                  required
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-indigo-400'} rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                  required
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-indigo-400'} rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                  className={`w-full border ${errors.phone ? 'border-red-500' : 'border-indigo-400'} rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                  required
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-gray-700 text-sm">City</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full border ${errors.city ? 'border-red-500' : 'border-indigo-400'} rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                  required
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
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
