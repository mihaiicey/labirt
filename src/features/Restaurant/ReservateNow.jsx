import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuCalendarHeart } from "react-icons/lu";
import { useAuth } from "../../contexts/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../supabase";
import { toast } from "react-toastify";
import { toastStandard } from "../../lib/cofigs";

const reservationSchema = yup.object({
  numberOfGuests: yup.number().required("Numărul de persoane este necesar"),
  reservationTime: yup.string().required("Ora rezervării este necesară"),
  reservationDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Data rezervării este necesară"),
  servingMeal: yup.string().required("Acest câmp este obligatoriu"),
});

export default function ReservateNow({ rstId, restaurantName }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { session, isLoading } = useAuth();
  let [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(reservationSchema),
  });

  function handleModal() {
    setIsOpen(!isOpen);
  }
  const onSubmit = async (rsv) => {
    const { error } = await supabase
      .from("reservations")
      .insert([
        {
          user_uid: session?.user?.id,
          restaurant_id: rstId,
          reservation_time: rsv?.reservationTime,
          reservation_date: rsv?.reservationDate,
          number_of_guests: rsv?.numberOfGuests,
          special_requests: rsv?.specialRequests,
          special_occasions: rsv?.specialOcasion,
          serving_meal: rsv?.servingMeal,
          reservation_status: 'pending'
        },
      ])
    if (error) {
      toast.error("Eroare la creare rezervarii", {
        ...toastStandard,
      });
      console.error(error);
    } else {
      toast.success("Rezervare adaugata, te asteptam!", {
        ...toastStandard,
      });
      reset();
      setTimeout(function(){
        handleModal();
      },1000)
    }
  };

  const handleLogin = () =>{
    navigate("/login", { state: { from: pathname } });
  }

  if (!session) {
    return (
      <div className="mt-4">
        <button
          onClick={handleLogin}
          className="rounded-md bg-primary w-full mt-4 p-2 text-base fontMavenPro font-medium text-white hover:bg-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Logheaza-te pentru a rezerva
        </button>
      </div>
    );
  }
  console.log(rstId)
  return (
    <>
      <button
        type="button"
        onClick={handleModal}
        className="rounded-md bg-primary w-full mt-4 py-2 text-base fontMavenPro font-medium text-white hover:bg-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <LuCalendarHeart className="w-6 h-6 inline-block" /> Rezerva o masa
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Rezervare la{" "}
                    <span className="capitalize">{restaurantName}</span>
                    <hr className="my-1" />
                  </Dialog.Title>
                    <button className="py-1 px-2 absolute top-2 right-4 border border-secondary rounded-md" onClick={handleModal}>X</button>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div id="persons">
                          <label htmlFor="numberOfGuests">
                            Număr de persoane:
                          </label>
                          <select {...register("numberOfGuests")}>
                            {Array.from({ length: 19 }, (_, i) => i + 2).map(
                              (value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              )
                            )}
                          </select>
                          <p className="errorMessage">
                            {errors.numberOfGuests?.message}
                          </p>
                        </div>
                        <div id="ora">
                          <label htmlFor="reservationTime">
                            Ora rezervării:
                          </label>
                          <input type="time" {...register("reservationTime")} />
                          <p className="errorMessage">
                            {errors.reservationTime?.message}
                          </p>
                        </div>
                        <div id="date">
                          <label htmlFor="reservationDate">
                            Data rezervarii:
                          </label>
                          <input type="date" {...register("reservationDate")} />
                          <p className="errorMessage">
                            {errors.reservationDate?.message}
                          </p>
                        </div>
                        <div id="specialOcasion">
                          <label htmlFor="specialOcasion">
                            Ocazii speciale?
                          </label>
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
                          <label htmlFor="specialRequests">
                            Solicitari speciale
                          </label>
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
                          <p className="errorMessage">
                            {errors.servingMeal?.message}
                          </p>
                        </div>
                      </div>
                      <div id="button" className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none"
                        >
                          Rezerva
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
