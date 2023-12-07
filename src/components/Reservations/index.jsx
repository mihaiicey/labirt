import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useAuth } from "../../contexts/Auth";
import { toast } from "react-toastify";
import { toastStandard } from "../../lib/cofigs";

export default function MyReservations() {
  const { user } = useAuth();
  const [myReservations, setMyReservations] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function getReservations() {
      const { data: reservations, error } = await supabase
        .from("reservations")
        .select(
          `
            "*",
            restaurants( name, slug, email, phone, address, city )
            `
        )
        .eq("user_uid", user.id);
      if (error) {
        toast.error("Incearca mai tarziu", {
          ...toastStandard,
        });
        console.error(error);
      }
      setMyReservations(reservations);
      setRefresh(false);
    }
    if (user) {
      getReservations();
    }
  }, [user, refresh]);

  const cancelRes = async (reservationId) => {
    const { data, error } = await supabase
      .from("reservations")
      .update({ reservation_status: "canceled" })
      .eq("id", reservationId)
      .select();
    if (error) {
      toast.error("Nu putem anula rezervarea", {
        ...toastStandard,
      });
      console.error(error);
    } else {
      toast.success("Rezervare anulata", {
        ...toastStandard,
      });
      setRefresh(true);
    }
  };

  return (
    <div className="container px-5 md:mx-auto mt-12">
      <h1 className="text-xl sm:text-3xl font-semibold pb-1 border-b-2 border-b-primary">
        Rezervari
      </h1>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {myReservations?.map((reservation) => (
            <div
              key={reservation.id}
              className="rounded-md p-5 border border-gray-300"
            >
              <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                <h3 className="font-semibold text-lg">
                  {reservation?.restaurants?.name}
                </h3>
                <div
                  className={`px-2 py-1 rounded-md font-semibold ${reservation?.reservation_status}`}
                >
                  <p className="text-sm">{reservation?.reservation_status}</p>
                </div>
              </div>
              <div className="mt-3">
                <p>
                  Rezervat: {reservation?.reservation_date} ,{" "}
                  {reservation.reservation_time}
                </p>
                <div className="flex sm:flex-row flex-col sm:items-center justify-between mt-3 space-y-2 sm:space-y-0">
                  <p className="text-sm">
                    {reservation?.restaurants?.address},{" "}
                    {reservation?.restaurants?.city}
                  </p>
                  <p className="text-sm">{reservation?.restaurants?.phone}</p>
                </div>
              </div>

              {reservation?.reservation_status !== "canceled" && (
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => cancelRes(reservation?.id)}
                    className="bg-primary px-2 py-1 rounded-md text-white font-medium"
                  >
                    Anuleaza
                  </button>
                  <button className="bg-green-600 px-2 py-1 rounded-md text-white font-medium">
                    Editeaza
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
