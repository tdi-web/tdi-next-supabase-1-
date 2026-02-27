"use client";
import { Button } from "@/components/Shell";

export default function CopyPixButton({ pix }: { pix: string }) {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await navigator.clipboard.writeText(pix);
        alert("Chave PIX copiada!");
      }}
    >
      Copiar PIX
    </Button>
  );
}
