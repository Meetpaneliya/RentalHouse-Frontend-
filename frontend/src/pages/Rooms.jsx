import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar2";
import {
  FaWifi,
  FaTv,
  FaSnowflake,
  FaShower,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";
import { MdPets } from "react-icons/md";
import Footer from "../components/Footer";
import { Dialog } from "@headlessui/react";
import { CiShare2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { roominfor } from "../redux/reducers/orderSlice";
import { IoHomeOutline } from "react-icons/io5";
import { X } from "lucide-react";
import { useAsyncMutation } from "../hooks/useError";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useCreateBookingMutation } from "../redux/APi/listingApi";

const Rooms = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 150; // Maximum characters to show initially
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [sendBookingRequest, isSendingBookingRequest] = useAsyncMutation(
    useCreateBookingMutation
  );

  const handleNavigate = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to continue.");
      return;
    }
    if (user.kycStatus !== "verified") {
      toast.error("Please complete KYC to proceed.");
      navigate("/KYC");
      return;
    }
    if (!isAuthenticated) {
      toast.error("Please login to continue.");
      return;
    }
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates.");
      return;
    }

    const formData = {
      listingId: id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    };
    await sendBookingRequest("Sending booking request", formData);
  };

  const handlepayment = async (room) => {
    if (!isAuthenticated) {
      toast.error("Please login to continue.");
      return;
    }
    if (user.kycStatus !== "verified") {
      toast.error("Please complete KYC to proceed.");
      navigate("/KYC");
      return;
    }
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates.");
      return;
    }

    const totalprice = calculateTotal();
    const bookingDetails = {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: calculateNights(checkInDate, checkOutDate),
      totalAmount: totalprice,
    };

    navigate("/payment");
    dispatch(roominfor({ ...room, bookingDetails }));
    localStorage.setItem("amount", totalprice);
    localStorage.setItem("orderId", room._id);
    localStorage.setItem(
      "bookingDates",
      JSON.stringify({
        checkIn: checkInDate,
        checkOut: checkOutDate,
      })
    );
  };

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        console.log("Fetching room details for ID:", id);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/listings/searchbyId/${id}`
        );

        console.log("API Response:", response.data);
        if (!response.data.success) throw new Error("Listing not found");

        setRoom(response.data.data.listing);
        setReviews(response.data.data.reviews);
      } catch (err) {
        console.error("Error fetching room details:", err);
        setError("Failed to load room details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/reviews/${id}`
      );
      setReviews(response.data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const submitReview = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/reviews/`,
        { listingId: id, rating, comment },
        { withCredentials: true }
      );

      console.log("Review Added:", response.data);

      setSuccessMessage("Review submitted successfully!");
      setIsModalOpen(false);

      fetchReviews();
    } catch (err) {
      console.error("Error adding review:", err);
      setError("Failed to submit review.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "Hey, take a look at this amazing content!",
          url: window.location.href, // Current page URL
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalNights = () => {
    const nights = calculateNights(checkInDate, checkOutDate);
    return nights * room.price;
  };
  const capitalizeWords = (str) =>
    str
      ?.split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const calculateTotal = () => {
    const basePrice = calculateTotalNights();
    const discount = Math.floor(room.price * 0.1);
    const serviceFee = Math.floor(room.price * 0.05);
    return basePrice - discount + serviceFee;
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!room)
    return (
      <p className="text-center text-gray-600">No room details available.</p>
    );

  return (
    <div className="">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex  sm:flex justify-between items-center mb-6 tracking-wide">
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 ">
              {capitalizeWords(room.title)}
            </h1>
            <span className="text-blue-800 text-lg font-semibold capitalize ">
              {capitalizeWords(room.propertyType)}
            </span>
          </div>
          <CiShare2 onClick={handleShare} className="text-3xl" />
        </div>

        {/* Image & Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div className="col-span-1 sm:col-span-3">
            <img
              className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-md cursor-pointer"
              src={room.images[0]?.url}
              alt={room.title}
              onClick={() => setSelectedImage(room.images[0]?.url)}
            />
          </div>
          <div className="col-span-1 sm:col-span-2 grid grid-cols-2 gap-2">
            {room.images?.slice(1, 5).map((image, index) => (
              <img
                key={index}
                className="w-full h-32 sm:h-36 object-cover rounded-lg hover:scale-105 transition cursor-pointer"
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(image.url)}
              />
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative max-w-7xl mx-auto p-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                alt="Full size room image"
                className="max-h-[90vh] w-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}

        {/* Overview & Booking Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {/* Overview Section */}
          <div className="col-span-1 sm:col-span-2 w-11/12">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-gray-600 text-base sm:text-lg">
                <span className="flex items-center">
                  <IoHomeOutline className="mr-1" /> {room.size} ft²
                </span>
                <span className="hidden sm:inline">|</span>
                <span>🏢 {room.floor} Floor</span>
                <span className="hidden sm:inline">|</span>
                <span>🛏 {room.beds} Beds</span>
                <span className="hidden sm:inline">|</span>
                <span>🛁 {room.bathrooms} Bath</span>
              </p>
            </div>
            <p className="text-green-600 font-medium mt-3 sm:mt-1 text-base sm:text-lg">
              📅 Available from {room.availableDate || "N/A"}
            </p>
            <div className="text-gray-700 mt-2 leading-relaxed ">
              {room.description?.length > MAX_DESCRIPTION_LENGTH ? (
                <>
                  <p>
                    {showFullDescription
                      ? room.description
                      : `${room.description.slice(
                          0,
                          MAX_DESCRIPTION_LENGTH
                        )}... `}
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {showFullDescription ? "Show less" : "Show more"}
                    </button>
                  </p>
                </>
              ) : (
                <p>{room.description}</p>
              )}
            </div>

            {/* Amenities */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-semibold">This place offers</h2>
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 mt-3">
                {room.amenities?.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <span className="text-blue-600">
                      {amenity === "WiFi" || amenity === "wifi" ? (
                        <FaWifi />
                      ) : amenity === "TV" || amenity === "tv" ? (
                        <FaTv />
                      ) : amenity === "AC" || amenity === "ac" ? (
                        <FaSnowflake />
                      ) : amenity === "geyser" || amenity === "Geyser" ? (
                        <FaShower />
                      ) : amenity === "pets" || amenity === "Pets" ? (
                        <MdPets />
                      ) : null}
                    </span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-6 border-t pt-4">
              {/* Reviews Header - Single Row */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col  items-center gap-2">
                  <h2 className="text-2xl font-semibold">Guest Reviews</h2>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-semibold text-lg">
                        {reviews.length > 0 ? "4.8" : "0"}
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span>{reviews.length} reviews</span>
                  </div>
                </div>

                <button
                  className="px-4 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all flex items-center gap-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="hidden sm:inline">Write a review</span>
                  <span className="sm:hidden">Review</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>

              {/* Reviews Grid */}
              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {review.user?.avatar ? (
                            <img
                              src={review.user.avatar}
                              alt={review.user?.name}
                              className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-100"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                              <FaUserCircle className="w-5 h-5 text-blue-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-800 text-sm">
                                {review.user?.name || "Anonymous"}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {review.createdAt
                                  ? format(
                                      new Date(review.createdAt),
                                      "MMM dd, yyyy"
                                    )
                                  : ""}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`${
                                      i < review.rating
                                        ? "text-yellow-400"
                                        : "text-gray-200"
                                    } w-3 h-3`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="mb-4">
                    <FaStar className="mx-auto text-5xl text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Be the first one to review this place!
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Write a Review
                  </button>
                </div>
              )}

              {/* Show More Reviews Button (if you have pagination) */}
              {reviews.length > 6 && (
                <div className="text-center mt-8">
                  <button className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                    Show More Reviews
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Divider */}
          <div className="sm:hidden col-span-1 w-full my-8">
            <div className="border-t border-gray-200 relative">
              <div className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-white px-4">
                <span className="text-gray-400 text-sm">Payment Details</span>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="col-span-1">
            <div className="bg-[#3F51B5] text-white rounded-t-xl">
              <h3 className="text-lg font-medium p-4">
                Select bedroom and dates
              </h3>
            </div>

            <div className="bg-white shadow-lg rounded-b-xl p-6">
              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Check In
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => {
                      const newCheckInDate = e.target.value;
                      setCheckInDate(newCheckInDate);
                      // Automatically set check-out date to one day after check-in
                      const nextDay = new Date(newCheckInDate);
                      nextDay.setDate(nextDay.getDate() + 1);
                      setCheckOutDate(nextDay.toISOString().split("T")[0]); // Set check-out date to next day
                    }}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Check Out
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => {
                      const newCheckOutDate = e.target.value;
                      if (checkInDate && newCheckOutDate <= checkInDate) {
                        return; // Prevent selecting the same day or before check-in
                      }
                      setCheckOutDate(newCheckOutDate);
                    }}
                    min={
                      checkInDate
                        ? new Date(checkInDate).toISOString().split("T")[0]
                        : new Date().toISOString().split("T")[0]
                    }
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    ${room.price} ×{" "}
                    {checkInDate && checkOutDate
                      ? calculateNights(checkInDate, checkOutDate)
                      : "X"}{" "}
                    nights
                  </span>
                  <span className="text-gray-800">
                    ${calculateTotalNights()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>New user discount</span>
                  <span className="text-green-600">
                    -${Math.floor(room.price * 0.1)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Service fee</span>
                  <span>${Math.floor(room.price * 0.05)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4 font-medium">
                <span>Total(USD)</span>
                <span className="text-lg">${calculateTotal()}/month</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-4">
                <button
                  onClick={handleNavigate}
                  className="w-full bg-[#3F51B5] text-white py-3 rounded-lg hover:bg-[#2c3e99] transition-colors"
                  disabled={
                    !checkInDate || !checkOutDate || isSendingBookingRequest
                  }
                >
                  {isSendingBookingRequest ? "Loading..." : "Reserve Now"}
                </button>

                <button
                  onClick={() => handlepayment(room)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  disabled={!checkInDate || !checkOutDate}
                >
                  <span>Proceed to Pay</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <p className="text-center text-gray-500 text-sm mt-1">
                  You won't get charged yet
                </p>

                {/* Payment Methods */}
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200">
                  <img
                    src="/assets/Razorpay.png"
                    alt="Razorpay"
                    className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
                  />
                  <span className="text-gray-300 text-2xl">|</span>
                  <img
                    src="/assets/Stripe.png"
                    alt="Stripe"
                    className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
                  />
                  <span className="text-gray-300 text-2xl">|</span>
                  <img
                    src="/assets/Paypal.png"
                    alt="Paypal"
                    className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Modal */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg w-full sm:w-96">
            <h2 className="text-xl font-semibold">Add Your Review</h2>
            <div className="mt-3">
              <label className="block text-gray-700">Rating:</label>
              <select
                className="w-full p-2 border rounded-md"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num !== 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Comment:</label>
              <textarea
                className="w-full p-2 border rounded-md"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                minLength={3}
                placeholder="Write your review here..."
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {successMessage && (
              <p className="mt-2 text-sm text-green-600">{successMessage}</p>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={submitReview}
              >
                Submit
              </button>
            </div>
          </div>
        </Dialog>
      </div>

      {/* Search CTA Section */}
      {/* <div
        className="relative -mb-40 bg-cover bg-center text-white py-10 px-4 sm:px-6 w-full max-w-5xl mx-auto rounded-3xl shadow-lg overflow-hidden"
        style={{
          backgroundImage: "url('/assets/girlroom.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          maxHeight: "300px",
        }}
      >
        <div className="z-10 flex flex-col sm:flex-row justify-between items-center max-w-5xl mx-auto">
          <div className="gap-3 p-5 w-full sm:w-2/6 bg-white/70 rounded-3xl">
            <h2 className="text-2xl sm:text-4xl font-bold text-blue-800 text-center">
              Start your search today
            </h2>
            <p className="mt-3 text-sm text-blue-800">
              Get ready for the easiest rental experience of your life. Browse
              homes, take a tour, submit an application, and get your key in a
              few clicks!
            </p>
          </div>

          <div className="flex flex-col space-y-4 sm:space-y-10 mt-4 sm:mt-0">
            <button className="">
              <a
                href="/search"
                className="bg-blue-500/50 hover:bg-blue-600 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full"
              >
                Search Apartments
              </a>
            </button>

            <button>
              <a
                href="/signup"
                className="bg-blue-500/50 hover:bg-blue-600 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full"
              >
                Speak to a Human
              </a>
            </button>
          </div>
        </div>
      </div> */}

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Rooms;
