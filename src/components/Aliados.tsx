import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Aliados = () => {
  const { theme } = useTheme();

  const partners = [
    { name: 'Mes del Reggae', logo: '/mesreggae.svg', url: 'https://mesdelreggae.com' },
    { name: 'Willow Tree', logo: '/willow.svg', url: 'https://www.thisiswillowtree.com' },
    { name: 'Traif', logo: '/traif.svg', url: 'https://traif.duckdns.org/' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex items-center gap-4 mb-16 opacity-40">
          <div className="h-px w-12 bg-current"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">
            {theme === 'white' ? 'Partners' : 'Aliados Estratégicos'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 items-center">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-center items-center p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all duration-500 opacity-60 hover:opacity-100"
            >
              <span className="text-[8px] font-black uppercase tracking-[0.4em] mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 text-white">
                {partner.name}
              </span>

              {/* Contenedor del Logo con Máscara CSS */}
              <div 
                className={`w-full h-20 transition-all duration-500 group-hover:scale-110 
                ${theme !== 'white' ? 'bg-white' : 'bg-black'} 
                group-hover:bg-transparent`}
                style={{
                  WebkitMaskImage: `url(${partner.logo})`,
                  maskImage: `url(${partner.logo})`,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  // En hover, eliminamos la máscara para ver el logo original
                }}
              >
                {/* Imagen invisible que solo se muestra en hover para recuperar el color original */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Aliados;