import { motion } from 'motion/react';
import { Zap, ShieldCheck, BarChart3, Cloud, Layers, Smartphone } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: "Vendas na Velocidade da Luz",
    description: "Interface otimizada para caixas rápidos. Conclua vendas em menos cliques e reduza filas.",
  },
  {
    icon: Cloud,
    title: "Backup Automático",
    description: "Seus dados estão seguros e sincronizados. Nunca mais perca informações importantes.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Inteligentes",
    description: "Entenda o que vende mais. Visualize o lucro e o fluxo de caixa de forma clara.",
  },
  {
    icon: Layers,
    title: "Estoque Sincronizado",
    description: "Cada venda atualiza o estoque instantaneamente, com alertas automáticos de reposição.",
  },
  {
    icon: ShieldCheck,
    title: "Controle de Permissões",
    description: "Diferentes acessos para Vendedores, Caixas e Gerentes. Segurança para sua operação.",
  },
  {
    icon: Smartphone,
    title: "Responsivo e Adaptável",
    description: "Funciona perfeitamente em telas pequenas ou grandes. Adapta-se ao seu balcão.",
  }
];

export const Features = () => {
  return (
    <section id="funcionalidades" className="py-24 px-6 md:px-12 relative z-10 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Feito para quem não tem tempo a perder
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl text-lg font-medium text-balance">
            Combinamos um design elegante com funcionalidades poderosas. O resultado é um PDV que sua equipe vai amar usar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="bg-slate-50 border border-slate-200 p-8 rounded-xl hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
