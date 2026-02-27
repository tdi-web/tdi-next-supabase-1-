"use server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function upsertPlayer(formData: FormData){
  await requireAdmin();
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    number: Number(formData.get("number") ?? 0),
    position: String(formData.get("position") ?? "Ala"),
    bio: String(formData.get("bio") ?? "").trim() || null,
    photo_url: String(formData.get("photo_url") ?? "").trim() || null,
    is_active: String(formData.get("is_active") ?? "true") === "true",
  };
  if(!payload.name || !payload.number) throw new Error("Nome e número obrigatórios.");
  const q = id ? supabase.from("players").update(payload).eq("id", id) : supabase.from("players").insert(payload);
  const { error } = await q;
  if(error) throw new Error(error.message);
  revalidatePath("/admin/elenco"); revalidatePath("/"); revalidatePath("/elenco");
}

export async function deletePlayer(id: string){
  await requireAdmin();
  const supabase = createClient();
  const { error } = await supabase.from("players").delete().eq("id", id);
  if(error) throw new Error(error.message);
  revalidatePath("/admin/elenco"); revalidatePath("/"); revalidatePath("/elenco");
}
