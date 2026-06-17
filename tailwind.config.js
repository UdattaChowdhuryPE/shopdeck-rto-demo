/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ShopDeck brand colors
        'sd-dark': '#0f172a',
        'sd-darker': '#0a0f1f',
        'sd-blue': '#3b82f6',
        'sd-cyan': '#06b6d4',
        'sd-purple': '#8b5cf6',
        'risk-green': '#10b981',
        'risk-yellow': '#f59e0b',
        'risk-red': '#ef4444',
      },
      backgroundColor: {
        'sd-primary': '#0f172a',
        'sd-secondary': '#1e293b',
        'sd-tertiary': '#334155',
      },
      textColor: {
        'text-primary': '#f1f5f9',
        'text-muted': '#cbd5e1',
      },
    },
  },
  plugins: [],
}
