import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_TRACKS = [
    { id: '1', titulo: "AMOR BONITO MIX", artista: "LEO JARAMILLO", url_audio: "/AMOR_BONITO_MIX_22_ABRIL_48_24.wav", url_cover_plato: "/amorBonitoPortada.png", url_cover_square: "/portadaAmorBonito.jpg" },
    { id: '2', titulo: "RAIZ Y FUEGO", artista: "LEO JARAMILLO", url_audio: "/RAIZ_Y_FUEGO.wav", url_cover_plato: "/raiz_y_fuego_cover.png", url_cover_square: "/raiz_y_fuego_cover.png" },
    { id: '3', titulo: "QUERER VOLVER", artista: "LEO JARAMILLO", url_audio: "/QUERER_VOLVER.wav", url_cover_plato: "/QUERER_VOLVER_cover.png", url_cover_square: "/QUERER_VOLVER_cover.png" }
];

const MusicPlayer = () => {
  const location = useLocation();
  const isMusicPage = location.pathname === '/musica';
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // -------------------------------------------------------------------------
  // 🛠️ PANEL DE CONTROL MAESTRO (INDEPENDIENTE)
  // -------------------------------------------------------------------------
  const CONTROLES = useMemo(() => ({
    HOME: {
      DESKTOP: {
        zoomGeneral: 1.20,      // Zoom de todo el conjunto (Base + Disco + Brazo)
        anchoBase: "750px",     // Tamaño de la estructura negra
        tamanoDisco: "48%",     // Tamaño del vinilo respecto a la base
        desplazar_X: "4%",      // Izquierda <-> Derecha (Visual)
        desplazar_Y: "15%",     // Arriba <-> Abajo (Visual)
      },
      MOBILE: {
        zoomGeneral: 1.1,
        anchoBase: "400px",
        tamanoDisco: "52%",
        desplazar_X: "0%",
        desplazar_Y: "11%",
      }
    },
    PAGINA_MUSICA: {
      DESKTOP: {
        zoomGeneral: 1.20,
        anchoBase: "750px",
        tamanoDisco: "52%",
        desplazar_X: "7%",      // Ajuste específico para /musica
        desplazar_Y: "10%",
      },
      MOBILE: {
        zoomGeneral: 1.05,
        anchoBase: "380px",
        tamanoDisco: "52%",
        desplazar_X: "0%",
        desplazar_Y: "11%",
      }
    }
  }), []);

  const isMobile = windowWidth < 1024;
  const configActual = isMusicPage ? CONTROLES.PAGINA_MUSICA : CONTROLES.HOME;
  const v = isMobile ? configActual.MOBILE : configActual.DESKTOP;
  // -------------------------------------------------------------------------

  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks] = useState<any[]>(FALLBACK_TRACKS);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { theme, themeColors } = useTheme();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
       isPlaying ? audioRef.current.play().catch(() => setIsPlaying(false)) : audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (!isNaN(audioRef.current.duration)) setDuration(audioRef.current.duration);
    }
  };

  const handleTrackChange = (index: number) => {
     setCurrentTrack(index);
     setIsPlaying(true);
  };

  const track = tracks[currentTrack];

  return (
    <div className='w-full max-w-[1600px] mx-auto relative z-30 px-4 mb-20 mt-10'>
      <audio ref={audioRef} src={track.url_audio} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onTimeUpdate}
        onEnded={() => handleTrackChange((currentTrack + 1) % tracks.length)} />
      
      <div className="flex justify-center items-center">

        {/* INTERFAZ DE CONTROL */}
        <div className={`w-full max-w-[95%] sm:max-w-md md:max-w-4xl lg:max-w-5xl backdrop-blur-[40px] border border-white/20 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.7)] flex flex-col md:flex-row gap-6 md:gap-12 items-center transition-all duration-500
            ${theme === 'white' ? 'bg-white/40 text-black border-black/10' : 'bg-black/50 text-white border-white/10'}`}>
            
            <AnimatePresence mode="wait">
                <motion.div 
                    key={track.id}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="w-full max-w-[280px] sm:max-w-full md:w-1/2 aspect-square rounded-[2rem] md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 shrink-0"
                >
                    <img src={track.url_cover_square} alt={track.titulo} className="w-full h-full object-cover" />
                </motion.div>
            </AnimatePresence>

            <div className="flex flex-col w-full md:w-1/2 justify-center">
                <div className="text-center md:text-left mb-6 md:mb-8">
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-1 md:mb-2 ${themeColors.text}`}>{track.titulo}</h2>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-[0.5em] opacity-40">{track.artista}</p>
                </div>

                <div className="space-y-6 md:space-y-8">
                    <div className="w-full h-2 md:h-2.5 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
                        <motion.div 
                            className="absolute h-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-8 md:gap-10">
                        <button onClick={() => handleTrackChange(currentTrack > 0 ? currentTrack - 1 : tracks.length - 1)} className="hover:scale-125 opacity-60 hover:opacity-100 transition-transform">
                            <FontAwesomeIcon icon={faStepBackward} size="lg" className="md:text-2xl" />
                        </button>
                        <button onClick={() => setIsPlaying(!isPlaying)} className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 shrink-0 ${theme === 'white' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="2x" className={isPlaying ? "" : "ml-1 md:ml-2"} />
                        </button>
                        <button onClick={() => handleTrackChange((currentTrack + 1) % tracks.length)} className="hover:scale-125 opacity-60 hover:opacity-100 transition-transform">
                            <FontAwesomeIcon icon={faStepForward} size="lg" className="md:text-2xl" />
                        </button>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-2 overflow-y-auto max-h-40 md:max-h-48 pr-2 custom-scrollbar">
                    {tracks.map((t, i) => (
                        <button key={t.id} onClick={() => handleTrackChange(i)} 
                            className={`flex justify-between items-center p-3 md:p-4 rounded-xl md:rounded-2xl transition-all border
                            ${currentTrack === i ? `bg-white/10 border-white/20 font-bold ${themeColors.text}` : 'bg-transparent border-transparent opacity-30 hover:bg-white/5'}`}>
                            <span className="text-xs md:text-sm uppercase tracking-widest truncate">{t.titulo}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;