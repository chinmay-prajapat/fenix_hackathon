import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  height: "30vh",
  borderRadius: 20,
};
// const center = {
//   lat: 7.2905715, // default latitude
//   lng: 80.6337262, // default longitude
// };

const Maps = ({
  getLocation,
  location,
}: {
  location: { lat: number; lng: number };
  getLocation: ({ lat, lng }: { lat: number; lng: number }) => void;
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
    libraries,
  });

  console.log(location);
  const [error, setError] = useState("");

  const onMarkerDragEnd = useCallback(
    (event: google.maps.MapMouseEvent) => {
      const lat = event.latLng?.lat();
      const lng = event.latLng?.lng();

      if (lat && lng) {
        getLocation({ lat, lng });
      }
    },
    [getLocation]
  );

  const fetchGeoData = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;

          getLocation({ lat, lng });
        },
        (error) => setError(error.message)
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, [getLocation]);

  useEffect(() => fetchGeoData(), [fetchGeoData]);
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={location}
        onClick={onMarkerDragEnd}
      >
        <Marker
          position={location}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
        />
      </GoogleMap>
    </>
  );
};

export default Maps;
