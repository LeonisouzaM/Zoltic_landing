import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MonitorSmartphone, Users, FileText, BarChart4 } from 'lucide-react';

const TABS = [
  {
    id: 'pdv',
    icon: MonitorSmartphone,
    title: 'PDV Rápido & Resiliente',
    desc: 'Frente de caixa projetada para velocidade. Funciona offline sem interromper as vendas.',
    mockupTitle: 'Frente de Caixa'
  },
  {
    id: 'clientes',
    icon: Users,
    title: 'Gestão de Clientes',
    desc: 'CRM embutido. Mantenha o histórico de compras, limite de crédito e dados completos.',
    mockupTitle: 'Clientes & CRM'
  },
  {
    id: 'orcamentos',
    icon: FileText,
    title: 'Orçamentos & Pré-Vendas',
    desc: 'Gere cotações e pré-vendas no salão que podem ser convertidas instantaneamente no caixa.',
    mockupTitle: 'Pré-vendas'
  },
  {
    id: 'relatorios',
    icon: BarChart4,
    title: 'Relatórios e Analytics',
    desc: 'Visão total do negócio. Lucratividade, curva ABC, DRE e controle rigoroso de fluxo de caixa.',
    mockupTitle: 'Analytics'
  }
];

export const InteractiveTabs = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <section className="py-24 px-6 md:px-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-left mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
            Gestão <span className="text-blue-700">Completa</span> do ERP
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left: Tabs List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-0 border border-slate-200 bg-white shadow-sm">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left p-6 transition-all duration-200 border-l-4 border-b border-b-slate-100 last:border-b-0 ${
                    isActive
                      ? 'bg-slate-50 border-l-blue-600'
                      : 'bg-white border-l-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center mb-4 transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <tab.icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                    {tab.title}
                  </h3>
                  <p className={`text-sm font-medium leading-relaxed ${isActive ? 'text-slate-700' : 'text-slate-500'}`}>
                    {tab.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Image Area */}
          <div className="w-full lg:w-2/3">
            <div className="bg-slate-900 p-6 md:p-12 h-[500px] md:h-[600px] border border-slate-800 relative overflow-hidden flex items-center justify-center shadow-2xl">
              
              {/* Background abstract elements (More industrial) */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: 'linear' }}
                  className="w-full max-w-2xl bg-white border border-slate-300 overflow-hidden flex flex-col z-10 aspect-[4/3] shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]"
                >
                  {/* Mockup Header based on active tab */}
                  <div className="h-12 border-b-2 border-slate-200 bg-slate-100 flex items-center px-4 justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                      Zoltic / {TABS.find(t => t.id === activeTab)?.mockupTitle}
                    </span>
                    <div className="flex gap-1.5">
                       <div className="w-3 h-3 bg-slate-300"></div>
                       <div className="w-3 h-3 bg-slate-300"></div>
                       <div className="w-3 h-3 bg-slate-300"></div>
                    </div>
                  </div>
                  
                  {/* Abstract content area that changes based on tab */}
                  <div className="flex-1 p-6 bg-white flex flex-col gap-4">
                    {activeTab === 'pdv' && (
                      <>
                        <div className="flex justify-between gap-4">
                          <div className="flex-1 h-12 bg-slate-100 border border-slate-200"></div>
                          <div className="w-24 h-12 bg-blue-600"></div>
                        </div>
                        <div className="flex-1 flex gap-4">
                           <div className="flex-1 bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2 p-2">
                              {[...Array(9)].map((_, i) => <div key={i} className="bg-white border border-slate-200"></div>)}
                           </div>
                           <div className="w-1/3 bg-slate-50 border border-slate-200 flex flex-col justify-end p-4">
                              <div className="w-full h-12 bg-slate-900"></div>
                           </div>
                        </div>
                      </>
                    )}
                    {activeTab === 'clientes' && (
                      <>
                        <div className="flex gap-4 mb-2">
                           <div className="h-16 flex-1 bg-slate-100 border border-slate-200"></div>
                           <div className="h-16 flex-1 bg-slate-100 border border-slate-200"></div>
                           <div className="h-16 w-32 bg-blue-600"></div>
                        </div>
                        <div className="flex-1 bg-slate-50 border border-slate-200 flex flex-col p-0">
                           <div className="h-10 bg-slate-200 border-b border-slate-300"></div>
                           {[...Array(5)].map((_, i) => <div key={i} className="flex-1 bg-white border-b border-slate-100"></div>)}
                        </div>
                      </>
                    )}
                    {activeTab === 'orcamentos' && (
                      <>
                        <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-4">
                           <div className="w-1/3 h-8 bg-slate-200"></div>
                           <div className="w-32 h-8 bg-emerald-600"></div>
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                           <div className="h-12 w-full bg-slate-100 border border-slate-200"></div>
                           <div className="h-12 w-full bg-slate-100 border border-slate-200"></div>
                           <div className="h-12 w-full bg-slate-100 border border-slate-200"></div>
                        </div>
                      </>
                    )}
                    {activeTab === 'relatorios' && (
                      <>
                         <div className="h-48 bg-slate-50 border border-slate-200 flex items-end p-4 gap-4">
                           <div className="w-1/6 h-1/4 bg-slate-300"></div>
                           <div className="w-1/6 h-1/2 bg-slate-400"></div>
                           <div className="w-1/6 h-3/4 bg-blue-400"></div>
                           <div className="w-1/6 h-full bg-blue-600"></div>
                           <div className="w-1/6 h-2/3 bg-emerald-500"></div>
                           <div className="w-1/6 h-1/3 bg-slate-800"></div>
                         </div>
                         <div className="flex-1 flex gap-4">
                           <div className="flex-1 bg-slate-100 border border-slate-200"></div>
                           <div className="flex-1 bg-slate-100 border border-slate-200"></div>
                           <div className="flex-1 bg-slate-100 border border-slate-200"></div>
                         </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
