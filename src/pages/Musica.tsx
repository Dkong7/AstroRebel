import { useEffect, useState } from 'react';
import pb from '../lib/pocketbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import MusicPlayer from '../components/MusicPlayer';
import VideoHighlight from '../components/VideoHighlight';
import VideoGallery from '../components/VideoGallery';

const Musica = () => {
  const [currentVideo, setCurrentVideo] = useState("7KduhJe8zj4");

  const { t } = useLanguage();
  const { theme, themeColors } = useTheme();

  const handleVideoSelect = (id: string) => {
    setCurrentVideo(id);
    const videoSection = document.getElementById('video-highlight');
    if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };



  return (
    <div className={`pt-32 min-h-screen px-4 transition-colors duration-500 ${themeColors.bg}`}>
      
      {/* Textura de terciopelo */}
      <div className="fixed inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-overlay bg-repeat" style={{ backgroundImage: "url('/textura.png')" }}></div>

      <div className='max-w-7xl mx-auto relative z-10'>
         


         {/* 3. REPRODUCTOR DE AUDIO (Se le da un ancho mayor para que los valores de la tornameza no se corten) */}
         <div className="py-20 relative z-20 w-full max-w-[1600px] mx-auto">
             <MusicPlayer />
         </div>

         {/* 4. HUB DE VIDEOS */}
         <div className="py-10 border-t border-white/10">
             <div className="text-center mb-10">
                 <h2 className={`text-3xl md:text-5xl font-serif font-bold uppercase tracking-[0.2em] ${themeColors.text}`}>
                     Video Library
                 </h2>
             </div>

             {/* Reproductor Principal: Sin Autoplay y Sin Controles */}
             <VideoHighlight videoId={currentVideo} autoPlay={false} controls={false} />
             
             {/* Galería Estilo Netflix */}
             <VideoGallery onVideoSelect={handleVideoSelect} currentVideoId={currentVideo} />
         </div>

      </div>
    </div>
  );
};

export default Musica;