import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#D946EF", // Fuchsia 500 (New Primary)
          accent: "#7C3AED",  // Purple 600 (Moved to Accent)
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
        },
        nav: {
          bg: "#3B1A7D", // Lightened deep purple-indigo
        },
        bg: {
          base: "#F9FAFB",
          card: "#FFFFFF",
        },
        text: {
          primary: "#111827",
          muted: "#6B7280",
        },
        border: "#E5E7EB",
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.06)",
        hover: "0 8px 40px rgba(79,70,229,0.12)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
