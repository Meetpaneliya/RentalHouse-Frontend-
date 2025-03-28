import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CityCombobox } from "./combobox-demo";
//import { useSearchQuery } from "../redux/APi/listingApi";
import { useNavigate } from "react-router-dom";
import { Calendar, Search } from "lucide-react";
import toast from "react-hot-toast";

const Searchbar = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!selectedCity) {
      toast.error("Please select a city");
      return;
    }
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }
    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }
    navigate("/filtered-listings");
  };

  const handleCheckOutDateChange = (date) => {
    if (checkInDate && date < checkInDate) {
      return;
    }
    setCheckOutDate(date);
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    if (checkOutDate && date > checkOutDate) {
      setCheckOutDate(null);
    }
  };

  const isSearchDisabled = !selectedCity || !checkInDate || !checkOutDate || checkOutDate <= checkInDate;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-slate-300 rounded-2xl shadow-lg p-2.5 flex flex-col md:flex-row items-center">
        {/* City Selection */}
        <div className="w-full md:w-1/3 min-w-[120px] md:mr-1">
          <div className="relative">
            <CityCombobox onSelect={(city) => setSelectedCity(city)} />
          </div>
        </div>

        {/* Date Selection */}
        <div className="w-full md:w-2/5 grid grid-cols-2 gap-3 my-2 md:my-0 md:mx-1">
          {/* Check-in Date */}
          <div className="relative">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
              <Calendar size={16} />
            </div>
            <DatePicker
              selected={checkInDate}
              onChange={handleCheckInDateChange}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={new Date()}
              placeholderText="Check in"
              className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              dateFormat="MMM dd"
            />
          </div>

          {/* Check-out Date */}
          <div className="relative">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
              <Calendar size={16} />
            </div>
            <DatePicker
              selected={checkOutDate}
              onChange={handleCheckOutDateChange}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate || new Date()}
              placeholderText="Check out"
              className="w-full pl-8 pr-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              dateFormat="MMM dd"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          onClick={handleSearch}
          disabled={isSearchDisabled}
          className={`w-full md:w-auto px-6 py-1.5 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 md:ml-1 ${
            isSearchDisabled 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-black hover:bg-black/85"
          }`}
        >
          <Search size={16} />
          <span className="text-sm">Search</span>
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
