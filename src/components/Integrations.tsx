import { motion } from 'motion/react';

const INTEGRATIONS = [
  "Mercado Livre", "Shopee", "Nuvemshop", "Tray", "iFood", 
  "Correios", "Melhor Envio", "Stone", "PagSeguro", "Cielo", "Stone"
];

export const Integrations = () => {
  return (
    <section className="py-20 px-6 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Potencialize seu negócio com integrações</h3>
        <p className="text-slate-500 font-medium">Conecte o Zoltic às maiores plataformas do mercado.</p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto flex overflow-hidden mask-edges">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap items-center"
        >
          {/* Double the array for seamless infinite scroll */}
          {[...INTEGRATIONS, ...INTEGRATIONS].map((partner, i) => (
            <div 
              key={i} 
              className="mx-8 bg-white border border-slate-200 shadow-sm h-16 px-8 rounded-xl flex items-center justify-center min-w-[160px]"
            >
              <span className="font-bold text-slate-400 text-lg">{partner}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Inline styles for the fade mask */}
      <style>{`
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
};
