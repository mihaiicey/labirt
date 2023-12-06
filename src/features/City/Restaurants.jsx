import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import StarRest from "../Restaurant/Stars";
import fallbackImage from '../../assets/hero1.jpg'
import { NavLink } from "react-router-dom";

export default function Restaurants({ city }) {
  const [restaurants, setRestaurants] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function getRestaurants() {
      const { data, error } = await supabase
        .from("restaurants")
        .select()
        .eq("city", city);
      if (error) {
        setError(true);
        console.log(error);
      }
      setRestaurants(data);
    }
    getRestaurants();
  }, [city]);
  if (!restaurants || restaurants.length === 0 || error) {
    return <div>Nu există restaurante din {city}.</div>;
  }
  return (
    <section id="restaurante" className="mt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${restaurant?.photo_url || fallbackImage})`,
            }}
            className="h-72 p-3 bg-white rounded-md shadow-md relative group/restaurantbg-center bg-cover"
          >
            <NavLink to={`/restaurant/${city}/${restaurant.slug}`}>
            <div className="restList">
            <h2 className="text-white font-medium text-lg">{restaurant.name}</h2>
            <StarRest tripAdvId={restaurant.tripadvisor_id} />
            </div>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
}
