import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { AproveDisable } from "./AproveDisable";
export function RestaurantDropDown({ id, state, onRefresh }) {

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="relative">
          <HiDotsHorizontal />
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-non z-[9999]">
          <div className="p-2">
            <Menu.Items>
              <NavLink className="dropdownLink" to={`/admin/restaurants/addEdit/${id}?edit=1`}>
                Editeaza
              </NavLink>
            </Menu.Items>
            <Menu.Item>
              <AproveDisable state={state} restaurant={id}/>
            </Menu.Item>
            <Menu.Item>
              <NavLink className="dropdownLink" to={`/admin/restaurants/reservations/${id}`}>
                Vezi rezervari
              </NavLink>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
