import React, { useEffect } from "react";
import { useAuth } from "../../../contexts/Auth";
import { useParams, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../../supabase";
import { toast } from "react-toastify";
import { toastStandard } from "../../../lib/cofigs";

const reservationSchema = yup.object({
  numberOfGuests: yup.number().required("Numărul de persoane este necesar"),
  reservationTime: yup.string().required("Ora rezervării este necesară"),
  reservationDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Data rezervării este necesară"),
  servingMeal: yup.string().required("Acest câmp este obligatoriu"),
});

export default function EditReservationCl() {
  const { rsvId, restaurantName } = useParams();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(reservationSchema),
  });
  useEffect(() => {
    async function getReservation() {
      const { data: reservation, error } = await supabase
        .from("reservations")
        .select(
          `
            "*",
            restaurants( name, slug, email, phone, address, city )
            `
        )
        .eq("id", rsvId)
        .eq("user_uid", user.id);
      if (error) {
        toast.error(
          "A aparut o eroare la preluarea datelor, te rog sa incerci mai tarziu.",
          {
            ...toastStandard,
          }
        );
        console.error(error);
      } else {
        setValue("reservationTime", reservation[0]?.reservation_time);
        setValue("reservationDate", reservation[0]?.reservation_date);
        setValue("numberOfGuests", reservation[0]?.number_of_guests);
        setValue("specialRequests", reservation[0]?.special_requests);
        setValue("specialOcasion", reservation[0]?.special_occasions);
        setValue("servingMeal", reservation[0]?.serving_meal);
      }
    }
    if (user) {
      getReservation();
    }
  }, [rsvId, setValue]);

  const onSubmit = async (rsv) => {
    const { error } = await supabase.from("reservations").update([
      {
        reservation_time: rsv?.reservationTime,
        reservation_date: rsv?.reservationDate,
        number_of_guests: rsv?.numberOfGuests,
        special_requests: rsv?.specialRequests,
        special_occasions: rsv?.specialOcasion,
        serving_meal: rsv?.servingMeal,
        reservation_status: "pending",
      },
    ])
    .eq("id", rsvId)
    .eq("user_uid", user.id);
    if (error) {
      toast.error("Eroare la actualizarea rezervarii", {
        ...toastStandard,
      });
      console.error(error);
    } else {
      toast.success("Rezervare actualizata, te asteptam!", {
        ...toastStandard,
      });
    }
  };

  return (
    <div className="container px-5 md:mx-auto mt-12">
      <h1 className="text-xl sm:text-3xl font-semibold pb-1 border-b-2 border-b-primary">
        Editare Rezervare - {restaurantName}
      </h1>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div id="persons">
              <label htmlFor="numberOfGuests">Număr de persoane:</label>
              <select {...register("numberOfGuests")}>
                {Array.from({ length: 19 }, (_, i) => i + 2).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <p className="errorMessage">{errors.numberOfGuests?.message}</p>
            </div>
            <div id="ora">
              <label htmlFor="reservationTime">Ora rezervării:</label>
              <input type="time" {...register("reservationTime")} />
              <p className="errorMessage">{errors.reservationTime?.message}</p>
            </div>
            <div id="date">
              <label htmlFor="reservationDate">Data rezervarii:</label>
              <input type="date" {...register("reservationDate")} />
              <p className="errorMessage">{errors.reservationDate?.message}</p>
            </div>
            <div id="specialOcasion">
              <label htmlFor="specialOcasion">Ocazii speciale?</label>
              <select
                id="specialOcasion"
                name="specialOcasion"
                {...register("specialOcasion")}
              >
                <option value="nu">Nu</option>
                <option value="da">Da</option>
              </select>
            </div>
            <div id="request">
              <label htmlFor="specialRequests">Solicitari speciale</label>
              <input
                type="text"
                name="specialRequests"
                placeholder="Ex: un scaun pentru bebelusi, O masa mare pentr party"
                {...register("specialRequests")}
              />
            </div>
            <div id="eat">
              <label htmlFor="servingMeal">Serviti masa?</label>
              <select
                id="servingMeal"
                name="servingMeal"
                {...register("servingMeal")}
              >
                <option value="">Selectează o opțiune</option>
                <option value="da">Da</option>
                <option value="nu">Nu</option>
                <option value="poate">Poate</option>
              </select>
              <p className="errorMessage">{errors.servingMeal?.message}</p>
            </div>
          </div>
          <div id="button" className="mt-4">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none"
            >
              Actualizeaza
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
