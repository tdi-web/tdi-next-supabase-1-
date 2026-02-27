"use client";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Card, Button } from "@/components/Shell";

export default function AdminLogin(){
  const supabase = createClient();
  const [email,setEmail]=useState("bielmacali44@gmail.com");
  const [password,setPassword]=useState("");
  const [mode,setMode]=useState<"password"|"magic">("password");
  const [msg,setMsg]=useState<string|null>(null);

  async function onSubmit(e:React.FormEvent){
    e.preventDefault(); setMsg(null);
    if(mode==="magic"){
      const { error } = await supabase.auth.signInWithOtp({ email, options:{ emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` }});
      if(error) return setMsg(error.message);
      return setMsg("Enviamos um link de acesso para seu e-mail.");
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if(error) return setMsg(error.message);
    window.location.href="/admin/dashboard";
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mx-auto max-w-md">
        <Card>
          <div className="flex items-center gap-3">
            <Image src="/tdi.png" alt="TDI" width={44} height={44} />
            <div>
              <div className="text-sm font-extrabold">Admin • TROPA DOS INDIOZINHOS</div>
              <div className="text-xs text-muted">Login real (Supabase)</div>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <Button variant={mode==="password"?"solid":"outline"} onClick={()=>setMode("password")}>Senha</Button>
            <Button variant={mode==="magic"?"solid":"outline"} onClick={()=>setMode("magic")}>Link por e-mail</Button>
          </div>

          <form className="mt-5 space-y-3" onSubmit={onSubmit}>
            <div>
              <label className="text-xs font-extrabold tracking-wide text-muted">E-mail</label>
              <input className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none"
                value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            {mode==="password" ? (
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Senha</label>
                <input type="password" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none"
                  value={password} onChange={e=>setPassword(e.target.value)} />
                <div className="mt-2 text-xs text-muted">Se preferir, use o modo Link por e-mail.</div>
              </div>
            ) : (<div className="text-xs text-muted">Vamos mandar um link para o seu e-mail.</div>)}
            <Button type="submit">Entrar</Button>
            {msg ? <div className="text-sm text-gold">{msg}</div> : null}
          </form>
        </Card>
      </div>
    </main>
  );
}
