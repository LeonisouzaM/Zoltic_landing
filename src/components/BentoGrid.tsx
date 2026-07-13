import { motion } from 'motion/react';
import { WifiOff, Brain, Receipt, Scale } from 'lucide-react';

export const BentoGrid = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-16 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
            Feito para Operar<br />
            <span className="text-slate-500">Sob Pressão.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-full">
          
          {/* Bento Box 1: Offline (Large) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:col-span-2 bg-slate-900 rounded-none border-l-4 border-blue-500 p-8 md:p-12 flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <WifiOff className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight">
                Resiliência Offline
              </h3>
              <p className="text-slate-400 font-medium text-lg max-w-md">
                Caiu a internet? O Zoltic continua operando normalmente. Suas vendas nunca param e os dados são sincronizados automaticamente assim que a conexão retornar.
              </p>
            </div>
          </motion.div>

          {/* Bento Box 2: AI (Medium) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="md:col-span-2 bg-blue-50 border border-slate-200 p-8 md:p-12 flex flex-col justify-between"
          >
            <div>
              <Brain className="w-10 h-10 text-slate-900 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                Zoltic AI: Seu Gerente Virtual
              </h3>
              <p className="text-slate-600 font-medium text-lg">
                Calcule tendências e seja avisado antes que o estoque acabe. A inteligência artificial integrada aprende o ritmo histórico da sua loja e sugere ações automáticas.
              </p>
            </div>
          </motion.div>

          {/* Bento Box 3: Fiscal (Medium) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="md:col-span-2 bg-slate-100 border border-slate-200 p-8 md:p-12 flex flex-col justify-between"
          >
            <div>
              <Receipt className="w-10 h-10 text-slate-900 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                Emissão Fiscal Nativa
              </h3>
              <p className="text-slate-600 font-medium text-lg">
                Emissão de NFC-e e NF-e em poucos cliques, sem integrações instáveis. Tudo nativo, validado e direto para a SEFAZ, garantindo conformidade total.
              </p>
            </div>
          </motion.div>
          
          {/* Bento Box 4: Setup (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="md:col-span-2 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between"
          >
            <div>
              <Scale className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">
                TEF e Balanças Integrados
              </h3>
              <p className="text-slate-400 font-medium text-lg">
                Leitura direta de peso das balanças de checkout e processamento de pagamentos em cartão (TEF) embutidos no sistema. Sem retrabalho, sem margem para erros de digitação.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
