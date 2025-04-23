import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "../../../context/FormContext";
import { Check, X, Info } from "lucide-react";

const ReviewStep = () => {
  const { formData, images } = useFormContext();

  // Helper to check if a section has all required fields filled
  const isSectionComplete = (section) => {
    switch (section) {
      case "basic":
        return Boolean(formData.title && formData.description);
      case "property":
        return Boolean(
          formData.price && formData.size && formData.propertyType
        );
      case "rooms":
        return Boolean(formData.rooms && formData.beds && formData.bathrooms);
      case "location":
        return Boolean(formData.location && formData.lat && formData.lng);
      case "images":
        return images.length > 0;
      default:
        return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Review Your Listing
        </h2>
        <p className="text-gray-600">Check all details before submitting</p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Summary Card */}
        <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-indigo-900">
              {formData.title || "Untitled Property"}
            </h3>
            <p className="text-sm text-indigo-700 mt-1">
              {formData.location || "Location not provided"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-indigo-600">Price</p>
              <p className="font-semibold text-indigo-900">
                ${formData.price || "0"}
              </p>
            </div>
            <div>
              <p className="text-xs text-indigo-600">Size</p>
              <p className="font-semibold text-indigo-900">
                {formData.size || "0"} sq ft
              </p>
            </div>
            <div>
              <p className="text-xs text-indigo-600">Type</p>
              <p className="font-semibold text-indigo-900">
                {formData.propertyType || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Section Checks */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Listing Completion
          </h3>

          {/* Basic Info */}
          <div
            className={`flex items-center justify-between p-4 rounded-lg ${
              isSectionComplete("basic")
                ? "bg-green-50 border border-green-100"
                : "bg-yellow-50 border border-yellow-100"
            }`}
          >
            <div className="flex items-center">
              {isSectionComplete("basic") ? (
                <Check className="h-5 w-5 text-green-500 mr-3" />
              ) : (
                <Info className="h-5 w-5 text-yellow-500 mr-3" />
              )}
              <span className="font-medium">Basic Information</span>
            </div>
            <span
              className={`text-sm ${
                isSectionComplete("basic")
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {isSectionComplete("basic") ? "Complete" : "Incomplete"}
            </span>
          </div>

          {/* Property Details */}
          <div
            className={`flex items-center justify-between p-4 rounded-lg ${
              isSectionComplete("property")
                ? "bg-green-50 border border-green-100"
                : "bg-yellow-50 border border-yellow-100"
            }`}
          >
            <div className="flex items-center">
              {isSectionComplete("property") ? (
                <Check className="h-5 w-5 text-green-500 mr-3" />
              ) : (
                <Info className="h-5 w-5 text-yellow-500 mr-3" />
              )}
              <span className="font-medium">Property Details</span>
            </div>
            <span
              className={`text-sm ${
                isSectionComplete("property")
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {isSectionComplete("property") ? "Complete" : "Incomplete"}
            </span>
          </div>

          {/* Rooms & Features */}
          <div
            className={`flex items-center justify-between p-4 rounded-lg ${
              isSectionComplete("rooms")
                ? "bg-green-50 border border-green-100"
                : "bg-yellow-50 border border-yellow-100"
            }`}
          >
            <div className="flex items-center">
              {isSectionComplete("rooms") ? (
                <Check className="h-5 w-5 text-green-500 mr-3" />
              ) : (
                <Info className="h-5 w-5 text-yellow-500 mr-3" />
              )}
              <span className="font-medium">Rooms & Features</span>
            </div>
            <span
              className={`text-sm ${
                isSectionComplete("rooms")
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {isSectionComplete("rooms") ? "Complete" : "Incomplete"}
            </span>
          </div>

          {/* Location */}
          <div
            className={`flex items-center justify-between p-4 rounded-lg ${
              isSectionComplete("location")
                ? "bg-green-50 border border-green-100"
                : "bg-yellow-50 border border-yellow-100"
            }`}
          >
            <div className="flex items-center">
              {isSectionComplete("location") ? (
                <Check className="h-5 w-5 text-green-500 mr-3" />
              ) : (
                <Info className="h-5 w-5 text-yellow-500 mr-3" />
              )}
              <span className="font-medium">Location</span>
            </div>
            <span
              className={`text-sm ${
                isSectionComplete("location")
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {isSectionComplete("location") ? "Complete" : "Incomplete"}
            </span>
          </div>

          {/* Images */}
          <div
            className={`flex items-center justify-between p-4 rounded-lg ${
              isSectionComplete("images")
                ? "bg-green-50 border border-green-100"
                : "bg-yellow-50 border border-yellow-100"
            }`}
          >
            <div className="flex items-center">
              {isSectionComplete("images") ? (
                <Check className="h-5 w-5 text-green-500 mr-3" />
              ) : (
                <X className="h-5 w-5 text-yellow-500 mr-3" />
              )}
              <span className="font-medium">Images</span>
            </div>
            <span
              className={`text-sm ${
                isSectionComplete("images")
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {images.length > 0 ? `${images.length} uploaded` : "No images"}
            </span>
          </div>
        </div>

        {/* Cover Image Preview */}
        {images.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Cover Image
            </h3>
            <div className="rounded-xl overflow-hidden border border-gray-200 h-40 md:h-60">
              <img
                src={images[0].url}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Terms Agreement */}
        <div className="mt-6">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">
              I confirm that all the information provided is accurate and I have
              the right to list this property.
            </span>
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewStep;
