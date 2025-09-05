/* eslint-disable react/prop-types */
import Map from "@/components/Map";

import { TbBed } from "react-icons/tb";
import { PiBathtubLight } from "react-icons/pi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing } from "lucide-react";
import Separator from "@/components/Separator";

import {
  cn,
} from "@/lib/utils";
import { useEffect, useState } from "react";

const HouseDetailsData = ({ data }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [activeSection, setActiveSection] = useState("overview");
  const [geocodingError, setGeocodingError] = useState(null);

  const getGeoLocation = async (address) => {
    if (!address) return;

    console.log('Getting geolocation for address:', address);
    setGeocodingError(null);
    try {
      // Using OpenStreetMap Nominatim API (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&addressdetails=1`
      );
      
      const data = await response.json();
      console.log('Geocoding response:', data);
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        console.log('Setting location:', { lat: parseFloat(lat), lng: parseFloat(lon) });
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        setGeocodingError('Address not found');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setGeocodingError('Failed to get location');
    }
  };
  
  useEffect(() => {
    if (data?.address) {
      getGeoLocation(data.address);
    }
  }, [data?.address]);

  if (!data) return;
  
  return (
    <div className="mt-20 flex gap-5 flex-col md:flex-row">
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-2xl font-space">{data?.propertyType} - {data?.bedrooms} bed, {data?.bathrooms} bath</h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
          <div className="flex gap-3 flex-wrap">
            <p className="text-muted-foreground flex items-center gap-2">
              <TbBed className="w-7 h-7" />
              <span>{data?.bedrooms} Bedroom{data?.bedrooms > 1 ? 's' : ''}</span>
            </p>
            <p className="text-muted-foreground flex items-center gap-2">
              <PiBathtubLight className="w-7 h-7" />
              <span>{data?.bathrooms} Bathroom{data?.bathrooms > 1 ? 's' : ''}</span>
            </p>
            <p className="text-muted-foreground flex items-center gap-2">
              <HiOutlineSquares2X2 className="w-7 h-7" />
              <span>{data?.squareFootage} sq ft</span>
            </p>
          </div>

          <p className="flex items-center text-primary">
            <FaLocationDot className="w-5 h-5" />
            <span className="text-[17px]">{data?.address}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-5 mt-5">
          <Button
            variant="outline"
            className={cn("border-2", {
              "border-primary": activeSection === "overview",
            })}
            onClick={() => setActiveSection("overview")}
          >
            Property Overview
          </Button>

          <Button
            variant="outline"
            className={cn("border-2", {
              "border-primary": activeSection === "location",
            })}
            onClick={() => setActiveSection("location")}
          >
            Property Location
          </Button>
        </div>

        <div className="mt-3">
          {
            {
              overview: (
                <div className="mt-5">
                  <h3 className="text-lg font-semibold">Property Overview</h3>
                  <p className="text-muted-foreground">{data?.description}</p>
                </div>
              ),
              location: (
                <div>
                  {/* <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Debug Info:</strong><br/>
                      Address: {data?.address}<br/>
                      Location: {location.lat}, {location.lng}<br/>
                      Has valid coordinates: {location.lat !== 0 && location.lng !== 0 ? 'Yes' : 'No'}<br/>
                      {geocodingError && <span className="text-red-500">Error: {geocodingError}</span>}
                    </p>
                  </div> */}
                  {location.lat !== 0 && location.lng !== 0 ? (
                    <Map
                      markers={[
                        {
                          geocode: [location.lat, location.lng],
                          popUp: data?.address,
                        },
                      ]}
                    />
                  ) : (
                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Loading map...</p>
                    </div>
                  )}
                </div>
              ),
            }[activeSection]
          }
        </div>
      </div>

      <Card className="lg:w-[400px]">
        <CardHeader>
          <CardDescription className="font-semibold text-base">
            Property Price
          </CardDescription>
          <CardTitle className="font-space text-3xl">
            ${data?.price?.toLocaleString()}
          </CardTitle>

          <Separator />

          <CardDescription className="font-semibold text-base">
            Property Details
          </CardDescription>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Type:</strong> {data?.propertyType}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Size:</strong> {data?.squareFootage} sq ft
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Status:</strong> {data?.status ? 'Available' : 'Unavailable'}
            </p>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Property Owner
              </p>
              <p className="text-sm text-muted-foreground">{data?.userEmail}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          <p className="text-sm text-muted-foreground text-center">
            Use the contact form below to inquire about this property
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HouseDetailsData;
