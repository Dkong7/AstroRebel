import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Tour = () => {
  const { t } = useLanguage();
  const { theme, themeColors } = useTheme();

  const dates = [
    { id: 1, date: "12", month: "MAR", city: "BOGOTÁ, COL", venue: "FESTIVAL CENTRO", status: "SOLD OUT", img: "/live1.png" },
    { id: 2, date: "05", month: "ABR", city: "MEDELLÍN, COL", venue: "TEATRO PABLO TOBÓN", status: "TICKETS", img: "/live2.png" },
    { id: 3, date: "20", month: "MAY", city: "CALI, COL", venue: "TEATRO JORGE ISAACS", status: "TICKETS", img: "/live3.png" },
    { id: 4, date: "15", month: "JUN", city: "PEREIRA, COL", venue: "CENTRO CULTURAL", status: "TICKETS", img: "/live1.png" },
    { id: 5, date: "02", month: "JUL", city: "CARTAGENA, COL", venue: "PLAZA DE LA ADUANA", status: "TICKETS", img: "/live2.png" },
  ];

  return (
    <div className={`pt-32 min-h-screen ${themeColors.bg} transition-colors duration-500 pb-20`}>
      {/* Fondo de textura persistente */}
      <div className="fixed inset-0 w-full h-full opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('/textura.png')" }}></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <header className="mb-16">
            <h1 className={`text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 ${themeColors.text}`}>
              {t('tour_dates')}
            </h1>
            <div className="w-32 h-2 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"></div>
        </header>
        
        {/* Grid de Cards Cinematográficas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dates.map((d) => (
            <motion.div 
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative h-[550px] rounded-[2rem] overflow-hidden border border-white/5 bg-neutral-900 shadow-2xl"
            >
              {/* Imagen de fondo con efecto de zoom y grayscale */}
              <img 
                src={d.img} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" 
                alt={d.city} 
              />
              
              {/* Overlay de gradiente para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
              
              {/* Contenido de la Card */}
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-20">
                {/* Fecha superior */}
                <div className="flex flex-col items-start">
                  <span className="text-6xl font-black text-white leading-none tracking-tighter">{d.date}</span>
                  <span className="text-sm font-bold tracking-[0.4em] text-yellow-400 uppercase">{d.month}</span>
                </div>

                {/* Información inferior */}
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-[0.5em] text-gray-400 uppercase mb-1">Location / Venue</span>
                  <h3 className="text-3xl font-black text-white uppercase mb-1 leading-none">{d.city}</h3>
                  <p className="text-lg font-light text-gray-300 uppercase mb-8 tracking-widest">{d.venue}</p>
                  
                  <button className={`w-full py-4 font-black uppercase tracking-[0.3em] text-xs border transition-all duration-300 ${
                    d.status === 'SOLD OUT' 
                    ? 'border-neutral-800 text-neutral-600 bg-neutral-900/80 cursor-not-allowed' 
                    : themeColors.text === 'text-white' 
                        ? 'border-white text-white hover:bg-white hover:text-black' 
                        : 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                  }`}>
                    {d.status}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tour;