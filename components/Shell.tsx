import Link from "next/link";
import Image from "next/image";

export function Header({ subtitle }: { subtitle?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/tdi.png" alt="TDI" width={44} height={44} className="drop-shadow" />
          <div className="leading-tight">
            <div className="text-[13px] font-extrabold tracking-wide">TROPA DOS INDIOZINHOS</div>
            <div className="text-xs text-muted">{subtitle ?? "Diamante d’Oeste • Preto & Dourado"}</div>
          </div>
        </Link>
       <nav className="flex flex-wrap items-center justify-end gap-4 text-[12px] font-extrabold">
  <Link className="hover:text-text" href="/elenco">ELENCO</Link>
  <Link className="hover:text-text" href="/jogos">JOGOS</Link>
  <Link className="hover:text-text" href="/historia">HISTÓRIA</Link>
  <Link className="hover:text-text" href="/loja">LOJA</Link>
  <Link className="hover:text-text" href="/patrocinadores">PATROCINADORES</Link>
  <Link className="hover:text-text" href="/admin/dashboard">ADMIN</Link>
</nav>
      </div>
    </header>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"rounded-2xl border border-line/60 bg-white/[0.03] p-5 shadow-glow " + className}>
      {children}
    </div>
  );
}

export function Button({ children, href, variant = "solid", type, onClick }: any) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-extrabold tracking-wide transition";
  const solid = "bg-gradient-to-b from-gold to-gold2 text-black shadow-glow hover:brightness-105";
  const outline = "border border-line/60 bg-transparent text-text hover:bg-white/[0.03]";
  const cls = base + " " + (variant === "outline" ? outline : solid);
  if (href) return <a className={cls} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{children}</a>;
  return <button type={type ?? "button"} className={cls} onClick={onClick}>{children}</button>;
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-line/60 bg-white/[0.02] px-3 py-1 text-xs font-bold text-muted">{children}</span>;
}
