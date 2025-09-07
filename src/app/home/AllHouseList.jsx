import HouseCard from "@/components/HouseCard";
import { getActiveRealEstate } from "@/service/realEstateService";
import { useQuery } from "@tanstack/react-query";
import HouseCardSkeleton from "./HouseCardSkeleton";
import { getImageUrl } from "@/utils/imageUtils";

const AllHouseList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["fetchActiveRealEstate"],
    queryFn: getActiveRealEstate,
  });

  const renderHouseCardSkeleton = Array.from({ length: 4 }).map((_, index) => (
    <HouseCardSkeleton key={index} />
  ));

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading houses. Please try again.</p>
      </div>
    );
  }

  // Show empty state when data is loaded but no houses are available
  if (!isPending && (!data?.data || data.data.length === 0)) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <svg 
              className="mx-auto h-16 w-16 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Available</h3>
          <p className="text-gray-500 mb-6">
            We don&apos;t have any properties listed at the moment. Check back later for new listings!
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 my-5">
      {isPending
        ? renderHouseCardSkeleton
        : data?.data?.map((house) => (
            <HouseCard
              id={house._id}
              houseAddress={house.address}
              houseCoverImage={
                getImageUrl(house?.images?.[0]) ||
                "/public/images/nophoto.jpg"
              }
              houseName={`${house.propertyType} - ${house.bedrooms} bed, ${house.bathrooms} bath`}
              houseBadge={house.status ? "Available" : "Unavailable"}
              housePrice={house.price}
              key={house._id}
            />
          ))}
    </div>
  );
};

export default AllHouseList;
