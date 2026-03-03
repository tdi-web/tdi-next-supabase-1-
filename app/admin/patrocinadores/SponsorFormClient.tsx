"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Shell";
import { createClient } from "@/lib/supabase/client";

type Props = { upsertSponsor: (formData: FormData) => Promise<void> };

export default function SponsorFormClient({ upsertSponsor }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [busy, setBusy] = useState(false);

  async function uploadAndGetUrl(f: File) {
    const ext = (f.name.split(".").pop() || "png").toLowerCase();
    const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "png";
    const path = `logos/${Date.now()}-${Math.random().toString(16).slice(2)}.${safeExt}`;

    const { error: upErr } = await supabase.storage
      .from("patrocinadores")
      .upload(path, f, { upsert: true, contentType: f.type });

    if (upErr) throw upErr;

    const { data } = supabase.storage.from("patrocinadores").getPublicUrl(path);
    return data.publicUrl;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    try {
      const form = new FormData(e.currentTarget);

      if (file) {
        const url = await uploadAndGetUrl(file);
        form.set("logo_url", url);
      }

      await upsertSponsor(form);
      e.currentTarget.reset();
      setFile(null);
      setPreview("");
      alert("Patrocinador salvo!");
    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar: " + (err?.message || String(err)));
    } finally {
      setBusy(false);
    }
  }

  function onPick(f?: File | null) {
    if (!f) {
      setFile(null);
      setPreview("");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3">
      <input type="hidden" name="id" />

      <div className="grid gap-3 lg:grid-cols-2">
        <div>
          <label className="text-xs font-extrabold tracking-wide text-muted">Nome</label>
          <input name="name" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" required />
        </div>

        <div>
          <label className="text-xs font-extrabold tracking-wide text-muted">Ordem</label>
          <input name="sort" type="number" defaultValue={0} className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" />
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div>
          <label className="text-xs font-extrabold tracking-wide text-muted">Link (opcional)</label>
          <input name="website_url" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" placeholder="https://..." />
        </div>

        <div>
          <label className="text-xs font-extrabold tracking-wide text-muted">Status</label>
          <select name="is_active" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none">
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div>
          <label className="text-xs font-extrabold tracking-wide text-muted">Logo (upload)</label>
          <input type="file" accept="image/*" className="mt-1 block w-full text-sm" onChange={(e) => onPick(e.target.files?.[0] ?? null)} />
          <div className="mt-2 aspect-[2/1] w-full overflow-hidden rounded-2xl border border-line/60 bg-black/30">
            {preview ? <img src={preview} alt="preview" className="h-full w-full object-contain p-2" /> : <div className="grid h-full w-full place-items-center text-xs text-muted">Sem logo</div>}
          </div>
        </div>

        <div>
          <label className="text-xs font-extrabold tracking-wide text-muted">Logo URL (opcional)</label>
          <input name="logo_url" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" placeholder="https://..." />
          <div className="mt-2 text-[11px] text-muted">Se não fizer upload, cole uma URL.</div>
        </div>
      </div>

      <Button type="submit" disabled={busy}>{busy ? "Aguarde..." : "Salvar"}</Button>
    </form>
  );
}