"use server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function upsertProduct(formData: FormData){
  await requireAdmin();
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");

  const priceRaw = String(formData.get("price") ?? "").trim();
  const priceCents = Math.round(Number(priceRaw.replace(",", ".")) * 100);

  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    price_cents: Number.isFinite(priceCents) ? priceCents : 0,
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    is_active: String(formData.get("is_active") ?? "true") === "true",
  };

  if(!payload.name) throw new Error("Nome obrigatório.");
  if(!payload.price_cents || payload.price_cents <= 0) throw new Error("Preço inválido.");

  const q = id
    ? supabase.from("products").update(payload).eq("id", id)
    : supabase.from("products").insert(payload);

  const { error } = await q;
  if(error) throw new Error(error.message);

  revalidatePath("/admin/loja");
  revalidatePath("/loja");
  revalidatePath("/");
}

export async function deleteProduct(id: string){
  await requireAdmin();
  const supabase = createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if(error) throw new Error(error.message);

  revalidatePath("/admin/loja");
  revalidatePath("/loja");
  revalidatePath("/");
}
