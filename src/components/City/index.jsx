import React, {Suspense} from "react";
import { useParams, NavLink } from "react-router-dom";
import CityDescription from "../../features/City/CityDescription";
import CityNotFound from "../../features/City/CityNotFound";
import Restaurants from "../../features/City/Restaurants";
import { navItems } from "../Nav/navItems";
export default function City() {
  const { cityName } = useParams();
  const isCityAllowed = navItems.some((item) => item.link === cityName);
  if (!isCityAllowed) return <CityNotFound />;

  return (
    <div className="max-w-6xl mx-auto px-5 mt-10">
      <CityDescription city={cityName} />
      {/* <Suspense fallback={<>Loading...</>}> */}
        <Restaurants city={cityName} />
      {/* </Suspense> */}
    </div>
  );
}
