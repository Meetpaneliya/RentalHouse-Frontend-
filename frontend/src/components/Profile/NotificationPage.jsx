import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Bell,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Home,
  User,
  X,
  Phone,
  Mail,
  DollarSign,
  BedDouble,
  Bath,
  Square,
  MapPin,
} from "lucide-react";
import {
  useCheckStatusQuery,
  useGetBookingLandlordQuery,
  useUpdateBookingMutation,
} from "../../redux/APi/listingApi";
import { useAsyncMutation } from "../../hooks/useError";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { roominfor } from "../../redux/reducers/orderSlice";

const NotificationPage = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLandlord = user?.role === "landlord";
  console.log(selectedNotification, "selectedNotification");
  // Use the appropriate query based on user role
  const { data, isLoading, isError, error } = isLandlord
    ? useGetBookingLandlordQuery()
    : useCheckStatusQuery();

  const [updateBooking, isUpdatingBooking] = useAsyncMutation(
    useUpdateBookingMutation
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "rejected":
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "accepted":
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const handlepayment = (selectedNotification) => {
    navigate(`/room/${selectedNotification.listing._id}`);
  };

  const handleAccept = async (id, checkIn, checkOut) => {
    if (!isLandlord) return;

    const api = {
      id,
      status: "confirmed",
      checkIn,
      checkOut,
    };
    const response = await updateBooking("Updating Booking", api);
    if (response.error) {
      console.error("Error accepting booking:", response.error);
    } else {
      console.log("Booking accepted:", response.data);
    }
  };

  const handleReject = async (id, checkIn, checkOut) => {
    if (!isLandlord) return;

    const api = {
      id,
      status: "cancelled",
      checkIn,
      checkOut,
    };
    const response = await updateBooking("Rejecting Booking", api);
    if (response.error) {
      console.error("Error rejecting booking:", response.error);
    } else {
      console.log("Booking rejected:", response.data);
    }
  };

  const openDetails = (notification) => {
    setSelectedNotification(notification);
  };

  const closeDetails = () => {
    setSelectedNotification(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="animate-pulse">Loading notifications...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-red-600">
        {error?.data?.message || "Failed to load notifications"}
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isLandlord ? "Booking Requests" : "My Bookings"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isLandlord
                ? "Manage your property booking requests"
                : "Track the status of your bookings"}
            </p>
          </div>
          <div className="relative">
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <Bell className="h-6 w-6 text-gray-500" />
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {[...(data?.data ?? [])]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((notification) => (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-2 rounded-full ${getStatusColor(
                            notification.status
                          )} bg-opacity-20`}
                        >
                          {getStatusIcon(notification.status)}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {isLandlord
                              ? notification.paid
                                ? "Payment Received"
                                : "New Booking Request"
                              : `Booking for ${notification.listing.title}`}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {isLandlord
                              ? notification.paid
                                ? `Payment received for ${notification.listing.title}`
                                : `New booking request for ${notification.listing.title}`
                              : `Status: ${
                                  notification.status.charAt(0).toUpperCase() +
                                  notification.status.slice(1)
                                }`}
                          </p>

                          <div className="mt-4 bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <Home className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                  {notification.listing.title}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {isLandlord ? (
                                  <>
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">
                                      {notification.user?.name || "N/A"}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">
                                      {notification.listing?.owner?.name ||
                                        "N/A"}
                                    </span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                  {new Date(
                                    notification.checkIn
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(
                                    notification.checkOut
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">
                                  ${notification.listing.price}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </span>
                            <span>
                              {notification.paid
                                ? ` - Paid: $${notification.listing.price}`
                                : " - Unpaid"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          notification.status
                        )}`}
                      >
                        {notification.status.charAt(0).toUpperCase() +
                          notification.status.slice(1)}
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={() => openDetails(notification)}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        View Details
                      </button>
                      {isLandlord && notification.status === "pending" && (
                        <>
                          <button
                            disabled={isUpdatingBooking}
                            onClick={() =>
                              handleAccept(
                                notification._id,
                                notification.checkIn,
                                notification.checkOut
                              )
                            }
                            className="text-sm text-green-600 hover:text-green-800 font-medium"
                          >
                            Accept Request
                          </button>
                          <button
                            disabled={isUpdatingBooking}
                            onClick={() =>
                              handleReject(
                                notification._id,
                                notification.checkIn,
                                notification.checkOut
                              )
                            }
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                          >
                            Reject Request
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {(!data?.data || data.data.length === 0) && (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No notifications
              </h3>
              <p className="mt-1 text-gray-500">
                You're all caught up! Check back later for updates.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedNotification && (
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
                      {isLandlord
                        ? "Booking Request Details"
                        : "Booking Details"}
                    </h3>
                    <p className="text-gray-500 mt-1">
                      Reference ID: {selectedNotification._id}
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
                  {selectedNotification.listing.images
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
                    {selectedNotification.listing.title}
                  </h4>
                  <p className="text-gray-600">
                    {selectedNotification.listing.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedNotification.listing.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 font-semibold">
                        ${selectedNotification.listing.price}/night
                      </span>
                    </div>
                  </div>

                  {/* Property Features */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <BedDouble className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedNotification.listing.beds} Beds
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedNotification.listing.bathrooms} Baths
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Square className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedNotification.listing.size} sq ft
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    {isLandlord ? "Guest Information" : "Host Information"}
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {isLandlord
                          ? selectedNotification.user.name
                          : selectedNotification.listing.owner.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {isLandlord
                          ? selectedNotification.user.email
                          : selectedNotification.listing.owner.email}
                      </span>
                    </div>
                    {(isLandlord
                      ? selectedNotification.user.phone
                      : selectedNotification.listing.owner.phone) && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">
                          {isLandlord
                            ? selectedNotification.user.phone
                            : selectedNotification.listing.owner.phone}
                        </span>
                      </div>
                    )}
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
                        {new Date(
                          selectedNotification.checkIn
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Check-out</p>
                      <p className="font-medium">
                        {new Date(
                          selectedNotification.checkOut
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Status</p>
                      <p
                        className={`font-medium ${getStatusColor(
                          selectedNotification.status
                        )}`}
                      >
                        {selectedNotification.status.charAt(0).toUpperCase() +
                          selectedNotification.status.slice(1)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Payment Status</p>
                      <p className="font-medium">
                        {selectedNotification.paid ? "Paid" : "Unpaid"}
                      </p>
                    </div>
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
                  {selectedNotification.status === "confirmed" && (
                    <button
                      onClick={() => handlepayment(selectedNotification)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Proceed to Pay
                    </button>
                  )}

                  {isLandlord && selectedNotification.status === "pending" && (
                    <>
                      <button
                        disabled={isUpdatingBooking}
                        onClick={() =>
                          handleAccept(
                            selectedNotification._id,
                            selectedNotification.checkIn,
                            selectedNotification.checkOut
                          )
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Accept Request
                      </button>
                      <button
                        disabled={isUpdatingBooking}
                        onClick={() =>
                          handleReject(
                            selectedNotification._id,
                            selectedNotification.checkIn,
                            selectedNotification.checkOut
                          )
                        }
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject Request
                      </button>
                    </>
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

export default NotificationPage;
