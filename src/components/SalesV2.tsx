import { useEffect, useState, type FormEvent } from 'react';
import {
  AlertTriangle, ArrowRight, BarChart3, Boxes, BrainCircuit, Check, ChevronDown,
  CreditCard, Database, FileCheck2, Gauge, Headphones, Landmark, LockKeyhole,
  Menu, Monitor, PackageCheck, Printer, ReceiptText, Scale, ScanLine, Search,
  ShieldCheck, ShoppingBasket, Sparkles, Store, Target, TrendingUp, UserCog,
  Users, WalletCards, WifiOff, Wrench, X, Zap,
} from 'lucide-react';
import '../sales-v2.css';

const whatsapp = String((import.meta as any).env?.VITE_SALES_WHATSAPP || '5500000000000').replace(/\D/g, '');
const wa = (text: string) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;

const benefits = [
  { icon: ScanLine, title: 'Venda sem fazer a fila esperar', text: 'Busque ou bipe produtos, aplique desconto e receba em dinheiro, cartão, Pix ou a prazo na mesma tela.' },
  { icon: Boxes, title: 'Estoque que acompanha cada cupom', text: 'A baixa acontece na venda. Alertas de mínimo, importação CSV e entrada por XML reduzem ajuste manual.' },
  { icon: Landmark, title: 'Caixa fechado com rastreabilidade', text: 'Abertura, sangria, suprimento, recebimentos e fechamento ficam ligados ao operador e ao terminal.' },
  { icon: Users, title: 'Fiado sem caderno', text: 'Cadastre clientes, defina limite de crédito, acompanhe pendências, histórico e pontos de fidelidade.' },
  { icon: ReceiptText, title: 'Fiscal dentro do fluxo', text: 'Emita NF-e e NFC-e, acompanhe status e mantenha os dados fiscais conectados à venda nos planos compatíveis.' },
  { icon: BarChart3, title: 'Decisões com o dia ainda acontecendo', text: 'Acompanhe vendas, ticket médio, formas de pagamento, curva ABC, estoque e desempenho por terminal.' },
  { icon: FileCheck2, title: 'Orçamento que vira venda', text: 'Crie propostas com identidade da empresa, exporte em PDF e converta a aprovação sem redigitar os itens.' },
  { icon: WalletCards, title: 'Financeiro no mesmo lugar', text: 'Organize contas a pagar e receber, vencimentos, baixas e vínculos com clientes, fornecedores e vendas.' },
];

