
  import React, { useEffect, useRef, useState, useContext } from "react";
  import { UserContext } from "../../App";
  import mapboxgl from "mapbox-gl";
  import "mapbox-gl/dist/mapbox-gl.css";

  const styles = {
    width: "80vw",
    height: "40vh",
    position: "relative",
  };

  const Map = ({coordinates}) => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    const user = useContext(UserContext)
    useEffect(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicmFuZGFsbGthIiwiYSI6ImNsYzEyYTA0ZTN6cnYzdnBsY2kxbnQxeHcifQ.UXuG6o9McGmzc24bhWF44A";
      const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: user.coordinates,
          zoom: 12,
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