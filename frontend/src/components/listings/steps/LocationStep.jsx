import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "../../../context/FormContext";
import { MapPin, Navigation } from "lucide-react";

const LocationStep = () => {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === "number" ? parseFloat(value) || "" : value;

    updateFormData({ [name]: finalValue });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Location</h2>
        <p className="text-gray-600">Help guests find your property</p>
      </div>

      {/* Location Address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center">
          <MapPin size={18} className="mr-2" /> Address{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="location"
            value={formData.location}
            placeholder="Enter the full address"
            className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
            onChange={handleChange}
            required
          />
        </div>
        <p className="text-xs text-gray-500">
          This address will be shared with confirmed guests
        </p>
      </div>

      {/* Map Box (placeholder) */}
      <div className="my-6 bg-gray-200 rounded-xl h-48 flex items-center justify-center text-gray-500 border-2 border-gray-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-50 bg-white flex items-center justify-center">
          <MapPin size={32} className="text-gray-400" />
          <span className="ml-2">Map Preview</span>
        </div>
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <Navigation size={18} className="mr-2" /> Latitude{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="lat"
            value={formData.lat}
            placeholder="e.g., 34.0522"
            step="any"
            className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <Navigation size={18} className="mr-2" /> Longitude{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="lng"
            value={formData.lng}
            placeholder="e.g., -118.2437"
            step="any"
            className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Find Coordinates Helper */}
      <div className="mt-4 bg-indigo-50 rounded-xl p-4 border border-indigo-100">
        <h3 className="font-medium text-indigo-800 mb-2">
          Need help finding coordinates?
        </h3>
        <p className="text-sm text-indigo-700 mb-3">
          You can easily find the exact coordinates of your property using
          Google Maps:
        </p>
        <ol className="text-sm text-indigo-700 list-decimal pl-5 space-y-1">
          <li>Go to Google Maps</li>
          <li>Right-click on your property's location</li>
          <li>Select "What's here?"</li>
          <li>The coordinates will appear at the bottom of the screen</li>
        </ol>
        <motion.a
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Open Google Maps
          <svg
            className="ml-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default LocationStep;
