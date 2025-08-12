import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
import debounce from "lodash.debounce";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-62.75);
  const [lat] = useState(8.35);
  const [zoom] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = debounce(async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.maptiler.com/geocoding/${query}.json?key=l46c5JKjM2eZKiqNHWHe&autocomplete=true`
      );
      setSuggestions(response.data.features);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, 300);

  const saveLocation = (lng, lat, marker) => {
    const newLocation = { lng, lat, marker, timestamp: Date.now() };
    setSavedLocations(prevLocations => {
      const newLocations = [...prevLocations, newLocation];
      localStorage.setItem("savedLocations", JSON.stringify(newLocations));
      return newLocations;
    });
  };

  const handleSearch = async () => {
    if (suggestions.length > 0) {
      const suggestion = suggestions[0];
      const [lng, lat] = suggestion.center;
      map.current.flyTo({ center: [lng, lat], zoom: 15 });
      const marker = new maplibregl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);
      saveLocation(lng, lat, marker);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedLocations = localStorage.getItem("savedLocations");
    if (storedLocations) {
      const parsedLocations = JSON.parse(storedLocations);
      const validLocations = parsedLocations.filter(
        loc => Date.now() - loc.timestamp < 86400000 // 24 horas en milisegundos
      );
      setSavedLocations(validLocations);
    }
  }, []);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets/style.json?key=l46c5JKjM2eZKiqNHWHe`,
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.on("webglcontextlost", (e) => {
        e.preventDefault();
        console.log("WebGL context lost, recreating map...");
        setTimeout(() => {
          if (map.current) {
            map.current.remove();
            map.current = null;
          }
          if (mapContainer.current) {
            map.current = new maplibregl.Map({
              container: mapContainer.current,
              style: `https://api.maptiler.com/maps/streets/style.json?key=l46c5JKjM2eZKiqNHWHe`,
              center: [lng, lat],
              zoom: zoom,
            });
            // Vuelve a registrar los eventos
            map.current.on("click", (e) => {
              const { lng, lat } = e.lngLat;
              const marker = new maplibregl.Marker()
                .setLngLat([lng, lat])
                .addTo(map.current);
              setSavedLocations(prevLocations => {
                if (prevLocations.length >= 3) {
                  alert("Solo puedes guardar 3 direcciones.");
                  marker.remove();
                  return prevLocations;
                }
                saveLocation(lng, lat, marker);
                return [...prevLocations, { lng, lat, marker }];
              });
            });
          }
        }, 100);
      });

      map.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        const marker = new maplibregl.Marker()
          .setLngLat([lng, lat])
          .addTo(map.current);
        setSavedLocations(prevLocations => {
          if (prevLocations.length >= 3) {
            alert("Solo puedes guardar 3 direcciones.");
            marker.remove();
            return prevLocations;
          }
          saveLocation(lng, lat, marker);
          return [...prevLocations, { lng, lat, marker }];
        });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lng, lat, zoom]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mi Aplicación con MapLibre</h1>
      <div className="search-container relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && suggestions.length > 0) {
              handleSearch();
              setShowSuggestions(false);
            }
          }}
          placeholder="Buscar dirección..."
          className="p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Buscar
        </button>
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchQuery(suggestion.place_name);
                  setShowSuggestions(false);
                  const [lng, lat] = suggestion.center;
                  map.current.flyTo({ center: [lng, lat], zoom: 15 });
                  const marker = new maplibregl.Marker()
                    .setLngLat([lng, lat])
                    .addTo(map.current);
                  saveLocation(lng, lat, marker);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div ref={mapContainer} className="map-container w-full h-96" />
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Ubicaciones Guardadas</h2>
        <ul>
          {savedLocations.map((location, index) => (
            <li key={index} className="mb-2">
              Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
              <button
                onClick={() => {
                  location.marker.remove();
                  setSavedLocations(prevLocations => {
                    const newLocations = prevLocations.filter((_, i) => i !== index);
                    localStorage.setItem("savedLocations", JSON.stringify(newLocations));
                    return newLocations;
                  });
                }}
                className="ml-2 p-1 bg-red-500 text-white rounded"
              >
                Eliminar
              </button>
              <button
                onClick={() => {
                  map.current.flyTo({ center: [location.lng, location.lat], zoom: 15 });
                }}
                className="ml-2 p-1 bg-gray-200 rounded"
              >
                Ver en mapa
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
