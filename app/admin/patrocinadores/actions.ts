"use server";

import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

function parseBool(v: FormDataEntryValue | null) {
  return String(v ?? "true") === "true";
}

export async function upsertSponsor(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();

  const id = String(formData.get("id") || "").trim() || null;
  const name = String(formData.get("name") || "").trim();
  const logo_url = String(formData.get("logo_url") || "").trim() || null;
  const website = String(formData.get("website") || "").trim() || null;
  const is_active = parseBool(formData.get("is_active"));

  if (!name) throw new Error("Nome é obrigatório.");

  const payload: any = { name, logo_url, website, is_active };
  if (id) payload.id = id;

  const { error } = await supabase.from("sponsors").upsert(payload);
  if (error) throw error;
}

export async function deleteSponsor(id: string) {
  await requireAdmin();
  const supabase = createClient();
  const { error } = await supabase.from("sponsors").delete().eq("id", id);
  if (error) throw error;
}