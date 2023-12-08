import { NavLink } from "react-router-dom";

export default function ErrorPage({ error, shortMsg }) {
  return (
    <div className="h-[80vh] w-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-secondary tracking-widest">
        {error}
      </h1>
      <div className="bg-utOrange px-2 text-sm rounded rotate-12 absolute">
        {shortMsg}
      </div>
      <button className="mt-5">
        <NavLink
          to="/"
          className="relative inline-block text-sm font-medium text-utOrange group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 rounded-md transition-transform translate-x-0.5 translate-y-0.5 bg-utOrange group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative block px-8 py-3 bg-white rounded-md border border-current">
            Go Home
          </span>
        </NavLink>
      </button>
    </div>
  );
}
