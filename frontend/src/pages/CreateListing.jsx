import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ListingForm = () => {
  const navigate = useNavigate();
  const MAX_DESCRIPTION_LENGTH = 150;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    size: "",
    floor: "",
    location: "",
    propertyType: "",
    amenities: "",
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    lat: "",
    lng: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Convert number inputs properly
    const finalValue = type === "number" ? parseFloat(value) || "" : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleImageChange = (e) => {
    const fileArray = Array.from(e.target.files);
    const imagePreviews = fileArray.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setImages(imagePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      images.forEach((image) => {
        submitData.append("images", image.file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/listings/create`,
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Listing created successfully!", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#f44336",
            color: "#fff",
          },
        });
        // Clear form data
        setFormData({
          title: "",
          description: "",
          price: "",
          size: "",
          floor: "",
          location: "",
          propertyType: "",
          amenities: "",
          rooms: 1,
          beds: 1,
          bathrooms: 1,
          lat: "",
          lng: "",
        });
        setImages([]);
        // Navigate to listings page or dashboard
        navigate("/filtered-listings");
      } else {
        toast.error(response.data.message || "Failed to create listing", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#f44336",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.error(
        "Error creating listing:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Failed to create listing. Please try again.",
        {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#f44336",
            color: "#fff",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto relative">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-3">
              Add Your Rooms 🏠
            </h2>
            <p className="text-gray-600 text-lg">
              Fill in the details to create your listing
            </p>
          </div>

          {/* Form Start */}
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-8"
          >
            {/* Title Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Property Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter a descriptive title"
                className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                onChange={handleChange}
                required
              />
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  placeholder="Describe your property in detail..."
                  rows="4"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400 resize-none"
                  onChange={handleChange}
                  required
                ></textarea>
                {formData.description.length > MAX_DESCRIPTION_LENGTH && (
                  <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                    {formData.description.length}/{MAX_DESCRIPTION_LENGTH}{" "}
                    characters
                  </div>
                )}
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
                          onClick={() =>
                            setShowFullDescription(!showFullDescription)
                          }
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

            {/* Price & Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    className="w-full pl-8 pr-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter property location"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Size & Floor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Size (sq ft)
                </label>
                <input
                  type="number"
                  name="size"
                  placeholder="Enter size"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Floor
                </label>
                <input
                  type="number"
                  name="floor"
                  placeholder="Enter floor number"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Property Type & Amenities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 appearance-none cursor-pointer"
                  onChange={handleChange}
                  value={formData.propertyType || ""}
                  required
                >
                  <option value="" disabled className="text-gray-400">
                    Select type
                  </option>
                  <option value="apartment" className="text-gray-800">
                    apartment
                  </option>
                  <option value="hotel" className="text-gray-800">
                    hotel
                  </option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Amenities
                </label>
                <input
                  type="text"
                  name="amenities"
                  placeholder="Enter amenities (comma separated)"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Rooms, Beds, Bathrooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Rooms
                </label>
                <input
                  type="number"
                  name="rooms"
                  placeholder="Number of rooms"
                  min="1"
                  defaultValue="1"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Beds
                </label>
                <input
                  type="number"
                  name="beds"
                  placeholder="Number of beds"
                  min="1"
                  defaultValue="1"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  placeholder="Number of bathrooms"
                  min="1"
                  defaultValue="1"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Coordinates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <input
                  type="number"
                  name="lat"
                  placeholder="Enter latitude"
                  step="any"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <input
                  type="number"
                  name="lng"
                  placeholder="Enter longitude"
                  step="any"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Availability Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <select
                name="availability"
                className="w-full px-6 py-4 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-gray-800 appearance-none cursor-pointer"
                onChange={handleChange}
                required
              >
                <option value="" disabled selected className="text-gray-400">
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

            {/* Image Upload Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Property Images
              </label>
              <div className="mt-1 flex justify-center px-6 pt-8 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-500 transition-colors duration-200">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>

              {/* Image Preview Grid */}
              {images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Selected Images ({images.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImages(images.filter((_, i) => i !== index));
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl text-white font-medium text-lg transition-all duration-200 ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:scale-[1.02]"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Listing...
                  </span>
                ) : (
                  "Create Listing"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
