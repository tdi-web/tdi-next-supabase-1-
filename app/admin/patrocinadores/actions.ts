"use server";

import { createClient } from "@/lib/supabase/server";

function isAdminEmail(email?: string | null) {
  return !!email;
}

export async function upsertSponsor(formData: FormData) {
  const supabase = createClient();

  const id = String(formData.get("id") || "").trim() || null;
  const name = String(formData.get("name") || "").trim();
  const logo_url = String(formData.get("logo_url") || "").trim();
  const website_url = String(formData.get("website_url") || "").trim() || null;
  const sort = Number(String(formData.get("sort") || "0"));
  const is_active = String(formData.get("is_active") || "true") === "true";

  if (!name) throw new Error("Nome é obrigatório.");
  if (!logo_url) throw new Error("Logo é obrigatório (upload ou URL).");

  const payload: any = { name, logo_url, website_url, sort, is_active };
  if (id) payload.id = id;

  const { error } = await supabase.from("sponsors").upsert(payload);
  if (error) throw error;
}

export async function deleteSponsor(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("sponsors").delete().eq("id", id);
  if (error) throw error;
}