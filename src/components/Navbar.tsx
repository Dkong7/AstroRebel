import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube, faSpotify } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import NavbarDevController, { NavbarConfig } from "./NavbarDevController";

const DEFAULT_NAVBAR_CONFIG: NavbarConfig = {
  mobile: {
    logo: { x: 0, y: 0, scale: 0.75 },
    menu: { x: 0, y: 0, scale: 1 },
    socials: { x: 0, y: 138, scale: 1 },
    lang: { x: 0, y: 80, scale: 1 },
    theme: { x: -1, y: 36, scale: 0.75 }
  },
  desktop: {
    logo: { x: 0, y: 0, scale: 0.8 },
    menu: { x: -159, y: 0, scale: 1 },
    socials: { x: -11, y: 0, scale: 1 },
    lang: { x: 0, y: 0, scale: 1 },
    theme: { x: 3, y: -3, scale: 0.95, gap: 19 }
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { lang, toggleLang, t } = useLanguage(); 
  const { theme, setTheme, themeColors } = useTheme();
  
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig>(DEFAULT_NAVBAR_CONFIG);
  const [activeMode, setActiveMode] = useState<'mobile' | 'desktop'>('desktop');
  
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setActiveMode(window.innerWidth < 768 ? 'mobile' : 'desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("music"), path: "/musica" },
    { name: t("store"), path: "/tienda" },
    { name: t("bio"), path: "/biografia" },
    { name: t("contact"), path: "/contacto" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const socialLinks = {
    instagram: "https://www.instagram.com/astrorebelmusic",
    youtube: "https://www.youtube.com/@leojaramillomusic",
    spotify: "https://open.spotify.com/intl-es/artist/3QbyDy8HrkztZfpKowLY6I?si=e3372e7cf71541df"
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
      ${scrolled ? "py-2 shadow-2xl" : "py-4"}
      ${themeColors.bg}
    `}>
      {/* <NavbarDevController
        config={navbarConfig}
        setConfig={setNavbarConfig}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
      /> */}
      
      {/* --- TEXTURA TERCIOPELO --- */}
      <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-0 mix-blend-overlay bg-repeat"
           style={{ backgroundImage: "url('/textura.png')" }}>
      </div>
      <div className="absolute inset-0 w-full h-full bg-black/10 z-0 pointer-events-none"></div>

      {/* Línea inferior (Siempre visible en el borde del nav) */}
      <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r ${themeColors.gradientBottom} z-20`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <motion.div style={{ x: navbarConfig[activeMode].logo.x, y: navbarConfig[activeMode].logo.y, scale: navbarConfig[activeMode].logo.scale }}>
            <Link to="/" className="group block">
              <Logo className="h-12 md:h-16 transition-transform duration-300 hover:scale-105" />
            </Link>
          </motion.div>

          {/* MENU ESCRITORIO */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Links de Navegación */}
            <motion.div 
              className="flex items-center space-x-8"
              style={{ x: navbarConfig[activeMode].menu.x, y: navbarConfig[activeMode].menu.y, scale: navbarConfig[activeMode].menu.scale }}
            >
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="relative group px-1 py-2"
                >
                  <span className={`text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 
                    ${isActive(link.path) ? themeColors.accent : `${themeColors.text} opacity-80 group-hover:opacity-100 group-hover:${themeColors.accent}`}`}>
                    {link.name}
                  </span>
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] transform transition-transform duration-300 origin-left 
                     bg-current ${isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} ${themeColors.text}`}>
                  </span>
                </Link>
              ))}
            </motion.div>
            
            {/* BLOQUE DERECHO: REDES + TEMA (Ordenado) */}
            <div className={`flex flex-col items-end gap-2 pl-6 border-l ml-2 ${theme === 'white' ? 'border-gray-300' : 'border-white/10'}`}>
               
               {/* Fila Superior: Iconos + Idioma */}
               <div className="flex items-center gap-4">
                  <motion.div 
                    className="flex items-center gap-4"
                    style={{ x: navbarConfig[activeMode].socials.x, y: navbarConfig[activeMode].socials.y, scale: navbarConfig[activeMode].socials.scale }}
                  >
                    <a href={socialLinks.instagram} target="_blank" className={`${themeColors.text} hover:scale-110 transition-transform`}><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
                    <a href={socialLinks.youtube} target="_blank" className={`${themeColors.text} hover:scale-110 transition-transform`}><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
                    <a href={socialLinks.spotify} target="_blank" className={`${themeColors.text} hover:scale-110 transition-transform`}><FontAwesomeIcon icon={faSpotify} size="lg" /></a>
                  </motion.div>
                  
                  {/* Botón Idioma Pill */}
                  <motion.div style={{ x: navbarConfig[activeMode].lang.x, y: navbarConfig[activeMode].lang.y, scale: navbarConfig[activeMode].lang.scale }}>
                    <button 
                      onClick={toggleLang} 
                      className={`text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-2 uppercase tracking-widest hover:bg-white/10 transition-all border
                      ${themeColors.text} ${theme === 'white' ? 'border-black' : 'border-white/30'}`}
                    >
                      <FontAwesomeIcon icon={faGlobeAmericas} /> {lang}
                    </button>
                  </motion.div>
               </div>

               {/* Fila Inferior: Selectores de Color (solo 3 temas) */}
               <motion.div 
                 className="flex items-center pr-1"
                 style={{ 
                   x: navbarConfig[activeMode].theme.x, 
                   y: navbarConfig[activeMode].theme.y, 
                   scale: navbarConfig[activeMode].theme.scale,
                   gap: `${navbarConfig[activeMode].theme.gap ?? 12}px`
                 }}
               >
                  <ThemeButton color="bg-black border border-white/20" onClick={() => setTheme('black')} active={theme === 'black'} title={t("theme_black")} />
                  <ThemeButton color="bg-[#166534]" onClick={() => setTheme('green')} active={theme === 'green'} title={t("theme_green")} />
                  <ThemeButton color="bg-[#e5e5e5]" onClick={() => setTheme('white')} active={theme === 'white'} title={t("theme_white")} />
               </motion.div>

            </div>
          </div>

          {/* MENU MOVIL TOGGLE */}
          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden ${themeColors.text} z-50`}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 ${themeColors.bg} z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col justify-center items-center space-y-8 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
           <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none mix-blend-overlay bg-repeat" style={{ backgroundImage: "url('/textura.png')" }}></div>
           
           {navLinks.map(link => (
             <motion.div
               key={link.path}
               style={{ x: navbarConfig[activeMode].menu.x, y: navbarConfig[activeMode].menu.y, scale: navbarConfig[activeMode].menu.scale }}
               className="relative z-10"
             >
               <Link 
                 to={link.path} 
                 onClick={() => setIsOpen(false)} 
                 className={`text-2xl font-bold tracking-widest uppercase transition-colors ${isActive(link.path) ? themeColors.accent : themeColors.text}`}
               >
                 {link.name}
               </Link>
             </motion.div>
           ))}
           
           {/* Controles Móviles */}
           <div className="flex flex-col items-center gap-6 relative z-10 mt-4">
              <motion.div 
                className="flex gap-6"
                style={{ x: navbarConfig[activeMode].socials.x, y: navbarConfig[activeMode].socials.y, scale: navbarConfig[activeMode].socials.scale }}
              >
                <a href={socialLinks.instagram} className={`${themeColors.text} text-2xl`}><FontAwesomeIcon icon={faInstagram} /></a>
                <a href={socialLinks.youtube} className={`${themeColors.text} text-2xl`}><FontAwesomeIcon icon={faYoutube} /></a>
                <a href={socialLinks.spotify} className={`${themeColors.text} text-2xl`}><FontAwesomeIcon icon={faSpotify} /></a>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4"
                style={{ 
                  x: navbarConfig[activeMode].theme.x, 
                  y: navbarConfig[activeMode].theme.y, 
                  scale: navbarConfig[activeMode].theme.scale,
                  gap: `${navbarConfig[activeMode].theme.gap ?? 16}px`
                }}
              >
                  <ThemeButton color="bg-black border border-white/20" onClick={() => setTheme('black')} active={theme === 'black'} size="w-8 h-8" />
                  <ThemeButton color="bg-[#166534]" onClick={() => setTheme('green')} active={theme === 'green'} size="w-8 h-8" />
                  <ThemeButton color="bg-[#e5e5e5]" onClick={() => setTheme('white')} active={theme === 'white'} size="w-8 h-8" />
              </motion.div>
              
              <motion.div style={{ x: navbarConfig[activeMode].lang.x, y: navbarConfig[activeMode].lang.y, scale: navbarConfig[activeMode].lang.scale }}>
                <button 
                  onClick={toggleLang} 
                  className={`text-xs font-black px-4 py-2 rounded-full flex items-center gap-2 uppercase tracking-widest transition-all border
                  ${themeColors.text} ${theme === 'white' ? 'border-black' : 'border-white/30'}`}
                >
                  <FontAwesomeIcon icon={faGlobeAmericas} /> {lang === 'ES' ? 'ENGLISH' : 'ESPAÑOL'}
                </button>
              </motion.div>
           </div>
      </div>
    </nav>
  );
};

// Botón de tema ajustado para parecerse a la referencia (anillo exterior)
const ThemeButton = ({ color, onClick, active, title, size = "w-4 h-4" }: { color: string, onClick: () => void, active: boolean, title?: string, size?: string }) => (
  <button 
    onClick={onClick}
    title={title}
    className={`${size} rounded-full ${color} transition-all duration-300 relative
    ${active ? 'ring-2 ring-offset-2 ring-offset-black ring-white scale-110' : 'hover:scale-110 opacity-80 hover:opacity-100 hover:ring-1 hover:ring-white/30'}`}
  />
);

export default Navbar;