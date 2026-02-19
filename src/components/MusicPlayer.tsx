import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_TRACKS = [
    { id: '1', titulo: "AMOR BONITO", artista: "LEO JARAMILLO", url_audio: "/amor_bonito.mp3", url_cover_plato: "/amorBonitoPortada.png", url_cover_square: "/portadaAmorBonito.jpg" },
    { id: '2', titulo: "ALTO AL FUEGO", artista: "LEO JARAMILLO", url_audio: "/alto_al_fuego.mp3", url_cover_plato: "/portadaAltoAlFuego.jpg", url_cover_square: "/portadaAltoAlFuego.jpg" }
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
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* COLUMNA IZQUIERDA: TORNAMEZA */}
        <div 
          className="lg:col-span-7 relative flex justify-center items-center mb-20 lg:mb-0 transition-transform duration-500"
          style={{ transform: `rotate(90deg) scaleX(-1) scale(${v.zoomGeneral})` }}
        >
            {/* 1. Mueble/Base */}
            <img 
              src="/torna.png" 
              alt="Base" 
              className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
              style={{ maxWidth: v.anchoBase }} 
            />
            
            {/* 2. Disco Giratorio (Independizado) */}
            <div className="absolute aspect-square flex justify-center items-center overflow-hidden rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)]" 
                 style={{ 
                   width: v.tamanoDisco,    // <--- Tamaño independiente del disco
                   top: v.desplazar_X,      // <--- Posición X independiente
                   left: v.desplazar_Y      // <--- Posición Y independiente
                 }}>
                <motion.img 
                    src={track.url_cover_plato} 
                    alt="Disco"
                    className="w-full h-full object-cover"
                    initial={{ rotate: -90, scaleX: -1 }} 
                    animate={{ rotate: isPlaying ? 270 : -90, scaleX: -1 }}
                    transition={{ rotate: { duration: 12, repeat: isPlaying ? Infinity : 0, ease: "linear" } }}
                />
                <div className="absolute w-6 h-6 bg-[#0a0a0a] rounded-full border-2 border-gray-800 z-10"></div>
            </div>

            {/* 3. Brazo de DJ */}
            <motion.img 
                src="/djbrazo.png" 
                alt="Brazo DJ"
                className="absolute w-[58%] h-auto z-30"
                style={{ top: '3%', right: '14%', transformOrigin: '82% 18%' }}
                animate={{ rotate: isPlaying ? 25 : 0 }} 
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />
        </div>

        {/* COLUMNA DERECHA: INTERFAZ DE CONTROL */}
        <div className={`lg:col-span-5 backdrop-blur-[40px] border border-white/20 rounded-[3.5rem] p-8 md:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.7)] flex flex-col transition-all duration-500
            ${theme === 'white' ? 'bg-white/40 text-black border-black/10' : 'bg-black/50 text-white border-white/10'}`}>
            
            <AnimatePresence mode="wait">
                <motion.div 
                    key={track.id}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="w-full aspect-square mb-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                >
                    <img src={track.url_cover_square} alt={track.titulo} className="w-full h-full object-cover" />
                </motion.div>
            </AnimatePresence>

            <div className="text-center mb-8">
                <h2 className={`text-5xl font-black uppercase tracking-tighter mb-2 ${themeColors.text}`}>{track.titulo}</h2>
                <p className="text-sm font-bold uppercase tracking-[0.5em] opacity-40">{track.artista}</p>
            </div>

            <div className="space-y-8">
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
                    <motion.div 
                        className="absolute h-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>

                <div className="flex items-center justify-center gap-12">
                    <button onClick={() => handleTrackChange(currentTrack > 0 ? currentTrack - 1 : tracks.length - 1)} className="hover:scale-125 opacity-60 hover:opacity-100">
                        <FontAwesomeIcon icon={faStepBackward} size="2x" />
                    </button>
                    <button onClick={() => setIsPlaying(!isPlaying)} className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 ${theme === 'white' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="3x" className={isPlaying ? "" : "ml-2"} />
                    </button>
                    <button onClick={() => handleTrackChange((currentTrack + 1) % tracks.length)} className="hover:scale-125 opacity-60 hover:opacity-100">
                        <FontAwesomeIcon icon={faStepForward} size="2x" />
                    </button>
                </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 overflow-y-auto max-h-48 pr-2 custom-scrollbar">
                {tracks.map((t, i) => (
                    <button key={t.id} onClick={() => handleTrackChange(i)} 
                        className={`flex justify-between items-center p-5 rounded-2xl transition-all border
                        ${currentTrack === i ? `bg-white/10 border-white/20 font-bold ${themeColors.text}` : 'bg-transparent border-transparent opacity-30 hover:bg-white/5'}`}>
                        <span className="text-sm uppercase tracking-widest truncate">{t.titulo}</span>
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;