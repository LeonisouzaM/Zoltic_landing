import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const FEATURES = [
  "Frente de Caixa (PDV) Offline", "Zoltic AI (Gerente Virtual)", "Emissão NFC-e e NF-e", "Integração TEF", 
  "Integração Balança", "Controle de Estoque e Demanda", "Curva ABC de Produtos", "Contas a Pagar e Receber", 
  "Fluxo de Caixa", "Demonstrativo (DRE)", "Gestão de Múltiplos Caixas", "Controle de Permissões (Caixa/Gerente)", 
  "Leitura Rápida de Códigos", "Impressão Térmica Nativa", "Controle de Fiado / Crediário", 
  "Orçamentos no Salão", "Pré-vendas", "Relatórios Financeiros Consolidados",
  "Sincronização Cloud", "Gestão de Clientes e Fornecedores", "Devoluções Simplificadas", 
  "Descontos e Promoções", "Busca Rápida de CNPJ"
];

export const FeatureCloud = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-6"
          >
            Tudo o que o seu negócio precisa.
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
             className="text-slate-400 text-lg font-medium text-balance"
          >
            Uma única plataforma consolidada com todos os recursos operacionais e financeiros.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: i * 0.015, ease: 'easeOut' }}
              className="bg-slate-800 hover:bg-slate-50 border border-slate-700 text-slate-300 hover:text-slate-900 rounded-sm px-5 py-2.5 text-sm md:text-base font-bold flex items-center gap-2 transition-colors cursor-default"
            >
              <Check className="w-4 h-4 text-blue-500" />
              {feature}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
