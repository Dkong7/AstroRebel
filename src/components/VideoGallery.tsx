import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faClock, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const SECTIONS = [
  {
    title: "LANZAMIENTOS RECIENTES",
    videos: [
      { id: "boPHlpclehY", title: "Amor Bonito", subtitle: "Video Oficial", duration: "3:45" },
      { id: "VBQomf0H6SI", title: "Raíces", subtitle: "Live Session", duration: "4:20" },
      { id: "2Z2RkfM5Zvc", title: "Alto al Fuego", subtitle: "Acoustic", duration: "5:10" },
      { id: "LDYS93GhuJk", title: "Thunder Voice", subtitle: "Documentary", duration: "12:30" },
    ]
  },
  {
    title: "MÁS CONTENIDO",
    videos: [
      { id: "w66kvoF2NFA", title: "Vía Rústica", subtitle: "En Vivo", duration: "8:15" },
      { id: "xWpPGAmPfjI", title: "La Mojarra", subtitle: "Concierto", duration: "45:00" },
      { id: "A_IdMj7yYb8", title: "Rights & Rhythm", subtitle: "Activismo", duration: "10:05" },
    ]
  }
];

interface VideoGalleryProps {
  onVideoSelect: (videoId: string) => void;
  currentVideoId: string;
}

const VideoGallery = ({ onVideoSelect, currentVideoId }: VideoGalleryProps) => {
  const { themeColors, theme } = useTheme();

  return (
    <div className="w-full py-12 relative z-30">
      {SECTIONS.map((section, idx) => (
        <div key={idx} className="mb-16 last:mb-0">
          
          <h3 className={`text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 ${themeColors.text}`}>
            {section.title}
            <div className="h-[1px] flex-grow bg-gradient-to-r from-current to-transparent opacity-20"></div>
          </h3>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {section.videos.map((video) => (
              <div 
                key={video.id}
                onClick={() => onVideoSelect(video.id)}
                className={`
                  group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-500
                  ${theme === 'white' 
                    ? 'bg-white shadow-lg border border-gray-200' 
                    : 'bg-white/5 backdrop-blur-md border border-white/10'}
                  hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                  ${currentVideoId === video.id ? 'ring-2 ring-yellow-500 scale-[1.02]' : ''}
                `}
              >
                {/* Contenedor de Imagen (Top Card) */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  
                  {/* Badge de Duración */}
                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md text-[10px] text-white font-mono px-2 py-1 rounded-md border border-white/10">
                    <FontAwesomeIcon icon={faClock} className="mr-1" /> {video.duration}
                  </div>

                  {/* Icono de Play que aparece al centro */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                        <FontAwesomeIcon icon={faPlay} className="ml-1" />
                    </div>
                  </div>
                </div>

                {/* Info del Video (Bottom Card) */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className={`text-[10px] font-black tracking-[0.2em] uppercase mb-1 opacity-50 ${themeColors.text}`}>
                    {video.subtitle}
                  </span>
                  <h4 className={`text-lg font-bold uppercase leading-tight mb-4 ${theme === 'white' ? 'text-black' : 'text-white'}`}>
                    {video.title}
                  </h4>
                  
                  <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">Astro Rebel Original</span>
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs opacity-30 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Indicador Now Playing */}
                {currentVideoId === video.id && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;