const resourceGroups = [
  {
    title: 'Frente de caixa e vendas',
    icon: ScanLine,
    items: [
      'Busca por nome, código e leitor de código de barras',
      'Carrinho com quantidade, preço e desconto por item',
      'Desconto global em percentual ou valor',
      'Pagamento em dinheiro, cartão, Pix e a prazo',
      'Cálculo automático de troco',
      'Venda identificada por cliente, vendedor e terminal',
      'Comprovante em impressora térmica de 58 mm ou 80 mm',
      'Atalhos de teclado e operação em tela cheia',
      'Pré-vendas e pedidos mantidos em aberto',
    ],
  },
  {
    title: 'Caixa e recebimentos',
    icon: Landmark,
    items: [
      'Abertura e fechamento de sessão por operador',
      'Saldo inicial, saldo atual e valor contado',
      'Sangria e suprimento com histórico',
      'Registro de diferença no fechamento',
      'Recebimento parcial ou total de dívidas',
      'Movimentações ligadas ao operador e terminal',
    ],
  },
  {
    title: 'Produtos e estoque',
    icon: Boxes,
    items: [
      'Produtos, categorias, unidades, custo e preço de venda',
      'Estoque atual e estoque mínimo por produto',
      'Alerta de ruptura e itens zerados',
      'Histórico de alteração de preços',
      'Limite máximo de desconto por produto',
      'Importação de produtos por planilha CSV',
      'Entrada de mercadoria por XML de NF-e',
      'Vínculo de produtos a fornecedores',
      'Dados fiscais: NCM, CFOP, CEST, origem, CST e CSOSN',
    ],
  },
  {
    title: 'Clientes e fidelidade',
    icon: Users,
    items: [
      'Cadastro com CPF/CNPJ, contato e endereço',
      'Histórico de compras por cliente',
      'Limite de crédito para vendas a prazo',
      'Saldo e acompanhamento de pendências',
      'Programa de pontos com conversão configurável',
      'Consentimento de marketing e revogação',
      'Exportação e anonimização de dados pela LGPD',
    ],
  },
  {
    title: 'Orçamento personalizado',
    icon: FileCheck2,
    featured: true,
    items: [
      'Orçamento com logo e dados completos da empresa',
      'Cores principal e de destaque personalizáveis',
      'Produtos do catálogo e itens avulsos',
      'Especificação, unidade, quantidade e preço por item',
      'Desconto por item e desconto no total',
      'Forma de pagamento e prazo de validade',
      'Termos e condições personalizados',
      'Dados e endereço do cliente',
      'Vendedor e comissão vinculados à proposta',
      'Exportação em PDF e impressão',
      'Status pendente, aprovado ou cancelado',
      'Conversão do orçamento aprovado em venda sem redigitar',
    ],
  },
  {
    title: 'Financeiro',
    icon: WalletCards,
    items: [
      'Contas a pagar e contas a receber',
      'Categorias de despesas e receitas',
      'Vencimento, baixa e data de pagamento',
      'Vínculo com cliente, fornecedor ou venda',
      'Visão de valores pendentes e fluxo financeiro',
    ],
  },
  {
    title: 'Fiscal e documentos',
    icon: ReceiptText,
    items: [
      'Emissão e acompanhamento de NF-e e NFC-e',
      'Ambientes de homologação e produção',
      'Status autorizada, rejeitada, cancelada e contingência',
      'Chave, protocolo, XML, DANFE e QR Code',
      'Configuração de CSC, certificado e provedor fiscal',
      'Importação de XML de fornecedores',
    ],
  },
  {
    title: 'Relatórios e indicadores',
    icon: BarChart3,
    items: [
      'Resumo de vendas e faturamento',
      'Ticket médio e formas de pagamento',
      'Produtos mais vendidos e curva ABC',
      'Desempenho por vendedor e terminal',
      'Estoque crítico e produtos parados',
      'Metas diárias e mensais configuráveis',
      'Exportação de relatórios',
    ],
  },
  {
    title: 'Fornecedores, trocas e devoluções',
    icon: PackageCheck,
    items: [
      'Cadastro e contato de fornecedores',
      'Prazo médio de entrega e produtos vinculados',
      'Histórico de entradas de notas e mercadorias',
      'Devolução vinculada à venda original',
      'Resolução por troca, crédito ou estorno',
      'Reposição de itens no estoque com rastreabilidade',
    ],
  },
  {
    title: 'Equipe, terminais e segurança',
    icon: ShieldCheck,
    items: [
      'Operadores com PIN individual',
      'Papéis de administrador, gerente, caixa e vendedor',
      'Cadastro de vendedores e percentual de comissão',
      'Múltiplos terminais identificados por nome',
      'Auditoria de descontos, cancelamentos, estoque e caixa',
      'Logs de backup, relatórios, documentos e configurações',
      'Licenciamento e limites por plano',
    ],
  },
  {
    title: 'Hardware, continuidade e dados',
    icon: WifiOff,
    items: [
      'Operação local resiliente sem internet',
      'Impressora térmica e leitor de código de barras',
      'Balança de checkout configurável',
      'TEF integrado configurável',
      'Chave Pix e QR Code no fluxo da empresa',
      'Backup local, exportação e restauração',
      'Backup em nuvem nos planos compatíveis',
      'Atualização do aplicativo e diagnóstico de suporte',
    ],
  },
  {
    title: 'Inteligência Artificial',
    icon: BrainCircuit,
    items: [
      'Briefing diário para o gerente',
      'Decisões priorizadas por urgência e impacto',
      'Insights e alertas automáticos',
      'Previsão de vendas para 7, 30 e 90 dias',
      'Previsão de fluxo de caixa e demanda de estoque',
      'Análise de sazonalidade por dia e horário',
      'Consultas em português sobre vendas, lucro e caixa',
      'Análise de produtos, margens, estoque e clientes inativos',
      'Sugestões de compra e oportunidades operacionais',
    ],
  },
];

const plans = [
  { name: 'Básico', note: 'Para começar com uma frente de caixa organizada.', items: ['1 terminal', 'Até 2 vendedores', 'Até 500 produtos', 'Vendas, estoque e clientes'] },
  { name: 'Pro', note: 'Para lojas que querem gestão e automação.', items: ['Até 2 terminais', 'Até 5 vendedores', 'Até 5.000 produtos', 'Financeiro, IA e backup em nuvem'], featured: true },
  { name: 'Business', note: 'Para operações maiores e conectadas.', items: ['Até 5 terminais', 'Até 20 vendedores', 'Até 25.000 produtos', 'Fiscal, rede e todos os módulos'] },
  { name: 'Enterprise', note: 'Capacidade sob medida para redes.', items: ['Terminais sem limite definido', 'Vendedores sem limite definido', 'Produtos sem limite definido', 'Implantação consultiva'] },
];

const segments = [
  { icon: Wrench, title: 'Ferragens e materiais', text: 'Busca rápida em catálogos extensos, orçamento personalizado, fornecedores, custo, margem e reposição.' },
  { icon: ShoppingBasket, title: 'Mercados e conveniências', text: 'Leitor, balança, múltiplas formas de pagamento, estoque mínimo e fechamento por operador.' },
  { icon: Store, title: 'Lojas e papelarias', text: 'Variações de produtos, clientes, fidelidade, vendedores, comissões e histórico de compras.' },
  { icon: PackageCheck, title: 'Autopeças e agropecuárias', text: 'Produtos vinculados a fornecedores, entrada por XML, curva ABC e itens parados.' },
  { icon: ReceiptText, title: 'Drogarias e varejo especializado', text: 'Dados fiscais, rastreabilidade operacional, clientes e controle preciso do estoque.' },
  { icon: WalletCards, title: 'Restaurantes e atendimento rápido', text: 'Pré-vendas, pedidos em aberto, recebimento direto e operação local mesmo com internet instável.' },
];

