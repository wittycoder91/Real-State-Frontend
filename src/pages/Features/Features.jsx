import HouseCard from "@/components/HouseCard";
import { getActiveRealEstate } from "@/service/realEstateService";
import { useQuery } from "@tanstack/react-query";
import HouseCardSkeleton from "@/app/home/HouseCardSkeleton";
import { getImageUrl } from "@/utils/imageUtils";
import SectionHeading from "@/components/SectionHeading";

const Features = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["fetchActiveRealEstate"],
    queryFn: getActiveRealEstate,
  });

  const renderHouseCardSkeleton = Array.from({ length: 3 }).map((_, index) => (
    <HouseCardSkeleton key={index} />
  ));

  // Limit to 3 properties for Features section
  const limitedData = data?.data?.slice(0, 3);

  if (error) {
    return (
      <section className="py-6 space-y-6">
        <SectionHeading>Feature House</SectionHeading>
        <div className="text-center py-8">
          <p className="text-red-500">Error loading houses. Please try again.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 space-y-6">
      <SectionHeading>Feature House</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
        {isPending
          ? renderHouseCardSkeleton
          : limitedData?.map((house) => (
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
    </section>
  );
};

export default Features;
