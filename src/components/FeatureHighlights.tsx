import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const FeatureHighlights = () => {
  return (
    <section className="py-24 px-6 md:px-12 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Highlight 1: Frente de Caixa */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-sm font-bold">
              Frente de Caixa (PDV)
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight text-balance">
              Acelere suas vendas e acabe com as filas
            </h2>
            <p className="text-lg text-slate-600 font-medium text-balance">
              O Zoltic foi desenhado para operação em alta velocidade. Suporta atalhos de teclado, leitura ultrarrápida de código de barras e pagamentos integrados para que seu caixa nunca pare.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Venda em menos de 3 cliques",
                "Modo offline contínuo",
                "Integração com balanças e leitores",
                "Emissão de cupom não fiscal e NFC-e"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="text-blue-700 font-bold flex items-center gap-2 hover:text-blue-800 transition-colors pt-4 group">
              Ver demonstração do caixa <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full"
          >
            <div className="bg-slate-100 rounded-xl p-4 shadow-inner border border-slate-200">
              <div className="aspect-[4/3] bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="h-10 border-b border-slate-100 flex items-center px-4 bg-slate-50">
                  <div className="w-20 h-4 bg-slate-200 rounded"></div>
                </div>
                <div className="flex-1 p-4 flex gap-4">
                  <div className="flex-1 border border-slate-100 rounded-lg p-3 flex flex-col gap-2">
                    <div className="h-8 bg-slate-50 rounded mb-2"></div>
                    <div className="h-10 bg-blue-50 rounded"></div>
                    <div className="h-10 bg-slate-50 rounded"></div>
                    <div className="h-10 bg-slate-50 rounded"></div>
                  </div>
                  <div className="w-1/3 border border-slate-100 rounded-lg bg-slate-50 p-4 flex flex-col justify-end">
                    <div className="h-12 bg-blue-600 rounded-md w-full mb-2"></div>
                    <div className="h-12 bg-slate-800 rounded-md w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlight 2: Estoque e Relatórios (Reverse Layout) */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-sm font-bold">
              Retaguarda Inteligente
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight text-balance">
              Tenha o controle total do seu negócio
            </h2>
            <p className="text-lg text-slate-600 font-medium text-balance">
              Gerencie estoque de múltiplas lojas, defina alertas de baixo estoque e acompanhe o fluxo de caixa de qualquer lugar. Relatórios precisos para decisões inteligentes.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Atualização de estoque em tempo real",
                "Relatórios de curva ABC e lucratividade",
                "Controle de fiado e contas a receber",
                "Gestão de fornecedores e compras"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full"
          >
            <div className="bg-slate-100 rounded-xl p-4 shadow-inner border border-slate-200">
              <div className="aspect-[4/3] bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col p-4 gap-4">
                <div className="h-1/2 flex gap-4">
                  <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-4 flex flex-col justify-end">
                     {/* Faux chart */}
                     <div className="flex items-end gap-2 h-20">
                       <div className="w-1/4 h-1/3 bg-blue-200 rounded-t-sm"></div>
                       <div className="w-1/4 h-2/3 bg-blue-300 rounded-t-sm"></div>
                       <div className="w-1/4 h-1/2 bg-blue-400 rounded-t-sm"></div>
                       <div className="w-1/4 h-full bg-blue-600 rounded-t-sm"></div>
                     </div>
                  </div>
                  <div className="w-1/3 bg-slate-50 border border-slate-100 rounded-lg"></div>
                </div>
                <div className="h-1/2 bg-slate-50 border border-slate-100 rounded-lg"></div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
