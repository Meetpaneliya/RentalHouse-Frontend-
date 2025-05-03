import React from "react";
import { Link } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { IoHomeOutline } from "react-icons/io5";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Listings = ({ listings = [], data, city }) => {
  const customIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const approvedListings = listings.filter(
    (listing) => listing.adminApproved === true
  );

  const approvedData = data?.data?.filter(
    (listing) => listing.adminApproved === true
  );

  const displayListings = data ? approvedData : approvedListings;

  if (displayListings.length === 0) {
    return (
      <div className="flex flex-col md:flex-row h-screen p-3">
        <div className="w-full md:w-[70%] p-4 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">
            {city ? `${city} Listings` : "All Listings"}
          </h2>
          <p>No approved listings match your filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen p-3">
      {/* Left Side: Listings */}
      <div className="w-full md:w-[70%] p-4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {city ? `${city} Listings` : "All Listings"}
        </h2>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 overflow-y-auto pb-4">
          {displayListings.map((listing) => (
            <div
              key={listing._id}
              className="relative bg-white shadow-md rounded-3xl overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow duration-300 w-full"
            >
              <Link to={`/Room/${listing._id}`} className="block group">
                {/* Background Image */}
                <div className="relative w-full h-52">
                  <img
                    src={
                      listing.images?.[0]?.url ||
                      "https://via.placeholder.com/300"
                    }
                    alt={listing.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>
                  <div className="absolute top-3 left-3">
                    <h3 className="text-slate-200/60 text-lg font-bold">
                      {listing.title}
                    </h3>
                  </div>
                </div>

                {/* Listing Details */}
                <div className="absolute bottom-0 w-full bg-slate-200 text-black bg-opacity-50 p-3 flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <IoHomeOutline /> {listing.size} ft²
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBed /> {listing.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBath /> {listing.bathrooms} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <MdLocationOn /> {listing.floor} Floor
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Map */}
      <div className="w-full md:w-[40%] h-screen md:h-auto mt-4 md:mt-0 z-10">
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {displayListings.map(
            (listing, index) =>
              listing.locationGeo?.coordinates && (
                <Marker
                  key={index}
                  position={[
                    listing.locationGeo.coordinates[1],
                    listing.locationGeo.coordinates[0],
                  ]}
                  icon={customIcon}
                >
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{listing.title}</h3>
                      <p>${listing.price} / month</p>
                    </div>
                  </Popup>
                </Marker>
              )
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Listings;
