import { LiaBeerSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
export default function RegisterClient() {
    return(
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-24 lg:py-0">
        <h1
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <LiaBeerSolid className="text-2xl fill-primary" /> LaBirt.ro
        </h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0=">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Creaza un cont nou
            </h2>
            <form className="space-y-4 md:space-y-6" action="#">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label htmlFor="firstName">Prenume</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Andrei"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Nume</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Popescu"
                        required
                    />
                </div>
            </div>
              <div>
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label htmlFor="password">Parola</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required=""
                />
              </div>
              <div className="flex items-center">
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Ai uitat parola? <span className="text-xs">ce pacat :(</span>
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-secondary hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Inregistrare
              </button>
              <p className="text-sm font-light text-gray-500">
                Ai deja un cont?
                <NavLink
                  to="/login"
                  className="ml-1 font-medium text-secondary hover:underline"
                >
                  Logheaza-te
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    )
}