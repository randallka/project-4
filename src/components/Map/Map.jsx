import React, { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from "../../App";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "80vw",
  height: "40vh",
  position: "relative",
};
// some code from mapbox docs
const Map = ({ restaurants }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const user = useContext(UserContext);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: user.coordinates,
        zoom: 12,
      });
      const userLocation = new mapboxgl.Marker({
        color: "rgb(44 44 44)",
      })
        .setLngLat(user.coordinates)
        .addTo(map);

      restaurants.map((restaurant, i) => {
        const coordinates = restaurant.coordinates[0].split(",");
        const parsedCoordinates = coordinates.map((coord) => {
          return parseFloat(coord);
        });
        const popup = new mapboxgl.Popup().setText(restaurant.name).addTo(map);
        return new mapboxgl.Marker({
          color: "rgb(254 160 48)",
        })
          .setLngLat(parsedCoordinates)
          .addTo(map)
          .setPopup(popup);
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default Map;
