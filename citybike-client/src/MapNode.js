import React from "react";
import { Marker, Popup } from "react-leaflet";

const MapNode = ({ id, latitude, longitude, free_bikes, empty_slots }) => {
   return (
      <Marker key={id} position={[latitude, longitude]}>
         <Popup>
            Bikes Available: {free_bikes} <br />
            Slots Available: {empty_slots}
         </Popup>
      </Marker>
   );
};

export default MapNode;
