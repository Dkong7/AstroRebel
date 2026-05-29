import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Contact from '../components/Contact';

const Contacto = () => {
  const { themeColors } = useTheme();

  return (
    <div className={`min-h-screen ${themeColors.bg} text-white relative transition-colors duration-500 pt-20 pb-10`}>
      {/* Textura de fondo global de la página */}
      <div 
        className="fixed inset-0 w-full h-full opacity-15 pointer-events-none mix-blend-overlay bg-repeat bg-[length:100px_100px] z-0" 
        style={{ backgroundImage: "url('/textura.png')" }}
      ></div>
      
      <div className="relative z-10">
        <Contact />
      </div>
    </div>
  );
};

export default Contacto;
