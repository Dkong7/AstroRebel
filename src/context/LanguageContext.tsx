import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "ES" | "EN";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  ES: {
    home: "INICIO",
    music: "MÚSICA",
    tour: "CONCIERTOS",
    store: "TIENDA",
    bio: "BIOGRAFÍA",
    school: "ESCUELA",
    listen_now: "ESCUCHAR AHORA",
    listen_on: "DISPONIBLE EN",
    share: "COMPARTIR",
    copied: "¡COPIADO!",
    hero_subtitle: "Sitio oficial de Leo Jaramillo",
    discography: "DISCOGRAFÍA",
    released: "LANZADO",
    buy: "COMPRAR",
    stream: "REPRODUCIR",
    bio_title: "LA VOZ DEL TRUENO",
    bio_subtitle: "Músico, Ingeniero de Sonido y Activista",
    bio_desc_1: "Leo Jaramillo no es solo un nombre, es una frecuencia. Con una trayectoria que fusiona la precisión técnica de la ingeniería de sonido con la crudeza del alma reggae.",
    bio_desc_2: "Activista incansable por los derechos humanos, utiliza el ritmo como vehículo para mensajes de conciencia, resistencia y amor radical.",
    bio_projects: "PROYECTOS DESTACADOS",
    bio_activism: "ACTIVISMO Y CULTURA",
    tour_dates: "PRÓXIMAS FECHAS",
    no_dates: "PRONTO NUEVAS FECHAS",
    store_title: "MERCHANDISING OFICIAL",
    coming_soon: "MUY PRONTO",
    contact_btn: "CONTRATACIONES",
    material: "MATERIAL / CALIDAD",
    finish: "TINTAS / ACABADO",
    logistics: "LOGÍSTICA & ENTREGA",
    add_to_cart: "AÑADIR AL CARRITO",
    pay_mp: "PAGAR CON MERCADO PAGO",
    close: "CERRAR",
    tickets: "TICKETS"
  },
  EN: {
    home: "HOME",
    music: "MUSIC",
    tour: "TOUR",
    store: "STORE",
    bio: "BIO",
    school: "SCHOOL",
    listen_now: "LISTEN NOW",
    listen_on: "LISTEN ON",
    share: "SHARE",
    copied: "COPIED!",
    hero_subtitle: "Leo Jaramillo Official Site",
    discography: "DISCOGRAPHY",
    released: "RELEASED",
    buy: "BUY",
    stream: "STREAM",
    bio_title: "THE VOICE OF THUNDER",
    bio_subtitle: "Musician, Sound Engineer & Activist",
    bio_desc_1: "Leo Jaramillo is not just a name, it is a frequency. With a career that fuses technical precision with the rawness of the reggae soul.",
    bio_desc_2: "A tireless activist for human rights, he uses rhythm as a vehicle for messages of conscience, resistance, and radical love.",
    bio_projects: "FEATURED PROJECTS",
    bio_activism: "ACTIVISM & CULTURE",
    tour_dates: "UPCOMING DATES",
    no_dates: "NEW DATES SOON",
    store_title: "OFFICIAL MERCH",
    coming_soon: "COMING SOON",
    contact_btn: "BOOKING",
    material: "MATERIAL / QUALITY",
    finish: "INKS / FINISH",
    logistics: "LOGISTICS & DELIVERY",
    add_to_cart: "ADD TO CART",
    pay_mp: "PAY WITH MERCADO PAGO",
    close: "CLOSE",
    tickets: "TICKETS"
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("ES");
  const toggleLang = () => setLang((prev) => (prev === "ES" ? "EN" : "ES"));
  const t = (key: string) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};