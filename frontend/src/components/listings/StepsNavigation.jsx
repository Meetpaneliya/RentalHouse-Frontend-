import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "../../context/FormContext";
import { ArrowLeft, ArrowRight, Send, Loader2 } from "lucide-react";
import { FormStepId } from "./ListingForm";
import { useCreateListingMutation } from "../../redux/APi/listingApi";
import { useAsyncMutation } from "../../hooks/useError";
import toast from "react-hot-toast";

const StepNavigation = () => {
  const {
    currentStep,
    setCurrentStep,
    formData,
    images,
    loading,
    setLoading,
    isSubmitting,
    setIsSubmitting,
  } = useFormContext();

  const isFirstStep = currentStep === FormStepId.BASIC_INFO;
  const isLastStep = currentStep === FormStepId.REVIEW;

  const [createListing, isCreatingList] = useAsyncMutation(
    useCreateListingMutation
  );

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLastStep) {
      handleNext();
      return;
    }

    setIsSubmitting(true);
    try {
      const formPayload = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      // Append image files
      images.forEach((img) => {
        formPayload.append("images", img.file); // "images" should match backend field
      });

      const response = await createListing("Uploading Your List", formPayload);

      console.log("Form submitted:", response);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonVariants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
  };

  return (
    <div className="mt-8 flex justify-between">
      <motion.button
        type="button"
        onClick={handleBack}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className={`flex items-center justify-center px-6 py-3 rounded-xl border-2 
          ${
            isFirstStep
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-indigo-500 text-indigo-600 hover:bg-indigo-50"
          }
          transition-colors duration-200`}
        disabled={isFirstStep}
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </motion.button>

      <motion.button
        type="button"
        onClick={handleSubmit}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className={`flex items-center justify-center px-6 py-3 rounded-xl
          ${
            isSubmitting
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }
          text-white transition-colors duration-200
          ${isLastStep ? "min-w-32" : ""}`}
        disabled={isSubmitting && isCreatingList}
      >
        {isSubmitting && isCreatingList ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={18} />
            Submitting...
          </>
        ) : isLastStep ? (
          <>
            <Send className="mr-2" size={18} />
            Submit
          </>
        ) : (
          <>
            Next
            <ArrowRight className="ml-2" size={18} />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default StepNavigation;
