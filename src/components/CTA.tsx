import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="bg-emerald-700 py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance tracking-tight">
            Gestão inteligente para vender mais e se preocupar menos, tem no Zoltic!
          </h2>
          <p className="text-emerald-50 text-xl max-w-2xl mx-auto mb-10 font-medium text-balance opacity-90">
            Junte-se a milhares de lojistas que já pararam de perder tempo com sistemas lentos e ultrapassados.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-white text-emerald-800 font-bold py-4 px-10 rounded-lg shadow-sm hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center gap-2 text-lg">
              Crie sua conta grátis agora <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-8 text-sm text-emerald-200 font-medium">
            Não é necessário cartão de crédito para testar por 14 dias.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