const compatibility = [
  { icon: Monitor, title: 'Computador Windows', text: 'Operação local preparada para o ritmo do caixa.' },
  { icon: ScanLine, title: 'Leitor de código de barras', text: 'Leitura direta para acelerar busca e lançamento.' },
  { icon: Printer, title: 'Impressora térmica', text: 'Comprovantes em 58 mm ou 80 mm.' },
  { icon: Scale, title: 'Balança de checkout', text: 'Configuração disponível para equipamentos compatíveis.' },
  { icon: CreditCard, title: 'TEF integrado', text: 'Integração sujeita à homologação do equipamento.' },
  { icon: Database, title: 'XML e planilhas', text: 'Entrada por XML de NF-e e importação por CSV.' },
];

const planComparison = [
  ['Terminais', '1', 'Até 2', 'Até 5', 'Sob medida'],
  ['Vendedores', 'Até 2', 'Até 5', 'Até 20', 'Sob medida'],
  ['Produtos', 'Até 500', 'Até 5.000', 'Até 25.000', 'Sob medida'],
  ['Vendas, estoque e clientes', 'Incluído', 'Incluído', 'Incluído', 'Incluído'],
  ['Financeiro e nuvem', '—', 'Incluído', 'Incluído', 'Incluído'],
  ['Central de Inteligência IA', '—', 'Incluído', 'Incluído', 'Incluído'],
  ['Fiscal e operação em rede', '—', '—', 'Incluído', 'Incluído'],
];

const faqs = [
  ['O Zoltic funciona sem internet?', 'A operação local foi desenhada para continuar mesmo offline. Recursos de sincronização e nuvem dependem da conexão e do plano contratado.'],
  ['Consigo importar meus produtos?', 'Sim. O sistema possui importação por planilha CSV e também entrada de produtos e estoque por XML de nota fiscal.'],
  ['Posso controlar mais de um caixa?', 'Sim. Os planos definem limites diferentes de terminais, vendedores e produtos. A equipe comercial indica a opção adequada à sua operação.'],
  ['O sistema emite nota fiscal?', 'O módulo fiscal contempla NF-e e NFC-e e está disponível nos planos compatíveis, sujeito à configuração fiscal da empresa e do provedor.'],
  ['Há controle de acesso?', 'Sim. Vendedores e operadores usam PIN e papéis como administrador, gerente, caixa e vendedor. Ações sensíveis são registradas em auditoria.'],
  ['Funciona com balança e TEF?', 'O sistema possui configurações para balança de checkout e TEF integrado. A compatibilidade do seu equipamento deve ser confirmada na demonstração.'],
  ['Quanto custa o Zoltic?', 'O valor depende do plano, da quantidade de terminais e dos módulos necessários. A equipe apresenta a condição adequada depois de entender a operação da loja.'],
  ['Posso conhecer o sistema antes de contratar?', 'Sim. Você pode solicitar uma demonstração guiada para validar o fluxo, os recursos e a compatibilidade com seus equipamentos antes de decidir.'],
  ['Vocês ajudam a migrar meus produtos?', 'A implantação pode usar importação por planilha CSV e entrada por XML de nota fiscal. O formato e o volume dos dados são avaliados antes da migração.'],
  ['O suporte está incluído?', 'A modalidade de suporte e os serviços de implantação são apresentados nas condições de cada plano. Na demonstração, você recebe essa informação de forma objetiva.'],
  ['Existe fidelidade ou cobrança de implantação?', 'Prazos contratuais, implantação e condições de cancelamento devem ser confirmados na proposta comercial do plano escolhido.'],
];

