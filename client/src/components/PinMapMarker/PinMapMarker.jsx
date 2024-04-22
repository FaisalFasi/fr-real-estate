import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "./pinMapMarker.scss";

const PinMapMarker = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0] || "/noavatar.jpg"} alt="image" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>
              {item.title.length > 20
                ? item.title.slice(0, 20) + "..."
                : item.title}
            </Link>
            <span className="bed"> Bedrooms {item.bedroom}</span>
            <b> {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default PinMapMarker;
