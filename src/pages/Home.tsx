import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import MusicPlayer from '../components/MusicPlayer';
import VideoHighlight from '../components/VideoHighlight';
import Aliados from '../components/Aliados';
import HeroDevController, { HeroConfig } from '../components/HeroDevController';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const ornamentColor = '#f7dfb3';

const Star = ({ x, y, size = 12 }: { x: number; y: number; size?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <path
      d={`M0 -${size} L2 -2 L${size} 0 L2 2 L0 ${size} L-2 2 L-${size} 0 L-2 -2 Z`}
      fill={ornamentColor}
    />
    <circle r="1.5" fill={ornamentColor} />
  </g>
);

const CornerOrnaments = () => (
  <svg
    className="pointer-events-none absolute inset-0 z-30 h-full w-full text-[#f7dfb3]"
    viewBox="0 0 1600 900"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="heroMeter" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#1f8a31" />
        <stop offset="55%" stopColor="#7fa73a" />
        <stop offset="100%" stopColor="#b13ab8" />
      </linearGradient>
      <pattern id="meshPattern" width="18" height="18" patternUnits="userSpaceOnUse">
        <path d="M0 18 C6 8 12 8 18 0 M-4 8 C4 0 14 0 22 8" fill="none" stroke={ornamentColor} strokeWidth="1" opacity="0.6" />
      </pattern>
    </defs>

    <g opacity="0.95" fill="none" stroke={ornamentColor} strokeWidth="2" vectorEffect="non-scaling-stroke">
      <path d="M50 50 V148" />
      <path d="M50 198 V325" strokeDasharray="18 16 4 14 4 14" />
      <path d="M1550 118 V274" />
      <path d="M1550 312 V520" strokeDasharray="18 16 4 14 4 14" />
      <path d="M1190 72 H1430" />
      <path d="M1190 96 H1430" opacity="0.65" />
      <path d="M104 800 H265 V855 H50 V800 Z" />
      <path d="M104 855 L265 800 M80 855 L240 800 M130 855 L290 800 M50 828 H265" opacity="0.72" />
    </g>

    <g fontFamily="monospace" fill={ornamentColor} letterSpacing="5" fontWeight="700">
      <text x="90" y="82" fontSize="18">AR001</text>
      <text x="90" y="108" fontSize="18">33 1/3 RPM</text>
      <text x="90" y="134" fontSize="18">STEREO</text>
      <text x="1190" y="62" fontSize="20">SINGLE 001</text>
      <text x="1450" y="835" fontSize="18">AR001</text>
      <text x="1450" y="861" fontSize="18">33 1/3 RPM</text>
      <text x="1450" y="887" fontSize="18">STEREO</text>
    </g>

    <g opacity="0.95">
      <Star x={50} y={36} size={15} />
      <Star x={50} y={165} size={11} />
      <Star x={1550} y={300} size={11} />
      <Star x={1550} y={505} size={12} />
      <Star x={1372} y={112} size={14} />
      <Star x={775} y={846} size={16} />
    </g>

    <g fill="none" stroke={ornamentColor} strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0.9">
      <circle cx="1302" cy="114" r="10" />
      <circle cx="1326" cy="114" r="10" />
      <circle cx="1314" cy="93" r="10" />
      <circle cx="1436" cy="112" r="22" />
      <path d="M1414 112 H1458 M1436 90 V134 M1420 98 C1432 112 1432 112 1420 126 M1452 98 C1440 112 1440 112 1452 126" />
      <circle cx="1478" cy="60" r="8" fill={ornamentColor} stroke="none" />
      <circle cx="1500" cy="60" r="8" />
      <circle cx="1522" cy="60" r="8" />
      <circle cx="736" cy="640" r="8" fill={ornamentColor} stroke="none" />
      <circle cx="758" cy="640" r="8" />
      <circle cx="780" cy="640" r="8" />
      <circle cx="802" cy="640" r="8" />
    </g>

    <g opacity="0.9" fill={ornamentColor}>
      <circle cx="50" cy="186" r="3" />
      <circle cx="50" cy="210" r="3" />
      <circle cx="50" cy="236" r="3" />
      <circle cx="50" cy="264" r="3" />
      <circle cx="50" cy="292" r="3" />
      <circle cx="1550" cy="548" r="4" />
      <circle cx="1550" cy="576" r="4" />
      <circle cx="1550" cy="604" r="4" />
      <circle cx="1550" cy="632" r="4" />
    </g>

    <g transform="translate(1476 610)">
      <text x="-56" y="45" fill={ornamentColor} fontFamily="monospace" fontSize="24" fontWeight="700">100%</text>
      <rect x="48" y="0" width="28" height="134" rx="2" fill="url(#heroMeter)" stroke={ornamentColor} strokeWidth="2" />
      <circle cx="62" cy="162" r="10" fill="none" stroke={ornamentColor} strokeWidth="2" />
      <path d="M62 147 V177 M47 162 H77 M52 152 L72 172 M72 152 L52 172" stroke={ornamentColor} strokeWidth="2" />
      <path d="M56 204 C42 204 42 222 56 222 M68 204 C82 204 82 222 68 222 M50 236 C62 226 72 226 84 236 M50 252 C62 242 72 242 84 252" fill="none" stroke={ornamentColor} strokeWidth="4" strokeLinecap="round" />
    </g>

    <g transform="translate(105 865)" stroke={ornamentColor} strokeWidth="2" opacity="0.95">
      {Array.from({ length: 25 }).map((_, index) => (
        <line key={index} x1={index * 6} x2={index * 6} y1="0" y2={index % 3 === 0 ? 28 : 18} />
      ))}
    </g>
  </svg>
);

const DEFAULT_HERO_CONFIG: HeroConfig = {
  mobile: {
    logo: { x: 0, y: 0, scale: 0.65 },
    franja: { x: 5, y: 0, scale: 0.8 },
    letraAmor: { x: 0, y: -5, scale: 1.4 },
    barco: { x: -80, y: 110, scale: 0.85 },
    texts: { x: 0, y: 0, scale: 1.05 },
    socials: { x: 0, y: -315, scale: 0.9 },
    cta: { x: 0, y: -255, scale: 1 },
    ornaments: { x: 0, y: 65, scale: 1 },
    fondo: { x: 0, y: -5, scale: 1 }
  },
  desktop: {
    logo: { x: -10, y: 20, scale: 0.7 },
    franja: { x: -20, y: 75, scale: 0.9 },
    letraAmor: { x: 0, y: -75, scale: 1 },
    barco: { x: -15, y: 140, scale: 0.55 },
    texts: { x: 0, y: -105, scale: 0.9 },
    socials: { x: 0, y: -85, scale: 1.05 },
    cta: { x: 0, y: -75, scale: 1 },
    ornaments: { x: 0, y: 75, scale: 1.05 },
    fondo: { x: 0, y: 0, scale: 1 }
  }
};

const Home = () => {
  const { t } = useLanguage();
  const { theme, themeColors } = useTheme();
  const playerRef = useRef<HTMLDivElement>(null);

  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO_CONFIG);
  const [activeMode, setActiveMode] = useState<'mobile' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      setActiveMode(window.innerWidth < 768 ? 'mobile' : 'desktop');
    };
    handleResize(); // Init based on window size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const config = heroConfig[activeMode];

  const scrollToPlayer = () => {
    playerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCtaStyle = () => {
    switch (theme) {
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
      {/* <HeroDevController 
        config={heroConfig} 
        setConfig={setHeroConfig} 
        activeMode={activeMode} 
        setActiveMode={setActiveMode} 
      /> */}
      
      <section className="relative h-screen min-h-[720px] overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            style={{ 
              x: activeMode === 'mobile' ? config.fondo.x : 0, 
              y: activeMode === 'mobile' ? config.fondo.y : 0, 
              scale: activeMode === 'mobile' ? config.fondo.scale : 1,
              width: '100%',
              height: '100%'
            }}
          >
            <img src="/hero/fondo.png" alt="Fondo Amor Bonito" className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
        </div>

        <div
          className="absolute inset-0 z-10 opacity-25 mix-blend-overlay pointer-events-none bg-repeat"
          style={{ backgroundImage: "url('/textura.png')" }}
        />

        <motion.div
          className="absolute left-1/2 top-0 z-20 h-full w-[34vw] min-w-[330px] max-w-[520px] origin-top"
          style={{ x: `calc(-50% + ${config.franja.x}px)`, y: config.franja.y, scale: config.franja.scale }}
        >
          <motion.img
            src="/hero/franja.png"
            alt=""
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 0.92, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover origin-top"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{ x: config.ornaments.x, y: config.ornaments.y, scale: config.ornaments.scale }}
        >
          <CornerOrnaments />
        </motion.div>

        <div className="absolute inset-0 z-40 flex flex-col items-center">
          <motion.div
            style={{ x: config.logo.x, y: config.logo.y, scale: config.logo.scale }}
            className="mt-[11vh] md:mt-[12vh]"
          >
            <motion.img
              src="/logohero.svg"
              alt="Astro Rebel"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 0.82, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="h-24 w-44 object-contain opacity-80 brightness-0 invert sepia saturate-[0.65] drop-shadow-[0_0_18px_rgba(247,223,179,0.35)]"
            />
          </motion.div>

          <motion.div
            style={{ x: config.letraAmor.x, y: config.letraAmor.y, scale: config.letraAmor.scale }}
            className="mt-8 relative"
          >
            {/* The base image with pulsing glow */}
            <motion.img
              src="/hero/letraAmor.png"
              alt="Amor Bonito"
              initial={{ opacity: 0, scale: 0.92, y: 22, filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.2))' }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                filter: [
                  'drop-shadow(0px 0px 4px rgba(255,255,255,0.2)) drop-shadow(0px 0px 8px rgba(247,223,179,0.15))',
                  'drop-shadow(0px 0px 12px rgba(255,255,255,0.6)) drop-shadow(0px 0px 25px rgba(247,223,179,0.5))',
                  'drop-shadow(0px 0px 4px rgba(255,255,255,0.2)) drop-shadow(0px 0px 8px rgba(247,223,179,0.15))'
                ]
              }}
              transition={{ 
                opacity: { duration: 1, delay: 0.25, ease: 'easeOut' },
                scale: { duration: 1, delay: 0.25, ease: 'easeOut' },
                y: { duration: 1, delay: 0.25, ease: 'easeOut' },
                filter: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }
              }}
              className="w-[86vw] max-w-[850px] object-contain"
            />
            
            {/* The shine / destello effect container using a mask */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                WebkitMaskImage: `url('/hero/letraAmor.png')`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url('/hero/letraAmor.png')`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            >
              <motion.div 
                className="absolute top-0 bottom-0 w-[120px] bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-25deg] mix-blend-overlay opacity-90"
                initial={{ left: '-20%' }}
                animate={{ left: ['-20%', '120%', '120%'] }}
                transition={{ 
                  duration: 10, 
                  times: [0, 0.1, 1], // 10% of 10s = 1 second sweep
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          <motion.div
            style={{ x: config.texts.x, y: config.texts.y, scale: config.texts.scale }}
            className="mt-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center font-mono text-[13px] uppercase leading-relaxed tracking-[0.28em] text-[#f7dfb3] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] md:text-base"
            >
              <p>Music for the soul.</p>
              <p>Rebels by nature.</p>
            </motion.div>
          </motion.div>
        </div>

        {/* <motion.div
          style={{ x: config.barco.x, y: config.barco.y, scale: config.barco.scale }}
          className="absolute -left-[11vw] bottom-[9vh] z-40 w-[68vw] min-w-[600px] max-w-[950px]"
        >
          <motion.img
            src="/hero/barco.png"
            alt="Barco"
            initial={{ opacity: 0, x: -70 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: [0, -6, 0], 
            }}
            transition={{ 
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1.1 },
              x: { duration: 1.1, ease: 'easeOut' }
            }}
            className="w-full h-full object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.7)]"
          />
        </motion.div> */}

        <div className="absolute bottom-[7vh] left-1/2 z-40 flex -translate-x-1/2 flex-col items-center">
          <motion.div 
            style={{ x: config.socials.x, y: config.socials.y, scale: config.socials.scale }}
            className="mb-4 flex gap-3 rounded-full border border-[#f7dfb3]/20 bg-black/20 p-3 backdrop-blur-md"
          >
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noreferrer"
              className="text-3xl text-[#f7dfb3] transition-all duration-300 hover:scale-125 hover:text-[#1DB954] hover:drop-shadow-[0_0_10px_rgba(29,185,84,0.8)]"
            >
              <FontAwesomeIcon icon={faSpotify} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="text-3xl text-[#f7dfb3] transition-all duration-300 hover:scale-125 hover:text-[#FF0000] hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="text-3xl text-[#f7dfb3] transition-all duration-300 hover:scale-125 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.55)]"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </motion.div>

          <motion.div style={{ x: config.cta.x, y: config.cta.y, scale: config.cta.scale }}>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              onClick={scrollToPlayer}
              className={`rounded-sm border-2 px-8 py-3 text-xs font-bold uppercase tracking-[0.28em] shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 md:px-12 md:text-sm ${getCtaStyle()}`}
            >
              {t('listen_now') || 'ESCUCHAR AHORA'}
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section ref={playerRef} className="relative w-full z-30 mt-8 pb-0">
        <MusicPlayer />
      </section>

      <VideoHighlight videoId="qPANpt8RVYs" autoPlay={false} controls={false} />

      <Aliados />

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
