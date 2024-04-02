/** @type {import('tailwindcss').Config} */
import colors, { transparent } from "tailwindcss/colors";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        'platinum': "#e2e9e8",
        'tiffany': {
          100: "hsl(174, 50%, 96%)", 
          200: "hsl(174, 50%, 91%)", 
          300: "hsl(174, 50%, 86%)", 
          400: "hsl(174, 50%, 81%)", 
          500: "hsl(174, 50%, 76%)", 
          600: "hsl(174, 50%, 61%)", 
          700: "hsl(174, 50%, 46%)", 
          800: "hsl(174, 50%, 31%)", 
          900: "hsl(174, 50%, 16%)", 
        },
        'tangerine': {
          100: "hsl(30, 100%, 95%)",
          200: "hsl(30, 100%, 90%)",
          300: "hsl(30, 100%, 85%)",
          400: "hsl(30, 100%, 80%)",
          500: "hsl(30, 100%, 75%)",
          600: "hsl(30, 80%, 62%)",
          700: "hsl(30, 54%, 53%)",
          800: "hsl(30, 20%, 30%)",
          900: "hsl(30, 10%, 15%)",
        },
        'dark-blue': {
          1: '#3d5a7f',
          2: '#283a53',
          3: '#141d29'
        },
        
        tremor: {
            brand: {
              faint: colors.blue[50],
              muted: '#3d5a7f',
              subtle: 'hsl(174, 50%, 46%)',
              DEFAULT: '#283a53',
              emphasis: colors.blue[700],
              inverted: colors.white,
            },
          background: {
            muted: "#e2e9e8",
            subtle: colors.gray[100],
            DEFAULT: "white",
            emphasis: "hsl(30, 100%, 75%)",
          },
            border: {
              DEFAULT: colors.gray[200],
            },
            ring: {
              DEFAULT: colors.gray[200],
            },
            content: {
              subtle: '#3d5a7f',
              DEFAULT: '#3d5a7f',
              emphasis: '#141d29',
              strong: colors.gray[900],
              inverted: colors.white,
            },
          // }
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    ...["[#c1e6e2]"].flatMap((customColor) => [
      `bg-${customColor}`,
      `border-${customColor}`,
      `hover:bg-${customColor}`,
      `hover:border-${customColor}`,
      `hover:text-${customColor}`,
      `fill-${customColor}`,
      `ring-${customColor}`,
      `stroke-${customColor}`,
      `text-${customColor}`,
      `ui-selected:bg-${customColor}`,
      `ui-selected:border-${customColor}`,
      `ui-selected:text-${customColor}`,
    ]),
    ...["[#FFc966]"].flatMap((customColor) => [
      `bg-${customColor}`,
      `border-${customColor}`,
      `hover:bg-${customColor}`,
      `hover:border-${customColor}`,
      `hover:text-${customColor}`,
      `fill-${customColor}`,
      `ring-${customColor}`,
      `stroke-${customColor}`,
      `text-${customColor}`,
      `ui-selected:bg-${customColor}`,
      `ui-selected:border-${customColor}`,
      `ui-selected:text-${customColor}`,
    ]),
    
  ],
  plugins: [require("@headlessui/tailwindcss")],
};
