import { NavLink } from "react-router-dom";

export default function CityNotFound() {
  return (
    <div className="h-[80vh] w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-extrabold text-secondary tracking-widest">
        Orasul nu exista ❌ sau nu avem restaurante in zona ta 😔
      </h1>
      <p className="text-xl">Te rog sa revii mai tarziu.</p>
      <span className="relative block px-3 py-2 mt-4 bg-white rounded-md border border-current">
            <NavLink to="/">Inapoi</NavLink>
          </span>
    </div>
  );
}