const testimonialExamples = [
  { name: 'Carlos Silva', role: 'Proprietário da Ferragens Silva', initials: 'CS', photo: '/images/testimonials/owner-01.jpg', quote: 'Com muitos itens no balcão, a busca rápida e o leitor ajudam a encontrar o produto sem deixar o cliente esperando.' },
  { name: 'Maria Oliveira', role: 'Sócia do Mercado Bom Vizinho', initials: 'MO', photo: '/images/testimonials/owner-02.jpg', quote: 'O estoque baixa a cada venda e o alerta de mínimo mostra o que precisa entrar na próxima compra.' },
  { name: 'Juliana Santos', role: 'Fundadora da Moda Avenida', initials: 'JS', photo: '/images/testimonials/owner-03.jpg', quote: 'O orçamento personalizado sai com a identidade da loja e vira venda quando a cliente aprova, sem redigitar.' },
  { name: 'André Pereira', role: 'Gestor da Drogaria Vida Mais', initials: 'AP', photo: '/images/testimonials/owner-04.jpg', quote: 'A entrada por XML reduz o cadastro manual e ajuda a manter custo, dados fiscais e estoque alinhados.' },
  { name: 'Sandra Souza', role: 'Proprietária da Padaria Pão da Vila', initials: 'SS', photo: '/images/testimonials/owner-05.jpg', quote: 'A balança no checkout e o fluxo direto de pagamento deixam o atendimento do balcão muito mais organizado.' },
  { name: 'Paulo Almeida', role: 'Sócio do Restaurante Sabor da Casa', initials: 'PA', photo: '/images/testimonials/owner-06.jpg', quote: 'A pré-venda mantém o pedido aberto e a equipe finaliza somente quando o cliente está pronto para pagar.' },
  { name: 'Roberto Lima', role: 'Dono da Auto Peças Central', initials: 'RL', photo: '/images/testimonials/owner-07.jpg', quote: 'Fornecedor, custo, margem e histórico de preço ficam juntos, o que facilita muito a reposição das peças.' },
  { name: 'Fernanda Costa', role: 'Fundadora do Pet Shop Amigo Fiel', initials: 'FC', photo: '/images/testimonials/owner-08.jpg', quote: 'O cadastro de clientes e o programa de pontos ajudam a acompanhar quem compra e a fortalecer a recorrência.' },
  { name: 'Marcos Nogueira', role: 'Gestor da Casa Nogueira Móveis', initials: 'MN', photo: '/images/testimonials/owner-09.jpg', quote: 'A proposta em PDF fica profissional, com validade, condições, desconto e todos os dados da nossa empresa.' },
  { name: 'João Batista', role: 'Proprietário da Agropecuária Campo Forte', initials: 'JB', photo: '/images/testimonials/owner-10.jpg', quote: 'Os alertas mostram os produtos críticos e a IA ajuda a enxergar o que merece reposição primeiro.' },
  { name: 'Luciana Ramos', role: 'Dona da Papelaria Ponto Certo', initials: 'LR', photo: '/images/testimonials/owner-11.jpg', quote: 'Com vendedor por PIN e comissão vinculada, cada venda fica registrada para a pessoa certa.' },
  { name: 'Renato Barbosa', role: 'Sócio da Conveniência Dois Irmãos', initials: 'RB', photo: '/images/testimonials/owner-12.jpg', quote: 'Mesmo quando a conexão oscila, o caixa local continua pronto para atender e não interromper a fila.' },
];

const productScreens = [
  { label: 'Frente de caixa', title: 'Venda completa em uma única tela', description: 'Busca por nome, código ou leitor, categorias, quantidades, descontos, cliente e total da venda sem perder o contexto do atendimento.', image: '/images/product/frente-caixa.png', alt: 'Tela real da frente de caixa do Zoltic com produtos no carrinho e resumo da venda', width: 1361, height: 719 },
  { label: 'Pagamento', title: 'Finalize do jeito que o cliente prefere', description: 'Dinheiro, cartão, Pix ou a prazo, com vendedor, cliente, descontos e valor final reunidos no fechamento.', image: '/images/product/pagamento.png', alt: 'Tela real de finalização de venda do Zoltic com Pix selecionado', width: 663, height: 621 },
  { label: 'Assistente IA', title: 'Pergunte sobre a loja em linguagem natural', description: 'O assistente responde consultas sobre vendas, estoque, clientes, vendedores e outros dados atuais do sistema.', image: '/images/product/assistente-ia.png', alt: 'Assistente de inteligência artificial do Zoltic respondendo quanto foi vendido no dia', width: 407, height: 490 },
  { label: 'Cupom fiscal', title: 'Comprovante pronto para imprimir ou salvar', description: 'Visualize o documento térmico, imprima o cupom ou salve em PDF mantendo itens, totais, vendedor e terminal.', image: '/images/product/cupom-fiscal.png', alt: 'Visualização real de cupom fiscal térmico no Zoltic', width: 438, height: 617 },
  { label: 'Análise', title: 'Entenda o estoque sem montar planilhas', description: 'A análise resume quantidade de produtos, valor em estoque, itens elevados e distribuição por categoria.', image: '/images/product/analise-produtos-hd.png', alt: 'Análise real de produtos e valor em estoque no Zoltic', width: 1981, height: 794 },
  { label: 'Ações com IA', title: 'Encontre produtos parados e decida o próximo passo', description: 'A IA identifica itens sem venda, apresenta exemplos e sugere uma ação comercial com confirmação do usuário.', image: '/images/product/ia-produtos-parados.png', alt: 'Assistente do Zoltic identificando produtos parados há mais de noventa dias', width: 408, height: 488 },
];

