export const Header = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white shadow-md shadow-blue-500/30">
          Z
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900">Zoltic</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
        <a href="#funcionalidades" className="hover:text-blue-600 transition-colors">Funcionalidades</a>
        <a href="#depoimentos" className="hover:text-blue-600 transition-colors">Depoimentos</a>
        <a href="#planos" className="hover:text-blue-600 transition-colors">Planos</a>
      </div>
      <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
        Teste Grátis
      </button>
    </nav>
  );
};
