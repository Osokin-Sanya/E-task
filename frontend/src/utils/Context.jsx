import { createContext, useContext, useState } from "react";

const defaultValue = {
  latlon: {
    lat: 50.402145,
    lng: 30.614623,
  },
  setLocation: () => {},
};

const MapContextCustom = createContext(defaultValue);

export function MapContextProvider({ children }) {
  const [latlon, setLatLon] = useState(defaultValue.latlon);
  const [startInputAddress, setStartInputAddress] = useState(false);
  const provideValue = {
    latlon,
    setLatLon,
    startInputAddress,
    setStartInputAddress,
  };

  return (
    <MapContextCustom.Provider value={provideValue}>
      {children}
    </MapContextCustom.Provider>
  );
}

export function useMapContextCustom() {
  return useContext(MapContextCustom);
}
