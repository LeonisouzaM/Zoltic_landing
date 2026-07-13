import { motion } from 'motion/react';
import { Printer, Monitor, Smartphone, Keyboard } from 'lucide-react';

const HARDWARE = [
  { icon: Printer, title: "Impressoras Térmicas", desc: "Compatível com modelos ESC/POS (Epson, Bematech, Elgin, etc)." },
  { icon: Monitor, title: "Qualquer Computador", desc: "Funciona perfeitamente em Windows, Linux e macOS." },
  { icon: Keyboard, title: "Leitores e Balanças", desc: "Integração nativa com leitores de código de barras USB/Bluetooth." },
  { icon: Smartphone, title: "Tablets e Mobile", desc: "Acesse os relatórios e dashboard do seu celular." },
];

export const Hardware = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Aproveite o hardware que você já possui
          </h2>
          <p className="text-lg text-slate-600 max-w-xl">
            Zero dor de cabeça. O Zoltic não exige equipamentos caros ou específicos. Nosso sistema foi projetado para se adaptar à sua infraestrutura atual, garantindo uma transição suave e sem custos extras.
          </p>
          <button className="btn-secondary mt-4">
            Ver lista de compatibilidade completa
          </button>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {HARDWARE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
