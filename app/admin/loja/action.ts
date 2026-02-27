"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function upsertProduct(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();

  const id = String(formData.get("id") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const price = Number(formData.get("price") || 0);
  const photo_url = String(formData.get("photo_url") || "").trim() || null;

  if (!name) throw new Error("Nome é obrigatório");

  const payload = {
    name,
    price_cents: Math.round(price * 100),
    photo_url,
    is_active: true,
  };

  const { error } = await supabase
    .from("products")
    .upsert(id ? { id, ...payload } : payload);

  if (error) throw new Error(error.message);

  revalidatePath("/loja");
  revalidatePath("/admin/loja");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/loja");
  revalidatePath("/admin/loja");
}