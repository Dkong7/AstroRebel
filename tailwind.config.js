/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elyei: {
          // Color de acento (verde menta #7ec183)
          400: '#9ed3a2', // Un poco más claro para hovers sutiles
          500: '#7ec183', // TU COLOR PRINCIPAL (Verde)
          600: '#6da672', // Un poco más oscuro para hovers
          
          // Color de fondo (azul profundo #182551)
          700: '#2a3b6e', // Azul más claro para bordes sutiles
          800: '#1f2f63', // Azul intermedio para fondos secundarios
          900: '#1b295a', // Casi el fondo
          950: '#182551', // TU COLOR DE FONDO PRINCIPAL (Azul)
        }
      },
      fontFamily: {
        serif: ['Times New Roman', 'serif'],
        // Puedes agregar una fuente sans-serif aquí si lo deseas luego
        // sans: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}