import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import heroImg from "../../assets/hero1.jpg";
import Locations from "../Locations";
export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <section
        style={{ backgroundImage: `url(${heroImg})` }}
        className="relative bg-no-repeat	bg-cover bg-center"
      >
        <div className="mx-auto max-w-screen-xl px-4 py-28 lg:flex lg:h-[90vh] lg:items-center relative">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-xl font-bold sm:text-4xl text-white">
              <strong className="font-bold text-red-600  sm:block">
                Ti-e foame sau pofta de o bere?
              </strong>
              <br className="sm:hidden" />
              Dar nu ai gasit un local liber?
            </h1>
            <p className="mt-4 text-base sm:text-xl/relaxed text-white">
              Rezerva o masa la restaurantul tau preferat, simplu si rapid.
            </p>
            <div className="mt-8 flex justify-center">
              {user ? (
                <></>
              ) : (
                <NavLink
                  to="/login"
                  className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                >
                  Intra in cont
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </section>
      <Locations />
    </>
  );
}
