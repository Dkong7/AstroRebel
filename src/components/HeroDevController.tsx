import React, { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDownLeftRight, faCopy, faMobileScreen, faDesktop } from '@fortawesome/free-solid-svg-icons';

export type ElementConfig = {
  x: number;
  y: number;
  scale: number;
};

export type DeviceConfig = {
  logo: ElementConfig;
  franja: ElementConfig;
  letraAmor: ElementConfig;
  barco: ElementConfig;
  texts: ElementConfig;
  socials: ElementConfig;
  cta: ElementConfig;
  ornaments: ElementConfig;
  fondo: ElementConfig;
};

export type HeroConfig = {
  mobile: DeviceConfig;
  desktop: DeviceConfig;
};

interface HeroDevControllerProps {
  config: HeroConfig;
  setConfig: React.Dispatch<React.SetStateAction<HeroConfig>>;
  activeMode: 'mobile' | 'desktop';
  setActiveMode: (mode: 'mobile' | 'desktop') => void;
}

const ELEMENTS: Array<{ key: keyof DeviceConfig; label: string }> = [
  { key: 'logo', label: 'Logo' },
  { key: 'franja', label: 'Franja Amarilla' },
  { key: 'letraAmor', label: 'Letras Amor Bonito' },
  { key: 'barco', label: 'Barco' },
  { key: 'texts', label: 'Textos' },
  { key: 'socials', label: 'Redes Sociales' },
  { key: 'cta', label: 'Botón Escuchar' },
  { key: 'ornaments', label: 'Ornamentos (SVG)' },
  { key: 'fondo', label: 'Fondo (Solo Mobile)' }
];

const HeroDevController: React.FC<HeroDevControllerProps> = ({ config, setConfig, activeMode, setActiveMode }) => {
  const [selectedElement, setSelectedElement] = useState<keyof DeviceConfig>('logo');
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
        left: '16px',
        width: '280px',
        maxHeight: '85vh',
        overflowY: 'auto',
        backgroundColor: 'rgba(0,0,0,0.9)',
        border: '1px solid rgba(234, 179, 8, 0.5)',
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
        <h3 className="font-bold text-yellow-400 flex items-center gap-2 pointer-events-none">
          <FontAwesomeIcon icon={faArrowsUpDownLeftRight} /> Dev Panel
        </h3>
        <span className="text-xs opacity-50 pointer-events-none">Arrastrar</span>
      </div>

      {/* Device Toggle */}
      <div className="flex bg-white/10 rounded-lg p-1 mb-4">
        <button
          onClick={() => setActiveMode('mobile')}
          className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md transition-colors ${activeMode === 'mobile' ? 'bg-yellow-500 text-black font-bold' : 'hover:bg-white/10'}`}
        >
          <FontAwesomeIcon icon={faMobileScreen} /> Mobile
        </button>
        <button
          onClick={() => {
            setActiveMode('desktop');
            if (selectedElement === 'fondo') setSelectedElement('logo');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md transition-colors ${activeMode === 'desktop' ? 'bg-yellow-500 text-black font-bold' : 'hover:bg-white/10'}`}
        >
          <FontAwesomeIcon icon={faDesktop} /> Desktop
        </button>
      </div>

      {/* Element Selector */}
      <div className="mb-4">
        <label className="block text-xs text-gray-400 mb-1">Elemento a editar:</label>
        <select
          value={selectedElement}
          onChange={(e) => setSelectedElement(e.target.value as keyof DeviceConfig)}
          className="w-full bg-black border border-white/20 rounded-md p-2 text-white outline-none focus:border-yellow-500"
        >
          {ELEMENTS.filter(el => activeMode === 'mobile' || el.key !== 'fondo').map(el => (
            <option key={el.key} value={el.key}>{el.label}</option>
          ))}
        </select>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs">Eje X (px)</label>
            <span className="text-yellow-400 text-xs">{currentValues.x}</span>
          </div>
          <input
            type="range" min="-1000" max="1000" step="5"
            value={currentValues.x}
            onChange={(e) => handleValueChange('x', Number(e.target.value))}
            className="w-full accent-yellow-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs">Eje Y (px)</label>
            <span className="text-yellow-400 text-xs">{currentValues.y}</span>
          </div>
          <input
            type="range" min="-1000" max="1000" step="5"
            value={currentValues.y}
            onChange={(e) => handleValueChange('y', Number(e.target.value))}
            className="w-full accent-yellow-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs">Escala</label>
            <span className="text-yellow-400 text-xs">{currentValues.scale.toFixed(2)}</span>
          </div>
          <input
            type="range" min="0.1" max="3" step="0.05"
            value={currentValues.scale}
            onChange={(e) => handleValueChange('scale', Number(e.target.value))}
            className="w-full accent-yellow-500"
          />
        </div>
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

export default HeroDevController;
