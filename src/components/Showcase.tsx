import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export const Showcase = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 text-balance mb-4">
            O Zoltic tem os recursos essenciais que melhoram a performance do seu negócio
          </h2>
          <p className="text-slate-600 text-lg font-medium text-balance max-w-2xl mx-auto">
            Veja como nossa interface simples e direta ajuda você a vender mais em menos tempo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[16/9] max-w-5xl mx-auto"
        >
          {/* Main App Mockup Container */}
          <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col group cursor-pointer">
            
            {/* Fake Browser/App Header */}
            <div className="h-12 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              </div>
              <div className="flex-1 bg-white mx-4 rounded h-6 border border-slate-200"></div>
            </div>

            {/* Fake App Body */}
            <div className="flex-1 p-6 flex gap-6 bg-slate-50">
               {/* Sidebar */}
               <div className="w-48 bg-white border border-slate-200 rounded-xl hidden md:flex flex-col p-4 gap-3">
                 <div className="h-8 bg-blue-50 rounded-md w-full"></div>
                 <div className="h-4 bg-slate-100 rounded-md w-3/4 mt-4"></div>
                 <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                 <div className="h-4 bg-slate-100 rounded-md w-5/6"></div>
                 <div className="h-4 bg-slate-100 rounded-md w-4/5"></div>
               </div>
               
               {/* Main Content Area */}
               <div className="flex-1 flex flex-col gap-4">
                 <div className="h-16 bg-white border border-slate-200 rounded-xl flex items-center px-4 justify-between">
                   <div className="w-32 h-6 bg-slate-100 rounded-md"></div>
                   <div className="w-24 h-8 bg-blue-600 rounded-md"></div>
                 </div>
                 <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex gap-4">
                   <div className="flex-1 flex flex-col gap-4">
                      <div className="h-32 bg-slate-50 rounded-lg border border-slate-100"></div>
                      <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100"></div>
                   </div>
                   <div className="w-1/3 bg-slate-50 rounded-lg border border-slate-100"></div>
                 </div>
               </div>
            </div>

            {/* Overlay Play Button */}
            <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 group-hover:bg-slate-900/5 group-hover:backdrop-blur-0">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-600/30 text-white transform group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <Play className="w-8 h-8 ml-1 fill-white" />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
