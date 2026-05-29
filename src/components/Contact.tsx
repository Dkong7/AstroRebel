import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const { theme, themeColors } = useTheme();
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    subject: 'Booking / Conciertos',
    message: ''
  });

  const subjects = [
    'Booking / Conciertos',
    'Prensa / Medios',
    'Colaboraciones',
    'Dudas Generales'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Preparar el asunto y cuerpo para el enlace mailto
    const mailtoSubject = encodeURIComponent(`[${formData.subject}] - Contacto de ${formData.name}`);
    const mailtoBody = encodeURIComponent(`Nombre / Empresa: ${formData.name}\nMotivo: ${formData.subject}\n\nMensaje:\n${formData.message}\n\n--- Enviado desde astro-rebel.com`);
    
    // Abrir el cliente de correo del usuario
    window.location.href = `mailto:jaramilloleomusic@gmail.com,astrorebelmusic@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const getButtonStyle = () => {
    switch (theme) {
      case 'green': return 'bg-green-600 hover:bg-green-500 text-white';
      case 'white': return 'bg-black hover:bg-gray-800 text-white';
      case 'black':
      default: return 'bg-yellow-500 hover:bg-yellow-400 text-black';
    }
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden z-30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-4 opacity-50">
            <div className="h-px w-12 bg-current"></div>
            <span className="text-xs font-black uppercase tracking-[0.5em]">Management</span>
            <div className="h-px w-12 bg-current"></div>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 ${themeColors.text}`}>
            {lang === 'EN' ? 'Get in Touch' : 'Contacto Directo'}
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base font-mono uppercase tracking-[0.2em] opacity-60">
            {lang === 'EN' ? 'For bookings, press, and collaborations.' : 'Para contrataciones, prensa y colaboraciones.'}
          </p>
        </div>

        {/* Formulario */}
        <div className={`backdrop-blur-xl bg-black/40 border ${theme === 'white' ? 'border-black/10' : 'border-white/10'} rounded-3xl p-8 md:p-12 shadow-2xl relative`}>
          {/* Textura de fondo sutil en el formulario */}
          <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-overlay bg-repeat rounded-3xl" style={{ backgroundImage: "url('/textura.png')" }}></div>
          
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest opacity-70 ml-1">
                  {lang === 'EN' ? 'Name / Company' : 'Nombre / Empresa'}
                </label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full bg-black/50 border ${theme === 'white' ? 'border-gray-500 text-white' : 'border-white/20 text-white'} rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors font-sans`}
                  placeholder={lang === 'EN' ? 'Your name' : 'Tu nombre'}
                />
              </div>

              {/* Selector de Motivo */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-widest opacity-70 ml-1">
                  {lang === 'EN' ? 'Subject' : 'Motivo'}
                </label>
                <select 
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className={`w-full bg-black/50 border ${theme === 'white' ? 'border-gray-500 text-white' : 'border-white/20 text-white'} rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors appearance-none cursor-pointer font-sans`}
                >
                  {subjects.map(sub => (
                    <option key={sub} value={sub} className="bg-black text-white">{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest opacity-70 ml-1">
                {lang === 'EN' ? 'Message' : 'Mensaje'}
              </label>
              <textarea 
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className={`w-full bg-black/50 border ${theme === 'white' ? 'border-gray-500 text-white' : 'border-white/20 text-white'} rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none font-sans custom-scrollbar`}
                placeholder={lang === 'EN' ? 'How can we help you?' : '¿En qué podemos ayudarte?'}
              ></textarea>
            </div>

            {/* Botón de Enviar */}
            <button 
              type="submit"
              className={`mt-4 w-full py-4 rounded-xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-300 hover:scale-[1.02] active:scale-95 flex justify-center items-center gap-3 shadow-xl ${getButtonStyle()}`}
            >
              <FontAwesomeIcon icon={faEnvelope} />
              {lang === 'EN' ? 'Send Request' : 'Enviar Solicitud'}
            </button>
            
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
