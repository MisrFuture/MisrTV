import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          red: "#dc2626",
          "red-dark": "#b91c1c",
          "red-light": "#ef4444",
          yellow: "#facc15",
          "yellow-dark": "#eab308",
          white: "#ffffff",
          "white-muted": "#f8fafc",
          black: "#000000",
          dark: "#0a0a0f",
          card: "#1a1a2e",
          border: "#2a2a3e",
          muted: "#a1a1aa",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "Tahoma", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(220, 38, 38, 0.25), transparent)",
        "hero-glow":
          "radial-gradient(ellipse 60% 40% at 80% 0%, rgba(250, 204, 21, 0.08), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
