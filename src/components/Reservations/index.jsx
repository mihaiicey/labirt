import React, { useEffect } from "react";
import { supabase } from "../../supabase";
import { useAuth } from "../../contexts/Auth";
import { toast } from "react-toastify";
import { toastStandard } from "../../lib/cofigs";

export default function MyReservations() {
  const { user } = useAuth();

  useEffect(() => {
    async function getReservations() {
      const { data: reservations, error } = await supabase
        .from("reservations")
        .select(`
            "*",
            restaurants( name, slug, email, phone )
            `)
        .eq("user_uid", user.id);
      console.log(reservations);
    }
    if (user) {
        getReservations()
    }
  }, [user]);

  return (
    <div className="container px-5 md:mx-auto mt-12">
      <h1 className="text-xl sm:text-3xl font-semibold pb-1 border-b-2 border-b-primary">
        Rezervari
      </h1>
    </div>
  );
}
