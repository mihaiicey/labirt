import { supabase } from "@/supabase";
//name	address	phone	email	updated_at	created_at	website	photo_url	lat	type	allow_reservation 	city	county	description	tripadvisor_id	slug	lng	user_uid	deleted

export async function updateRestaurant(id, data) {
  const { error } = await supabase
    .from("restaurants")
    .update({ ...data, updated_at: new Date() })
    .eq("id", id);
  if (error) {
    console.log(error)
    return "error";
  } else {
    return "sucess";
  }
}

export async function addRestaurant(data, userId) {
  const {error} = await supabase
  .from("restaurants")
  .insert([
    {
      name: data?.name,
      address: data?.address,
      phone: data?.phone,
      email: data?.email,
      website: data?.website,
      photo_url: data?.photo_url,
      lat: String(data?.lat),
      lng: String(data?.lng),
      type: data?.type,
      city: data?.city,
      county: data?.county,
      description: data?.description,
      tripadvisor_id: Number(data?.tripadvisor_id),
      slug: data?.slug,
      user_uid: userId,
      deleted: false,

    }
  ])
  .select()
  if (error) {
    console.log(error)
    return "error";
  } else {
    return "sucess";
  }
}

export async function getRestaurantById(id) {
  try {
    const {
      data: [restaurant],
    } = await supabase.from("restaurants").select("*").eq("id", id);
    return { restaurant };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
