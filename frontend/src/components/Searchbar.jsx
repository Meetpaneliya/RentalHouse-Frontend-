import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CityCombobox } from "./combobox-demo";
import { useSearchQuery } from "../redux/APi/listingApi";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Search } from "lucide-react";

const Searchbar = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchParams, setSearchParams] = useState({});
  const navigate = useNavigate();

  const { isLoading } = useSearchQuery(searchParams, {
    skip: !searchParams.city,
  });

  const handleSearch = () => {
    if (!selectedCity) return;

    const params = {
      city: selectedCity,
      checkIn: checkInDate ? checkInDate.toISOString().split("T")[0] : undefined,
      checkOut: checkOutDate ? checkOutDate.toISOString().split("T")[0] : undefined,
    };

    setSearchParams(params);
    
    const queryString = new URLSearchParams({
      city: params.city,
      ...(params.checkIn && { checkIn: params.checkIn }),
      ...(params.checkOut && { checkOut: params.checkOut })
    }).toString();

    navigate(`/filtered-listings?${queryString}`);
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
          onClick={handleSearch}
          disabled={isLoading}
          className="w-full md:w-auto px-6 py-1.5  bg-black hover:bg-black/85 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed md:ml-1"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm">Searching...</span>
            </>
          ) : (
            <>
              <Search size={16} />
              <span className="text-sm">Search</span>
            </>
          )}
          
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
