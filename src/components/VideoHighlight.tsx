import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface VideoHighlightProps {
  videoId: string;
  autoPlay?: boolean; // Propiedad opcional
  controls?: boolean; // Propiedad opcional
}

const VideoHighlight = ({ videoId, autoPlay = false, controls = false }: VideoHighlightProps) => {
  const { theme } = useTheme();

  // Convertimos los booleanos a los valores 0 o 1 que entiende la API de YouTube
  const autoplayVal = autoPlay ? 1 : 0;
  const controlsVal = controls ? 1 : 0;

  const getContainerStyle = () => {
    switch (theme) {
      case 'orange':
        return 'border-orange-500/50 shadow-[0_0_50px_rgba(234,88,12,0.25)] hover:shadow-[0_0_70px_rgba(234,88,12,0.4)]';
      case 'green':
        return 'border-green-500/50 shadow-[0_0_50px_rgba(22,163,74,0.25)] hover:shadow-[0_0_70px_rgba(22,163,74,0.4)]';
      case 'white':
        return 'border-black/10 shadow-[0_0_50px_rgba(0,0,0,0.1)] hover:shadow-[0_0_70px_rgba(0,0,0,0.2)] bg-white';
      case 'black':
      default:
        return 'border-yellow-500/30 shadow-[0_0_50px_rgba(234,179,8,0.2)] hover:shadow-[0_0_70px_rgba(234,179,8,0.3)]';
    }
  };

  return (
    <section className="w-full py-10 px-4 relative z-20 overflow-hidden" id="video-highlight">
      
      {/* Fondo decorativo dinámico */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] opacity-20 blur-[100px] -z-10 rounded-full
          ${theme === 'orange' ? 'bg-orange-900' : 
            theme === 'green' ? 'bg-green-900' : 
            theme === 'white' ? 'bg-gray-300' : 'bg-yellow-900'}`} 
      />

      <div className="max-w-6xl mx-auto">
        <div className={`group relative w-full rounded-2xl p-2 md:p-4 border transition-all duration-700 ${getContainerStyle()} backdrop-blur-sm`}>
            
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-inner">
                <iframe 
                    key={videoId} 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    // Aplicamos autoplay y controls dinámicamente según las props
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=${autoplayVal}&controls=${controlsVal}`} 
                    title="Reproductor de Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Detalles estéticos en las esquinas */}
            <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 -translate-x-1 -translate-y-1 transition-colors duration-500 ${theme === 'white' ? 'border-black' : 'border-white/50'}`}></div>
            <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 translate-x-1 -translate-y-1 transition-colors duration-500 ${theme === 'white' ? 'border-black' : 'border-white/50'}`}></div>
            <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 -translate-x-1 translate-y-1 transition-colors duration-500 ${theme === 'white' ? 'border-black' : 'border-white/50'}`}></div>
            <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 translate-x-1 translate-y-1 transition-colors duration-500 ${theme === 'white' ? 'border-black' : 'border-white/50'}`}></div>

        </div>
      </div>
    </section>
  );
};

export default VideoHighlight;