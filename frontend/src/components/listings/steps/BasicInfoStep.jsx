import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "../../../context/FormContext";

const MAX_DESCRIPTION_LENGTH = 150;

const BasicInfoStep = () => {
  const {
    formData,
    updateFormData,
    showFullDescription,
    setShowFullDescription,
  } = useFormContext();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const numberTypes = ["number"];
    const finalValue = numberTypes.includes(type)
      ? parseFloat(value) || ""
      : value;

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
        <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
        <p className="text-gray-600">
          Let's start with the essentials about your property
        </p>
      </div>

      {/* Title Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Property Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Enter a descriptive title"
          className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
          onChange={handleChange}
          required
        />
      </div>

      {/* Description Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            name="description"
            value={formData.description}
            placeholder="Describe your property in detail..."
            rows={4}
            className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400 resize-none"
            onChange={handleChange}
            required
          ></textarea>
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            {formData.description.length}/{MAX_DESCRIPTION_LENGTH} characters
          </div>
        </div>

        {formData.description && (
          <div className="mt-2 text-sm text-gray-600">
            Preview:
            <div className="mt-1 p-3 bg-gray-50 rounded-lg">
              {formData.description.length > MAX_DESCRIPTION_LENGTH ? (
                <>
                  <p className="text-gray-700">
                    {showFullDescription
                      ? formData.description
                      : `${formData.description.slice(
                          0,
                          MAX_DESCRIPTION_LENGTH
                        )}...`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1"
                  >
                    {showFullDescription ? "Show less" : "Show more"}
                  </button>
                </>
              ) : (
                <p className="text-gray-700">{formData.description}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Availability Select */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Availability <span className="text-red-500">*</span>
        </label>
        <select
          name="availability"
          value={formData.availability || ""}
          className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 appearance-none cursor-pointer"
          onChange={handleChange}
          required
        >
          <option value="" disabled className="text-gray-400">
            Select availability
          </option>
          <option value="Available" className="text-gray-800">
            Available
          </option>
          <option value="Unavailable" className="text-gray-800">
            Unavailable
          </option>
        </select>
      </div>

      {/* Helpful tips */}
      <div className="mt-8 bg-blue-50 rounded-xl p-4 border border-blue-100">
        <h3 className="font-medium text-blue-800 mb-2">
          Tips for a great listing:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
          <li>Be descriptive and highlight unique features</li>
          <li>Mention nearby attractions or amenities</li>
          <li>Be honest about the condition and any limitations</li>
          <li>Use proper spelling and grammar</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default BasicInfoStep;
