import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const GigsWidget = () => {
  const { t } = useLanguage();
  const { themeColors } = useTheme();

  const gigs = [
      { id: 1, day: "12", month: "MAR", city: "BOGOTÁ", venue: "Festival Centro", img: "/live1.png" },
      { id: 2, day: "05", month: "ABR", city: "MEDELLÍN", venue: "Teatro Pablo Tobón", img: "/live2.png" },
      { id: 3, day: "18", month: "MAY", city: "CALI", venue: "Feria Independiente", img: "/live3.png" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className={`text-5xl font-black uppercase tracking-tighter ${themeColors.text}`}>
              {t('tour') || 'TOUR'} 2026
          </h2>
          <Link to="/conciertos" className="text-[10px] font-black uppercase tracking-[0.3em] py-2 px-6 border border-white/10 hover:bg-white hover:text-black transition-all">
              Todas las fechas &rarr;
          </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gigs.map((gig) => (
              <div key={gig.id} className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/5 bg-neutral-900 shadow-2xl">
                  {/* Imagen de fondo con Overlay */}
                  <img src={gig.img} alt={gig.city} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                  {/* Contenido de la Card */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                      <div className="flex flex-col items-start">
                          <span className="text-5xl font-black text-white leading-none">{gig.day}</span>
                          <span className="text-sm font-bold tracking-[0.3em] text-yellow-400">{gig.month}</span>
                      </div>

                      <div>
                          <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">{gig.venue}</span>
                          <h3 className="text-3xl font-black text-white uppercase mb-6">{gig.city}</h3>
                          
                          <a href="#" className={`inline-block w-full py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] border transition-all 
                              ${themeColors.text === 'text-white' ? 'border-white text-white hover:bg-white hover:text-black' : 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'}
                          `}>
                              Tickets
                          </a>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default GigsWidget;