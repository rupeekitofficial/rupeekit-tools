import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brandNavy: "#003080",
        brandDeepNavy: "#002070",
        brandGrowthGreen: "#43A047",
        brandBrightGreen: "#50B040",
        brandBgSoft: "#F8FAFC",
        brandBorder: "#E5EAF0",
        brandText: "#0F172A",
        brandMuted: "#64748B",
        // Retain original for safety
        brand: {
          50: '#eef9ff',
          100: '#d9f1ff',
          500: '#0ea5e9',
          600: '#0284c7',
          900: '#0c4a6e'
        }
      }
    },
  },
  plugins: [],
};
export default config;

