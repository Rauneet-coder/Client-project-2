import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      colors: {
        // Premium light palette
        cream: "#FAFAF8",
        "off-white": "#F5F5F2",
        "warm-gray": "#9B9B95",
        charcoal: "#1A1A1A",
        ink: "#0D0D0D",
        accent: "#C8A96E", // warm gold
        "accent-light": "#E8D5A8",
        "accent-dark": "#9A7A45",
        muted: "#6B6B65",
        border: "#E8E8E2",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        "slide-up": "slideUp 0.7s ease forwards",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marqueeReverse 30s linear infinite",
        "grain": "grain 0.5s steps(1) infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow": "spin 8s linear infinite",
        counter: "countUp 2s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "20%": { transform: "translate(3%,2%)" },
          "30%": { transform: "translate(-1%,4%)" },
          "40%": { transform: "translate(4%,-1%)" },
          "50%": { transform: "translate(-3%,3%)" },
          "60%": { transform: "translate(2%,-4%)" },
          "70%": { transform: "translate(-4%,2%)" },
          "80%": { transform: "translate(3%,-2%)" },
          "90%": { transform: "translate(-2%,4%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "noise": "url('/images/noise.png')",
      },
      transitionTimingFunction: {
        "cinematic": "cubic-bezier(0.76, 0, 0.24, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
