import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#5B7FED",
          'purple-dark': "#4D6FE8",
          'purple-light': "#7B9EF1",
          'purple-subtle': "#E9D8FD",
          'purple-50': "#FAF5FF",
        },
        accent: {
          pink: "#EC4899",
          success: "#10B981",
          warning: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-sora)", "sans-serif"],
        urbanist: ["var(--font-urbanist)", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        fraunces: ["var(--font-fraunces)", "serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;