import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import {supabase}  from '@/supabase'
import { toast } from "react-toastify";
import { toastStandard } from "@/lib/cofigs";

export function RestaurantDropDown({ id, state, onRefresh }) {

  const deleteRest = async () => {
    const { data, error } = await supabase
      .from("restaurants")
      .update({ 'deleted': !state })
      .eq("id", id )
      .select();
      if(!error){
        onRefresh(true)
      }else{
        toast.error("Eroare la stergere", {
          ...toastStandard,
        });
        console.error(error)
      }
  };

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
            <Menu.Item>
              <NavLink className="dropdownLink" to={`/admin/restaurants/addEdit/${id}?edit=1`}>
                Editeaza
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <button className="dropdownLink" onClick={() => deleteRest()}>
                {state ? "Restaureaza" : "Sterge"}
              </button>
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
