import { motion } from 'motion/react';
import { Check, Info } from 'lucide-react';

const PLANS = [
  {
    name: "Starter",
    price: "R$ 49",
    period: "/mês",
    description: "Perfeito para negócios que estão começando.",
    features: [
      "Até 500 produtos no estoque",
      "1 Usuário Admin",
      "Suporte via Email",
      "Relatórios Básicos"
    ],
    recommended: false,
  },
  {
    name: "Pro",
    price: "R$ 99",
    period: "/mês",
    description: "Ideal para lojas com alto volume de vendas.",
    features: [
      "Produtos Ilimitados",
      "Até 5 Usuários",
      "Suporte Prioritário WhatsApp",
      "Relatórios Avançados",
      "Backup Diário em Nuvem"
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "R$ 199",
    period: "/mês",
    description: "Para redes de lojas e operações complexas.",
    features: [
      "Tudo do plano Pro",
      "Múltiplas Lojas",
      "Usuários Ilimitados",
      "API de Integração",
      "Gerente de Conta Dedicado"
    ],
    recommended: false,
  }
];

export const Pricing = () => {
  return (
    <section id="planos" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 text-balance">
            Preços simples e transparentes
          </h2>
          <p className="text-slate-600 text-lg font-medium text-balance">
            Escolha o plano que melhor se adapta ao tamanho do seu negócio. Sem surpresas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-xl p-8 ${
                plan.recommended 
                  ? 'bg-blue-600 text-white shadow-xl scale-100 md:scale-105 z-10' 
                  : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-blue-200 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Mais Escolhido
                  </span>
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 h-10 font-medium ${plan.recommended ? 'text-blue-100' : 'text-slate-500'}`}>{plan.description}</p>
              
              <div className="mb-8">
                <span className={`text-4xl font-extrabold ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                <span className={`font-semibold ${plan.recommended ? 'text-blue-200' : 'text-slate-500'}`}>{plan.period}</span>
              </div>
              
              <button 
                className={`w-full py-3 rounded-lg font-bold transition-all mb-8 shadow-sm ease-[cubic-bezier(0.22,1,0.36,1)] duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
                  plan.recommended 
                    ? 'bg-white text-blue-600 hover:bg-slate-50' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Assinar {plan.name}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.recommended ? 'text-blue-200' : 'text-blue-600'}`} />
                    <span className={`text-sm font-medium ${plan.recommended ? 'text-white' : 'text-slate-700'}`}>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-slate-500 font-medium text-sm">
          <Info className="w-4 h-4" />
          <span>Todos os planos incluem garantia de reembolso de 14 dias.</span>
        </div>
      </div>
    </section>
  );
};
