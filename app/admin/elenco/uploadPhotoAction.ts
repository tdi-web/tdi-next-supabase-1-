"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadPlayerPhoto(formData: FormData) {
  const supabase = createClient();

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) {
    return { ok: false, error: "Nenhum arquivo selecionado" };
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `players/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("jogadores")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) return { ok: false, error: error.message };

  const { data } = supabase.storage.from("jogadores").getPublicUrl(path);
  return { ok: true, publicUrl: data.publicUrl };
}