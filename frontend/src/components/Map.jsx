import React, { useEffect, useRef } from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";

import { useMapContextCustom } from "../utils/Context";
import SearchWidget from "./SearchWidget";

const tileLayer = Leaflet.tileLayer(
  "http://tms{s}.visicom.ua/2.0.0/planet3/base_uk/{z}/{x}/{y}.png?key=c73cbb2c85ee55c8c751b7d3b3b3b0cc",
  {
    maxZoom: 19,
    tms: true,
    subdomains: "123",
  }
);

const Map = ({ setStreetRequired }) => {
  const markerRef = useRef(null); // Реф для хранения маркера на карте
  const mapRef = useRef(null); // Реф для хранения объекта карты

  const { latlon, setLatLon, startInputAddress, setStartInputAddress } =
    useMapContextCustom();

  const dataMap = useSelector((state) => state.dataMap);
  const input = document.querySelector("#visicom-autocomplete input");
  const buttonClearInput = document.querySelector(".close");

  if (input) {
    input.addEventListener("input", (event) => {
      if (event.target.value) return setStreetRequired(false);
      setStreetRequired(true);
    });
    buttonClearInput.addEventListener("click", () => setStreetRequired(true));
  }

  useEffect(() => {
    if (input && dataMap?.address && startInputAddress) {
      input.value = dataMap.address.display_name;
    }
  }, [dataMap]);

  useEffect(() => {
    const initializeAutocomplete = () => {
      const map = Leaflet.map("map").setView([latlon.lng, latlon.lat], 10);

      tileLayer.addTo(map);

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        setStartInputAddress(true);
        setStreetRequired(false);
        if (markerRef?.current) {
          map.removeLayer(markerRef.current);
        }

        markerRef.current = Leaflet.marker([lat, lng]).addTo(map);
        setLatLon({ lat, lng });
      });

      return map;
    };

    const map = initializeAutocomplete();
    mapRef.current = map; // Сохраняем объект карты в реф

    return () => {
      map.remove(); // Удалить карту при размонтировании компонента
    };
  }, []);

  useEffect(() => {
    if (latlon && mapRef.current) {
      const map = mapRef.current; // Получаем объект карты из рефа
      map.panTo([latlon.lat, latlon.lng], 10, {
        duration: 1,
      });
    }
  }, [latlon]);

  return (
    <>
      <SearchWidget setLatLon={setLatLon} />
      <div id="map" style={{ width: 600, height: 300 }} />;
    </>
  );
};

export default Map;
