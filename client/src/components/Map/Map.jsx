import React from "react";
import "./map.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PinMapMarker from "../PinMapMarker/PinMapMarker";

const germanyCoordinates = [51.1657, 10.4515]; // Coordinates for the center of Germany
const Map = ({ items }) => {
  // checking if items prop is an object then convert into an array
  const itemsArray = Array.isArray(items) ? items : [items];

  // setting our map view based on number of items
  const position =
    itemsArray.length === 1
      ? [itemsArray[0].latitude, itemsArray[0].longitude]
      : germanyCoordinates;

  return (
    <MapContainer
      center={position} // map view position
      zoom={5} // map zoom
      scrollWheelZoom={true} // if we want to zoom the map with scrollbar
      attributionControl={false} // Disable Leaflet attribution
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {itemsArray?.map((item) => {
        return <PinMapMarker key={item.id} item={item} />; // adding marker on the places
      })}
    </MapContainer>
  );
};

export default Map;
