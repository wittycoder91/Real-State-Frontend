import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import DynamicHouseDetailsHeader from "./DynamicHouseDetailsHeader";
import ImageGallerySkeleton from "./ImageGallerySkeleton";
import ImageGallery from "./ImageGallery";
import ContactForm from "./ContactForm";
import { getImageUrls } from "@/utils/imageUtils";

import { getRealEstateById } from "@/service/realEstateService";

import HouseDetailsData from "./HouseDetailsData";
const HouseDetails = () => {
  const params = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["fetchRealEstateById", params.id],
    queryFn: () => getRealEstateById(params.id),
  });

  const [isLiked, setIsLiked] = useState(false);
  const handleOnclickFavoriteButton = () => setIsLiked(!isLiked);

  const realEstateData = data?.data;
  
  const allImages = getImageUrls(realEstateData?.images);
  const mainImageUrl = allImages[0] || "/public/images/nophoto.jpg";
  const otherImages = allImages.length > 1 ? allImages.slice(1) : [];

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading house details. Please try again.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col mt-10 gap-10">
      <DynamicHouseDetailsHeader
        title="House Details"
        showShareButton
        handleOnclickFavoriteButton={handleOnclickFavoriteButton}
        isLiked={isLiked}
      />
      {isPending ? (
        <ImageGallerySkeleton />
      ) : realEstateData ? (
        <>
          <ImageGallery mainImageUrl={mainImageUrl} otherImages={otherImages} />
          <HouseDetailsData data={realEstateData} />
          <ContactForm realEstateId={params.id} />
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No property data available.</p>
        </div>
      )}
    </main>
  );
};

export default HouseDetails;
