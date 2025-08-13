// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    // Correct paths for Laravel, including Blade, Vue, React, and Livewire files
    './app/View/**/*.php',
    './resources/views/**/*.blade.php',
    './resources/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};