function LeadForm() {
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    window.open(wa(`Olá! Sou ${name} da empresa ${store}. Quero conhecer o Zoltic PDV.`), '_blank', 'noopener,noreferrer');
  };
  return (
    <form className="v2-form" onSubmit={submit} aria-label="Solicitar demonstração">
      <div><label htmlFor="v2-name">Seu nome</label><input id="v2-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Como podemos chamar você?" required /></div>
      <div><label htmlFor="v2-store">Nome da empresa</label><input id="v2-store" value={store} onChange={(e) => setStore(e.target.value)} placeholder="Sua loja ou rede" required /></div>
      <button type="submit">Quero uma demonstração <ArrowRight size={18} /></button>
      <small>Você será direcionado ao WhatsApp. Sem compromisso.</small>
    </form>
  );
}

export function SalesV2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const title = 'Sistema PDV para Lojas e Mercados | Zoltic';
    const description = 'Sistema PDV para lojas, mercados e varejo com frente de caixa, estoque, financeiro, fiscal, orçamentos e inteligência artificial. Conheça o Zoltic.';
    const canonicalUrl = new URL('/vendas', window.location.origin).toString();
    const socialImage = new URL('/images/product/frente-caixa.png', window.location.origin).toString();
    const setMeta = (selector: string, content: string) => document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);

    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:image"]', socialImage);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', socialImage);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schema = document.createElement('script');
    schema.id = 'zoltic-seo-schema';
    schema.type = 'application/ld+json';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', name: 'Zoltic', url: window.location.origin },
        { '@type': 'WebPage', name: title, url: canonicalUrl, description, inLanguage: 'pt-BR' },
        { '@type': 'SoftwareApplication', name: 'Zoltic PDV', applicationCategory: 'BusinessApplication', operatingSystem: 'Windows', description, featureList: ['Frente de caixa', 'Controle de estoque', 'Orçamentos personalizados', 'Emissão fiscal', 'Gestão financeira', 'Inteligência artificial'] },
        { '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
      ],
    });
    document.querySelector('#zoltic-seo-schema')?.remove();
    document.head.appendChild(schema);
  }, []);

  return (
    <div className="v2-page">
      <a className="v2-skip" href="#conteudo">Pular para o conteúdo</a>
      <header className="v2-header">
        <a className="v2-brand" href="#inicio" aria-label="Zoltic — início"><span>Z</span><strong>Zoltic</strong><small>PDV</small></a>
        <button className="v2-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'open' : ''} aria-label="Navegação principal">
          <a href="#recursos" onClick={() => setMenuOpen(false)}>Recursos</a><a href="#inteligencia" onClick={() => setMenuOpen(false)}>Inteligência</a><a href="#funciona" onClick={() => setMenuOpen(false)}>Como funciona</a><a href="#planos" onClick={() => setMenuOpen(false)}>Planos</a><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </nav>
        <a className="v2-header-cta" href="#contato">Pedir demonstração</a>
      </header>

      <main id="conteudo">
        <section className="v2-hero" id="inicio">
          <div className="v2-hero-copy">
            <p className="v2-kicker"><Zap size={16} /> O caixa não pode esperar o sistema</p>
            <h1><small>Sistema PDV para varejo</small>Venda rápido.<br /><span>Controle tudo.</span></h1>
            <p className="v2-lead">O Zoltic reúne frente de caixa, estoque, clientes, financeiro, fiscal e relatórios em uma operação direta — inclusive quando a internet falha.</p>
            <div className="v2-actions"><a className="v2-primary" href="#contato">Ver o Zoltic em ação <ArrowRight size={18} /></a><a className="v2-secondary" href="#recursos">Explorar todos os recursos</a></div>
            <ul className="v2-trust"><li><Check /> Sem cartão no primeiro contato</li><li><Check /> Implantação orientada</li><li><Check /> Suporte em português</li></ul>
          </div>
          <div className="v2-product" aria-label="Demonstração visual da frente de caixa Zoltic">
            <div className="v2-product-bar"><span><i /> Terminal 01</span><strong>Venda em andamento</strong><span className="v2-offline"><WifiOff size={14} /> Pronto para operar offline</span></div>
            <div className="v2-product-body">
              <div className="v2-cart">
                <div className="v2-search"><ScanLine size={20} /><span>Bipe ou busque um produto</span><kbd>F2</kbd></div>
                {[['789100', 'Café tradicional 500g', '2', 'R$ 37,80'], ['789311', 'Leite integral 1L', '6', 'R$ 35,40'], ['789720', 'Arroz tipo 1 5kg', '1', 'R$ 29,90']].map((row) => <div className="v2-item" key={row[0]}><small>{row[0]}</small><strong>{row[1]}</strong><span>{row[2]} un.</span><b>{row[3]}</b></div>)}
              </div>
              <aside className="v2-checkout"><p>Total da venda</p><strong>R$ 103,10</strong><div className="v2-pay"><span>Pix</span><span>Cartão</span><span>Dinheiro</span></div><button>Finalizar venda <ArrowRight size={17} /></button><small>Estoque atualizado automaticamente</small></aside>
            </div>
          </div>
        </section>

        <section className="v2-proof" aria-label="Confiança e conformidade"><div><ShieldCheck /><span><strong>LGPD no fluxo</strong>Consentimento, exportação e anonimização</span></div><div><LockKeyhole /><span><strong>Auditoria operacional</strong>Ações sensíveis ligadas ao operador</span></div><div><WifiOff /><span><strong>Operação resiliente</strong>O caixa local não depende da nuvem</span></div><p>Indicadores públicos de clientes e avaliações serão adicionados após validação.</p></section>

        <section className="v2-product-tour" aria-labelledby="product-tour-title">
          <div className="v2-section-head">
            <p>Produto real, rotina real</p>
            <h2 id="product-tour-title">Veja o Zoltic em ação.</h2>
          </div>
          <p className="v2-product-tour-lead">Explore as telas reais do sistema. Todas as capturas estão visíveis abaixo, sem precisar abrir abas.</p>
          <div className="v2-screen-gallery">
            {productScreens.map((screen, index) => (
              <article className={index === 0 ? 'wide' : ''} key={screen.label}>
                <div className="v2-screen-copy"><span>{String(index + 1).padStart(2, '0')} · {screen.label}</span><h3>{screen.title}</h3><p>{screen.description}</p></div>
                <figure><img src={screen.image} alt={screen.alt} loading="lazy" decoding="async" width={screen.width} height={screen.height} /><figcaption>Tela real do Zoltic PDV</figcaption></figure>
              </article>
            ))}
          </div>
          <a className="v2-screen-gallery-cta" href="#contato">Quero ver tudo em uma demonstração <ArrowRight size={17} /></a>
        </section>

        <section className="v2-pains">
          <div className="v2-section-head"><p>O custo do improviso aparece no fim do dia</p><h2>Fila, diferença no caixa e estoque errado não são “parte do varejo”.</h2></div>
          <div className="v2-pain-list"><article><span>01</span><h3>Atendimento lento</h3><p>O operador pula entre telas enquanto a fila cresce.</p><b>Com o Zoltic</b><p>Busca, carrinho, pagamento e recibo seguem um único fluxo.</p></article><article><span>02</span><h3>Controle fragmentado</h3><p>Fiado, despesas e estoque vivem em planilhas diferentes.</p><b>Com o Zoltic</b><p>Clientes, financeiro e produtos compartilham a mesma operação.</p></article><article><span>03</span><h3>Gestão no escuro</h3><p>O dono descobre o problema quando já perdeu margem.</p><b>Com o Zoltic</b><p>Relatórios e alertas tornam os desvios visíveis mais cedo.</p></article></div>
        </section>

        <section className="v2-benefits" id="beneficios">
          <div className="v2-section-head light"><p>Recursos que trabalham pelo resultado</p><h2>Da primeira leitura do código ao fechamento do dia.</h2></div>
          <div className="v2-benefit-grid">{benefits.map(({ icon: Icon, title, text }, index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="v2-ai" id="inteligencia">
          <div className="v2-ai-copy">
            <p><BrainCircuit size={18} /> Central de Inteligência Zoltic</p>
            <h2>O sistema não entrega só números. Ele mostra onde agir.</h2>
            <p className="v2-ai-lead">A IA analisa vendas, produtos, clientes, caixa, contas, vendedores e fornecedores para transformar a rotina da loja em prioridades objetivas.</p>
            <div className="v2-ai-capabilities">
              <article><Target /><div><h3>Decisões de hoje</h3><p>Recomendações organizadas por urgência, impacto estimado e nível de confiança.</p></div></article>
              <article><TrendingUp /><div><h3>Previsões e sazonalidade</h3><p>Projeções de vendas para 7, 30 e 90 dias, fluxo de caixa, demanda de estoque, dias e horários mais fortes.</p></div></article>
              <article><AlertTriangle /><div><h3>Alertas antes do prejuízo</h3><p>Estoque crítico, produtos parados, clientes inativos e riscos financeiros ganham visibilidade.</p></div></article>
              <article><Search /><div><h3>Pergunte em português</h3><p>Consulte vendas, lucro estimado, saldo do caixa, melhores produtos, vendedores e sugestões de compra.</p></div></article>
            </div>
            <span className="v2-ai-plan"><Sparkles size={15} /> Central de Inteligência disponível a partir do plano Pro.</span>
          </div>
          <div className="v2-ai-demo" aria-label="Exemplo da Central de Inteligência do Zoltic">
            <div className="v2-ai-top"><span><BrainCircuit size={17} /> Central de Inteligência</span><b>IA</b></div>
            <div className="v2-ai-brief"><small>Briefing do gerente · agora</small><strong>Três decisões merecem sua atenção hoje.</strong><p>O estoque, as vendas e o financeiro foram analisados com os dados atuais da operação.</p></div>
            <div className="v2-ai-decision"><span>1</span><div><small>URGENTE · ESTOQUE</small><strong>5 produtos estão próximos da ruptura</strong><p>Priorize a reposição dos itens com maior giro antes do próximo pico de vendas.</p></div><b>Alto impacto</b></div>
            <div className="v2-ai-decision"><span>2</span><div><small>OPORTUNIDADE · CLIENTES</small><strong>Clientes sem comprar há mais de 90 dias</strong><p>Consulte a lista de inativos e planeje uma ação de recuperação.</p></div><b>Médio impacto</b></div>
            <div className="v2-ai-query"><Search size={17} /><span>Quanto vendi hoje?</span><kbd>Enter</kbd></div>
            <div className="v2-ai-answer"><Sparkles size={15} /><p><strong>Vendas de hoje</strong><br />A resposta usa os dados atuais e compara o resultado com o período anterior quando disponível.</p></div>
          </div>
        </section>

        <section className="v2-catalog" id="recursos">
          <div className="v2-section-head">
            <p>Visão completa do sistema</p>
            <h2>Todos os recursos do Zoltic, organizados pela rotina da loja.</h2>
          </div>
          <p className="v2-catalog-lead">Cada item abaixo foi identificado no código do produto. A disponibilidade de fiscal, financeiro, IA, nuvem, rede, quantidade de terminais, vendedores e produtos varia conforme o plano.</p>
          <div className="v2-catalog-grid">
            {resourceGroups.map(({ title, icon: Icon, items, featured }) => (
              <article className={featured ? 'featured' : ''} key={title}>
                <header><Icon /><h3>{title}</h3>{featured && <span>Destaque</span>}</header>
                <ul>{items.map((item) => <li key={item}><Check />{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="v2-segments" id="segmentos" aria-labelledby="segments-title">
          <div className="v2-section-head"><p>Um sistema, diferentes balcões</p><h2 id="segments-title">O Zoltic se adapta à rotina da sua loja.</h2></div>
          <div className="v2-segment-list">{segments.map(({ icon: Icon, title, text }) => <article key={title}><Icon aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div><Check aria-hidden="true" /></article>)}</div>
          <a href="#contato">Quero validar meu segmento <ArrowRight size={17} /></a>
        </section>

        <section className="v2-compatibility" aria-labelledby="compatibility-title">
          <div><p>Equipamentos e dados</p><h2 id="compatibility-title">Aproveite a estrutura que já existe na loja.</h2><p className="v2-compatibility-lead">Na demonstração, a equipe confere modelos e requisitos antes da implantação para evitar surpresas no caixa.</p></div>
          <div className="v2-compatibility-list">{compatibility.map(({ icon: Icon, title, text }) => <article key={title}><Icon aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </section>

        <section className="v2-how" id="funciona">
          <div className="v2-section-head"><p>Comece sem transformar a loja em um projeto de TI</p><h2>Da configuração ao acompanhamento da operação.</h2></div>
          <ol><li><span>1</span><div><h3>Diagnóstico</h3><p>A equipe entende terminais, equipamentos, catálogo, fiscal e rotina da loja.</p></div></li><li><span>2</span><div><h3>Configuração</h3><p>Empresa, operadores, permissões, terminal e preferências do caixa.</p></div></li><li><span>3</span><div><h3>Importação</h3><p>Cadastre produtos ou aproveite planilhas CSV e XML de fornecedor.</p></div></li><li><span>4</span><div><h3>Treinamento e início</h3><p>A equipe aprende o fluxo e começa a vender com a estrutura validada.</p></div></li><li><span>5</span><div><h3>Suporte e evolução</h3><p>Acompanhe relatórios, ajuste a operação e adicione capacidade quando necessário.</p></div></li></ol>
        </section>

        <section className="v2-security" aria-labelledby="security-title">
          <div className="v2-security-copy"><ShieldCheck aria-hidden="true" /><p>Controle e continuidade</p><h2 id="security-title">Sua operação protegida sem travar o atendimento.</h2><p>Segurança no Zoltic não é uma tela isolada: ela acompanha usuários, movimentações, dados e continuidade do caixa.</p></div>
          <ul><li><WifiOff /><span><strong>Operação offline</strong>O caixa local continua disponível quando a conexão oscila.</span></li><li><UserCog /><span><strong>Acesso por função</strong>PIN e papéis separam administrador, gerente, caixa e vendedor.</span></li><li><LockKeyhole /><span><strong>Auditoria</strong>Ações sensíveis permanecem ligadas ao operador e ao terminal.</span></li><li><Database /><span><strong>Backup e nuvem</strong>Recursos de proteção e sincronização disponíveis conforme o plano.</span></li><li><ShieldCheck /><span><strong>LGPD</strong>Consentimento, exportação, revogação e anonimização de dados.</span></li></ul>
        </section>

        <section className="v2-difference"><div><p>Por que Zoltic</p><h2>Feito para a pressão do balcão. Preparado para a visão do gestor.</h2><a href="#contato">Conversar com um especialista <ArrowRight size={18} /></a></div><div className="v2-diff-list"><article><Gauge /><h3>Fluxo operacional direto</h3><p>Atalhos, busca e telas pensadas para reduzir passos na venda.</p></article><article><PackageCheck /><h3>Dados conectados</h3><p>A venda alimenta estoque, cliente, caixa, vendedor e relatórios.</p></article><article><ShieldCheck /><h3>Controle por responsabilidade</h3><p>PIN, papéis, terminais e auditoria mostram quem fez cada ação.</p></article><article><Sparkles /><h3>Capacidade que cresce por plano</h3><p>Financeiro, fiscal, IA, nuvem e rede entram conforme a operação evolui.</p></article></div></section>

        <section className="v2-testimonials" aria-labelledby="cases-title">
          <div className="v2-testimonial-heading">
            <p>Cenários ilustrativos · substitua por clientes validados antes da publicação</p>
            <h2 id="cases-title">O Zoltic acompanha diferentes rotinas de varejo.</h2>
          </div>
          <div className="v2-testimonial-stage">
            <div className="v2-testimonial-quote" aria-live="polite">
              <span>{testimonialExamples[activeTestimonial].name}</span>
              <strong>{testimonialExamples[activeTestimonial].role}</strong>
              <p>“{testimonialExamples[activeTestimonial].quote}”</p>
            </div>
            <div className="v2-avatar-row" aria-label="Selecionar cenário de uso">
              {testimonialExamples.map((item, index) => (
                <button className={activeTestimonial === index ? 'active' : ''} onClick={() => setActiveTestimonial(index)} aria-label={`Ver cenário: ${item.role}`} aria-pressed={activeTestimonial === index} key={item.name}>
                  <img src={item.photo} alt="" loading="lazy" />
                  <span>{item.initials}</span>
                </button>
              ))}
              <span className="v2-avatar-more" aria-label="Espaço para adicionar novos depoimentos">+</span>
            </div>
            <div className="v2-testimonial-message">
              <strong>Histórias reais<br />merecem destaque.</strong>
              <p>Esta área está pronta para receber depoimentos, resultados e nomes autorizados dos clientes Zoltic.</p>
            </div>
          </div>
        </section>

        <section className="v2-plans" id="planos"><div className="v2-section-head light"><p>Planos baseados na estrutura real do produto</p><h2>Escolha capacidade. Não pague por improviso.</h2></div><div className="v2-plan-grid">{plans.map((plan) => <article className={plan.featured ? 'featured' : ''} key={plan.name}>{plan.featured && <em>Mais indicado</em>}<h3>{plan.name}</h3><p>{plan.note}</p><ul>{plan.items.map((item) => <li key={item}><Check />{item}</li>)}</ul><a href="#contato">Consultar condições <ArrowRight size={17} /></a></article>)}</div><div className="v2-plan-table-wrap"><table className="v2-plan-table"><caption>Comparação dos principais recursos por plano</caption><thead><tr><th scope="col">Recurso</th><th scope="col">Básico</th><th scope="col">Pro</th><th scope="col">Business</th><th scope="col">Enterprise</th></tr></thead><tbody>{planComparison.map(([feature, ...values]) => <tr key={feature}><th scope="row">{feature}</th>{values.map((value, index) => <td className={index === 1 ? 'recommended' : ''} key={`${feature}-${index}`}>{value === 'Incluído' ? <span><Check /> Incluído</span> : value}</td>)}</tr>)}</tbody></table></div><p className="v2-plan-note">Preços, condições, implantação e disponibilidade final dos módulos são confirmados pela equipe comercial.</p></section>

        <section className="v2-faq" id="faq"><div className="v2-section-head"><p>Antes de escolher</p><h2>Perguntas que merecem resposta direta.</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown /></summary><p>{answer}</p></details>)}</div></section>

        <section className="v2-contact" id="contato"><div><p>Seu próximo dia de vendas pode ser mais simples.</p><h2>Veja o Zoltic trabalhando com a rotina da sua loja.</h2><ul><li><Check /> Demonstração guiada</li><li><Check /> Avaliação de hardware e integrações</li><li><Check /> Indicação do plano adequado</li></ul><div className="v2-contact-proof"><Headphones /><span><strong>Atendimento humano</strong>Converse com quem entende o fluxo de um PDV.</span></div></div><LeadForm /></section>
      </main>

      <a className="v2-mobile-cta" href="#contato"><span>Conheça o Zoltic</span><strong>Agendar demonstração <ArrowRight size={16} /></strong></a>

      <footer className="v2-footer"><div><a className="v2-brand inverse" href="#inicio"><span>Z</span><strong>Zoltic</strong><small>PDV</small></a><p>Tecnologia para vender com velocidade e gerir com clareza.</p></div><div><strong>Produto</strong><a href="#recursos">Recursos</a><a href="#funciona">Como funciona</a><a href="#planos">Planos</a></div><div><strong>Institucional</strong><a href="/privacidade">Privacidade</a><a href="/termos">Termos de uso</a><a href={wa('Olá! Quero falar com a equipe Zoltic.')}>Contato</a></div><div><strong>Compatibilidade</strong><span>Windows · Impressora térmica</span><span>Leitor · Balança · TEF*</span><small>*Confirmar equipamentos na demonstração.</small></div><p className="v2-copyright">© {new Date().getFullYear()} Zoltic. Todos os direitos reservados.</p></footer>
    </div>
  );
}
