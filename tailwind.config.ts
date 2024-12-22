import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EFEFEF",
        foreground: "var(--foreground)",
        accent: "#27ae60",
        accentLight: "#2ecc71",
        darkGrey: "#CFCFCF",
      },
    },
  },
  plugins: [],
} satisfies Config;
