import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "TROPA DOS INDIOZINHOS • Futsal",
  description: "Site oficial: elenco, história, jogos e loja (PIX + WhatsApp).",
  icons: [{ rel: "icon", url: "/tdi.png" }],
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return (<html lang="pt-br"><body>{children}</body></html>);
}
