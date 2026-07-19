import { ChevronRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero = () => {
  return (
    <section className="relative pt-24 pb-20 px-6 md:px-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-start text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <div className="w-2 h-2 bg-blue-600 rounded-none animate-pulse" />
            Zoltic PDV v2.0
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tighter text-slate-900 leading-[0.95] text-balance mb-6 uppercase"
          >
            Velocidade Extrema.<br />
            <span className="text-blue-700">Resiliência Offline.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-lg md:text-xl text-slate-600 font-medium text-balance mb-10 max-w-xl"
          >
            O sistema de Ponto de Venda projetado para nunca parar. Checkout em segundos, integração com balanças e TEF, emissão fiscal nativa e inteligência artificial para prever seu estoque.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold tracking-widest uppercase hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 fill-current" />
              Testar Agora
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-slate-900 text-slate-900 font-bold tracking-widest uppercase hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              Falar com Consultor
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Right: Solid/Industrial Mockups */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex-1 w-full relative h-[450px] lg:h-[550px]"
        >
           {/* Abstract Solid PDV UI */}
           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[110%] bg-white border-4 border-slate-900 p-6 shadow-[16px_16px_0px_0px_rgba(15,23,42,1)] z-10 flex flex-col gap-6">

              <div className="flex justify-between items-center border-b-2 border-slate-200 pb-4">
                <div className="h-6 w-32 bg-slate-800"></div>
                <div className="h-6 w-16 bg-emerald-500"></div>
              </div>

              <div className="flex gap-6">
                <div className="flex-1 flex flex-col gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200">
                      <div className="h-4 w-1/2 bg-slate-300"></div>
                      <div className="h-4 w-1/4 bg-slate-800"></div>
                    </div>
                  ))}
                </div>

                <div className="w-1/3 bg-slate-900 p-4 flex flex-col justify-between text-white">
                  <div className="text-xs tracking-widest font-bold text-slate-400 mb-2">TOTAL DA COMPRA</div>
                  <div className="text-4xl font-black mb-6">R$ 142,50</div>
                  <div className="w-full py-3 bg-blue-600 text-center font-bold tracking-widest text-sm">FINALIZAR</div>
                </div>
              </div>

           </div>
        </motion.div>
      </div>
    </section>
  );
};
