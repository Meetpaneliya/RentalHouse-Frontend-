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
    const query = new URLSearchParams({
      city: selectedCity,
      startDate: checkInDate.toISOString(),
      endDate: checkOutDate.toISOString(),
    });

    navigate(`/filtered-listings?${query.toString()}`);
  };

  const handleCheckOutDateChange = (date) => {
    if (checkInDate && date <= checkInDate) {
      return;
    }
    setCheckOutDate(date);
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    if (checkOutDate && date >= checkOutDate) {
      setCheckOutDate(null);
    } else {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    }
  };

  const isSearchDisabled =
    !selectedCity ||
    !checkInDate ||
    !checkOutDate ||
    checkOutDate <= checkInDate;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row items-center border border-white/10 space-y-3 md:space-y-0 md:space-x-2">
        {/* City Selection */}
        <div className="w-full md:w-1/3">
          <CityCombobox onSelect={(city) => setSelectedCity(city)} />
        </div>

        {/* Date Selection */}
        <div className="w-full md:w-2/5 grid grid-cols-2 gap-2">
          {/* Check-in Date */}
          <div className="relative">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300">
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
              className="w-full pl-8 pr-2 py-2 bg-[#1f1f1f]/80 text-white border border-white/10 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              dateFormat="MMM dd"
            />
          </div>

          {/* Check-out Date */}
          <div className="relative">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300">
              <Calendar size={16} />
            </div>
            <DatePicker
              selected={checkOutDate}
              onChange={handleCheckOutDateChange}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={
                checkInDate
                  ? new Date(checkInDate.getTime() + 86400000)
                  : new Date()
              }
              placeholderText="Check out"
              className="w-full pl-8 pr-2 py-2 bg-[#1f1f1f]/80 text-white border border-white/10 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              dateFormat="MMM dd"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          onClick={handleSearch}
          disabled={isSearchDisabled}
          className={`w-full md:w-auto px-6 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ease-in-out md:ml-2
        ${
          isSearchDisabled
            ? "bg-gray-600/70 text-gray-300 cursor-not-allowed"
            : "bg-white text-black hover:bg-white/90"
        }`}
        >
          <Search size={16} />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
