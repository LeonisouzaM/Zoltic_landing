import { motion } from 'motion/react';

const METRICS = [
  { value: "99.9%", label: "Uptime Garantido" },
  { value: "+5.000", label: "Lojas Ativas" },
  { value: "< 2s", label: "Tempo por Venda" },
  { value: "24/7", label: "Suporte Técnico" },
];

export const Metrics = () => {
  return (
    <section className="border-y border-slate-200 bg-white py-10 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
          {METRICS.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-4"
            >
              <span className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{metric.value}</span>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{metric.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
