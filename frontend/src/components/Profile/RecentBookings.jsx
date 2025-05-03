import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Home,
  Clock,
  CheckCircle,
  XCircle,
  X,
  User,
  Phone,
  Mail,
  DollarSign,
  BedDouble,
  Bath,
  Square,
} from "lucide-react";
import {
  useDeleteBookingMutation,
  useGetUserBookingsQuery,
} from "../../redux/APi/listingApi";
import { Link } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/useError";

const RecentBookings = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { data, isError, isLoading, error } = useGetUserBookingsQuery();
  const [deleting, isdeleting] = useAsyncMutation(useDeleteBookingMutation);
  console.log(selectedBooking, "selectedBooking");
  const openDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const closeDetails = () => {
    setSelectedBooking(null);
  };

  const handlecancel = async (booking) => {
    console.log(booking, "booking");
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (confirm) {
      try {
        await deleting("Cancelling Booking", booking._id);
        toast.success("Booking cancelled successfully.");
      } catch (error) {
        toast.error("Failed to cancel booking.");
      }
    }
  };
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading your listings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-gray-500">
        {error?.data?.message || "Failed to load listings."}
      </div>
    );
  }

  if (!data?.data?.length && !isLoading) {
    return (
      <div className="p-6 text-center text-gray-400">
        You haven't Booked any listings yet.
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
          <Link
            to={"/user/bookings"}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {data?.data?.map((booking) => (
            <motion.div
              key={booking?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
            >
              {/* Property Image */}
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={booking?.listing?.images?.[0]?.url}
                  alt={booking?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Booking Details */}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {booking?.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin size={14} className="mr-1" />
                      {booking?.listing?.location}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {booking.status === "confirmed" ? (
                      <span className="flex items-center text-green-600 text-sm">
                        <CheckCircle size={16} className="mr-1" />
                        Confirmed
                      </span>
                    ) : (
                      <span className="flex items-center text-orange-500 text-sm">
                        <Clock size={16} className="mr-1" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>

                {/* Dates and Price */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={14} className="mr-1" />
                    {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${booking?.listing?.price}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openDetails(booking)}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View Details
                  </button>
                  {booking.status === "confirmed" && (
                    <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {data?.data?.length === 0 && (
          <div className="text-center py-8">
            <Home className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No bookings yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start exploring properties and make your first booking.
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Browse Properties
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Booking Details
                    </h3>
                    <p className="text-gray-500 mt-1">
                      Reference ID: {selectedBooking._id}
                    </p>
                  </div>
                  <button
                    onClick={closeDetails}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Property Images */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedBooking.listing.images
                    .slice(0, 4)
                    .map((image, index) => (
                      <div
                        key={index}
                        className="aspect-video rounded-lg overflow-hidden"
                      >
                        <img
                          src={image.url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>

                {/* Property Info */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900">
                    {selectedBooking.listing.title}
                  </h4>
                  <p className="text-gray-600">
                    {selectedBooking.listing.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedBooking.listing.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 font-semibold">
                        ${selectedBooking.listing.price}/night
                      </span>
                    </div>
                  </div>

                  {/* Property Features */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <BedDouble className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedBooking.listing.beds} Beds
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedBooking.listing.bathrooms} Baths
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Square className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedBooking.listing.size} sq ft
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Booking Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Check-in</p>
                      <p className="font-medium">
                        {new Date(selectedBooking.checkIn).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Check-out</p>
                      <p className="font-medium">
                        {new Date(
                          selectedBooking.checkOut
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Host Information
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedBooking.listing.owner.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedBooking.listing.owner.email}
                      </span>
                    </div>
                    {selectedBooking.listing.owner.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">
                          {selectedBooking.listing.owner.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeDetails}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  {selectedBooking.status === "confirmed" && (
                    <button
                      onClick={() => handlecancel(selectedBooking)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecentBookings;
