import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LiaBeerSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import { supabase } from "@/supabase";
import { toast } from "react-toastify";
import { toastStandard } from "@/lib/cofigs";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

// Schema de validare Yup
const registerSchema = yup.object().shape({
  firstName: yup.string().required("Prenumele este necesar"),
  lastName: yup.string().required("Numele este necesar"),
  email: yup.string().email("Email invalid").required("Email-ul este necesar"),
  password: yup
    .string()
    .required("Parola este necesara")
    .min(8, "Parola trebuie sa aiba cel putin 8 caractere"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Parolele trebuie sa coincida")
    .required("Confirmarea parolei este necesara"),
});

export default function RegisterClient() {
  const navigate = useNavigate();
  const [isPassViz, setIsPassViz] = useState(false);

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  if (user) {
    navigate("/my-account");
  }
  const onSubmit = async (data) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
    });

    if (error) {
      toast.error("Eroare la înregistrare", {
        ...toastStandard,
      });
      console.error(error.message);
    } else {
      toast.success("🍻 Înregistrare reușită", {
        ...toastStandard,
      });
    }
  };
  function togglePasswordVizible() {
    setIsPassViz(!isPassViz);
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-10 md:mt-24 lg:py-0">
      <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <LiaBeerSolid className="text-2xl fill-primary" /> LaBirt.ro
      </h1>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Creaza un cont nou
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName">Prenume</label>
                <input
                  type="text"
                  {...register("firstName")}
                  id="firstName"
                  placeholder="Andrei"
                  className={`input ${errors.firstName ? "is-invalid" : ""}`}
                />
                <p className="errorMessage">{errors.firstName?.message}</p>
              </div>
              <div>
                <label htmlFor="lastName">Nume</label>
                <input
                  type="text"
                  {...register("lastName")}
                  id="lastName"
                  placeholder="Popescu"
                  className={`input ${errors.lastName ? "is-invalid" : ""}`}
                />
                <p className="errorMessage">{errors.lastName?.message}</p>
              </div>
            </div>
            <div>
              <label htmlFor="email">Email </label>
              <input
                type="email"
                {...register("email")}
                id="email"
                placeholder="name@company.com"
                className={`input ${errors.email ? "is-invalid" : ""}`}
              />
              <p className="errorMessage">{errors.email?.message}</p>
            </div>
            <div className="relative">
              <label htmlFor="password">Parola</label>
              <input
                type={isPassViz ? "text" : "password"}
                {...register("password")}
                id="password"
                placeholder="••••••••"
                className={`input ${errors.password ? "is-invalid" : ""}`}
              />
              <button
                type="button"
                className="w-4 h-4 absolute right-3 bottom-3"
                onClick={togglePasswordVizible}
              >
                {isPassViz ? <HiEye /> : <HiEyeSlash />}
              </button>
              <p className="errorMessage">{errors.password?.message}</p>
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword">Confirmare Parolă</label>
              <input
                type={isPassViz ? "text" : "password"}
                {...register("confirmPassword")}
                id="confirmPassword"
                placeholder="••••••••"
                className={`input ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
              />

              <p className="errorMessage">{errors.confirmPassword?.message}</p>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-secondary hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Inregistrare
            </button>
            <p className="text-sm font-light text-gray-500">
              Ai deja un cont?
              <NavLink
                to="/login"
                className="ml-1 font-medium text-secondary hover:underline"
              >
                Logheaza-te
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
