"use client";

import { uploadPlayerPhoto } from "./uploadPhotoAction";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Shell";
import { createClient } from "@/lib/supabase/client";

type Props = { upsertPlayer: (formData: FormData) => Promise<void> };

function safeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
}

export default function PlayerFormClient({ upsertPlayer }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  async function onPickFile(file: File | null) {
  if (!file) return;

  setPreviewUrl(URL.createObjectURL(file));
  setUploading(true);

  try {
    const fd = new FormData();
    fd.append("file", file);

    const res = await uploadPlayerPhoto(fd);

    if (!res.ok) throw new Error(res.error);

    setPhotoUrl(res.publicUrl!);
  } catch (e: any) {
    alert(`Erro ao enviar foto: ${e?.message ?? e}`);
    setPreviewUrl("");
    setPhotoUrl("");
    if (fileRef.current) fileRef.current.value = "";
  } finally {
    setUploading(false);
  }
}

  return (
    <form action={upsertPlayer} className="mt-4 space-y-3">
      <input type="hidden" name="id" />
      <input type="hidden" name="photo_url" value={photoUrl} />

      <div className="grid gap-3 lg:grid-cols-[220px,1fr]">
        <div className="rounded-2xl border border-line/60 bg-white/[0.02] p-4">
          <div className="text-xs font-extrabold tracking-wide text-muted">
            Foto do jogador
          </div>

          <div className="mt-3 relative aspect-square w-full overflow-hidden rounded-2xl border border-line/60 bg-black/30">
            {previewUrl || photoUrl ? (
              <Image
                src={previewUrl || photoUrl}
                alt="Foto do jogador"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-muted">
                Sem foto
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => fileRef.current?.click()}
            >
              Selecionar foto
            </Button>

            <div className="text-xs text-muted">
              {uploading ? "Enviando..." : photoUrl ? "Foto pronta ✅" : "PNG/JPG"}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid gap-3 lg:grid-cols-2">
            <div>
              <label className="text-xs font-extrabold tracking-wide text-muted">Nome</label>
              <input name="name" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" required />
            </div>
            <div>
              <label className="text-xs font-extrabold tracking-wide text-muted">Número</label>
              <input name="number" type="number" min="0" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" required />
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div>
              <label className="text-xs font-extrabold tracking-wide text-muted">Posição</label>
              <select name="position" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none">
                <option>Goleiro</option><option>Fixo</option><option>Ala</option><option>Pivô</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-extrabold tracking-wide text-muted">Status</label>
              <select name="is_active" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none">
                <option value="true">Ativo</option><option value="false">Inativo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-extrabold tracking-wide text-muted">Bio</label>
            <textarea name="bio" rows={3} className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" />
          </div>

          <Button type="submit" disabled={uploading || !photoUrl}>
            {uploading ? "Aguarde..." : "Salvar"}
          </Button>

          {!photoUrl ? (
            <div className="text-xs text-muted">
              * Para salvar, selecione uma foto (ela sobe e vira URL automaticamente).
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}