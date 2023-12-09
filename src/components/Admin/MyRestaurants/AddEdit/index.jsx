import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { toastStandard } from "@/lib/cofigs";
import { addRestaurant, updateRestaurant, getRestaurantById } from '@/lib/restaurantService';

const formSchema = yup.object({
  name: yup.string().required("Numele este obligatoriu"),
  address: yup.string().required("Adresa este necesara"),
  city: yup.string().required("Orasul este necesar"),
  county: yup.string().required("Judetul este necesar"),
  phone: yup.string().matches(/^\+?\d[\d\s\-()]*$/, "Numar de telefon invalid"),
  email: yup.string().email("Email invalid").required("Email-ul este necesar"),
  type: yup.string().required("Tipul este obligatoriu"),
  website: yup.string().url("URL invalid"),
  lat: yup.string().required("Latitudinea este necesara"),
  lng: yup.string().required("Longitudinea este necesara"),
  photo_url: yup.string().url("URL-ul este necesar"),
  // tripadvisor_id: yup.number().required("Id-ul este necesar"),
  description: yup.string().required("Descrierea este necesara"),
});

export default function AddEditRestaurant() {
  const {user} = useAuth()
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("edit") === "1";
  const { id } = useParams();
  const {register, handleSubmit, watch, reset, setValue, formState: { errors },} = useForm({resolver: yupResolver(formSchema),});
  const watchedName = watch("name");

  useEffect(() => {
    async function fetchRestaurantData() {
      const { restaurant, error } = await getRestaurantById(id);
      if (error) {
        toast.error("eroare la preluarea datelor", {
          ...toastStandard,
        });
      } else if (restaurant) {
        setValue("name", restaurant?.name);
          setValue("address", restaurant?.address);
          setValue("slug", restaurant?.slug);
          setValue("city", restaurant?.city);
          setValue("county", restaurant?.county);
          setValue("phone", restaurant?.phone);
          setValue("email", restaurant?.email);
          setValue("website", restaurant?.website);
          setValue("type", restaurant?.type)
          setValue("lat", restaurant?.lat);
          setValue("lng", restaurant?.lng);
          setValue("photo_url", restaurant?.photo_url);
          setValue("tripadvisor_id", restaurant?.tripadvisor_id);
          setValue("description", restaurant?.description);
      }
    }
  
    if (isEditMode && id) {
      fetchRestaurantData();
    }
  }, [id, isEditMode]);


  function createSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  useEffect(() => {
    setValue("slug", createSlug(watchedName || ""));
  }, [watchedName, setValue]);

  const onSubmit = async (data) => {
    if (isEditMode && id) {
      const updated = await updateRestaurant(id, data);
      if (updated === "sucess") {
        toast.success("Restaurant actualizat :)", {
          ...toastStandard,
        });
      } else {
        toast.error("A aparut o eroare la actualizare, incearca mai tarziu", {
          ...toastStandard,
        });
      }
    } else {
      const added = await addRestaurant(data, user?.id);
      if (added === "sucess") {
        toast.success("Restaurant adaugat :)", {
          ...toastStandard,
        });
        reset()
      } else {
        toast.error("A aparut o eroare la adaugare, incearca mai tarziu", {
          ...toastStandard,
        });
      }
    }
  };

  return (
    <div className="container px-5 md:mx-auto mt-12">
      <h1 className="text-xl sm:text-3xl font-semibold pb-1 border-b-2 border-b-primary">{isEditMode ? 'Editare': 'Adaugare'} Restaurant</h1>
      <div id="form" className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          {/* date generare÷ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name">Nume Restaurant</label>
              <input name="name" type="text" {...register("name")} />
              <p className="errorMessage">{errors.name?.message}</p>
            </div>
            <div>
              <label htmlFor="slug">Slug</label>
              <input type="text" name="slug" className="read-only:cursor-not-allowed read-only:opacity-50" {...register("slug")} readOnly />
            </div>
          </div>
          {/* telefon email site */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="phone">Telefon</label>
              <input name="phone" type="text" {...register("phone")} />
              <p className="errorMessage">{errors.phone?.message}</p>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input name="email" type="text" {...register("email")} />
              <p className="errorMessage">{errors.email?.message}</p>
            </div>
            <div>
              <label htmlFor="website">Website</label>
              <input name="website" type="text" {...register("website")} />
              <p className="errorMessage">{errors.website?.message}</p>
            </div>
          </div>
          {/* adresa oras judet  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="address">Adresa</label>
              <input name="address" type="text" {...register("address")} />
              <p className="errorMessage">{errors.address?.message}</p>
            </div>
            <div>
              <label htmlFor="city">Oras</label>
              <select name="city" {...register("city")}>
                <option value="sibiu">Sibiu</option>
                <option value="targu-mures">Targu Mures</option>
              </select>
              <p className="errorMessage">{errors.city?.message}</p>
            </div>
            <div>
              <label htmlFor="county">Judet</label>
              <select name="county" {...register("county")}>
                <option value="sibiu">Sibiu</option>
                <option value="mures">Mures</option>
              </select>
              <p className="errorMessage">{errors.county?.message}</p>
            </div>
          </div>
          {/* lat long trip id */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="lat">Latitudine</label>
              <input name="lat" type="text" {...register("lat")} />
              <p className="errorMessage">{errors.lat?.message}</p>
            </div>
            <div>
              <label htmlFor="lng">Longitudine</label>
              <input name="lng" type="text" {...register("lng")} />
              <p className="errorMessage">{errors.lng?.message}</p>
            </div>
            <div>
              <label htmlFor="tripadvisor_id">TripAdvisor ID</label>
              <input name="tripadvisor_id" type="number"{...register("tripadvisor_id")} />
              {/* <p className="errorMessage">{errors.tripadvisor_id?.message}</p> */}
            </div>
          </div>

          {/* imagine descriere */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="photo_url">Url Imagine</label>
            <input name="photo_url" type="text" {...register("photo_url")} />
            <p className="errorMessage">{errors.photo_url?.message}</p>
          </div>
          <div>
          <label htmlFor="type">Mancare servita</label>
            <input name="type" type="text" {...register("type")} />
            <p className="errorMessage">{errors.type?.message}</p>
          </div>
          </div>

          <div>
            <label htmlFor="description">Descriere</label>
            <textarea id="description" className="h-[164px] sm:h-auto" {...register("description")}></textarea>
            <p className="errorMessage">{errors.description?.message}</p>
          </div>

          <button type="submit" className="buttonRedLine">
            {isEditMode ? "Actualizeaza" : "Adauga"}
          </button>
        </form>
      </div>
    </div>
  );
}
