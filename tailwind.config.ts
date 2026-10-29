import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        accent: "var(--color-accent)",
        "accent-bright": "var(--color-accent-bright)",
        muted: "var(--color-muted)",
        ink: "var(--color-ink)",
      },
      borderRadius: {
        card: "var(--radius-card)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
      },
      transitionTimingFunction: {
        smooth: "var(--ease-smooth)",
      },
    },
  },
  plugins: [],
};

export default config;
