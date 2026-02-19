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
  const [albums, setAlbums] = useState<any[]>([]);
  const [currentVideo, setCurrentVideo] = useState("boPHlpclehY");

  const { t } = useLanguage();
  const { theme, themeColors } = useTheme();

  const handleVideoSelect = (id: string) => {
    setCurrentVideo(id);
    const videoSection = document.getElementById('video-highlight');
    if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    const fetch = async () => {
       try {
           const records = await pb.collection('musica').getFullList({ sort: 'orden' });
           const mappedAlbums = records.map((a: any) => ({
               ...a,
               url_audio: a.audio ? pb.files.getUrl(a, a.audio) : a.url_audio,
               url_cover: a.cover ? pb.files.getUrl(a, a.cover) : a.url_cover
           }));
           setAlbums(mappedAlbums);
       } catch (e) {
           console.error("Error cargando discografía:", e);
       }
    };
    fetch();
  }, []);

  return (
    <div className={`pt-32 min-h-screen px-4 transition-colors duration-500 ${themeColors.bg}`}>
      
      {/* Textura de terciopelo */}
      <div className="fixed inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-overlay bg-repeat" style={{ backgroundImage: "url('/textura.png')" }}></div>

      <div className='max-w-7xl mx-auto relative z-10'>
         
         {/* 1. HEADER DE DISCOGRAFÍA */}
         <div className="text-center mb-16">
             <h1 className={`text-5xl md:text-7xl font-serif font-bold mb-4 tracking-widest ${themeColors.text}`}>
                 {t('discography')}
             </h1>
             <div className="w-44 h-1 mx-auto bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
         </div>
         
         {/* 2. GRID DE ÁLBUMES */}
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-20 border-b border-white/10'>
            {albums.map((album) => (
              <div key={album.id} 
                   className={`group rounded-xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-white/10
                   ${theme === 'white' ? 'bg-white text-black' : 'bg-black/40 backdrop-blur-md text-white'}`}>
                 
                 <div className='relative overflow-hidden aspect-square'>
                    <img src={album.url_cover} alt={album.titulo} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' />
                    
                    <div className='absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-4'>
                       <a href={album.url_audio} target='_blank' rel="noreferrer" 
                          className={`w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg
                          ${themeColors.text === 'text-white' ? 'bg-white text-black' : 'bg-yellow-400 text-black'}`}>
                           <FontAwesomeIcon icon={faPlay} size='lg'/>
                       </a>
                       <button className='px-6 py-2 border border-white text-white font-bold text-sm hover:bg-white hover:text-black transition-colors rounded-full uppercase tracking-widest'>
                           {t('stream')}
                       </button>
                    </div>
                 </div>

                 <div className='p-6 text-center'>
                    <h2 className='text-2xl font-bold mb-1 uppercase tracking-tighter'>{album.titulo}</h2>
                    <p className="text-xs font-bold tracking-[0.3em] mb-4 opacity-70 uppercase">{album.artista}</p>
                    <div className={`flex justify-between items-center border-t pt-4 ${theme === 'white' ? 'border-gray-200' : 'border-white/10'}`}>
                       <span className='text-xs font-bold tracking-wider opacity-60'>{t('released')} 2026</span>
                       <a href='/tienda' className={`hover:opacity-80 transition-opacity flex items-center gap-2 font-bold text-sm uppercase ${themeColors.text}`}>
                           <FontAwesomeIcon icon={faShoppingCart} /> {t('buy')}
                       </a>
                    </div>
                 </div>
              </div>
            ))}
         </div>

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