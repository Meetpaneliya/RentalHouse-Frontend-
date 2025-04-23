import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "../../../context/FormContext";
import { Bed, Bath, DoorOpen, MoreHorizontal } from "lucide-react";

const RoomsFeaturesStep = () => {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === "number" ? parseFloat(value) || 1 : value;

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
        <h2 className="text-2xl font-bold text-gray-900">Rooms & Features</h2>
        <p className="text-gray-600">
          Tell us about the rooms and amenities your property offers
        </p>
      </div>

      {/* Room Counter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rooms Counter */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-indigo-800 flex items-center">
              <DoorOpen size={18} className="mr-2" /> Rooms
            </label>
            <span className="text-xs bg-indigo-100 text-indigo-800 py-1 px-2 rounded-md">
              Required
            </span>
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                updateFormData({ rooms: Math.max(1, formData.rooms - 1) })
              }
              className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center border border-indigo-200 shadow-sm"
            >
              -
            </motion.button>

            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              min="1"
              className="w-16 text-center py-2 bg-white border-0 text-xl font-semibold text-indigo-800 focus:outline-none focus:ring-0"
            />

            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => updateFormData({ rooms: formData.rooms + 1 })}
              className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm"
            >
              +
            </motion.button>
          </div>
        </div>

        {/* Beds Counter */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-blue-800 flex items-center">
              <Bed size={18} className="mr-2" /> Beds
            </label>
            <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-md">
              Required
            </span>
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                updateFormData({ beds: Math.max(1, formData.beds - 1) })
              }
              className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center border border-blue-200 shadow-sm"
            >
              -
            </motion.button>

            <input
              type="number"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              min="1"
              className="w-16 text-center py-2 bg-white border-0 text-xl font-semibold text-blue-800 focus:outline-none focus:ring-0"
            />

            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => updateFormData({ beds: formData.beds + 1 })}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm"
            >
              +
            </motion.button>
          </div>
        </div>

        {/* Bathrooms Counter */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-purple-800 flex items-center">
              <Bath size={18} className="mr-2" /> Bathrooms
            </label>
            <span className="text-xs bg-purple-100 text-purple-800 py-1 px-2 rounded-md">
              Required
            </span>
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                updateFormData({
                  bathrooms: Math.max(1, formData.bathrooms - 1),
                })
              }
              className="w-10 h-10 rounded-full bg-white text-purple-600 flex items-center justify-center border border-purple-200 shadow-sm"
            >
              -
            </motion.button>

            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="1"
              className="w-16 text-center py-2 bg-white border-0 text-xl font-semibold text-purple-800 focus:outline-none focus:ring-0"
            />

            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                updateFormData({ bathrooms: formData.bathrooms + 1 })
              }
              className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-sm"
            >
              +
            </motion.button>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-2 mt-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <MoreHorizontal size={18} className="mr-2" /> Amenities
          </label>
          <span className="text-xs text-gray-500">Comma separated</span>
        </div>
        <textarea
          name="amenities"
          value={formData.amenities}
          placeholder="e.g., Wifi, Air conditioning, Parking, Balcony, Pet friendly"
          rows={3}
          className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400 resize-none"
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Preview Box */}
      {formData.amenities && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
          <div className="flex flex-wrap gap-2">
            {formData.amenities
              .split(",")
              .filter((item) => item.trim())
              .map((amenity, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {amenity.trim()}
                </motion.span>
              ))}
          </div>
        </div>
      )}

      {/* Helpful tip */}
      <div className="mt-6 bg-yellow-50 rounded-xl p-4 border border-yellow-100">
        <h3 className="font-medium text-yellow-800 mb-2">Pro tip:</h3>
        <p className="text-sm text-yellow-700">
          Be specific about amenities to attract the right guests. For example,
          instead of just "WiFi", specify "High-speed WiFi (100 Mbps)" if
          applicable.
        </p>
      </div>
    </motion.div>
  );
};

export default RoomsFeaturesStep;
