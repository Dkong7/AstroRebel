import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Store = () => {
  const { t } = useLanguage();
  const { themeColors } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    { 
      id: 1, 
      name: "T-Shirt Astro Original", 
      priceUSD: "25.00", priceCOP: "100.000",
      images: ["/camiseta.png", "/camiseta2.jpg"],
      specs: { material: "Algodón 180g", tintas: "Serigrafía tacto cero", entrega: "3-5 días", logistica: "Nacional/Internacional" }
    },
    { 
      id: 2, 
      name: "Vinyl 'Raíces'", 
      priceUSD: "35.00", priceCOP: "140.000",
      images: ["/lp.jpg"],
      specs: { material: "Vinilo 180g Audiófilo", tintas: "Carátula mate premium", entrega: "8 días", logistica: "Empaque rígido" }
    },
    { 
      id: 3, 
      name: "Cap Logo Gold", 
      priceUSD: "20.00", priceCOP: "80.000",
      images: ["/gorra.png", "/gorra2.png"],
      specs: { material: "Dril Premium", tintas: "Bordado 3D Relieve", entrega: "3-5 días", logistica: "Nacional" }
    },
    { 
      id: 4, 
      name: "Astro Hoodie", 
      priceUSD: "50.00", priceCOP: "200.000",
      images: ["/hoodie.png", "/hoodie 2.png"],
      specs: { material: "Algodón Perchado Mónaco", tintas: "Vinilo Textil Reflectivo", entrega: "5-7 días", logistica: "Nacional/Internacional" }
    },
    { 
      id: 5, 
      name: "CD Edición Especial", 
      priceUSD: "15.00", priceCOP: "60.000",
      images: ["/cd.png"],
      specs: { material: "Jewel Case Crystal", tintas: "Offset 4 tintas", entrega: "3 días", logistica: "Nacional" }
    },
  ];

  return (
    <div className={`pt-32 min-h-screen px-4 ${themeColors.bg} transition-colors duration-500`}>
      <div className="fixed inset-0 w-full h-full opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('/textura.png')" }}></div>
      
      <h1 className={`text-6xl font-black uppercase tracking-tighter mb-16 text-center z-10 relative ${themeColors.text}`}>
        {t('store_title')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
        {products.map(p => (
          <div key={p.id} onClick={() => setSelectedProduct(p)} className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer">
            <div className="overflow-hidden rounded-xl mb-4 aspect-square">
              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <h3 className="text-white font-bold text-lg uppercase leading-none mb-2">{p.name}</h3>
            <p className="text-green-400 font-mono text-sm">${p.priceUSD} USD / ${p.priceCOP} COP</p>
          </div>
        ))}
      </div>

      {/* MODAL DE PRODUCTO */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          >
            <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl">
              {/* Columna Izquierda: Fotos */}
              <div className="p-8 bg-neutral-900/50 flex flex-col gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/5">
                  <img src={selectedProduct.images[0]} className="w-full h-full object-cover" alt="principal" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {selectedProduct.images.map((img: string, i: number) => (
                    <img key={i} src={img} className="aspect-square object-cover rounded-lg border border-white/10 cursor-pointer hover:border-white/40 transition-all" alt="thumb" />
                  ))}
                </div>
              </div>

              {/* Columna Derecha: Specs */}
              <div className="p-10 flex flex-col justify-between">
                <div>
                  <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-white uppercase text-xs tracking-widest mb-8">✕ Cerrar</button>
                  <h2 className="text-4xl font-black text-white uppercase mb-2 leading-none">{selectedProduct.name}</h2>
                  <p className="text-2xl font-mono text-green-500 mb-8">${selectedProduct.priceUSD} USD <span className="text-gray-600 text-sm">/</span> ${selectedProduct.priceCOP} COP</p>
                  
                  <div className="space-y-4 mb-10">
                    <div className="border-b border-white/5 pb-2">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 block">Material / Calidad</span>
                      <span className="text-white font-medium uppercase">{selectedProduct.specs.material}</span>
                    </div>
                    <div className="border-b border-white/5 pb-2">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 block">Tintas / Acabado</span>
                      <span className="text-white font-medium uppercase">{selectedProduct.specs.tintas}</span>
                    </div>
                    <div className="border-b border-white/5 pb-2">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 block">Logística & Entrega</span>
                      <span className="text-white font-medium uppercase">{selectedProduct.specs.logistica} - {selectedProduct.specs.entrega}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-neutral-200 transition-all">
                    Añadir al Carrito
                  </button>
                  <button className="w-full bg-[#009ee3] text-white py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <img src="/mercadopago.png" alt="MP" className="h-4" /> Pagar con Mercado Pago
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Store;