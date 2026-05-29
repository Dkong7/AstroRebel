import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext"; // Importación necesaria para los colores

// Importación de Páginas
import Home from "./pages/Home";
import Music from "./pages/Musica";
import Tour from "./pages/Tour";
import Store from "./pages/Store";
import Bio from "./pages/Bio";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider> {/* Envolvemos todo para que el fondo y textos cambien según el theme */}
        <Router>
          <div className="min-h-screen font-sans transition-colors duration-500">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/musica" element={<Music />} />
              <Route path="/conciertos" element={<Tour />} />
              <Route path="/tienda" element={<Store />} />
              <Route path="/biografia" element={<Bio />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;