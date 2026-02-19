import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const HomeStorePreview = () => {
  const { themeColors } = useTheme();

  const products = [
      { id: 1, name: "VINILO 'AMOR BONITO'", priceUSD: "35", priceCOP: "140.000", img: "/lp.jpg" },
      { id: 2, name: "T-SHIRT ASTRO REBEL", priceUSD: "25", priceCOP: "100.000", img: "/camiseta.png" },
      { id: 3, name: "GORRA REBEL SNAPBACK", priceUSD: "20", priceCOP: "80.000", img: "/gorra.png" },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-black/40">
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="text-center mb-12">
               <h2 className={`text-5xl font-black uppercase mb-2 ${themeColors.text}`}>Merch Oficial</h2>
               <p className="text-gray-400 font-light tracking-[0.4em] text-xs">LLEVA LA FRECUENCIA CONTIGO</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {products.map((p) => (
                   <div key={p.id} className="group relative bg-neutral-900/50 border border-white/10 p-5 rounded-2xl hover:border-yellow-500/30 transition-all duration-500">
                       <div className="aspect-square rounded-xl overflow-hidden mb-6 relative shadow-2xl">
                           <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                           <div className="absolute bottom-3 right-3 bg-black/90 text-green-400 text-[10px] font-mono px-3 py-1.5 rounded-md border border-white/10 backdrop-blur-md">
                               ${p.priceUSD} USD / ${p.priceCOP} COP
                           </div>
                       </div>
                       <h3 className="text-white font-bold tracking-tighter text-lg mb-4 uppercase">{p.name}</h3>
                       <Link to="/tienda" className={`block w-full py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] border ${themeColors.text === 'text-white' ? 'border-white text-white hover:bg-white hover:text-black' : 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'} transition-all`}>
                           Ver Detalles
                       </Link>
                   </div>
               ))}
           </div>

           <div className="mt-16 text-center">
               <Link to="/tienda" className="inline-flex items-center gap-3 text-gray-500 hover:text-white transition-all uppercase text-[10px] font-black tracking-[0.4em] group">
                   Explorar toda la colección <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2 transition-transform" />
               </Link>
           </div>
       </div>
    </section>
  );
};

export default HomeStorePreview;