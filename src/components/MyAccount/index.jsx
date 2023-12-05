import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { toastStandard } from "../../lib/cofigs";
import * as yup from "yup";
import { useAuth } from "../../contexts/Auth";
import UserEmailProfile from "../../features/ui/forms/UserEmail";
import { supabase } from "../../supabase";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const userSchema = yup.object({
  firstName: yup.string().required("Prenumele este necesar"),
  lastName: yup.string().required("Numele este necesar"),
  phone: yup.string().matches(/^\+?(\d{10,15})$/, "Număr de telefon invalid"),
});

export default function MyAccount() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const phone = watch("phone");

  useEffect(() => {
    if (user && user.user_metadata) {
      setValue("firstName", user.user_metadata.firstName);
      setValue("lastName", user.user_metadata.lastName);
      setValue("phone", user.user_metadata.phone);
    }
  }, [user, setValue]);

  const onSubmit = async (formData) => {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        phone: formData.phone, // am setat telefonul in user_metadata..daca folosesc campul phone din SUpabase, trebuie sa platesc pentru SMS_uri
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
    });

    if (error) {
      toast.error(error.message, {
        ...toastStandard,
      });
    } else if (data) {
      console.log(data);
      toast.success(`Date actualizate 🤩`, {
        ...toastStandard,
      });
    }
  };
  return (
    <div className="container px-5 md:mx-auto mt-12">
      <h1 className="text-xl sm:text-3xl font-semibold pb-1 border-b-2 border-b-primary">
        Profilul meu{" "}
        <span className="text-base">
          - {user?.user_metadata?.user_role || user}
        </span>
      </h1>
    <div className="max-w-4xl">
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName">Prenume</label>
            <input {...register("firstName")} type="text" />
            <p className="text-red-600 text-sm">{errors.firstName?.message}</p>
          </div>
          <div>
            <label htmlFor="lastName">Nume</label>
            <input {...register("lastName")} type="text" />
            <p className="text-red-600 text-sm">{errors.lastName?.message}</p>
          </div>
        </div>
        <UserEmailProfile email={user.email} />
        <div>
          <PhoneInput
            {...register("phone")}
            value={phone}
            onChange={(value) => setValue("phone", value)}
            international
            defaultCountry="RO"
          />
          <p className="text-red-600 text-sm">{errors.phone?.message}</p>
        </div>
        <button type="submit" className="buttonRed">
          Actualizează
        </button>
      </form>
    </div>
    </div>
  );
}
