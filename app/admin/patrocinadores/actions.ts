"use server";

import { createClient } from "@/lib/supabase/server";

function toBool(v: any) {
  return v === true || v === "true" || v === "1";
}

export async function upsertSponsor(formData: FormData) {
  const supabase = createClient();

  const id = (formData.get("id") || "").toString() || null;

  const name = (formData.get("name") || "").toString().trim();
  const website_url = (formData.get("website_url") || "").toString().trim() || null;
  const logo_url = (formData.get("logo_url") || "").toString().trim() || null;
  const is_active = toBool(formData.get("is_active"));

  if (!name) throw new Error("Nome é obrigatório");

  const payload: any = { name, website_url, logo_url, is_active };
  if (id) payload.id = id;

  const { error } = await supabase.from("sponsors").upsert(payload);
  if (error) throw error;
}

export async function deleteSponsor(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("sponsors").delete().eq("id", id);
  if (error) throw error;
}