import HouseCard from "@/components/HouseCard";
import { fetchHouseList } from "@/service/mockHouse";
import { useQuery } from "@tanstack/react-query";
import HouseCardSkeleton from "./HouseCardSkeleton";

const AllHouseList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["fetchHouseList"],
    queryFn: fetchHouseList,
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
        : data?.map((house) => (
            <HouseCard
              id={house.id}
              houseAddress={house.location}
              houseCoverImage={
                house?.houseImages?.[0] ||
                "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww"
              }
              houseName={house.title}
              houseBadge={house.status || "For Rent"}
              housePrice={house.price}
              key={house.id}
            />
          ))}
    </div>
  );
};

export default AllHouseList;
