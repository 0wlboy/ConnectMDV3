import React, { useEffect, useRef, useState } from "react";
import { Map, Marker, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
//import axios from "axios";
//import debounce from "lodash.debounce";

const MapComponent = ({
  lng: initialLng = -66.8656,
  lat: initialLat = 10.4806,
  interactive = true,
  addresses = [],
}) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(initialLng); // Longitud de Caracas
  const [lat, setLat] = useState(initialLat); // Latitud de Caracas
  const [zoom, setZoom] = useState(12);
  const markers = useRef([]);

  // Inicializar el mapa
  useEffect(() => {
    if (!mapContainer.current || map) return;

    const newMap = new Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=l46c5JKjM2eZKiqNHWHe`,
      center: [lng, lat],
      zoom: zoom,
      interactive,
      dragPan: interactive,
      scrollZoom: interactive,
      doubleClickZoom: interactive,
      touchZoomRotate: interactive,
    });

    // Guarda el mapa en el estado
    setMap(newMap);

    // Añade controles de navegación (zoom y rotación)
    if (interactive){
      newMap.addControl(new NavigationControl(), "top-right");

      // Actualiza el estado cuando el mapa se mueve
    newMap.on("move", () => {
      setLng(newMap.getCenter().lng.toFixed(4));
      setLat(newMap.getCenter().lat.toFixed(4));
      setZoom(newMap.getZoom().toFixed(2));
    });
    }
    

    

    return () => {
      if (newMap) newMap.remove();
    };
  }, [interactive]);

  useEffect(() => {
    if (!map || !addresses.length) return;

    // Limpiar marcadores anteriores
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    // Añadir nuevos marcadores
    addresses.forEach((coord) => {
      const marker = new Marker({ color: "#3FB1CE" })
        .setLngLat([coord.lng, coord.lat])
        .addTo(map);
      markers.current.push(marker); // Guarda el marcador para limpieza posterior
    });
  }, [map, addresses]); // Solo se ejecuta cuando el mapa o las direcciones cambian

  return (
    <div className="container mx-auto p-4">
      <div ref={mapContainer} className="map-container w-full h-96" />
    </div>
  );
};

export default MapComponent;
