import "@/index.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

const Map = ({ markers }) => {
  if (!markers || markers.length === 0) {
    return <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">No location data available</p>
    </div>;
  }

  const { geocode, popUp } = markers[0];
  if (!geocode?.[0] || !geocode?.[1]) {
    return <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Invalid coordinates</p>
    </div>;
  }

  console.log('Map component - rendering with:', { geocode, popUp });

  return (
    <div className="h-64 w-full">
      <MapContainer 
        center={geocode} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers.map((marker, index) => (
            <Marker position={marker.geocode} key={index} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
export default Map;
