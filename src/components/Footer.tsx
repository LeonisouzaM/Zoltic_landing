
export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-6 md:px-12 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white shadow-md shadow-blue-500/20">
              Z
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Zoltic</span>
          </div>
          <p className="text-slate-500 max-w-sm text-sm">
            O Ponto de Venda projetado para escalar o seu negócio. Gestão inteligente, simples e extremamente rápida.
          </p>
        </div>

        <div>
          <h4 className="text-slate-900 font-semibold mb-4">Produto</h4>
          <ul className="space-y-3 text-sm text-slate-600">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Funcionalidades</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Planos e Preços</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Integrações</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Atualizações</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-semibold mb-4">Suporte</h4>
          <ul className="space-y-3 text-sm text-slate-600">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Central de Ajuda</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Status do Sistema</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Falar com Consultor</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Zoltic Sistemas. Todos os direitos reservados.
        </p>
        <div className="flex gap-4 text-xs text-slate-500">
          <a href="#" className="hover:text-blue-600 transition-colors">Termos de Serviço</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
};
