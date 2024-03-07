import { supabase, supabaseUrl } from "./supabase-client";
import { Cabin } from "./types/collection";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createEditCabin(newCabin: Cabin, id: number) {
  const hasImgPath = typeof newCabin.image === "string";
  const imgName = `${Math.random()}-${newCabin!.image!.name!}`.replaceAll(
    "/",
    "",
  );

  const imgPath = hasImgPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

  // 1. Main query
  let query = supabase
    .from("cabins");

  // A) Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imgPath }]);

  // B) Edit cabin
  if (id) {
    query = query.update({ ...newCabin, image: imgPath })
      .eq("id", id)
      .select();
  }

  const { data, error: cabinError } = await query;

  // const { data, error: cabinError } = await supabase
  //   .from("cabins")
  //   .insert([{ ...newCabin, image: imgPath }]).returns<Cabin>();

  if (cabinError) {
    console.error(cabinError);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image

  if (!newCabin!.image!) return;

  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, newCabin!.image, {
      contentType: "image/jpeg",
    });

  if (imageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    console.error(imageError);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}
