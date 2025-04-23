import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "../../../context/FormContext";
import { ImagePlus, X } from "lucide-react";

const ImagesStep = () => {
  const { images, setImages } = useFormContext();

  const handleImageChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const imagePreviews = fileArray.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setImages((prev) => [...prev, ...imagePreviews]);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Property Images</h2>
        <p className="text-gray-600">Add photos to showcase your property</p>
      </div>

      {/* Upload Section */}
      <div className="mt-1 flex justify-center px-6 pt-8 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-500 transition-colors duration-200">
        <div className="space-y-1 text-center">
          <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
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
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      {/* Image Preview and Sorting */}
      {images.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mt-6 mb-4">
            <h3 className="text-sm font-medium text-gray-700">
              Selected Images ({images.length})
            </h3>
            <p className="text-xs text-gray-500">
              Drag to reorder | First image will be the cover photo
            </p>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
              hidden: {},
            }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative group rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03, zIndex: 2 }}
              >
                <div className="relative pt-[75%]">
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs py-1 px-2 rounded-md">
                    Cover Photo
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-10 mt-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500">No images selected yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Add at least one image to continue
          </p>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-6 bg-green-50 rounded-xl p-4 border border-green-100">
        <h3 className="font-medium text-green-800 mb-2">
          Tips for great property photos:
        </h3>
        <ul className="text-sm text-green-700 space-y-1 list-disc pl-5">
          <li>Use landscape orientation for better viewing</li>
          <li>Make sure the space is clean and well-lit</li>
          <li>Include photos of all rooms and special features</li>
          <li>Add exterior shots to show the building and surroundings</li>
          <li>Avoid using heavily filtered or edited photos</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ImagesStep;
