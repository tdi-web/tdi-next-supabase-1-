import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:"#000000", panel:"#0E0E12", card:"#12121A",
        line:"rgba(229,211,155,.18)", text:"#F3F0E6", muted:"#B8B8C5",
        gold:"#E5D39B", gold2:"#CBB873", gold3:"#A8924F"
      },
      boxShadow:{glow:"0 0 0 1px rgba(229,211,155,.18), 0 18px 40px rgba(0,0,0,.45)"}
    }
  },
  plugins: []
} satisfies Config;
