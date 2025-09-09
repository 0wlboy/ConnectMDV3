import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
import debounce from "lodash.debounce";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]); // Referencia para almacenar los marcadores
  const [lng] = useState(-62.75);
  const [lat] = useState(8.35);
  const [zoom] = useState(12);






  return (
    <div className="container mx-auto p-4">
      <div ref={mapContainer} className="map-container w-full h-96" />
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Ubicaciones Guardadas</h2>
      </div>
    </div>
  );
};

export default MapComponent;
