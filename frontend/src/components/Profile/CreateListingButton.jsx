import React from "react";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateListingButton = () => {
  const { user } = useSelector((state) => state.auth);
  const isLandlord = user?.role === "landlord";

  if (!isLandlord) return null;

  return (
    <Link
      to="/user/create-listing"
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200 flex items-center justify-center z-20"
    >
      <PlusCircle className="h-6 w-6" />
    </Link>
  );
};

export default CreateListingButton;
