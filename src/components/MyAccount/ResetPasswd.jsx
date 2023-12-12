import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { toastStandard } from "@/lib/cofigs";
import * as yup from "yup";
import { useAuth } from "@/contexts/Auth";
import { supabase } from "@/supabase";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const schema = yup
  .object({
    NewPassword: yup.string().required("Parola este necesara").min(8, "Parola trebuie sa aiba cel putin 8 caractere"),
    RepNewPassword: yup.string().oneOf([yup.ref("NewPassword"), null], "Parolele trebuie sa coincida"),
  })
  .required();

export default function ResetPassword() {
  const { user } = useAuth();
  const [isPassViz, setIsPassViz] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { error } = await supabase.auth.updateUser({ password: data.RepNewPassword });
    if(!error){
        toast.success("Parola salvata", {
        ...toastStandard,
        });
    }else{
        console.error(error)
        toast.error("A aparut o eroare, incearca mai tarziu", {
            ...toastStandard,
            });
    }
  };
  return (
    <div className="container px-5 md:mx-auto mt-12">
      <h1 className="text-xl sm:text-3xl font-semibold pb-1 border-b-2 border-b-primary">
        Resetare parola <span className="text-base">- {user.email}</span>
      </h1>
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="">
            <label htmlFor="NewPassword">Parola noua</label>
            <div className="relative">
              <input type={isPassViz ? "text" : "password"} {...register("NewPassword")} />
              <button
                type="button"
                className="w-4 h-4 absolute right-3 top-3"
                onClick={() => {
                  setIsPassViz(!isPassViz);
                }}
              >
                {isPassViz ? <HiEye /> : <HiEyeSlash />}
              </button>
            </div>
            <p className="errorMessage">{errors.NewPassword?.message}</p>
          </div>
          <div className="relative">
            <label htmlFor="RepNewPassword">Parola noua</label>
            <input type={isPassViz ? "text" : "password"} {...register("RepNewPassword")} />
            <p className="errorMessage">{errors.RepNewPassword?.message}</p>
          </div>
          <button type="submit" className="buttonRed">
            Actualizează
          </button>
        </form>
      </div>
    </div>
  );
}
