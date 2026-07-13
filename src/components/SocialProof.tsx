import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Carlos M.",
    role: "Dono de Supermercado",
    content: "O sistema anterior travava sempre que o mercado enchia. Com o Zoltic, a fila anda rápido e eu acompanho tudo do meu celular. Mudou minha rotina.",
    initial: "C"
  },
  {
    name: "Juliana T.",
    role: "Gerente de Loja de Roupas",
    content: "A importação de produtos foi perfeita, o suporte me ajudou em tudo. O PDV é tão simples que os caixas novos aprendem a usar em 10 minutos.",
    initial: "J"
  },
  {
    name: "Roberto S.",
    role: "Proprietário de Restaurante",
    content: "Saber o lucro exato de cada prato me salvou. O fluxo de caixa é muito claro, e a integração com balança não me deu dor de cabeça nenhuma.",
    initial: "R"
  }
];

export const SocialProof = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-1 mb-4">
             {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
             ))}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Ajudamos milhares de empreendedores a simplificar seus negócios.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-700 text-white font-bold rounded-full flex items-center justify-center text-lg">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm font-medium text-slate-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-800 font-medium italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
