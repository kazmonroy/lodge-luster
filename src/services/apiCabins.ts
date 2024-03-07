import { supabase, supabaseUrl } from "./supabase-client";
import { Cabin } from "./types/collection";
import { decode } from "base64-arraybuffer";

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

// export async function createCabin(newCabin: any) {
//   console.log(Object.values(newCabin!.image!)[0]!.name);
//   // const imageName = `${Math.random()}-${newCabin.image}`
//   //   .replaceAll("/", "");

//   console.log(newCabin.image);

//   // const imgName = `${Math.random()}-${Object.values(newCabin!.image!)[0]!.name}`
//   //   .replaceAll(
//   //     "/",
//   //     "",
//   //   );

//   const imgName = `${Math.random()}-${Object.values(newCabin!.image!)[0]!.name}`
//     .replaceAll(
//       "/",
//       "",
//     );

//   // https://wgjzrjfkwsremzyxnsxm.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpeg

//   const imgPath =
//     `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

//   // 1. Create cabin
//   const { data, error: cabinError } = await supabase.from("cabins").insert([
//     { ...newCabin, image: imgPath },
//   ])
//     .select();

//   if (cabinError) {
//     console.error(cabinError);
//     throw new Error("Cabin could not be created");
//   }

//   // 2. Upload image

//   const { error: imageError } = await supabase.storage.from("cabin-images")
//     .upload(
//       imgName,
//       newCabin.name!,
//       { contentType: "image/jpeg" },
//     );

//   if (imageError) {
//     console.error(imageError);
//     throw new Error("Image could not be uploaded");
//   }

//   return data;
// }

export async function createCabin(newCabin: Cabin) {
  const imgName = `${Math.random()}-${newCabin!.image!.name!}`.replaceAll(
    "/",
    "",
  );

  const imgPath =
    `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

  // 1. Create cabin
  const { data, error: cabinError } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imgPath }]);

  if (cabinError) {
    console.error(cabinError);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
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
