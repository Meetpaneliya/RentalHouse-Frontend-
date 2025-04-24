import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Home,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useGetUserBookingsQuery } from "../../redux/APi/listingApi";

const RecentBookings = () => {
  // This would typically come from your API/Redux store

  const { data, isError, isLoading, error } = useGetUserBookingsQuery();
  console.log(data);

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

  if (!data.length && !isLoading) {
    return (
      <div className="p-6 text-center text-gray-400">
        You haven't posted any listings yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {data.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
          >
            {/* Property Image */}
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={booking.image}
                alt={booking.propertyName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Booking Details */}
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {booking.propertyName}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin size={14} className="mr-1" />
                    {booking.location}
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
                  ${booking.price}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex gap-2">
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
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

      {bookings.length === 0 && (
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
  );
};

export default RecentBookings;
