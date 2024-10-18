"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Modify Map component to accept destinations as a prop
interface MapProps {
  destinations: { name: string; lat: number; lng: number }[];
}

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 20.0,
  lng: 0.0,
};

export default function Map({ destinations }: MapProps) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
        {/* Render Markers for each destination */}
        {destinations.map((destination, index) => (
          <Marker
            key={index}
            position={{ lat: destination.lat, lng: destination.lng }}
            title={destination.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
