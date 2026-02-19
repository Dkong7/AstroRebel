import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import MusicPlayer from '../components/MusicPlayer';
import GigsWidget from '../components/GigsWidget';
import Aliados from '../components/Aliados';
import HomeStorePreview from '../components/HomeStorePreview';
import VideoHighlight from '../components/VideoHighlight'; 
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const { t } = useLanguage();
  const { theme, themeColors } = useTheme();
  
  const playerRef = useRef<HTMLDivElement>(null);

  const scrollToPlayer = () => {
    playerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCtaStyle = () => {
    switch (theme) {
        case 'orange':
            return 'border-white text-white hover:bg-white hover:text-orange-600 shadow-orange-900/50';
        case 'green':
            return 'border-green-300 text-green-300 hover:bg-green-300 hover:text-green-900 shadow-green-900/50';
        case 'white':
            return 'border-black text-black hover:bg-black hover:text-white shadow-gray-400/50';
        case 'black':
        default:
            return 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black shadow-yellow-500/20';
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col ${themeColors.bg} transition-colors duration-500 overflow-x-hidden`}>
      
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen flex flex-col justify-center overflow-hidden">
         <div className="absolute inset-0 z-0">
             <div className={`absolute inset-0 bg-gradient-to-b from-black/10 via-transparent via-60% to-${theme === 'white' ? 'white' : 'black'}/60 z-10`}></div>
             <img 
               src="/fotohero.png" 
               onError={(e) => e.currentTarget.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070'} 
               alt="Hero Background" 
               className="w-full h-full object-cover opacity-100" 
             />
         </div>

         <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none mix-blend-overlay bg-repeat z-10" 
              style={{ backgroundImage: "url('/textura.png')" }}>
         </div>

         <div className="relative z-20 flex flex-col items-center md:items-end justify-center px-4 md:pr-24 w-full h-full">
             <div className="flex flex-col items-center relative top-[-20%]"> 
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 20 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-0"
                 >
                    {/* Ajustado: mt-[25vh] equivale aproximadamente a 236px en pantallas estándar */}
                    <img 
                        src="/amorbonito.png" 
                        alt="Amor Bonito" 
                        className="w-full md:w-[60rem] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] mt-[25vh]"
                    />
                 </motion.div>
                 
                 <motion.button 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.5, duration: 0.8 }}
                    onClick={scrollToPlayer}
                    className={`px-14 py-4 border-2 font-bold uppercase tracking-[0.3em] text-sm md:text-xl transition-all duration-300 shadow-xl backdrop-blur-sm rounded-sm ${getCtaStyle()} hover:scale-105 active:scale-95`}
                 >
                    {t('listen_now') || 'ESCUCHAR AHORA'}
                 </motion.button>

                 <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex gap-12 mt-4"
                 >
                    <a href="https://spotify.com" target="_blank" rel="noreferrer" 
                       className={`text-4xl transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(29,185,84,0.8)] ${theme === 'white' ? 'text-black hover:text-[#1DB954]' : 'text-white hover:text-[#1DB954]'}`}>
                        <FontAwesomeIcon icon={faSpotify} />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" 
                       className={`text-4xl transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] ${theme === 'white' ? 'text-black hover:text-[#FF0000]' : 'text-white hover:text-[#FF0000]'}`}>
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                 </motion.div>
             </div>
         </div>
      </section>

      {/* --- 2. PLAYER SECTION --- */}
      <section ref={playerRef} className="relative w-full z-30 -mt-24 pb-0">
          <MusicPlayer />
      </section>

      {/* --- 3. VIDEO OFICIAL --- */}
      <VideoHighlight videoId="boPHlpclehY" autoPlay={false} controls={false} />

      {/* --- 4. SECCIONES ADICIONALES --- */}
      <HomeStorePreview />
      
      <section className="relative z-20 py-10 bg-black/20">
         <GigsWidget />
      </section>
      
      <Aliados />

      {/* --- FOOTER DESARROLLADOR --- */}
      <footer className="w-full py-6 text-center border-t border-white/5 relative z-40 bg-black/20 backdrop-blur-sm">
          <a 
            href="https://www.thisiswillowtree.com" 
            target="_blank" 
            rel="noreferrer"
            className={`text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 ${theme === 'white' ? 'text-black' : 'text-white'}`}
          >
            <FontAwesomeIcon icon={faCode} size="xs" />
            Desarrollado por 4 de Willow Tree
          </a>
      </footer>

    </div>
  );
};

export default Home;