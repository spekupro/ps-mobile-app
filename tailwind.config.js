/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('nativewind/preset')],
    content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                neutral: {
                    DEFAULT: '#F6F8FC',
                    10: '#F6F8FC',
                    20: '#E2E8F0',
                    30: '#CBD4E1',
                    40: '#94A3B8',
                    50: '#64748B',
                    60: '#27364B',
                    70: '#0F1A2A',
                },
                primary: {
                    DEFAULT: '#442DD2',
                    10: '#F0EEFB',
                    20: '#D6D1F8',
                    30: '#5E47F2',
                    40: '#442DD2',
                    50: '#301BB5',
                    60: '#19068D',
                },
                accent: {
                    DEFAULT: '#FFC26F',
                    10: '#FFF0DC',
                    20: '#FFDDAF',
                    30: '#FFD08F',
                    40: '#FFC26F',
                    50: '#FFB248',
                    60: '#F39C26',
                },
                success: {
                    DEFAULT: '#1BB07A',
                    10: '#EEFAF6',
                    20: '#C8F1E3',
                    30: '#6AD0A1',
                    40: '#1BB07A',
                    50: '#048F66',
                    60: '#006956',
                },
                warning: {
                    DEFAULT: '#FFBB05',
                    10: '#FFF6DA',
                    20: '#FFE6A3',
                    30: '#FFD460',
                    40: '#FFBB05',
                    50: '#E3A500',
                    60: '#BF8B00',
                },
                error: {
                    DEFAULT: '#E9283F',
                    10: '#FFEBEB',
                    20: '#FFCFD5',
                    30: '#FC5266',
                    40: '#E9283F',
                    50: '#CE0920',
                    60: '#A9061A',
                },
            },
            fontFamily: {},
        },
    },
    plugins: [],
};

