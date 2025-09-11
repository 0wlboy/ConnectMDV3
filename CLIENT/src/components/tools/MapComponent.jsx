import React, { useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import "@maptiler/geocoding-control/style.css";

const MapComponent = ({
  lng: initialLng = -66.8656,
  lat: initialLat = 10.4806,
  interactive = true,
  addresses = [],
  onAddresseChange,
}) => {
  maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const markers = useRef([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      const newMap = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [initialLng, initialLat],
        zoom: 12,
        interactive,
        dragPan: interactive,
        scrollZoom: interactive,
        doubleClickZoom: interactive,
        touchZoomRotate: interactive,
      });

      setMap(newMap);

      if (interactive) {

        // Añadir control de geocodificación
        const gc = new GeocodingControl({
          apiKey: import.meta.env.VITE_MAPTILER_API_KEY,
          limit: 3,
          country: "ve",
          types: ["address"],
        });

        newMap.addControl(gc, "top-left");

        // Evento para añadir marcadores al hacer clic en el mapa
        newMap.on("click", (e) => {
          if (addresses.length >= 3) {
            alert("Solo se permiten 3 oficinas.");
            return;
          }
          const { lng, lat } = e.lngLat;
          const newMarker = new maptilersdk.Marker({ color: "#F5D819" })
            .setLngLat([lng, lat])
            .addTo(newMap);
          markers.current.push(newMarker);
          const newAddresses = [...addresses, { lat, lng }];
          if (onAddresseChange) {
            onAddresseChange(newAddresses);
          }
        });
      }

      return () => {
        if (newMap) newMap.remove();
      };
    } catch (error) {
      console.error("Error al inicializar el mapa:", error);
    }
  }, []);

  useEffect(() => {
    if (!map || !addresses.length) return;

    try {
      markers.current.forEach((marker) => {
        if (marker) marker.remove();
      });
      markers.current = [];

      addresses.forEach((coord) => {
        if (coord && coord.lat !== undefined && coord.lng !== undefined) {
          const marker = new maptilersdk.Marker({ color: "#F5D819" })
            .setLngLat([coord.lng, coord.lat])
            .addTo(map);
          markers.current.push(marker);
        }
      });
    } catch (error) {
      console.error("Error al agregar marcadores:", error);
    }
  }, [map, addresses]);

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default MapComponent;
