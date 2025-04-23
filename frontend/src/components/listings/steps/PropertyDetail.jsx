import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "../../../context/FormContext";
import { DollarSign, Ruler, Building, Home } from "lucide-react";

const PropertyDetailsStep = () => {
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
        <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
        <p className="text-gray-600">
          Tell us more about your property specifications
        </p>
      </div>

      {/* Price Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Price <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <DollarSign size={18} className="text-gray-500" />
          </div>
          <input
            type="number"
            name="price"
            value={formData.price}
            placeholder="0.00"
            className="w-full pl-10 pr-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Size & Floor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Size (sq ft) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Ruler size={18} className="text-gray-500" />
            </div>
            <input
              type="number"
              name="size"
              value={formData.size}
              placeholder="Enter size"
              className="w-full pl-10 pr-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Floor <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Building size={18} className="text-gray-500" />
            </div>
            <input
              type="number"
              name="floor"
              value={formData.floor}
              placeholder="Enter floor number"
              className="w-full pl-10 pr-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Property Type <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Home size={18} className="text-gray-500" />
          </div>
          <select
            name="propertyType"
            value={formData.propertyType || ""}
            className="w-full pl-10 pr-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 appearance-none cursor-pointer"
            onChange={handleChange}
            required
          >
            <option value="" disabled className="text-gray-400">
              Select type
            </option>
            <option value="apartment" className="text-gray-800">
              Apartment
            </option>
            <option value="hotel" className="text-gray-800">
              Hotel
            </option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Property Features Section - Interactive Cards */}
      <div className="space-y-4 mt-8">
        <h3 className="text-lg font-medium text-gray-900">Popular Features</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select the features your property offers
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Parking",
            "Air Conditioning",
            "Heating",
            "Washer",
            "Dryer",
            "Pool",
            "Gym",
            "Elevator",
            "Wifi",
          ].map((feature) => (
            <motion.div
              key={feature}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 cursor-pointer hover:border-indigo-400 transition-all duration-200"
            >
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm">{feature}</span>
              </label>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selected features will be added to your property's amenities list
        </p>
      </div>
    </motion.div>
  );
};

export default PropertyDetailsStep;
