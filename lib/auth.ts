import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data, error } = await supabase.from("admins").select("email").eq("email", user.email!).maybeSingle();
  if (error || !data) redirect("/admin/login");
  return user;
}
