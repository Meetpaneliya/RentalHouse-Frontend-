import React, { useState, useEffect } from "react";
import { Building, MapPin, Home, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetUserlistingQuery } from "../../redux/APi/listingApi";
import { useInView } from "react-intersection-observer";

const RecentListings = () => {
  const { user } = useSelector((state) => state.auth);
  const isLandlord = user?.role === "landlord";

  const [page, setPage] = useState(1);
  const [allListings, setAllListings] = useState([]);

  const { data, isError, isLoading, error, isFetching } =
    useGetUserlistingQuery({ page, limit: 5 }, { skip: !isLandlord });

  const { ref, inView } = useInView({ threshold: 0 });

  // Load new listings when data changes
  useEffect(() => {
    if (data?.data?.length) {
      setAllListings((prev) => [...prev, ...data.data]);
    }
  }, [data]);

  // Load next page when user scrolls to the end
  useEffect(() => {
    if (inView && !isFetching && data?.hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isFetching, data]);

  // Early return if not landlord
  if (!isLandlord) return null;

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

  if (!allListings.length && !isLoading) {
    return (
      <div className="p-6 text-center text-gray-400">
        You haven't posted any listings yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Recent Listings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your most recent property listings.
          </p>
        </div>
        <a
          href="/user/listings"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          View all
        </a>
      </div>

      <div className="divide-y divide-gray-200">
        {allListings.map((listing) => (
          <div
            key={listing._id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="mb-4 sm:mb-0 sm:mr-4 sm:w-32 sm:h-24 flex-shrink-0">
                <img
                  src={listing.images?.[0]?.url || "/placeholder.jpg"}
                  alt={listing.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-medium text-gray-900">
                    {listing.title}
                  </h4>
                  <p className="text-sm font-semibold text-green-600">
                    ${listing.price}/mo
                  </p>
                </div>

                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {listing.location}
                </div>

                <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    {listing.beds} bed{listing.beds !== 1 ? "s" : ""}
                  </span>
                  <span>
                    {listing.bathrooms} bath{listing.bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    Listed on {new Date(listing.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-xs text-purple-600 flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {listing.viewCount || 0} views
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Infinite Scroll Trigger */}
        {data?.hasMore && (
          <div ref={ref} className="py-4 text-center text-sm text-gray-400">
            {isFetching ? "Loading more..." : "Scroll to load more"}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentListings;
