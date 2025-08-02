import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom organic theme colors
        "organic-green": {
          DEFAULT: "#2D5A3D",
          50: "#F0F7F2",
          100: "#E1EFE5",
          200: "#C3DFCB",
          300: "#A5CFB1",
          400: "#87BF97",
          500: "#69AF7D",
          600: "#4B8F63",
          700: "#2D5A3D",
          800: "#1F3E2A",
          900: "#0F1F15",
        },
        "golden-honey": {
          DEFAULT: "#DAA520",
          50: "#FDF8E8",
          100: "#FBF1D1",
          200: "#F7E3A3",
          300: "#F3D575",
          400: "#EFC747",
          500: "#EBB919",
          600: "#DAA520",
          700: "#B8891A",
          800: "#966D14",
          900: "#74510E",
        },
        "earth-brown": {
          DEFAULT: "#8B4513",
          50: "#F5E6D3",
          100: "#EBCDA7",
          200: "#D7A574",
          300: "#C37D41",
          400: "#AF550E",
          500: "#8B4513",
          600: "#6F370F",
          700: "#53290B",
          800: "#371B07",
          900: "#1B0D04",
        },
        "cream-white": {
          DEFAULT: "#F5F5DC",
          50: "#FEFEFE",
          100: "#FCFCF9",
          200: "#F9F9F1",
          300: "#F7F7E9",
          400: "#F6F6E2",
          500: "#F5F5DC",
          600: "#EEEEBC",
          700: "#E7E79C",
          800: "#E0E07C",
          900: "#D9D95C",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
