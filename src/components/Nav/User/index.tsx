import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/Auth";

export default function UserMen() {
  const navigate = useNavigate();

  const [customOpen, setCustomOpen] = useState(false);
  const { session, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    navigate("/login");
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="relative">
          {session ? (
            <img
              src={window.location.origin + "/user.jpeg"}
              alt="User"
              className={`w-10 h-10 rounded-full object-cover border-secondary border`}
            />
          ) : (
            <span className="px-2 py-1 rounded-md bg-primary text-white font-semibold">
              Autentifica-te
            </span>
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          {!session && (
            <div className="px-1 py-1 font-normal">
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    to="/login"
                    className={`${ active ? "text-primary underline" : "text-gray-900"} dropdownLink`}
                  >
                    Intra in cont
                  </NavLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    to="/register"
                    className={`${ active ? "text-primary underline" : "text-gray-900"} dropdownLink`}
                  >
                    Creaza cont
                  </NavLink>
                )}
              </Menu.Item>
            </div>
          )}

          {session != null && (
            <>
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    to="/my-account"
                    className={`${ active ? "text-primary underline" : "text-gray-900"} dropdownLink`}
                  >
                    Contul meu
                  </NavLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    to="/reservations"
                    className={`${ active ? "text-primary underline" : "text-gray-900"} dropdownLink`}
                  >
                    Rezervarile Mele
                  </NavLink>
                )}
              </Menu.Item>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleSignOut}
                      className={`${ active ? "text-primary underline" : "text-gray-900"} border-t border-gray-100 dropdownLink`}
                    >
                      Deconectare
                    </button>
                  )}
                </Menu.Item>
              </div>
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
