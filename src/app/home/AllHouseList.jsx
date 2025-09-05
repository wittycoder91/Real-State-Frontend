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
