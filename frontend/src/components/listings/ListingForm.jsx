import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormContext } from "../../context/FormContext";
import StepIndicator from "./StepsIndicator";
import BasicInfoStep from "./steps/BasicInfoStep";
import PropertyDetailsStep from "./steps/PropertyDetail";
import RoomsFeaturesStep from "./steps/RoomFeaturesStep";
import LocationStep from "./steps/LocationStep";
import ImagesStep from "./steps/ImagesStep";
import ReviewStep from "./steps/ReviewStep";
import StepNavigation from "./StepsNavigation";

// Enum converted to plain object
export const FormStepId = {
  BASIC_INFO: 1,
  PROPERTY_DETAILS: 2,
  ROOMS_FEATURES: 3,
  LOCATION: 4,
  IMAGES: 5,
  REVIEW: 6,
};

const ListingForm = () => {
  const { currentStep } = useFormContext();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case FormStepId.BASIC_INFO:
        return <BasicInfoStep />;
      case FormStepId.PROPERTY_DETAILS:
        return <PropertyDetailsStep />;
      case FormStepId.ROOMS_FEATURES:
        return <RoomsFeaturesStep />;
      case FormStepId.LOCATION:
        return <LocationStep />;
      case FormStepId.IMAGES:
        return <ImagesStep />;
      case FormStepId.REVIEW:
        return <ReviewStep />;
      default:
        return <BasicInfoStep />;
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-3">
          Add Your Property 🏠
        </h1>
        <p className="text-gray-600 text-lg">
          Let's create your property listing step by step
        </p>
      </div>

      <StepIndicator />

      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-10 border border-white/20 mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>

        <StepNavigation />
      </div>
    </div>
  );
};

export default ListingForm;
