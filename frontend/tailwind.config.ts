import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-background': "url('/img/bg2.jpg')",
      },
      fontFamily: {
        inter: ['Inter'],
      },
      fontSize: {
        ssm: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        base: '1.125rem',
        xl: '1.25rem',
        '2xl': '2rem',
      },
      lineHeight: {
        '14': '14px',
        '15': '15px',
        '18': '18px',
        '24': '24px',
        '38': '38px',
      },
      spacing: {
        small: '0.313rem',
        large: '17.813rem',
        sidebarw: '18.813rem',
        extralarge: '24.875rem',
        navbarw: '27.5rem',
        tablew: '93rem',
      },
      colors: {
        black: {
          '1000': '#3D424F',
          '800': '#18191B',
          '900': '#1C1C1F',
        },
        grey: {
          '100': '#F1F5F8',
          '300': '#E2E5E9',
          '400': '#F4F6F8',
          '500': '#ECF0F3',
          '600': '#C7CBD0',
          '700': '#AFAFB0',
          '800': '#8A919A',
          '900': '#69717C',
        },
        blue: {
          '1000': '#4A9699', //  фиол #6940d1
          '700': '#E8F1FE',
          '800': '#047AFE',
          '900': '#166FF6',
        },
        charts: {
          '20': '#D0E2FD', //  фиол #dbd5f9
          '40': '#A2C5FC', // #bdaff9
          '60': '#73A8FA', // #6940d1
          '80': '#0F53C9', // #45169a
        },
        'lite-orange': '#E86405',
        'lite-green': '#F2FCF4',
        text: {
          'accent-primary': '#166FF6',
          'accent-secondary': '#E8F1FE',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config
