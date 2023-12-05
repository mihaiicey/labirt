import React from "react";
import { useParams, NavLink } from "react-router-dom";
import CityDescription from "../../features/City/CityDescription";
import CityNotFound from "../../features/City/CityNotFound";
import { navItems } from "../Nav/navItems";
export default function City() {
  const { cityName } = useParams();
  const isCityAllowed = navItems.some((item) => item.link === cityName);
  if (!isCityAllowed) return <CityNotFound/>
  return (
    <div className="container mx-auto px-5 mt-10">
      {/* aici componenta de city cu fetch din wikipedia */}
      <CityDescription city={cityName} />
      {/* aici componenta cu fetch din baza de date cu city */}
    </div>
  );
}
