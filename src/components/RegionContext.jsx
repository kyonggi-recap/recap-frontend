import { createContext, useContext, useState } from "react";

const RegionContext = createContext();

export function RegionProvider({ children }) {
  const [selectedRegion, setSelectedRegion] = useState("국내");
  return (
    <RegionContext.Provider value={{ selectedRegion, setSelectedRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}