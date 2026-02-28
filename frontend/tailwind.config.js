/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'Inter', 'sans-serif'],
            },
            colors: {
                background: '#000000', // true black
                surface: '#0a0a0a',
                surfaceHighlight: '#171717',
                // Vibrant Color 1: Neon Cyan
                cyan: {
                    400: '#22d3ee',
                    500: '#06b6d4',
                    600: '#0891b2',
                },
                // Vibrant Color 2: Hot Pink
                pink: {
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                },
                // Vibrant Color 3: Electric Purple
                purple: {
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                },
                // Vibrant Color 4: Lime Green (primary accents)
                primary: {
                    50: '#ecfccb',
                    100: '#d9f99d',
                    400: '#a3e635',
                    500: '#84cc16', // Vibrant Lime
                    600: '#65a30d',
                    900: '#3f6212',
                },
                accent: {
                    400: '#f472b6',
                    500: '#ec4899', // Hot Pink fallbacks
                    600: '#db2777',
                },
            },
            animation: {
                'blob': 'blob 10s infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    from: { backgroundPosition: '200% 0' },
                    to: { backgroundPosition: '-200% 0' },
                }
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                'shimmer-gradient': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0) 100%)',
            }
        },
    },
    plugins: [],
}
