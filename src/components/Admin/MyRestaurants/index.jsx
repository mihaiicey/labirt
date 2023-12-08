import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { supabase } from "@/supabase";
import { useAuth } from "@/contexts/Auth";
import { toast } from "react-toastify";
import { toastStandard } from "@/lib/cofigs";
import { formatDateHumanReadable } from "@/lib/helpers";
import Loading from "@/features/ui/Loading";
export default function MyRestaurants() {
  const { user } = useAuth();
  const [myRestaurants, setMyRestaurants] = useState(null);

  useEffect(() => {
    async function getMyRestaurants() {
      const { data: restaurants, error } = await supabase
        .from("restaurants")
        .select(
          `
          "*",
          reservations( reservation_status ) [ reservation_status = 'pending' ]
          `
        )
        .eq("user_uid", user.id);
      if (error) {
        toast.error("Incearca mai tarziu", {
          ...toastStandard,
        });
        console.error(error);
      }
      setMyRestaurants(restaurants);
    }
    if (user) {
      getMyRestaurants();
    }
  }, [user]);

if(!myRestaurants) return <Loading/>
  return (
    <>
      <div className="container px-5 md:mx-auto mt-12">
        <h1 className="text-xl sm:text-3xl font-semibold pb-1 border-b-2 border-b-primary">
          Restaurantele mele
        </h1>
        <div className="overflow-x-auto overflow-y-clip">
          <div className="mt-4 inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal border border-gray-100">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Restaurant name</th>
                  <th>Location</th>
                  <th>Pending reservation</th>
                  <th>Created at</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myRestaurants?.map((restaurant) => (
                  <tr key={restaurant?.id}>
                    <td>{restaurant?.id}</td>
                    <td>{restaurant?.name}</td>
                    <td>{restaurant?.address}, {restaurant?.city}</td>
                    <td></td>
                    <td>{formatDateHumanReadable(restaurant?.created_at)}</td>
                    <td><span className={`px-2 py-1 text-white rounded-md ${restaurant?.deleted ? 'canceled' : 'aproved'}`}>{restaurant?.deleted ? 'dezactivat' : 'activat'}</span></td>
                    <td>---</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
