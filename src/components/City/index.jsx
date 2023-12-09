import React from "react";
import { useParams, NavLink } from "react-router-dom";
import {CityDescription, CityNotFound, Restaurants } from "@/features/City";
import { navItems } from "@/components/Nav/navItems";
import clsx from "clsx";
export default function City() {
  const { cityName } = useParams();
  const isCityAllowed = navItems.some((item) => item.link === cityName);
  if (!isCityAllowed) return <CityNotFound />;

  return (
    <div className="max-w-6xl mx-auto px-5 mt-8">
      <div className="sm:hidden mb-6 sticky top-0 z-10 w-full overflow-auto whitespace-nowrap p-3 rounded-b-md bg-white">
        {navItems.map((item) => (
          <NavLink
            to={`/city/${item.link}`}
            key={item.link}
            className={({ isActive }) =>
              clsx("buttonMenMobile text-black/40 ", {
                ["bg-gray-200 shadow"]: isActive,
              })
            }
          >
            {item.name}
          </NavLink>
        ))}

      </div>
      <CityDescription city={cityName} />
      <Restaurants city={cityName} />
    </div>
  );
}
