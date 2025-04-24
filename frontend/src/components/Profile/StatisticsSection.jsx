import React from "react";
import { Building, Eye, DollarSign, Clock } from "lucide-react";
import { useSelector } from "react-redux";

const StatisticsSection = () => {
  const { user } = useSelector((state) => state.auth);
  const isLandlord = user?.role === "landlord";

  // Mock statistics - in a real app, these would come from the Redux store
  const stats = {
    totalListings: 5,
    totalViews: 123,
    monthlyRevenue: 1500,
    pendingRequests: 2,
  };

  if (!isLandlord) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 px-2 sm:px-4">
      {/* Card 1 */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Total Listings</p>
            <p className="text-xl sm:text-2xl font-semibold mt-1">{stats.totalListings}</p>
          </div>
          <div className="bg-blue-100 p-2 rounded-md">
            <Building className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-green-600">+2 new this month</p>
        </div>
      </div>
  
      {/* Card 2 */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Total Views</p>
            <p className="text-xl sm:text-2xl font-semibold mt-1">{stats.totalViews}</p>
          </div>
          <div className="bg-purple-100 p-2 rounded-md">
            <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-green-600">+47 views this week</p>
        </div>
      </div>
  
      {/* Card 3 */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Monthly Revenue</p>
            <p className="text-xl sm:text-2xl font-semibold mt-1">${stats.monthlyRevenue}</p>
          </div>
          <div className="bg-green-100 p-2 rounded-md">
            <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-green-600">+12% from last month</p>
        </div>
      </div>
  
      {/* Card 4 */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-l-4 border-amber-500 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500">Pending Requests</p>
            <p className="text-xl sm:text-2xl font-semibold mt-1">{stats.pendingRequests}</p>
          </div>
          <div className="bg-amber-100 p-2 rounded-md">
            <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-amber-600">Needs your attention</p>
        </div>
      </div>
    </div>
  );
  
};

export default StatisticsSection;
