import React, { useState, useEffect, Fragment } from "react";
import { supabase } from "../../supabase";
import { Tab } from "@headlessui/react";
import { useParams, NavLink } from "react-router-dom";
import {
  IoHomeOutline,
  IoChevronForward,
  IoLocationOutline,
  IoPhonePortraitSharp,
  IoGlobe
} from "react-icons/io5";
import { LuChefHat } from "react-icons/lu";
import ReservateNow from "../../features/Restaurant/ReservateNow";
import Loading from '../../features/ui/Loading';
import Description from "../../features/Restaurant/Description";
export default function Restaurant() {
  const [restaurantD, setRestaurantD] = useState(null);
  const [error, setError] = useState(false)

  const { restaurantSlug, cityName } = useParams();

  const fallbackImage = "/cities/fallbackImage.webp";

  useEffect(() => {
    async function getMyRestaurant() {
      const { data, error } = await supabase
        .from("restaurants")
        .select()
        .eq("slug", restaurantSlug);
      if (error) {
        setError(true);
        console.log(error);
      }
      setRestaurantD(data[0]);
    }
    getMyRestaurant();
  }, [restaurantSlug]);

  if(!restaurantD) return <Loading/>
  return (
    <div className="max-w-6xl mx-auto mt-10 px-5">
      <div id="bredcrumb">
        <nav>
          <ol className="flex items-center gap-1 text-sm text-gray-600">
            <li>
              <NavLink
                to="/locations"
                className="block transition hover:text-gray-700"
              >
                <span className="sr-only"> Locatii</span>
                <IoHomeOutline className="h-4 w-4 fill-current" />
              </NavLink>
            </li>

            <li className="rtl:rotate-180">
              <IoChevronForward className="h-4 w-4" />
            </li>

            <li>
              <NavLink
                to={`/city/${cityName}`}
                className="block transition hover:text-gray-700 capitalize"
              >
                {cityName}
              </NavLink>
            </li>

            <li className="rtl:rotate-180">
              <IoChevronForward className="h-4 w-4" />
            </li>
            <li>
              <span className="block transition hover:text-gray-700 capitalize underline">
                {restaurantSlug}
              </span>
            </li>
          </ol>
        </nav>
        <hr />
      </div>
      <div id="content" className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-9/12">
          <div id="title">
            <h1 className="font-semibold first-letter:uppercase text-xl sm:text-2xl mb-2">
              {restaurantD?.name || restaurantSlug}
            </h1>
          </div>
          <div id="Image" className="mt-4">
            <img
              src={restaurantD?.photo_url || fallbackImage}
              alt={restaurantSlug}
              className="w-full h-64 md:h-96 mx-auto md:mr-auto ml-0 rounded-md object-cover object-top"
            />
          </div>
          <div id="action" className="block sm:hidden">
            <ReservateNow restaurantId={1} restaurantName={restaurantSlug} />
          </div>
          <div id="description" className="mt-4">
            <Tab.Group>
              <Tab.List className={"border-b-2 border-gray-200 relative"}>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`tabButton ${
                        selected ? "text-orange-500" : "text-gray-500"
                      }`}
                    >
                      Descriere
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`tabButton ${
                        selected ? "text-orange-500" : "text-gray-500"
                      }`}
                    >
                      Recenzii
                    </button>
                  )}
                </Tab>
              </Tab.List>
              <Tab.Panels className={"p-3"}>
                <Tab.Panel><Description restaurantSlug={restaurantSlug} tripAdvId={restaurantD.tripadvisor_id}/></Tab.Panel>
                <Tab.Panel>Content 2</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        <div className="w-1/4 hidden sm:block mt-20 sticky">
          <div className="p-3 bg-gray-100 rounded-md">
            <ul className="fontDmSans space-y-1">
              <li className="flex items-center">
                <LuChefHat className="h-4 w-auto stroke-primary" /> : {restaurantD?.type}
              </li>
              <li className="flex items-center">
                <IoPhonePortraitSharp className="h-4 w-auto fill-primary" /> : {restaurantD?.phone && (<a href={`tel:${restaurantD?.phone}`}>{restaurantD?.phone}</a>)}
              </li>
              <li className="flex items-center">
                <IoLocationOutline className="h-4 w-auto stroke-primary" /> : {restaurantD?.address}, {restaurantD?.city}
              </li>
              <li className="flex items-center">
                <IoGlobe className="h-4 w-auto fill-primary" /> : {restaurantD?.website && (<a href={restaurantD?.website}>{restaurantD?.name} - web</a>)}
              </li>
            </ul>
            <ReservateNow restaurantId={1} restaurantName={restaurantSlug} />
          </div>
        </div>
      </div>
    </div>
  );
}
