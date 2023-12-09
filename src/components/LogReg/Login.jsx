import { useState } from "react";
import { useAuth } from "@/contexts/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "@/supabase";
import { toast } from "react-toastify";
import { toastStandard } from "@/lib/cofigs";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { LiaBeerSolid } from "react-icons/lia";

const loginSchema = yup.object({
  email: yup.string().email("Email invalid").required("Email-ul este necesar"),
  password: yup.string().required("Parola este necesară"),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/my-account";
  const { user } = useAuth();
  const [isPassViz, setIsPassViz] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      toast.error("Email sau parola greșită", {
        ...toastStandard,
      });
    } else {
      toast.success("🍻 Autentificare reușită", {
        ...toastStandard,
      });
      reset({ email: "", password: "" });
      navigate(from);
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
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0=">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Intra in cont</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" {...register("email")} placeholder="name@company.com" />
              <p className="errorMessage">{errors.email?.message}</p>
            </div>
            <div className="relative">
              <label htmlFor="password">Parola</label>
              <input type={isPassViz ? "text" : "password"} {...register("password")} placeholder="••••••••" />
              <button type="button" className="w-4 h-4 absolute right-3 bottom-3" onClick={togglePasswordVizible}>
                {isPassViz ? <HiEye /> : <HiEyeSlash />}
              </button>
              <p className="errorMessage">{errors.password?.message}</p>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-secondary hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Logare
            </button>
            <p className="text-sm font-light text-gray-500">
              Nu ai cont?
              <NavLink to="/register" className="ml-1 font-medium text-secondary hover:underline">
                Inregistreaza-te
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
