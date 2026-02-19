import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { motion, Variants } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMicrophone, faSlidersH, faFistRaised, 
  faChalkboardTeacher 
} from '@fortawesome/free-solid-svg-icons';

const Bio = () => {
  const { t } = useLanguage();
  const { themeColors } = useTheme();

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  const timeline = [
    {
      year: "2010",
      title: "RAÍCES Y FUNDACIÓN",
      desc: "Liderazgo en Juan Matachín y creación de la Fundación Vía Rústica, estableciendo las bases del reggae con conciencia en la capital.",
      icon: "/viarustica.svg"
    },
    {
      year: "2012",
      title: "FUSIÓN ELÉCTRICA",
      desc: "Integración a La Mojarra Eléctrica, explorando los límites de la música afrocolombiana y la potencia rítmica del Pacífico.",
      icon: "/mojarra.svg"
    },
    {
      year: "2015",
      title: "EL GRITO DEL PARQUE",
      desc: "Hito histórico: Cantante principal en Rock al Parque con Vía Rústica, consolidando su mensaje ante decenas de miles de personas.",
      icon: "/vr2.svg"
    },
    {
      year: "2019",
      title: "LEGADO ACADÉMICO",
      desc: "Transmisión del conocimiento en Uniminuto, formando a las nuevas generaciones de comunicadores y productores.",
      faIcon: faChalkboardTeacher
    },
    {
      year: "2021",
      title: "BASSWALK STUDIOS",
      desc: "Productor y A&R en Basswalk Studios, puliendo el sonido de la industria desde la ingeniería de alto nivel.",
      icon: "/basswalk.svg"
    }
  ];

  return (
    <div className={`min-h-screen ${themeColors.bg} text-white relative transition-colors duration-500`}>
      {/* Textura pequeña y repetitiva */}
      <div 
        className="fixed inset-0 w-full h-full opacity-15 pointer-events-none mix-blend-overlay bg-repeat bg-[length:100px_100px]" 
        style={{ backgroundImage: "url('/textura.png')" }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* HEADER HERO */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
        >
          <div>
            <h1 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9] ${themeColors.text}`}>
              LEO JARAMILLO
            </h1>
            <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] text-gray-400 mb-8 uppercase">
              {t('bio_subtitle')}
            </h2>
            <div className="flex gap-4 mb-10">
              <span className="flex items-center gap-2 text-[10px] font-black tracking-widest border border-white/20 px-4 py-2 rounded-full"><FontAwesomeIcon icon={faMicrophone} /> ARTIST</span>
              <span className="flex items-center gap-2 text-[10px] font-black tracking-widest border border-white/20 px-4 py-2 rounded-full"><FontAwesomeIcon icon={faSlidersH} /> ENGINEER</span>
              <span className="flex items-center gap-2 text-[10px] font-black tracking-widest border border-white/20 px-4 py-2 rounded-full"><FontAwesomeIcon icon={faFistRaised} /> ACTIVIST</span>
            </div>
            <p className="text-lg text-gray-300 font-light leading-relaxed text-justify mb-6">
              {t('bio_desc_1')}
            </p>
            <p className="text-lg text-gray-300 font-light leading-relaxed text-justify">
              {t('bio_desc_2')}
            </p>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600 rounded-2xl opacity-20 blur-2xl group-hover:opacity-40 transition duration-1000"></div>
            <img src="/live3.png" alt="Leo Live" className="relative rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full aspect-[4/5] object-cover" />
          </div>
        </motion.div>

        {/* TIMELINE SECTION */}
        <div className="mb-40">
          <motion.h3 
            initial="hidden" whileInView="visible" variants={revealVariants}
            className="text-4xl font-black uppercase tracking-tighter mb-20 text-center"
          >
            Línea de Tiempo <span className="text-gray-500 font-light">/ Evolución Sonora</span>
          </motion.h3>

          <div className="space-y-32 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent hidden md:block"></div>

            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVariants}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-10`}
              >
                <div className={`w-full md:w-[42%] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="text-6xl font-black opacity-20 mb-2 block">{item.year}</span>
                  <h4 className={`text-3xl font-bold uppercase tracking-widest mb-4 ${themeColors.text}`}>{item.title}</h4>
                  <p className="text-gray-400 font-light leading-relaxed text-lg">{item.desc}</p>
                </div>

                <div className="relative z-10 flex items-center justify-center w-32 h-32 rounded-full bg-neutral-900 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden p-6 transition-transform hover:scale-110 duration-500">
                  {item.icon ? (
                    <img src={item.icon} alt="icon" className="w-full h-full object-contain filter invert opacity-90" />
                  ) : (
                    <FontAwesomeIcon icon={item.faIcon!} className="text-4xl text-white opacity-90" />
                  )}
                </div>

                <div className="w-full md:w-[42%]"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ASTRO REBEL SECTION */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants}
          className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-black p-12 md:p-20 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-yellow-900/10 to-red-900/20 opacity-50"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <img src="/logo.svg" alt="Astro Rebel" className="w-48 md:w-80 mb-10 filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]" />
            <span className="text-xs font-black tracking-[0.8em] text-yellow-400 uppercase mb-4">Presente y Futuro</span>
            <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
              FUNDADOR DE <br />ASTRO REBEL
            </h3>
            <p className="max-w-3xl text-gray-400 text-xl font-light leading-relaxed mb-12">
              Hoy, Leo Jaramillo lidera Astro Rebel; **más que una banda**, es el epicentro de la nueva frecuencia. Un espacio donde el activismo, la escuela técnica y la producción de alto nivel convergen para transformar la realidad a través del sonido.
            </p>
            <div className="flex gap-4">
               <div className="h-1.5 w-32 bg-green-600"></div>
               <div className="h-1.5 w-32 bg-yellow-400"></div>
               <div className="h-1.5 w-32 bg-red-600"></div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Bio;