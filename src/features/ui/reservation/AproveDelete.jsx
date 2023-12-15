import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { supabase } from "@/supabase";
import { toast } from "react-toastify";
import { toastStandard } from "@/lib/cofigs";

export function AproveDelete({ reservation, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const cancelRes = async () => {
    const { data, error } = await supabase
      .from("reservations")
      .update({ reservation_status: "canceled" })
      .eq("id", reservation)
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
      setTimeout(function () {
        onDelete(true);
        setIsOpen(true);
      }, 1000);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-primary px-2 py-1 rounded-md text-white font-medium">
        Anuleaza
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(!isOpen)}>
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
                  <Dialog.Title as="h3" className="text-lg font-medium text-center leading-6 text-gray-900">
                    Esti sigur ca vrei sa stergi rezervare?
                    <hr className="my-1" />
                  </Dialog.Title>
                  <div className="mt-6 items-center flex justify-center gap-6">
                    <button className="bg-primary px-6 py-1 rounded-md text-white" onClick={() => setIsOpen(!isOpen)}>
                      Nu
                    </button>
                    <button
                      className="bg-green-600 px-6 py-1 rounded-md text-white font-medium"
                      onClick={() => cancelRes()}
                    >
                      {" "}
                      Da
                    </button>
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
