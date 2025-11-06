import React, { useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import "@maptiler/geocoding-control/style.css";

const MapComponent = ({
  lng = -66.8656,
  lat = 10.4806,
  interactive = true,
  addresses = [],
  onAddressesChange,
}) => {
   console.log("🗺️ MapComponent render - addresses:", addresses, "length:", addresses.length);
  maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const markers = useRef([]);
  const mapRef = useRef(null);
  const colorMarker = "#F5D819";

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return; // Evitar múltiples instancias

    try {
      const newMap = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [lng, lat],
        zoom: 12,
        interactive,
        dragPan: interactive,
        scrollZoom: interactive,
        doubleClickZoom: interactive,
        touchZoomRotate: interactive,
      });

      mapRef.current = newMap;

      newMap.on("load", () => {
        setMap(newMap);

        if (interactive) {
          const gc = new GeocodingControl({
            apiKey: import.meta.env.VITE_MAPTILER_API_KEY,
            limit: 3,
            country: "ve",
            types: ["address"],
          });
          newMap.addControl(gc, "top-left");

          // Evento para añadir marcadores
          const clickHandler = (e) => {
            console.log("=== CLIC EN MAPA ===");
            console.log("Direcciones actuales en mapa:", addresses);
            console.log("Cantidad actual:", addresses.length);

            if (addresses.length >= 3) {
              alert("Solo se permiten 3 oficinas máximo.");
              return;
            }

            const { lng, lat } = e.lngLat;
            const newAddresses = [...addresses, { lat, lng }];

            console.log("=== CREANDO NUEVO ARRAY ===");
  console.log("addresses actual:", addresses);
  console.log("nueva coordenada:", { lat, lng });
  console.log("array resultante:", newAddresses);

            if (onAddressesChange) {
              onAddressesChange(newAddresses);
            }
          };

          newMap.on("click", clickHandler);
        }
      });

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    } catch (error) {
      console.error("Error al inicializar el mapa:", error);
    }
  }, []); //

  useEffect(() => {
    if (!map) return;

    try {
      // Limpiar marcadores anteriores
      markers.current.forEach((marker) => {
        if (marker) marker.remove();
      });
      markers.current = [];

      // Añadir nuevos marcadores
      addresses.forEach((coord) => {
        if (coord && coord.lat !== undefined && coord.lng !== undefined) {
          const marker = new maptilersdk.Marker({ color: colorMarker })
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
