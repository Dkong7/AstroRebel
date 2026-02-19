import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext' // <--- IMPORTAR

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider> {/* <--- ENVOLVER AQUI */}
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>,
)