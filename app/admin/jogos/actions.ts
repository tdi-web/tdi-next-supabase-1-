"use server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function upsertMatch(formData: FormData){
  await requireAdmin();
  const supabase = createClient();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "PRÓXIMO");
  const homeScore = String(formData.get("home_score") ?? "");
  const awayScore = String(formData.get("away_score") ?? "");
  const payload:any = {
    datetime: String(formData.get("datetime") ?? ""),
    competition: String(formData.get("competition") ?? "").trim() || null,
    opponent: String(formData.get("opponent") ?? "").trim(),
    venue: String(formData.get("venue") ?? "").trim(),
    is_home: String(formData.get("is_home") ?? "true") === "true",
    status,
    home_score: status==="FINALIZADO" && homeScore!=="" ? Number(homeScore) : null,
    away_score: status==="FINALIZADO" && awayScore!=="" ? Number(awayScore) : null,
    notes: String(formData.get("notes") ?? "").trim() || null,
  };
  if(!payload.datetime || !payload.opponent || !payload.venue) throw new Error("Campos obrigatórios.");
  const q = id ? supabase.from("matches").update(payload).eq("id", id) : supabase.from("matches").insert(payload);
  const { error } = await q;
  if(error) throw new Error(error.message);
  revalidatePath("/admin/jogos"); revalidatePath("/"); revalidatePath("/jogos");
}

export async function deleteMatch(id: string){
  await requireAdmin();
  const supabase = createClient();
  const { error } = await supabase.from("matches").delete().eq("id", id);
  if(error) throw new Error(error.message);
  revalidatePath("/admin/jogos"); revalidatePath("/"); revalidatePath("/jogos");
}
