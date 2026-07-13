import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: "O sistema funciona sem internet (offline)?",
    answer: "Sim! O Zoltic possui um modo offline robusto. Suas vendas continuam normalmente e são sincronizadas automaticamente assim que a conexão for restabelecida."
  },
  {
    question: "Posso usar meus equipamentos atuais (impressora térmica, leitor)?",
    answer: "O Zoltic é compatível com a maioria das impressoras térmicas ESC/POS e leitores de código de barras USB/Bluetooth do mercado."
  },
  {
    question: "Como funciona o backup dos meus dados?",
    answer: "Realizamos backups em nuvem automaticamente em tempo real para os planos Pro e Enterprise, e backups diários para o plano Starter. Seus dados nunca são perdidos."
  },
  {
    question: "Existe limite de usuários no sistema?",
    answer: "Depende do seu plano. O Starter inclui 1 admin, o Pro permite até 5 usuários com níveis de acesso, e o Enterprise é ilimitado."
  }
];

export const FAQ = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto bg-slate-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          Perguntas Frequentes
        </h2>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <FAQItem key={i} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:bg-slate-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-800">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
