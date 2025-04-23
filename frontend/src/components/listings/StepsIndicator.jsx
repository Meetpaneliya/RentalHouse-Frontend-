import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "../../context/FormContext";
import {
  Home,
  FileText,
  Bed,
  MapPin,
  Images,
  CheckSquare,
  Check,
} from "lucide-react";
import { FormStepId } from "./ListingForm";

const StepIndicator = () => {
  const { currentStep, formData, images } = useFormContext();

  const steps = [
    {
      id: FormStepId.BASIC_INFO,
      label: "Basic Info",
      icon: "FileText",
      isValid: (data) => Boolean(data.title && data.description),
    },
    {
      id: FormStepId.PROPERTY_DETAILS,
      label: "Property Details",
      icon: "Home",
      isValid: (data) => Boolean(data.price && data.size && data.propertyType),
    },
    {
      id: FormStepId.ROOMS_FEATURES,
      label: "Rooms & Features",
      icon: "Bed",
      isValid: (data) => Boolean(data.rooms && data.beds && data.bathrooms),
    },
    {
      id: FormStepId.LOCATION,
      label: "Location",
      icon: "MapPin",
      isValid: (data) => Boolean(data.location && data.lat && data.lng),
    },
    {
      id: FormStepId.IMAGES,
      label: "Images",
      icon: "Images",
      isValid: (_, imgs) => imgs.length > 0,
    },
    {
      id: FormStepId.REVIEW,
      label: "Review",
      icon: "CheckSquare",
      isValid: () => true,
    },
  ];

  const getStepIcon = (iconName) => {
    switch (iconName) {
      case "Home":
        return <Home size={20} />;
      case "FileText":
        return <FileText size={20} />;
      case "Bed":
        return <Bed size={20} />;
      case "MapPin":
        return <MapPin size={20} />;
      case "Images":
        return <Images size={20} />;
      case "CheckSquare":
        return <CheckSquare size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="hidden md:block max-w-3xl mx-auto">
      <div className="flex justify-between items-center relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

        {/* Completed line */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-indigo-500 -translate-y-1/2 z-0"
          initial={{ width: "0%" }}
          animate={{
            width: `${
              (Math.max(1, currentStep - 1) / (steps.length - 1)) * 100
            }%`,
          }}
          transition={{ duration: 0.3 }}
        />

        {steps.map((step) => {
          const isCompleted = step.isValid(formData, images);
          const isCurrent = currentStep === step.id;
          const isPast = currentStep > step.id;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                className={`
                  flex items-center justify-center w-12 h-12 rounded-full
                  ${
                    isPast
                      ? "bg-indigo-500 text-white"
                      : isCurrent
                      ? "bg-indigo-500 text-white border-2 border-indigo-300"
                      : "bg-white text-gray-400 border-2 border-gray-200"
                  }
                  transition-colors duration-200
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPast ? <Check size={24} /> : getStepIcon(step.icon)}
              </motion.div>

              <span
                className={`
                mt-2 text-xs font-medium 
                ${
                  isCurrent
                    ? "text-indigo-600"
                    : isPast
                    ? "text-indigo-500"
                    : "text-gray-500"
                }
              `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
