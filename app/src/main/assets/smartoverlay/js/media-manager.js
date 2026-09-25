import { supabase } from "./supabase.js";

const BUCKET = "Ajsmartoverlayfiles";

export async function uploadFile(file, folder = "uploads") {
  if (!file) {
    throw new Error("No file selected");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${folder}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  return {
    path: filePath,
    url: data.publicUrl,
    name: file.name,
    type: file.type,
    size: file.size
  };
}

export async function deleteFile(filePath) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([filePath]);

  if (error) {
    throw error;
  }

  return true;
}
