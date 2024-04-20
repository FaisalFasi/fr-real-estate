import React from "react";
import "./map.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PinMapMarker from "../PinMapMarker/PinMapMarker";

const Map = ({ items }) => {
  //   const position = [51.505, -0.09];
  const position = [51.1657, 10.4515]; // Coordinates for the center of Germany
  console.log(items);
  return (
    <MapContainer
      center={
        position
        // items.length === 1 ? [items[0].latitude, items[0].longitude] : position
      }
      zoom={6}
      scrollWheelZoom={true}
      attributionControl={false} // Disable Leaflet attribution
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {items?.map((item) => {
        return <PinMapMarker key={item.id} item={item} />;
      })}
    </MapContainer>
  );
};

export default Map;
