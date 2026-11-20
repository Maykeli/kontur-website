/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#F5F4EE",
        surface: "#FAF9F5",
        "surface-low": "#EBEAE3",
        "surface-dim": "#E2E1D9",
        "surface-tint": "#EDF1EE",
        "on-surface": "#18191B",
        "on-surface-variant": "#3D403D",
        secondary: "#5C5E64",
        primary: "#3B5944",
        "primary-hover": "#2F4837",
        "primary-tint": "#E8ECE9",
        "outline-light": "#D8D6CD",
        "outline-dim": "#E5E3DB",
      },
      fontFamily: {
        grotesk: ["Hanken Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display": ["4.25rem", { lineHeight: "1.0", letterSpacing: "-0.035em", fontWeight: "700" }],
        "display-mobile": ["2.5rem", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        "section-title": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "600" }],
        "plate-title": ["1.25rem", { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "600" }],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
