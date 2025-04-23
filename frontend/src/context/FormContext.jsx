import React, { createContext, useContext, useState } from "react";
import { FormStepId } from "../components/listings/ListingForm";

const initialFormData = {
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
  availability: "",
};

const FormContext = createContext(undefined);

export const ListingFormProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [images, setImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(FormStepId.BASIC_INFO);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        images,
        setImages,
        currentStep,
        setCurrentStep,
        loading,
        setLoading,
        isSubmitting,
        setIsSubmitting,
        showFullDescription,
        setShowFullDescription,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
