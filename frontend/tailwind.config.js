/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        cream: "var(--cream)",
        sage: "var(--sage)",
        "sage-deep": "var(--sage-deep)",
        clay: "var(--clay)",
        ink: "var(--ink)",
        // Overrides for existing classes to adopt new theme
        'lime-accent': 'var(--accent)',
        'dark-slate': 'var(--background)',
        'emerald-primary': 'var(--primary)',
        'emerald-text': 'var(--primary-foreground)',
        'slate': {
          200: 'var(--foreground)',
          400: 'var(--muted-foreground)',
          700: 'var(--border)',
          800: 'var(--card)',
          900: 'var(--muted)'
        },
        'gray': {
          400: 'var(--muted-foreground)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
