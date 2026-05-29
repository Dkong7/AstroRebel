import React, { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDownLeftRight, faCopy, faMobileScreen, faDesktop } from '@fortawesome/free-solid-svg-icons';

export type ElementConfig = {
  x: number;
  y: number;
  scale: number;
  gap?: number;
};

export type NavbarDeviceConfig = {
  logo: ElementConfig;
  menu: ElementConfig;
  socials: ElementConfig;
  lang: ElementConfig;
  theme: ElementConfig;
};

export type NavbarConfig = {
  mobile: NavbarDeviceConfig;
  desktop: NavbarDeviceConfig;
};

interface NavbarDevControllerProps {
  config: NavbarConfig;
  setConfig: React.Dispatch<React.SetStateAction<NavbarConfig>>;
  activeMode: 'mobile' | 'desktop';
  setActiveMode: (mode: 'mobile' | 'desktop') => void;
}

const ELEMENTS: Array<{ key: keyof NavbarDeviceConfig; label: string }> = [
  { key: 'logo', label: 'Logo' },
  { key: 'menu', label: 'Menús (Enlaces)' },
  { key: 'socials', label: 'Redes Sociales' },
  { key: 'lang', label: 'Botón de Idioma' },
  { key: 'theme', label: 'Selectores de Tema' }
];

const NavbarDevController: React.FC<NavbarDevControllerProps> = ({ config, setConfig, activeMode, setActiveMode }) => {
  const [selectedElement, setSelectedElement] = useState<keyof NavbarDeviceConfig>('logo');
  const [copied, setCopied] = useState(false);
  const dragControls = useDragControls();

  const currentValues = config[activeMode][selectedElement];

  const handleValueChange = (prop: keyof ElementConfig, value: number) => {
    setConfig(prev => ({
      ...prev,
      [activeMode]: {
        ...prev[activeMode],
        [selectedElement]: {
          ...prev[activeMode][selectedElement],
          [prop]: value
        }
      }
    }));
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        zIndex: 999999,
        top: '80px',
        right: '16px', // Moved to right to not overlap with where Hero controller was
        width: '280px',
        maxHeight: '85vh',
        overflowY: 'auto',
        backgroundColor: 'rgba(0,0,0,0.9)',
        border: '1px solid rgba(59, 130, 246, 0.5)', // Blue border to distinguish from Hero's yellow
        borderRadius: '12px',
        padding: '16px',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '14px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div 
        className="flex items-center justify-between border-b border-white/10 pb-2 mb-4 cursor-move"
        onPointerDown={(e) => dragControls.start(e)}
        style={{ touchAction: 'none' }}
      >
        <h3 className="font-bold text-blue-400 flex items-center gap-2 pointer-events-none">
          <FontAwesomeIcon icon={faArrowsUpDownLeftRight} /> Nav Panel
        </h3>
        <span className="text-xs opacity-50 pointer-events-none">Arrastrar</span>
      </div>

      {/* Device Toggle */}
      <div className="flex bg-white/10 rounded-lg p-1 mb-4">
        <button
          onClick={() => setActiveMode('mobile')}
          className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md transition-colors ${activeMode === 'mobile' ? 'bg-blue-500 text-white font-bold' : 'hover:bg-white/10'}`}
        >
          <FontAwesomeIcon icon={faMobileScreen} /> Mobile
        </button>
        <button
          onClick={() => setActiveMode('desktop')}
          className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md transition-colors ${activeMode === 'desktop' ? 'bg-blue-500 text-white font-bold' : 'hover:bg-white/10'}`}
        >
          <FontAwesomeIcon icon={faDesktop} /> Desktop
        </button>
      </div>

      {/* Element Selector */}
      <div className="mb-4">
        <label className="block text-xs text-gray-400 mb-1">Elemento a editar:</label>
        <select
          value={selectedElement}
          onChange={(e) => setSelectedElement(e.target.value as keyof NavbarDeviceConfig)}
          className="w-full bg-black border border-white/20 rounded-md p-2 text-white outline-none focus:border-blue-500"
        >
          {ELEMENTS.map(el => (
            <option key={el.key} value={el.key}>{el.label}</option>
          ))}
        </select>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs">Eje X (px)</label>
            <span className="text-blue-400 text-xs">{currentValues.x}</span>
          </div>
          <input
            type="range" min="-500" max="500" step="1"
            value={currentValues.x}
            onChange={(e) => handleValueChange('x', Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs">Eje Y (px)</label>
            <span className="text-blue-400 text-xs">{currentValues.y}</span>
          </div>
          <input
            type="range" min="-500" max="500" step="1"
            value={currentValues.y}
            onChange={(e) => handleValueChange('y', Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs">Escala</label>
            <span className="text-blue-400 text-xs">{currentValues.scale.toFixed(2)}</span>
          </div>
          <input
            type="range" min="0.1" max="3" step="0.05"
            value={currentValues.scale}
            onChange={(e) => handleValueChange('scale', Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {selectedElement === 'theme' && (
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs">Espaciado (Gap px)</label>
              <span className="text-blue-400 text-xs">{currentValues.gap ?? 12}</span>
            </div>
            <input
              type="range" min="0" max="100" step="1"
              value={currentValues.gap ?? 12}
              onChange={(e) => handleValueChange('gap', Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        )}
      </div>

      {/* Export */}
      <button
        onClick={handleCopyJSON}
        className="w-full mt-6 bg-white/10 hover:bg-white/20 border border-white/20 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faCopy} />
        {copied ? '¡Copiado!' : 'Exportar JSON'}
      </button>

      <p className="text-[10px] text-gray-500 mt-3 text-center">
        El panel no será visible en producción.
      </p>
    </motion.div>
  );
};

export default NavbarDevController;
