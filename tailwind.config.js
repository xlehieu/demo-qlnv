/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}', // để Tailwind scan file React
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
