import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-62.75);
  const [lat] = useState(8.35);
  const [zoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/aquarelle/style.json?key=onNOZeRa8h6WlgkoOiT9`,
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mi Aplicación con MapLibre</h1>
      <div ref={mapContainer} className="map-container w-full h-96" />
    </div>
  );
};

export default MapComponent;
