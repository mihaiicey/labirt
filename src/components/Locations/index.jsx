import { navItems } from "../Nav/navItems";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function Locations() {

  return (
    <section id="location" className="container mx-auto px-5 md:px-0 py-24">
      <h2 className="text-center mb-6 text-2xl md:text-4xl font-medium">
        Top Birturi din Romania
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {navItems.map((item) => (
          <div
            key={item.link}
            className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg w-full md:w-1/4 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image || './cities/fallbackImage.webp'})` }}
          >
            <NavLink to={`/city/${item.link}`}>
              <div className="relative bg-gradient-to-t from-secondary to-secondary/25 pt-32 sm:pt-48 h-full">
                <div className="p-4 sm:p-6">
                  <h3 className="mt-0.5 text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
}
