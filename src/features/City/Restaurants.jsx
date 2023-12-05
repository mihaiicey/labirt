import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { toast } from "react-toastify";
import { toastStandard } from "../../lib/cofigs";

export default function Restaurants({ city }) {
  const [restaurants, setRestaurants] = useState(null);
  const [error, setError] = useState(false);
  const fallbackImage = window.location.origin + "/hero1.jpg";
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
    return <div>Nu există restaurante în {city}.</div>;
  }
  console.log(restaurants);
  return (
    <section id="restaurante" className="mt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${restaurant?.photo_url || fallbackImage})`,
            }}
            className="h-72 p-3 bg-white rounded-md shadow-md relative group/restaurant cursor-pointer bg-center bg-cover"
          >
            <div className="restList">
            <h2 className="text-white font-medium text-lg">{restaurant.name}</h2>
            <span className="text-white text-sm">Aici o sa fie nota restaurantului</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
