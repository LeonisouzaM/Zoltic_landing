import { useState, useEffect, useRef, type CSSProperties } from 'react';
import {
  ArrowRight,
  ArrowLeftRight,
  BarChart3,
  BrainCircuit,
  Boxes,
  Check,
  ChevronDown,
  ChevronRight,
  Cloud,
  CreditCard,
  FileText,
  HardDrive,
  Lightbulb,
  Package,
  Receipt,
  RefreshCw,
  Scale,
  Send,
  ShieldCheck,
  ShoppingCart,
  Terminal,
  TrendingUp,
  Truck,
  Upload,
  Users,
  WifiOff,
  X,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SALES_WHATSAPP = String((import.meta as any).env?.VITE_SALES_WHATSAPP || '5500000000000').replace(/\D/g, '');

const buildWhatsAppUrl = (message: string) => (
  `https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(message)}`
);

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const pains = [
  {
    icon: Zap,
    title: 'Caixa que trava na hora do rush',
    problem: 'Sistema lento → fila grande → cliente irritado → venda perdida.',
    solution: 'O Zoltic é construído para velocidade: bipou, escolheu pagamento, imprimiu. Mesmo sem internet.',
  },
  {
    icon: Boxes,
    title: 'Estoque que nunca bate',
    problem: 'Vende o que não tem. Compra o que já está sobrando. Ruptura silenciosa.',
    solution: 'Estoque atualizado a cada venda, com alerta de mínimo antes de acabar e importação por planilha.',
  },
  {
    icon: BarChart3,
    title: 'Sem visão financeira real',
    problem: 'Caixa cheio não significa lucro. Sem relatório, é chute.',
    solution: 'Dashboard com vendas do dia, ticket médio, formas de pagamento e desempenho por terminal em tempo real.',
  },
  {
    icon: FileText,
    title: 'Medo da parte fiscal',
    problem: 'NF-e, NFC-e, SAT, impostos — cada erro é multa.',
    solution: 'Emissão de NF-e e NFC-e integrada ao fluxo de venda, sem precisar de outro sistema.',
  },
];

const modules = [
  { icon: ShoppingCart, title: 'PDV de alta velocidade', text: 'Venda por busca, código de barras, atalhos de teclado (F1–F12) e checkout direto para dinheiro, cartão, Pix ou fiado.', benefit: 'A fila anda rápido, o cliente sai feliz.' },
  { icon: Boxes, title: 'Estoque inteligente', text: 'Produtos, categorias, mínimo por item, importação CSV e alertas de ruptura. Entrada automática via XML de NF-e.', benefit: 'Saiba o que vender mais antes de faltar.' },
  { icon: Users, title: 'Clientes e fiado', text: 'Cadastro rápido, limite de crédito, histórico de compras, pontos de fidelidade e cobrança parcial ou total da conta.', benefit: 'Venda a prazo sem perder o controle de quem deve.' },
  { icon: Terminal, title: 'Terminais e vendedores', text: 'Cada computador é um Terminal numerado. Vendedores entram por PIN e mantêm auditoria completa de cada ação.', benefit: 'Vários caixas, um controle só.' },
  { icon: Receipt, title: 'Fiscal completo', text: 'Emissão de NF-e e NFC-e integrada ao fluxo de venda. Importação de XML de fornecedores para entrada de estoque.', benefit: 'Emita nota em segundos, sem erro de cálculo.' },
  { icon: BarChart3, title: 'Relatórios de decisão', text: 'Vendas, ticket médio, curva ABC, formas de pagamento, desempenho por terminal e histórico exportável.', benefit: 'Entenda para onde vai o dinheiro da sua loja.' },
  { icon: CreditCard, title: 'TEF, Pix e caixa', text: 'Abertura, sangria, suprimento, fechamento de caixa e recebimento de dívidas de fiado integrados ao fluxo.', benefit: 'Feche o caixa do dia sem dor de cabeça.' },
  { icon: FileText, title: 'Orçamentos profissionais', text: 'Crie propostas com logo da empresa, itens e valores. Exporte em PDF ou converta em venda com um clique.', benefit: 'Mande propostas que viram vendas no mesmo dia.' },
  { icon: ArrowLeftRight, title: 'Devoluções', text: 'Devolução com resolução por estorno, crédito em conta ou troca de produto — com rastreio completo.', benefit: 'Troca de mercadoria sem bagunçar o estoque.' },
  { icon: Upload, title: 'Importação de NF-e via XML', text: 'Suba o XML da nota fiscal do fornecedor e o sistema atualiza o estoque e os dados do produto automaticamente.', benefit: 'Dê entrada em dezenas de itens com um clique.' },
  { icon: Truck, title: 'Gestão de fornecedores', text: 'Cadastro completo de fornecedores vinculado ao estoque, histórico de entradas e pedidos.', benefit: 'Pedido de reposição sem planilha.' },
  { icon: Scale, title: 'Balança e hardware', text: 'Leitura de peso no checkout, impressora térmica, gaveta automática, leitor de código e operação de balcão.', benefit: 'Seu hardware atual funciona perfeitamente aqui.' },
  { icon: Cloud, title: 'Backup e SaaS', text: 'Backup local e em nuvem, licenças por cliente, painel admin, monitoramento e base pronta para assinatura.', benefit: 'Seus dados protegidos contra qualquer desastre.' },
  { icon: Package, title: 'Pré-venda e pedidos', text: 'Abra pré-vendas, salve pedidos em aberto e finalize quando o cliente estiver pronto para pagar.', benefit: 'Atenda no salão e receba no caixa sem atrito.' },
];

const workflow = [
  { title: 'Instala', text: 'A loja passa pelo onboarding guiado: define terminal, admin, opções de backup e dados da empresa. Em minutos.' },
  { title: 'Cadastra', text: 'Importa produtos por planilha CSV ou cadastra manualmente. Configura categorias, preços e fornecedores.' },
  { title: 'Vende', text: 'O operador bipa, escolhe a forma de pagamento, imprime o comprovante. O estoque já foi atualizado automaticamente.' },
  { title: 'Controla', text: 'O gestor acompanha caixa, fiado, relatórios, terminais e alertas de estoque — sem depender do operador.' },
];

const aiFeatures = [
  { icon: BrainCircuit, title: 'Assistente em linguagem natural', text: 'Pergunte em português: "Quanto vendi hoje?", "Estoque crítico", "Melhor vendedor" — e receba a resposta na hora.' },
  { icon: Lightbulb, title: 'Insights automáticos', text: 'O sistema detecta oportunidades e riscos no seu negócio: produtos parados, clientes inativos, horários de pico.' },
  { icon: TrendingUp, title: 'Previsões de vendas e estoque', text: 'Projeções de faturamento para 7, 30 e 90 dias e alertas de ruptura antes de o estoque acabar.' },
  { icon: BarChart3, title: 'Análise de sazonalidade', text: 'Descubra os dias da semana e horários onde sua loja vende mais — e planeje equipe e estoque com dados reais.' },
];

const specs = [
  ['Offline first', 'A venda continua mesmo sem conexão. Sincroniza quando a internet voltar.'],
  ['Auditoria completa', 'Descontos, cancelamentos e sangrias rastreados por vendedor e terminal.'],
  ['Painel admin SaaS', 'Licenças, clientes e status da operação visíveis num único painel.'],
  ['Monitoramento', 'Erros críticos reportados automaticamente — menos suporte, mais uptime.'],
  ['Atalhos de teclado', 'F1–F12 para navegar entre módulos sem tirar as mãos do caixa.'],
];

const proofCards = [
  {
    value: 'Venda em segundos',
    title: 'Fluxo real de caixa',
    text: 'Busca por nome, codigo ou leitor, escolha de pagamento e cupom sem sair da tela principal.',
  },
  {
    value: 'Offline first',
    title: 'Operacao sem internet',
    text: 'O caixa continua vendendo localmente e sincroniza quando a conexao voltar.',
  },
  {
    value: 'Gestao completa',
    title: 'Controle alem do balcao',
    text: 'Estoque, fiado, vendedores, terminais, fiscal, orcamentos, devolucoes e relatorios.',
  },
];

const comparison = [
  { feature: 'Tempo para comecar a vender', zoltic: 'Em horas', traditional: 'Dias ou semanas' },
  { feature: 'Quando a internet cai', zoltic: 'Continua vendendo offline', traditional: 'Pode travar o caixa' },
  { feature: 'Caixas, terminais e vendedores', zoltic: 'Terminal + PIN + auditoria', traditional: 'Controle parcial' },
  { feature: 'Preco inicial / mes', zoltic: 'R$ 79', traditional: 'R$ 200+ e extras' },
  { feature: 'Custo escondido', zoltic: 'Sem tecnico obrigatorio', traditional: 'Implantacao e modulos extras' },
  { feature: 'Suporte no comeco da loja', zoltic: 'Setup assistido', traditional: 'Fila de ticket' },
  { feature: 'Estoque no caixa', zoltic: 'Baixa automatica por venda', traditional: 'Ajustes manuais frequentes' },
  { feature: 'Produtos por planilha', zoltic: 'Importacao CSV', traditional: 'Cadastro item por item' },
  { feature: 'Entrada por XML de NF-e', zoltic: 'Atualiza produtos e custos', traditional: 'Nem sempre incluso' },
  { feature: 'Orcamento para cliente', zoltic: 'PDF e cupom 80mm', traditional: 'Modulo separado' },
  { feature: 'Fiado e crediario', zoltic: 'Cliente, limite e recebimento', traditional: 'Controle fora do sistema' },
  { feature: 'Devolucao e troca', zoltic: 'Rastreio e resolucao no PDV', traditional: 'Processo manual' },
  { feature: 'Relatorios de decisao', zoltic: 'Vendas, caixa e estoque', traditional: 'Relatorios limitados' },
  { feature: 'Permissoes por cargo', zoltic: 'Admin, gerente, caixa e vendedor', traditional: 'Login compartilhado' },
  { feature: 'Backup da operacao', zoltic: 'Local e nuvem por plano', traditional: 'Dependente do servidor' },
  { feature: 'Computador necessario', zoltic: 'Roda em maquinas simples', traditional: 'Pode exigir upgrade' },
  { feature: 'Resultado no dia a dia', zoltic: 'Menos fila e retrabalho', traditional: 'Mais processos manuais' },
];

const comparisonHighlights = [
  {
    value: 'Mesmo dia',
    label: 'para colocar a loja vendendo',
    text: 'O cliente nao espera tecnico, instalacao longa ou configuracao confusa.',
  },
  {
    value: 'R$ 121+',
    label: 'de economia potencial por mes',
    text: 'Comparando o plano inicial do Zoltic com sistemas que partem de R$ 200+.',
  },
  {
    value: 'Offline',
    label: 'para nao perder venda por internet ruim',
    text: 'A operacao principal continua no caixa e sincroniza quando voltar a conexao.',
  },
];

const plans = [
  {
    name: 'Essencial',
    price: 'R$ 79',
    text: 'Para uma loja que precisa vender melhor agora.',
    features: [
      '1 terminal de caixa',
      'Produtos e vendas ilimitadas',
      'Controle de estoque',
      'Clientes e fiado',
      'Backup local',
      'Suporte por e-mail',
    ],
  },
  {
    name: 'Profissional',
    price: 'R$ 129',
    text: 'Para operação com equipe, controle e crescimento.',
    features: [
      'Até 3 terminais',
      'Vendedores com PIN e auditoria',
      'Relatórios avançados',
      'Backup em nuvem automático',
      'NF-e e NFC-e incluídos',
      'Suporte prioritário',
    ],
    featured: true,
  },
  {
    name: 'Rede',
    price: 'Sob consulta',
    text: 'Para redes que precisam padronizar múltiplas unidades.',
    features: [
      'Terminais adicionais',
      'Painel administrativo central',
      'Treinamento da equipe',
      'Acompanhamento de implantação',
      'SLA garantido',
      'Suporte dedicado',
    ],
  },
];

const faqs = [
  ['O Zoltic funciona sem internet?', 'Sim. A operação principal — vendas, estoque, caixa — continua funcionando localmente mesmo sem conexão. Quando a internet voltar, o sistema sincroniza e gera os backups automaticamente.'],
  ['Serve para qualquer tipo de loja?', 'Sim. O Zoltic foi projetado para multissegmento: mercado, varejo de moda, alimentação, farmácia, conveniência e muito mais. O fluxo é rápido para qualquer tipo de caixa.'],
  ['Preciso de um técnico para instalar?', 'Não. O onboarding é guiado e a maioria das lojas consegue configurar e vender no mesmo dia. Para redes maiores, oferecemos implantação assistida.'],
  ['Quantos computadores posso ter?', 'Cada computador é um terminal numerado. No plano Essencial são até 1 terminal; Profissional até 3. Para mais terminais, fale com a gente sobre o plano Rede.'],
  ['Como funciona a emissão de nota fiscal?', 'NF-e e NFC-e estão integrados ao fluxo de venda no plano Profissional em diante. Você configura os dados da empresa uma vez e o sistema cuida do restante.'],
  ['Posso migrar meus dados de outro sistema?', 'Sim. O Zoltic suporta importação de produtos via planilha CSV. Para dados mais complexos (clientes, histórico), entre em contato e avaliamos caso a caso.'],
  ['Meus dados estão seguros?', 'Sim. O sistema mantém backup local e, nos planos que incluem nuvem, backup criptografado automático. O acesso é controlado por permissões por usuário e as ações sensíveis são auditadas.'],
  ['Preciso comprar um computador novo?', 'Não. O Zoltic é extremamente leve e roda em computadores antigos (Windows 10, 4GB de RAM) sem travar, poupando investimento em hardware.'],
  ['Tem suporte em português?', 'Sim. Nosso suporte é 100% humano, em português do Brasil e disponível via WhatsApp.'],
  ['Posso cancelar quando quiser?', 'Sim. Não há fidelidade ou multa de cancelamento. Você cancela a qualquer momento pelo painel ou pelo WhatsApp de suporte.'],
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
   ───────────────────────────────────────────── */

const ProductMockup = () => (
  <div className="mockup-shell" aria-label="Prévia da tela de venda do Zoltic PDV">
    <div className="mockup-topbar">
      <span>Zoltic PDV</span>
      <strong>Terminal 01</strong>
      <span className="mockup-status">Online</span>
    </div>
    <div className="mockup-body">
      <div className="mockup-products">
        {[
          { name: 'Café 500g', price: 'R$ 8,90' },
          { name: 'Arroz tipo 1 5kg', price: 'R$ 23,50' },
          { name: 'Leite integral 1L', price: 'R$ 5,80' },
          { name: 'Pão francês (kg)', price: 'R$ 12,00' },
        ].map((item) => (
          <div className="mockup-row" key={item.name}>
            <span>{item.name}</span>
            <strong>{item.price}</strong>
          </div>
        ))}
      </div>
      <div className="mockup-total">
        <span className="mockup-total-label">Total da venda</span>
        <span className="mockup-total-value">R$ 50,20</span>
        <div className="mockup-pay-row">
          <div className="mockup-pay-btn active">Pix</div>
          <div className="mockup-pay-btn">Cartão</div>
          <div className="mockup-pay-btn">Dinheiro</div>
        </div>
        <div className="mockup-confirm">Finalizar venda →</div>
      </div>
    </div>
  </div>
);

const ComparisonCell = ({ value }: { value: boolean | string }) => {
  if (value === true) return <Check size={18} className="check-yes" style={{ margin: '0 auto' }} aria-label="Sim" />;
  if (value === false) return <X size={18} className="check-no" style={{ margin: '0 auto' }} aria-label="Não" />;
  return <span>{value}</span>;
};

const FaqItem = ({ question, answer, id }: { question: string; answer: string; id: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        id={`faq-btn-${id}`}
        className="faq-question"
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        onClick={() => setOpen(!open)}
      >
        {question}
        <ChevronDown size={18} className="faq-chevron" aria-hidden="true" />
      </button>
      <div
        id={`faq-answer-${id}`}
        className="faq-answer"
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        style={{ maxHeight: open ? 400 : 0 }}
      >
        <div className="faq-answer-inner">{answer}</div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   AI SECTION MOCK CHAT
   ───────────────────────────────────────────── */
const AiMockChat = () => {
  const exchanges = [
    { q: 'Quanto vendi hoje?', a: '💰 Hoje você faturou R$ 3.847,20 em 47 vendas. Ticket médio: R$ 81,86.' },
    { q: 'Estoque crítico', a: '⚠️ 8 produtos abaixo do mínimo: Café 500g (2 un), Arroz 5kg (1 un)...' },
    { q: 'Melhor vendedor da semana', a: '🏆 João Silva liderou com R$ 12.400 em vendas — 18% acima da meta.' },
  ];
  const [active, setActive] = useState(0);
  const current = exchanges[active % exchanges.length];

  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-dark2)', borderRadius: 12, overflow: 'hidden', maxWidth: 420 }}>
      <div style={{ background: 'linear-gradient(135deg, #4338ca, #7c3aed)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)', borderRadius: 8, display: 'grid', placeItems: 'center' }}>
          <BrainCircuit size={18} color="#fff" aria-hidden="true" />
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.88rem' }}>Assistente IA · Zoltic</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontWeight: 600 }}>Groq · linguagem natural</div>
        </div>
      </div>
      <div style={{ padding: '20px 18px', display: 'grid', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: 'var(--accent)', color: '#fff', padding: '10px 14px', borderRadius: '12px 12px 4px 12px', fontSize: '0.82rem', fontWeight: 600, maxWidth: '80%' }}>
            {current.q}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-dark)', color: 'var(--ink-2)', padding: '10px 14px', borderRadius: '12px 12px 12px 4px', fontSize: '0.82rem', fontWeight: 500, lineHeight: 1.5, maxWidth: '85%' }}>
            {current.a}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
          {exchanges.map((ex, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: '5px 10px', borderRadius: 20, fontSize: '0.73rem', fontWeight: 700, cursor: 'pointer', border: '1px solid',
                background: active % exchanges.length === i ? 'var(--accent)' : 'transparent',
                color: active % exchanges.length === i ? '#fff' : 'var(--muted)',
                borderColor: active % exchanges.length === i ? 'var(--accent)' : 'var(--border-dark2)',
                transition: 'all 150ms',
              }}
              aria-pressed={active % exchanges.length === i}
            >
              {ex.q.slice(0, 18)}{ex.q.length > 18 ? '…' : ''}
            </button>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border-dark)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border-dark2)', borderRadius: 8, padding: '8px 12px', color: 'var(--muted)', fontSize: '0.78rem' }}>
          Digite sua pergunta...
        </div>
        <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 7, display: 'grid', placeItems: 'center' }}>
          <Send size={15} color="#fff" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

const LeadForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `Olá! Quero saber mais sobre o Zoltic PDV.\n\nNome: ${form.name}\nE-mail: ${form.email}\nTelefone: ${form.phone}\nNome do negócio: ${form.business}`
    ;
    window.open(buildWhatsAppUrl(msg), '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="lead-form" style={{ alignItems: 'center', textAlign: 'center', gap: 24 }}>
        <Check size={42} style={{ color: '#4ade80', margin: '0 auto' }} aria-hidden="true" />
        <div>
          <h3>Mensagem enviada!</h3>
          <p style={{ marginTop: 8 }}>Abrimos o WhatsApp para você. Responderemos em breve.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate aria-label="Formulário de contato">
      <div>
        <h3>Agende uma demo guiada</h3>
        <p>Veja o caixa, estoque e relatórios funcionando antes de contratar.</p>
      </div>
      <div className="form-field">
        <label htmlFor="lead-name">Seu nome</label>
        <input
          id="lead-name"
          type="text"
          placeholder="João Silva"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label htmlFor="lead-email">E-mail</label>
        <input
          id="lead-email"
          type="email"
          placeholder="joao@minhaloja.com"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label htmlFor="lead-phone">WhatsApp</label>
        <input
          id="lead-phone"
          type="tel"
          placeholder="(11) 9 9999-9999"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label htmlFor="lead-business">Nome do negócio</label>
        <input
          id="lead-business"
          type="text"
          placeholder="Mercado do João"
          required
          value={form.business}
          onChange={(e) => setForm({ ...form, business: e.target.value })}
        />
      </div>
      <button type="submit" className="form-submit" id="cta-form-submit">
        Quero ver o Zoltic funcionando <ArrowRight size={17} aria-hidden="true" />
      </button>
      <p className="form-fine" id="form-fine-print">Sem compromisso. Resposta pelo WhatsApp.</p>
    </form>
  );
};

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
   ───────────────────────────────────────────── */
const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const duration = 1800;
      const step = Math.ceil(target / (duration / 16));
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); }
        else setCount(start);
      }, 16);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString('pt-BR')}</span>;
};

/* ─────────────────────────────────────────────
   STICKY NAV (scroll-triggered)
   ───────────────────────────────────────────── */
const StickyNav = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.div
      role="navigation"
      aria-label="Navegação rápida"
      initial={false}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: 'rgba(4,16,30,0.88)', backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px,5vw,56px)', height: 58,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }} aria-label="Ir para o início">
        <span style={{ width: 28, height: 28, background: 'var(--accent)', borderRadius: 7, display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 800, fontSize: '0.9rem' }} aria-hidden="true">Z</span>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.93rem' }}>Zoltic PDV</span>
      </a>
      <div style={{ display: 'flex', gap: 'clamp(12px,3vw,28px)', alignItems: 'center' }}>
        {[['#recursos', 'Recursos'], ['#planos', 'Planos'], ['#faq', 'FAQ']].map(([href, label]) => (
          <a key={href} href={href} style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'color 150ms' }}>{label}</a>
        ))}
        <a href="#contato" id="sticky-nav-cta" style={{ padding: '8px 16px', background: 'var(--accent)', color: '#fff', borderRadius: 7, fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none' }}>Testar grátis</a>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   WHATSAPP FLOATING BUTTON
   ───────────────────────────────────────────── */
const WhatsAppButton = () => (
  <a
    href={buildWhatsAppUrl('Olá, quero saber mais sobre o Zoltic PDV!')}
    target="_blank"
    rel="noopener noreferrer"
    id="whatsapp-float"
    aria-label="Falar com a equipe pelo WhatsApp"
    style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 300,
      width: 56, height: 56, borderRadius: '50%',
      background: '#25d366', display: 'grid', placeItems: 'center',
      boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
      transition: 'transform 200ms, box-shadow 200ms',
    }}
  >
    {/* WhatsApp icon SVG */}
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" aria-hidden="true">
      <path fill="#fff" d="M187.58 144.84l-32-16a8 8 0 0 0-8 .5l-14.69 9.8a40.55 40.55 0 0 1-16-16l9.8-14.69a8 8 0 0 0 .5-8l-16-32a8 8 0 0 0-7.94-4.9c-39.74 3.45-67.58 40.35-67.58 83.6a16 16 0 0 0 16 16c64.3 0 111.22-36.84 115.76-71.17a8 8 0 0 0-4.85-7.14ZM64 224a8 8 0 0 1-8-8c0-36.76 21.58-67.63 53.46-77.52l10.07 20.13L110.52 173a8 8 0 0 0-.73 7.48A56.56 56.56 0 0 0 136 206.21l14.4-9.6l20.13 10.07C160.63 202.42 129.76 224 64 224Zm128-56a96 96 0 1 0-96 96a96.11 96.11 0 0 0 96-96m-96 80a80 80 0 1 1 80-80a80.09 80.09 0 0 1-80 80"/>
    </svg>
  </a>
);

/* ─────────────────────────────────────────────
   TESTIMONIALS DATA
   ───────────────────────────────────────────── */
const testimonials = [
  {
    initials: 'LV',
    color: '#2563eb',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Letícia Vaz',
    role: 'Fundadora da LV Store',
    business: 'Cliente Zoltic',
    city: 'Loja de moda e acessórios',
    result: 'Orçamento vira venda sem redigitar',
    resultColor: '#2563eb',
    quote: 'O Zoltic deixou meu atendimento mais rápido. Eu monto o orçamento, envio para a cliente e transformo em venda quando ela aprova, sem retrabalho.',
    highlight: true,
  },
  {
    initials: 'RM',
    color: '#139a63',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Rafael Moura',
    role: 'Dono do Mercado Moura',
    business: 'Cliente Zoltic',
    city: 'Mercado de bairro',
    result: 'Venda sem parar no horário de pico',
    resultColor: '#059669',
    quote: 'No horário de movimento o caixa não pode travar. Com o Zoltic, a venda sai rápida e o estoque baixa sozinho a cada cupom.',
    highlight: false,
  },
  {
    initials: 'CR',
    color: '#2563eb',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Camila Rocha',
    role: 'Gerente da Farma Rocha',
    business: 'Cliente Zoltic',
    city: 'Farmácia e saúde',
    result: 'Entrada de nota e fiscal no mesmo sistema',
    resultColor: '#2563eb',
    quote: 'A entrada por XML economiza muito tempo. Antes eu atualizava produto manualmente; agora a nota do fornecedor já ajuda a manter o estoque correto.',
    highlight: false,
  },
  {
    initials: 'BA',
    color: '#0ea5e9',
    photo: 'https://randomuser.me/api/portraits/men/67.jpg',
    name: 'Bruno Almeida',
    role: 'Sócio da Burger 27',
    business: 'Cliente Zoltic',
    city: 'Alimentação',
    result: 'Pedido aberto até a hora de receber',
    resultColor: '#0ea5e9',
    quote: 'A pré-venda ajuda muito no balcão. A equipe lança o pedido, adiciona itens e só fecha quando o cliente realmente paga.',
    highlight: false,
  },
  {
    initials: 'AR',
    color: '#8b5cf6',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Ana Ribeiro',
    role: 'Gestora da Casa Ana',
    business: 'Cliente Zoltic',
    city: 'Utilidades domésticas',
    result: 'Reposição sem depender de planilha',
    resultColor: '#0891b2',
    quote: 'Eu parei de controlar reposição em planilha. O estoque mínimo mostra o que preciso comprar e os relatórios mostram o que realmente gira.',
    highlight: false,
  },
  {
    initials: 'DS',
    color: '#1d4ed8',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Diego Santos',
    role: 'Administrador da Rede DS',
    business: 'Cliente Zoltic',
    city: 'Loja com dois caixas',
    result: 'Cada venda ligada ao vendedor certo',
    resultColor: '#1d4ed8',
    quote: 'Com vendedor por PIN e terminal separado, consigo saber quem vendeu, quem deu desconto e onde cada operação aconteceu.',
    highlight: false,
  },
  {
    initials: 'PL',
    color: '#0ea5e9',
    photo: 'https://randomuser.me/api/portraits/women/29.jpg',
    name: 'Patrícia Lima',
    role: 'Proprietária da Conveniência Lima',
    business: 'Cliente Zoltic',
    city: 'Conveniência',
    result: 'Caixa mais rápido no fim do dia',
    resultColor: '#0ea5e9',
    quote: 'O fechamento ficou mais simples. Sangria, suprimento e recebimento de fiado ficam registrados no mesmo lugar.',
    highlight: false,
  },
  {
    initials: 'MN',
    color: '#10b981',
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    name: 'Marcos Nunes',
    role: 'Dono da Agro Nunes',
    business: 'Cliente Zoltic',
    city: 'Agro e ferragens',
    result: 'Catálogo grande mais fácil de controlar',
    resultColor: '#10b981',
    quote: 'Tenho muitos produtos e categorias. A busca rápida no caixa e a importação por planilha deixaram o cadastro bem menos cansativo.',
    highlight: false,
  },
  {
    initials: 'JC',
    color: '#6366f1',
    photo: 'https://randomuser.me/api/portraits/women/12.jpg',
    name: 'Juliana Costa',
    role: 'Gerente da Bella Shoes',
    business: 'Cliente Zoltic',
    city: 'Calçados',
    result: 'Trocas registradas sem bagunçar estoque',
    resultColor: '#6366f1',
    quote: 'Antes troca de produto sempre virava confusão no estoque. Agora a devolução fica registrada e consigo acompanhar tudo depois.',
    highlight: false,
  },
  {
    initials: 'TM',
    color: '#14b8a6',
    photo: 'https://randomuser.me/api/portraits/men/71.jpg',
    name: 'Thiago Martins',
    role: 'Sócio da Padaria Martins',
    business: 'Cliente Zoltic',
    city: 'Padaria e balcão',
    result: 'Atendimento mais fluido no balcão',
    resultColor: '#14b8a6',
    quote: 'A venda precisa ser simples. O operador pesquisa, adiciona, recebe e imprime. É direto, sem tela sobrando.',
    highlight: false,
  },
  {
    initials: 'FA',
    color: '#2563eb',
    photo: 'https://randomuser.me/api/portraits/women/76.jpg',
    name: 'Fernanda Alves',
    role: 'Dona da Papelaria Alves',
    business: 'Cliente Zoltic',
    city: 'Papelaria',
    result: 'Relatórios mais fáceis de entender',
    resultColor: '#2563eb',
    quote: 'Os relatórios me ajudaram a enxergar produto parado, forma de pagamento mais usada e movimento por período sem depender de planilha.',
    highlight: false,
  },
];

/* ─────────────────────────────────────────────
   WHY ZOLTIC DATA
   ───────────────────────────────────────────── */
const whyZoltic = [
  {
    icon: 'M215.79 118.17a8 8 0 0 0-5-5.66L153.18 90.9l14.66-73.33a8 8 0 0 0-13.69-7l-112 120a8 8 0 0 0 3 13l57.63 21.61l-14.62 73.25a8 8 0 0 0 13.69 7l112-120a8 8 0 0 0 1.94-7.26M109.37 214l10.47-52.38a8 8 0 0 0-5-9.06L62 132.71l84.62-90.66l-10.46 52.38a8 8 0 0 0 5 9.06l52.8 19.8Z',
    color: '#fbbf24',
    title: 'Você começa a vender no mesmo dia',
    text: 'Onboarding guiado em etapas. A loja define terminal, importa produtos por planilha e o primeiro caixa já abre. Sem técnico, sem dias de espera.',
    tag: 'Rapidez',
  },
  {
    icon: 'M207.06 72.67A111.24 111.24 0 0 0 128 40h-.4C66.07 40.21 16 91 16 153.13V176a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-24a111.25 111.25 0 0 0-32.94-79.33M224 176H119.71l54.76-75.3a8 8 0 0 0-12.94-9.42L99.92 176H32v-22.87c0-3.08.15-6.12.43-9.13H56a8 8 0 0 0 0-16H35.27c10.32-38.86 44-68.24 84.73-71.66V80a8 8 0 0 0 16 0V56.33A96.14 96.14 0 0 1 221 128h-21a8 8 0 0 0 0 16h23.67c.21 2.65.33 5.31.33 8Z',
    color: '#60a5fa',
    title: 'Nunca perde uma venda por falta de internet',
    text: 'Offline-first real. A venda, o estoque e o caixa funcionam localmente. Quando a conexão volta, o sistema sincroniza e gera backup automaticamente.',
    tag: 'Confiabilidade',
  },
  {
    icon: 'M152 96h-48a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8m-8 48h-32v-32h32Zm88 0h-16v-32h16a8 8 0 0 0 0-16h-16V56a16 16 0 0 0-16-16h-40V24a8 8 0 0 0-16 0v16h-32V24a8 8 0 0 0-16 0v16H56a16 16 0 0 0-16 16v40H24a8 8 0 0 0 0 16h16v32H24a8 8 0 0 0 0 16h16v40a16 16 0 0 0 16 16h40v16a8 8 0 0 0 16 0v-16h32v16a8 8 0 0 0 16 0v-16h40a16 16 0 0 0 16-16v-40h16a8 8 0 0 0 0-16m-32 56H56V56h144z',
    color: '#34d399',
    title: 'Roda em qualquer máquina que você já tem',
    text: 'Sem exigir hardware novo. Funciona em PCs com Windows 10 e 4 GB de RAM. Nada de investir em servidor ou computador caro só para rodar o software.',
    tag: 'Economia',
  },
  {
    icon: 'M221.28 34.75a64 64 0 0 0-90.49 0L60.69 104A15.9 15.9 0 0 0 56 115.31v73.38l-29.66 29.65a8 8 0 0 0 11.32 11.32L67.32 200h73.38a15.92 15.92 0 0 0 11.3-4.68l69.23-70a64 64 0 0 0 .05-90.57m-79.21 11.31A48 48 0 0 1 211.79 112h-56.46l34.35-34.34a8 8 0 0 0-11.32-11.32L120 124.69V67.87ZM72 115.35l32-31.67v57l-32 32ZM140.7 184H83.32l56-56h56.74Z',
    color: '#a78bfa',
    title: 'IA que responde em português, sem relatório',
    text: 'Pergunte ao sistema em linguagem natural. "Quanto vendi hoje?", "Estoque crítico", "Melhor vendedor" — resposta na hora, sem abrir nenhum menu.',
    tag: 'Inteligência',
  },
  {
    icon: 'M200.77 53.89A103.27 103.27 0 0 0 128 24h-1.07A104 104 0 0 0 24 128c0 43 26.58 79.06 69.36 94.17A32 32 0 0 0 136 192a16 16 0 0 1 16-16h46.21a31.81 31.81 0 0 0 31.2-24.88a104.43 104.43 0 0 0 2.59-24a103.28 103.28 0 0 0-31.23-73.23M128 208a16 16 0 1 1 16-16a16 16 0 0 1-16 16m-48-56a16 16 0 1 1 16-16a16 16 0 0 1-16 16m0-56a16 16 0 1 1 16-16a16 16 0 0 1-16 16m48-32a16 16 0 1 1 16-16a16 16 0 0 1-16 16m48 32a16 16 0 1 1 16-16a16 16 0 0 1-16 16',
    color: '#2563eb',
    title: 'Um sistema, todos os tipos de loja',
    text: 'Mercado, moda, farmácia, alimentação — o mesmo PDV adaptado para cada operação. Sem versão específica, sem custo extra por segmento.',
    tag: 'Versatilidade',
  },
  {
    icon: 'M224 128a8 8 0 0 1-8 8h-80a8 8 0 0 1 0-16h80a8 8 0 0 1 8 8M40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16m176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16m-96-72a8 8 0 0 0-8-8H40a8 8 0 0 0 0 16h72a8 8 0 0 0 8-8',
    color: '#2563eb',
    title: 'Tudo em um — sem contratar vários sistemas',
    text: 'PDV, estoque, fiscal, fiado, orçamentos, devoluções, fornecedores, financeiro, IA — tudo integrado. Uma assinatura, zero integrações dolorosas.',
    tag: 'Completude',
  },
];

/* ─────────────────────────────────────────────
   SEGMENTS DATA
   ───────────────────────────────────────────── */
const segments = [
  {
    emoji: '🛒',
    label: 'Mercado e Conveniência',
    items: ['Checkout rápido por código de barras', 'Preço por peso com balança integrada', 'Alerta de ruptura de estoque', 'Fiado com limite por cliente'],
    accent: '#2563eb',
  },
  {
    emoji: '👗',
    label: 'Moda e Calçados',
    items: ['Grades de tamanho e cor', 'Orçamento para atacadista em PDF', 'Histórico de compras por cliente', 'Devolução e troca com rastreio'],
    accent: '#7c3aed',
  },
  {
    emoji: '🍕',
    label: 'Alimentação',
    items: ['Pré-venda e pedidos em aberto', 'Impressora de comanda térmica', 'Controle de caixa por turno', 'Análise de pico por horário (IA)'],
    accent: '#0ea5e9',
  },
  {
    emoji: '💊',
    label: 'Farmácia e Saúde',
    items: ['NF-e e NFC-e integrados', 'Importação de nota do fornecedor (XML)', 'Relatório de curva ABC por produto', 'Controle de lote e validade'],
    accent: '#059669',
  },
];

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */

export const SalesPage = () => {
  const [activeSegment, setActiveSegment] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  return (
    <div className="site-shell">
      <StickyNav />
      <WhatsAppButton />

      {/* ── NAVBAR ─────────────────────────────── */}
      <header className="top-nav" role="banner">
        <a href="#inicio" className="brand-mark" aria-label="Zoltic PDV — ir para o início">
          <span className="brand-icon" aria-hidden="true">Z</span>
          <strong>Zoltic</strong>
        </a>

        <nav aria-label="Navegação principal">
          <a href="#recursos">Recursos</a>
          <a href="#operacao">Como funciona</a>
          <a href="#planos">Planos</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="nav-actions">
          <a href="#contato" id="nav-demo" style={{ color: 'var(--ink-2)', fontWeight: 600, fontSize: '0.9rem', transition: 'color 160ms' }}>Agendar demo</a>
          <a className="nav-cta" href="#contato" id="nav-trial">Testar grátis por 7 dias</a>
        </div>
      </header>

      <main>

        {/* ── HERO ──────────────────────────────── */}
        <section id="inicio" className="hero-section" aria-label="Apresentação do Zoltic PDV">
          <img
            src="/images/hero-merchant.png"
            alt="Operador finalizando uma venda em um balcão com o sistema Zoltic PDV"
            loading="eager"
          />
          <div className="hero-overlay" aria-hidden="true" />

          <div className="hero-content">
            <motion.p
              className="hero-kicker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              PDV SaaS · Multissegmento · Funciona offline
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              Zoltic PDV.<br />
              <em>Caixa rápido</em><br />
              para lojas que não podem parar.
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Sistema de ponto de venda completo para mercado, loja, restaurante e varejo local.
              Caixa, estoque, fiscal, clientes, relatórios e backup em uma operação simples de vender.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <a className="btn-primary" href="#contato" id="hero-cta-primary">
                Testar grátis por 7 dias <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a className="btn-ghost" href="#recursos" id="hero-cta-secondary">
                Ver todos os recursos <ChevronRight size={17} aria-hidden="true" />
              </a>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5, delay: 0.22 }}
              style={{ marginTop: 14, fontSize: '0.85rem', color: 'var(--ink-2)', fontWeight: 500 }}
            >
              Planos a partir de R$ 79/mês. <a href="#planos" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: 3 }}>Ver planos.</a>
            </motion.p>

            <motion.div
              className="hero-trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              {[
                'Sem cartão de crédito',
                'Cancele quando quiser',
                'Configuração em horas',
                'Funciona offline',
              ].map((item) => (
                <span className="trust-pill" key={item}>
                  <Check size={13} aria-hidden="true" /> {item}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── SOCIAL PROOF BAR ─────────────────────── */}
        <div className="waitlist-bar" role="complementary" aria-label="Lista de espera">
          <p>
            Já são <AnimatedCounter target={412} /> lojistas usando o Zoltic todos os dias.
          </p>
        </div>

        <section className="proof-section" aria-labelledby="proof-heading">
          <div className="section-inner proof-inner">
            <div className="proof-copy">
              <p className="section-label" aria-hidden="true">Demo sem promessa vazia</p>
              <h2 id="proof-heading">O cliente vê o PDV funcionando, não só uma apresentação bonita.</h2>
              <p>
                Na demonstração, você confere o fluxo do caixa, a atualização do estoque e os relatórios
                que ajudam a loja a vender com mais controle desde o primeiro dia.
              </p>
            </div>

            <div className="proof-grid" role="list">
              {proofCards.map((card) => (
                <article className="proof-card" key={card.title} role="listitem">
                  <strong>{card.value}</strong>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PAIN SECTION ─────────────────────── */}
        <section className="pain-section" aria-labelledby="pain-heading">
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-label" aria-hidden="true">Problemas que resolvemos</p>
              <h2 id="pain-heading">Seu sistema atual está te custando clientes.</h2>
              <p>Cada trava no caixa, cada divergência de estoque e cada nota fiscal errada é dinheiro que sai do seu bolso. O Zoltic foi criado para acabar com isso.</p>
            </div>
            <div className="pain-grid" role="list">
              {pains.map((pain) => (
                <article key={pain.title} className="pain-card" role="listitem">
                  <div className="pain-icon" aria-hidden="true">
                    <pain.icon size={20} />
                  </div>
                  <h3>{pain.title}</h3>
                  <p className="pain-problem">Problema: {pain.problem}</p>
                  <p className="pain-solution">Solução: {pain.solution}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEGMENTS "PARA QUEM É" ────────────── */}
        <section aria-labelledby="segments-heading" style={{ background: 'var(--light-surface)' }}>
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-label" aria-hidden="true">Multissegmento</p>
              <h2 id="segments-heading">Para o seu tipo de loja, do jeito que faz sentido.</h2>
              <p>O mesmo sistema, adaptado para o fluxo de cada operação — sem configuração complexa.</p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }} role="tablist" aria-label="Segmentos de negócio">
              {segments.map((seg, i) => (
                <button
                  key={seg.label}
                  role="tab"
                  aria-selected={activeSegment === i}
                  aria-controls={`seg-panel-${i}`}
                  id={`seg-tab-${i}`}
                  onClick={() => setActiveSegment(i)}
                  style={{
                    padding: '9px 18px', borderRadius: 8, border: '1.5px solid',
                    fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
                    transition: 'all 150ms',
                    background: activeSegment === i ? segments[i].accent : 'transparent',
                    color: activeSegment === i ? '#fff' : 'var(--text-2)',
                    borderColor: activeSegment === i ? segments[i].accent : 'var(--light-border)',
                  }}
                >
                  {seg.emoji} {seg.label}
                </button>
              ))}
            </div>

            {/* Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSegment}
                id={`seg-panel-${activeSegment}`}
                role="tabpanel"
                aria-labelledby={`seg-tab-${activeSegment}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}
              >
                {segments[activeSegment].items.map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: '16px 18px', background: '#fff', borderRadius: 9,
                      border: `1.5px solid ${segments[activeSegment].accent}22`,
                      borderLeft: `4px solid ${segments[activeSegment].accent}`,
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" style={{ color: segments[activeSegment].accent, flexShrink: 0 }} aria-hidden="true">
                      <path fill="currentColor" d="M173.66 98.34a8 8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 0M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/>
                    </svg>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)' }}>{item}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── CONTROL ROOM (mockup) ────────────── */}
        <section aria-label="Prévia da interface do sistema" style={{ background: 'var(--light-surface)' }}>
          <div
            className="section-inner"
            style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.85fr) minmax(360px,1.15fr)', gap: 'clamp(32px,6vw,80px)', alignItems: 'center' }}
          >
            <div>
              <p className="section-label">A tela que importa</p>
              <h2 style={{ margin: 0, fontSize: 'clamp(1.9rem,4vw,3.6rem)', lineHeight: 0.96, letterSpacing: '-0.03em', fontWeight: 800, textWrap: 'balance' }}>
                O caixa fica em foco.<br />O resto trabalha em silêncio.
              </h2>
              <p style={{ margin: '18px 0 0', color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.65, fontWeight: 500, maxWidth: 480 }}>
                O Zoltic foi desenhado para colocar a venda no centro. Enquanto o operador finaliza em segundos, o sistema registra terminal, vendedor, estoque, cliente, caixa, fiscal e relatório — tudo de forma automática.
              </p>
            </div>
            <ProductMockup />
          </div>
        </section>

        {/* ── PERFORMANCE SECTION ────────────────── */}
        <section aria-labelledby="perf-heading" style={{ background: 'var(--light-bg)', overflow: 'hidden' }}>
          <div className="section-inner">

            {/* Headline */}
            <div style={{ maxWidth: 800, marginBottom: 'clamp(40px,6vw,72px)' }}>
              <p className="section-label">Leveza que você sente</p>
              <h2 id="perf-heading" style={{ margin: 0, fontSize: 'clamp(2rem,4.5vw,4.2rem)', lineHeight: 0.96, letterSpacing: '-0.03em', fontWeight: 800, color: 'var(--text)', textWrap: 'balance' }}>
                Roda em qualquer computador.<br />
                <span style={{ color: 'var(--accent)' }}>Mesmo naquele que já sofreu.</span>
              </h2>
              <p style={{ margin: '20px 0 0', maxWidth: 640, color: 'var(--text-2)', fontSize: '1.08rem', lineHeight: 1.65, fontWeight: 500 }}>
                Sabe aquele PDV que trava no pico do movimento, esquenta o computador, e às vezes fecha sozinho? O Zoltic foi construído para ser o oposto disso: leve, rápido e estável até em máquinas antigas.
              </p>
            </div>

            {/* Animated metrics row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 48 }} role="list">
              {[
                { value: '<2s', label: 'para abrir o sistema', icon: 'M215.79 118.17a8 8 0 0 0-5-5.66L153.18 90.9l14.66-73.33a8 8 0 0 0-13.69-7l-112 120a8 8 0 0 0 3 13l57.63 21.61l-14.62 73.25a8 8 0 0 0 13.69 7l112-120a8 8 0 0 0 1.94-7.26M109.37 214l10.47-52.38a8 8 0 0 0-5-9.06L62 132.71l84.62-90.66l-10.46 52.38a8 8 0 0 0 5 9.06l52.8 19.8Z', color: '#fbbf24' },
                { value: '4GB', label: 'de RAM é suficiente', icon: 'M152 96h-48a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8m-8 48h-32v-32h32Zm88 0h-16v-32h16a8 8 0 0 0 0-16h-16V56a16 16 0 0 0-16-16h-40V24a8 8 0 0 0-16 0v16h-32V24a8 8 0 0 0-16 0v16H56a16 16 0 0 0-16 16v40H24a8 8 0 0 0 0 16h16v32H24a8 8 0 0 0 0 16h16v40a16 16 0 0 0 16 16h40v16a8 8 0 0 0 16 0v-16h32v16a8 8 0 0 0 16 0v-16h40a16 16 0 0 0 16-16v-40h16a8 8 0 0 0 0-16m-32 56H56V56h144z', color: '#34d399' },
                { value: '100%', label: 'offline quando precisar', icon: 'M207.06 72.67A111.24 111.24 0 0 0 128 40h-.4C66.07 40.21 16 91 16 153.13V176a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-24a111.25 111.25 0 0 0-32.94-79.33M224 176H119.71l54.76-75.3a8 8 0 0 0-12.94-9.42L99.92 176H32v-22.87c0-3.08.15-6.12.43-9.13H56a8 8 0 0 0 0-16H35.27c10.32-38.86 44-68.24 84.73-71.66V80a8 8 0 0 0 16 0V56.33A96.14 96.14 0 0 1 221 128h-21a8 8 0 0 0 0 16h23.67c.21 2.65.33 5.31.33 8Z', color: '#60a5fa' },
                { value: '0', label: 'reinicializações forçadas', icon: 'M221.28 34.75a64 64 0 0 0-90.49 0L60.69 104A15.9 15.9 0 0 0 56 115.31v73.38l-29.66 29.65a8 8 0 0 0 11.32 11.32L67.32 200h73.38a15.92 15.92 0 0 0 11.3-4.68l69.23-70a64 64 0 0 0 .05-90.57m-79.21 11.31A48 48 0 0 1 211.79 112h-56.46l34.35-34.34a8 8 0 0 0-11.32-11.32L120 124.69V67.87ZM72 115.35l32-31.67v57l-32 32ZM140.7 184H83.32l56-56h56.74Z', color: '#a78bfa' },
              ].map((m) => (
                <motion.div
                  key={m.label}
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ padding: '24px 20px', background: '#fff', border: '1px solid var(--light-border)', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 10 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" style={{ color: m.color }} aria-hidden="true">
                    <path fill="currentColor" d={m.icon} />
                  </svg>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text)' }}>{m.value}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-2)', lineHeight: 1.4 }}>{m.label}</div>
                </motion.div>
              ))}
            </div>

            {/* 3-column feature cards with ph icons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }} role="list">

              {/* Roda em qualquer PC */}
              <motion.div
                role="listitem"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                style={{ padding: 28, background: '#fff', border: '1px solid var(--light-border)', borderRadius: 10, position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)', borderRadius: '10px 10px 0 0' }} aria-hidden="true" />
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 256 256" style={{ color: 'var(--accent)', marginBottom: 16 }} aria-hidden="true">
                  <path fill="currentColor" d="M208 136H48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16m0 64H48v-48h160zm0-160H48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 64H48V56h160zm-16-24a12 12 0 1 1-12-12a12 12 0 0 1 12 12m0 96a12 12 0 1 1-12-12a12 12 0 0 1 12 12"/>
                </svg>
                <h3 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em' }}>Funciona em computadores antigos</h3>
                <p style={{ margin: 0, color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 500 }}>
                  Não exige máquina nova. O Zoltic roda tranquilamente em PCs com Windows 10 e 4 GB de RAM — sem instalar Java, sem travamentos, sem sofrimento.
                </p>
              </motion.div>

              {/* Leve e rápido */}
              <motion.div
                role="listitem"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ padding: 28, background: 'var(--bg)', border: '1px solid var(--border-dark)', borderRadius: 10, position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 0%, rgba(37,99,235,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 256 256" style={{ color: '#fbbf24', marginBottom: 16 }} aria-hidden="true">
                  <path fill="currentColor" d="M215.79 118.17a8 8 0 0 0-5-5.66L153.18 90.9l14.66-73.33a8 8 0 0 0-13.69-7l-112 120a8 8 0 0 0 3 13l57.63 21.61l-14.62 73.25a8 8 0 0 0 13.69 7l112-120a8 8 0 0 0 1.94-7.26M109.37 214l10.47-52.38a8 8 0 0 0-5-9.06L62 132.71l84.62-90.66l-10.46 52.38a8 8 0 0 0 5 9.06l52.8 19.8Z"/>
                </svg>
                <h3 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Leve como deve ser</h3>
                <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 500 }}>
                  O sistema abre em menos de 2 segundos. Bipa o produto, confirma o pagamento, imprime — tudo num fluxo contínuo. Nada de esperar a tela carregar enquanto a fila cresce.
                </p>
              </motion.div>

              {/* Tablet e móvel */}
              <motion.div
                role="listitem"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                style={{ padding: 28, background: '#fff', border: '1px solid var(--light-border)', borderRadius: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 256 256" style={{ color: '#34d399', marginBottom: 16 }} aria-hidden="true">
                  <path fill="currentColor" d="M192 24H64a24 24 0 0 0-24 24v160a24 24 0 0 0 24 24h128a24 24 0 0 0 24-24V48a24 24 0 0 0-24-24M56 72h144v112H56Zm8-32h128a8 8 0 0 1 8 8v8H56v-8a8 8 0 0 1 8-8m128 176H64a8 8 0 0 1-8-8v-8h144v8a8 8 0 0 1-8 8"/>
                </svg>
                <h3 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em' }}>Consulta em qualquer tela</h3>
                <p style={{ margin: 0, color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 500 }}>
                  O caixa funciona no PC. O gestor acompanha relatórios e estoque pelo tablet ou celular — sem instalar nada, só pelo navegador.
                </p>
              </motion.div>
            </div>

            {/* Callout box — "se você sofre com sistema pesado..." */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: 40, padding: 'clamp(24px,4vw,40px)', background: 'var(--bg)', border: '1px solid var(--border-dark)', borderRadius: 12, display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}
            >
              <div style={{ flexShrink: 0 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 256 256" style={{ color: 'var(--accent)' }} aria-hidden="true">
                  <path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m-8-80V80a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0m20 36a12 12 0 1 1-12-12a12 12 0 0 1 12 12"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1.1rem', marginBottom: 10 }}>
                  Você sofre com algum desses problemas no seu PDV atual?
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                  {[
                    'O sistema trava exatamente quando o caixa está cheio',
                    'Demora para abrir, demora para salvar, demora para imprimir',
                    'Precisa de um computador caro só para rodar o software',
                    'A internet caiu e o caixa parou completamente',
                    'Atualização forçada no meio do expediente',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--ink-2)', fontSize: '0.88rem', fontWeight: 500 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                        <path fill="currentColor" d="M173.66 98.34a8 8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 0M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--ink)', fontWeight: 800, fontSize: '1rem' }}>O Zoltic resolve isso.</span>
                  <a href="#contato" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: 'var(--accent)', color: '#fff', borderRadius: 8, fontWeight: 800, fontSize: '0.88rem', transition: 'background 160ms' }} id="perf-cta">
                    Testar agora — 7 dias grátis
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" aria-hidden="true">
                      <path fill="currentColor" d="M221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── BUDGET SECTION ───────────────────────── */}
        <section aria-labelledby="budget-heading" style={{ background: 'var(--light-surface)' }}>
          <div className="section-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(400px,1.1fr)', gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }}>

            {/* Copy lado esquerdo */}
            <div>
              <p className="section-label">Orçamentos profissionais</p>
              <h2 id="budget-heading" style={{ margin: 0, fontSize: 'clamp(1.9rem,4vw,3.8rem)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 800, color: 'var(--text)', textWrap: 'balance' }}>
                Proposta com a cara da sua empresa. Aprovada com um clique.
              </h2>
              <p style={{ margin: '20px 0 32px', color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.65, fontWeight: 500 }}>
                Monte orçamentos detalhados com logo, cores e dados da empresa — e quando o cliente fechar, converta direto em venda sem redigitar nada.
              </p>

              {/* Feature list com ícones Phosphor */}
              <div style={{ display: 'grid', gap: 18 }} role="list">
                {[
                  {
                    title: 'Visual da sua marca',
                    text: 'Logo, cor principal e cor de destaque configuráveis. O orçamento sai com a identidade da sua empresa, não com cara de planilha.',
                    // ph:palette
                    path: 'M200.77 53.89A103.27 103.27 0 0 0 128 24h-1.07A104 104 0 0 0 24 128c0 43 26.58 79.06 69.36 94.17A32 32 0 0 0 136 192a16 16 0 0 1 16-16h46.21a31.81 31.81 0 0 0 31.2-24.88a104.43 104.43 0 0 0 2.59-24a103.28 103.28 0 0 0-31.23-73.23M128 208a16 16 0 1 1 16-16a16 16 0 0 1-16 16m-48-56a16 16 0 1 1 16-16a16 16 0 0 1-16 16m0-56a16 16 0 1 1 16-16a16 16 0 0 1-16 16m48-32a16 16 0 1 1 16-16a16 16 0 0 1-16 16m48 32a16 16 0 1 1 16-16a16 16 0 0 1-16 16',
                    color: '#a78bfa',
                  },
                  {
                    title: 'Itens do catálogo ou avulsos',
                    text: 'Adicione produtos do seu estoque com um clique ou crie itens avulsos com nome, unidade, especificação e preço manual.',
                    // ph:list-plus
                    path: 'M224 128a8 8 0 0 1-8 8h-80a8 8 0 0 1 0-16h80a8 8 0 0 1 8 8M40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16m176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16m-96-72a8 8 0 0 0-8-8H40a8 8 0 0 0 0 16h72a8 8 0 0 0 8-8',
                    color: '#34d399',
                  },
                  {
                    title: 'Desconto, validade e termos',
                    text: 'Defina desconto em valor ou percentual, prazo de validade da proposta e texto de termos e condições personalizado.',
                    // ph:receipt
                    path: 'M72 104h112a8 8 0 0 0 0-16H72a8 8 0 0 0 0 16m0 32h112a8 8 0 0 0 0-16H72a8 8 0 0 0 0 16m0 32h72a8 8 0 0 0 0-16H72a8 8 0 0 0 0 16m152-144v168a8 8 0 0 1-13.66 5.66L192 189.31l-18.34 18.35a8 8 0 0 1-11.32 0L144 189.31l-18.34 18.35a8 8 0 0 1-11.32 0L96 189.31l-18.34 18.35a8 8 0 0 1-11.32 0L48 189.31l-18.34 18.35A8 8 0 0 1 16 202V40a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16m-16 152.69V40H32v152.69l10.34-10.35a8 8 0 0 1 11.32 0L72 200.69l18.34-18.35a8 8 0 0 1 11.32 0L120 200.69l18.34-18.35a8 8 0 0 1 11.32 0L168 200.69l18.34-18.35a8 8 0 0 1 11.32 0Z',
                    color: '#fbbf24',
                  },
                  {
                    title: 'Aprovação → venda instantânea',
                    text: 'Quando o cliente aprovar, converta o orçamento em venda com um botão. Estoque atualizado, caixa registrado, fiscal emitido.',
                    // ph:arrow-circle-right
                    path: 'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m45.66-93.66a8 8 0 0 1 0 11.32l-32 32a8 8 0 0 1-11.32-11.32L148.69 136H88a8 8 0 0 1 0-16h60.69l-18.35-18.34a8 8 0 0 1 11.32-11.32Z',
                    color: '#60a5fa',
                  },
                ].map((f) => (
                  <div key={f.title} role="listitem" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, flexShrink: 0, display: 'grid', placeItems: 'center', background: 'var(--light-bg)', border: '1px solid var(--light-border)', borderRadius: 9 }} aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" style={{ color: f.color }}>
                        <path fill="currentColor" d={f.path} />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: '0.95rem', marginBottom: 4 }}>{f.title}</div>
                      <div style={{ color: 'var(--text-2)', fontSize: '0.87rem', lineHeight: 1.6, fontWeight: 500 }}>{f.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#contato" id="budget-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', background: 'var(--accent)', color: '#fff', borderRadius: 8, fontWeight: 800, fontSize: '0.93rem', transition: 'background 160ms' }}>
                  Testar grátis por 7 dias
                  {/* ph:arrow-right */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32"/></svg>
                </a>
                <span style={{ color: 'var(--text-2)', fontSize: '0.82rem', fontWeight: 600 }}>Exporta em PDF · Sem cartão</span>
              </div>
            </div>

            {/* Mockup visual do orçamento */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--light-border)', boxShadow: '0 20px 60px rgba(4,16,30,0.10)', background: '#fff' }}
              aria-label="Prévia do orçamento personalizado do Zoltic"
            >
              {/* Cabeçalho do orçamento — barra de cor da marca */}
              <div style={{ background: 'var(--accent)', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}>Mercado São Paulo</span>
                  <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.72rem', fontFamily: 'var(--mono)' }}>CNPJ 12.345.678/0001-90</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.82rem' }}>ORÇAMENTO</div>
                  <div style={{ fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.9)', fontSize: '0.72rem' }}>#ORC-2026-047</div>
                </div>
              </div>

              {/* Info cliente + validade */}
              <div style={{ padding: '14px 22px', borderBottom: '1px solid #eef3f8', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, background: '#f9fbfe' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6880a4', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Cliente</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#07111f' }}>João da Silva</div>
                  <div style={{ fontSize: '0.75rem', color: '#6880a4' }}>CPF 123.456.789-00 · (11) 9 8888-7777</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6880a4', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Validade</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#07111f' }}>22/07/2026</div>
                  <div style={{ fontSize: '0.75rem', color: '#6880a4' }}>Pagamento: A Combinar</div>
                </div>
              </div>

              {/* Tabela de itens */}
              <div style={{ padding: '0 22px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--accent)' }}>
                      <th style={{ padding: '10px 0 8px', textAlign: 'left', fontWeight: 800, color: '#07111f', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Item / Descrição</th>
                      <th style={{ padding: '10px 0 8px', textAlign: 'center', fontWeight: 800, color: '#07111f', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Qtd</th>
                      <th style={{ padding: '10px 0 8px', textAlign: 'right', fontWeight: 800, color: '#07111f', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Unit.</th>
                      <th style={{ padding: '10px 0 8px', textAlign: 'right', fontWeight: 800, color: '#07111f', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Notebook Dell Inspiron 15', spec: 'Intel i5 · 8GB · SSD 256GB', qty: 2, unit: 'R$ 2.499,00', total: 'R$ 4.998,00' },
                      { name: 'Mouse sem fio Logitech', spec: 'MX Master 3S · Grafite', qty: 5, unit: 'R$ 349,90', total: 'R$ 1.749,50' },
                      { name: 'Monitor 24" Full HD', spec: 'LG 24MP400 · IPS · HDMI', qty: 2, unit: 'R$ 1.199,00', total: 'R$ 2.398,00' },
                    ].map((item, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #eef3f8' }}>
                        <td style={{ padding: '10px 0' }}>
                          <div style={{ fontWeight: 700, color: '#07111f' }}>{item.name}</div>
                          <div style={{ color: '#6880a4', fontSize: '0.72rem', marginTop: 2 }}>{item.spec}</div>
                        </td>
                        <td style={{ padding: '10px 0', textAlign: 'center', color: '#3a5168', fontWeight: 600 }}>{item.qty}</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', color: '#3a5168', fontWeight: 600, fontFamily: 'var(--mono)' }}>{item.unit}</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', color: '#07111f', fontWeight: 800, fontFamily: 'var(--mono)' }}>{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Subtotal / desconto / total */}
              <div style={{ padding: '14px 22px', borderTop: '1px solid #eef3f8', background: '#f9fbfe', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 48, fontSize: '0.82rem', color: '#3a5168', fontWeight: 600 }}>
                  <span>Subtotal</span>
                  <span style={{ fontFamily: 'var(--mono)' }}>R$ 9.145,50</span>
                </div>
                <div style={{ display: 'flex', gap: 48, fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 700 }}>
                  <span>Desconto (5%)</span>
                  <span style={{ fontFamily: 'var(--mono)' }}>− R$ 457,28</span>
                </div>
                <div style={{ display: 'flex', gap: 48, fontSize: '1.05rem', color: '#07111f', fontWeight: 800, marginTop: 4, borderTop: '2px solid var(--accent)', paddingTop: 10 }}>
                  <span>Total</span>
                  <span style={{ fontFamily: 'var(--mono)' }}>R$ 8.688,22</span>
                </div>
              </div>

              {/* Botões de ação */}
              <div style={{ padding: '14px 22px', borderTop: '1px solid #eef3f8', display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid var(--light-border)', borderRadius: 7, fontSize: '0.78rem', fontWeight: 700, color: '#3a5168', cursor: 'default' }}>
                  {/* ph:file-pdf */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" style={{ color: 'var(--accent)' }} aria-hidden="true"><path fill="currentColor" d="M224 152a8 8 0 0 1-8 8h-24v16h16a8 8 0 0 1 0 16h-16v16a8 8 0 0 1-16 0v-56a8 8 0 0 1 8-8h32a8 8 0 0 1 8 8m-96 0a36 36 0 0 1-36 36h-8v16a8 8 0 0 1-16 0v-56a8 8 0 0 1 8-8h16a36 36 0 0 1 36 36m-16 0a20 20 0 0 0-20-20h-8v40h8a20 20 0 0 0 20-20m-52-8v56a8 8 0 0 1-16 0v-56a8 8 0 0 1 16 0M40 112V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88v24a8 8 0 0 1-16 0V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0m120-32h28.69L160 51.31Z"/></svg>
                  Exportar PDF
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'var(--success)', borderRadius: 7, fontSize: '0.78rem', fontWeight: 800, color: '#fff', cursor: 'default' }}>
                  {/* ph:check-circle */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M173.66 98.34a8 8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 0M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/></svg>
                  Aprovar e virar venda
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── AI HIGHLIGHT ─────────────────────── */}

        <section aria-labelledby="ai-heading" style={{ background: 'var(--bg)' }}>
          <div className="section-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
            <div>
              <p className="section-label section-label-light">Inteligência Artificial integrada</p>
              <h2 id="ai-heading" style={{ margin: 0, fontSize: 'clamp(1.9rem,4vw,3.6rem)', lineHeight: 0.96, letterSpacing: '-0.03em', fontWeight: 800, color: '#fff', textWrap: 'balance' }}>
                Pergunte ao seu sistema em português.
              </h2>
              <p style={{ margin: '18px 0 28px', color: 'var(--ink-2)', fontSize: '1.05rem', lineHeight: 1.65, fontWeight: 500 }}>
                O Zoltic tem um assistente de IA embutido que analisa vendas, estoque, clientes e caixa — e responde em linguagem natural, sem precisar abrir relatório nenhum.
              </p>
              <div style={{ display: 'grid', gap: 14 }} role="list">
                {aiFeatures.map((f) => (
                  <div key={f.title} role="listitem" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 38, height: 38, flexShrink: 0, display: 'grid', placeItems: 'center', background: 'rgba(99,102,241,0.2)', borderRadius: 9 }} aria-hidden="true">
                      <f.icon size={18} color="#a5b4fc" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem', marginBottom: 4 }}>{f.title}</div>
                      <div style={{ color: 'var(--ink-2)', fontSize: '0.87rem', lineHeight: 1.6, fontWeight: 500 }}>{f.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <AiMockChat />
          </div>
        </section>

        {/* ── MODULES ──────────────────────────── */}
        <section id="recursos" className="modules-section" aria-labelledby="modules-heading" style={{ background: 'var(--light-bg)', color: 'var(--text)' }}>
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-label" aria-hidden="true">Sistema completo</p>
              <h2 id="modules-heading">Todos os módulos. Sem precisar de outro software.</h2>
              <p>Do PDV ao fiscal, de orçamentos a devoluções — tudo num único sistema, pronto para operar offline.</p>
            </div>
            <div className="modules-grid" role="list">
              {modules.map((mod, i) => (
                <motion.article
                  key={mod.title}
                  className="module-card"
                  role="listitem"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.42, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: '#fff', borderColor: 'var(--light-border)' }}
                >
                  <div className="module-icon" aria-hidden="true">
                    <mod.icon size={19} />
                  </div>
                  <h3 style={{ color: 'var(--text)' }}>{mod.title}</h3>
                  <p style={{ fontWeight: 800, color: 'var(--accent)', marginBottom: 8, fontSize: '0.82rem' }}>{mod.benefit}</p>
                  <p style={{ color: 'var(--text-2)' }}>{mod.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL STRIP ───────────────── */}
        <section className="bling-testimonials" aria-labelledby="testimonials-heading">
          <div className="bling-testimonials-inner">
            <div className="bling-avatar-stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonials[activeTestimonial].name}
                  className="bling-tooltip"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <strong>{testimonials[activeTestimonial].name}</strong>
                  <span>{testimonials[activeTestimonial].role}</span>
                  <small>{testimonials[activeTestimonial].business}</small>
                </motion.div>
              </AnimatePresence>

              <div className="bling-avatar-row" role="list" aria-label="Modelos de depoimentos por segmento">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`bling-avatar ${activeTestimonial === index ? 'active' : ''}`}
                    style={{ '--avatar-color': item.color } as CSSProperties}
                    onMouseEnter={() => setActiveTestimonial(index)}
                    onFocus={() => setActiveTestimonial(index)}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`Ver depoimento de ${item.name}`}
                    role="listitem"
                  >
                    {item.photo ? (
                      <img src={item.photo} alt="" loading="lazy" />
                    ) : (
                      <span>{item.initials}</span>
                    )}
                  </button>
                ))}
                <a className="bling-plus" href="#contato" aria-label="Cadastrar minha loja para testar o Zoltic">
                  +
                </a>
              </div>
            </div>

            <div className="bling-testimonial-copy">
              <p className="section-label section-label-light" aria-hidden="true">Depoimentos</p>
              <h2 id="testimonials-heading">+400 lojistas podem acessar o Zoltic todos os dias</h2>
              <p>{testimonials[activeTestimonial].quote}</p>
              <strong>{testimonials[activeTestimonial].result}</strong>
            </div>
          </div>
        </section>

        {/* ── WHY ZOLTIC ───────────────────────────── */}
        <section aria-labelledby="why-heading" style={{ background: 'var(--light-bg)' }}>
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-label" aria-hidden="true">Por que Zoltic</p>
              <h2 id="why-heading">6 motivos para trocar o seu PDV hoje.</h2>
              <p>Não é só um caixa. É a operação inteira funcionando com precisão.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }} role="list">
              {whyZoltic.map((w, i) => (
                <motion.div
                  key={w.title}
                  role="listitem"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    padding: '24px 22px',
                    background: '#fff',
                    border: '1px solid var(--light-border)',
                    borderRadius: 11,
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Accent corner */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 48, height: 48, background: `${w.color}12`, borderRadius: '0 11px 0 48px' }} aria-hidden="true" />
                  {/* Tag */}
                  <div style={{ position: 'absolute', top: 14, right: 14, fontSize: '0.65rem', fontWeight: 800, color: w.color, letterSpacing: '0.06em', textTransform: 'uppercase' }} aria-hidden="true">{w.tag}</div>

                  {/* Icon */}
                  <div style={{ width: 44, height: 44, flexShrink: 0, display: 'grid', placeItems: 'center', background: `${w.color}14`, borderRadius: 10 }} aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256" style={{ color: w.color }}>
                      <path fill="currentColor" d={w.icon} />
                    </svg>
                  </div>

                  {/* Text */}
                  <div style={{ paddingRight: 32 }}>
                    <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: '0.97rem', marginBottom: 8, lineHeight: 1.3 }}>{w.title}</div>
                    <div style={{ color: 'var(--text-2)', fontSize: '0.85rem', lineHeight: 1.62, fontWeight: 500 }}>{w.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: 40, textAlign: 'center' }}
            >
              <a href="#contato" id="why-zoltic-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'var(--accent)', color: '#fff', borderRadius: 9, fontWeight: 800, fontSize: '1rem', textDecoration: 'none' }}>
                Resolver isso hoje — testar grátis
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32"/></svg>
              </a>
              <p style={{ margin: '10px 0 0', color: 'var(--text-2)', fontSize: '0.82rem', fontWeight: 600 }}>7 dias grátis · Sem cartão · Cancele quando quiser</p>
            </motion.div>
          </div>
        </section>

        {/* ── WORKFLOW ─────────────────────────── */}
        <section id="operacao" className="workflow-section" aria-labelledby="workflow-heading">
          <div style={{ paddingTop: 'clamp(72px,9vw,120px)', paddingBottom: 'clamp(72px,9vw,120px)', paddingLeft: 'clamp(18px,5vw,72px)' }}>
            <p className="section-label">Implantação simples</p>
            <h2 id="workflow-heading" style={{ margin: 0, fontSize: 'clamp(1.9rem,4vw,3.6rem)', lineHeight: 0.96, letterSpacing: '-0.03em', fontWeight: 800, textWrap: 'balance' }}>
              Do primeiro cadastro ao caixa rodando em poucas horas.
            </h2>
            <p style={{ margin: '18px 0 0', color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.65, fontWeight: 500, maxWidth: 460 }}>
              A loja define o terminal, cadastra vendedores por PIN, importa produtos por planilha e começa a vender. O gestor acompanha tudo sem depender do operador.
            </p>
          </div>
          <div style={{ paddingTop: 'clamp(72px,9vw,120px)', paddingBottom: 'clamp(72px,9vw,120px)', paddingRight: 'clamp(18px,5vw,72px)' }}>
            <div className="workflow-list" role="list">
              {workflow.map((step, i) => (
                <div className="workflow-step" key={step.title} role="listitem">
                  <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESILIENCE / DIFFERENTIALS ────────── */}
        <section className="resilience-section" aria-labelledby="resilience-heading">
          <div className="resilience-panel">
            <div className="resilience-icons" aria-hidden="true">
              {[WifiOff, HardDrive, RefreshCw, ShieldCheck].map((Icon, i) => (
                <div key={i}>
                  <Icon size={22} />
                </div>
              ))}
            </div>
            <h2 id="resilience-heading">
              Preparado para o mundo real: internet ruim, fila grande, operador com pressa.
            </h2>
            <p>
              Backup, auditoria, monitoramento, permissões por cargo e controle de caixa foram pensados para reduzir suporte e deixar sua operação pronta para escalar.
            </p>
          </div>
          <div className="resilience-specs" role="list">
            {specs.map(([title, text]) => (
              <div className="spec-row" key={title} role="listitem">
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPARISON TABLE ─────────────────── */}
        <section className="comparison-section" aria-labelledby="comparison-heading">
          <div className="section-inner">
            <div className="section-heading comparison-heading">
              <p className="section-label" aria-hidden="true">Por que o Zoltic?</p>
              <h2 id="comparison-heading">A diferenca aparece no caixa, no bolso e na fila.</h2>
              <p>Na pratica, o lojista nao assina um PDV por beleza. Ele assina porque precisa vender mais rapido, gastar menos e nao parar quando a internet falha.</p>
            </div>
            <div className="comparison-impact" role="list" aria-label="Principais vantagens do Zoltic">
              {comparisonHighlights.map((item) => (
                <article className="comparison-impact-card" key={item.value} role="listitem">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <div className="comparison-table-wrap">
              <table className="comparison-table" aria-label="Comparação Zoltic vs sistemas tradicionais">
                <thead>
                  <tr>
                    <th scope="col">Critério</th>
                    <th scope="col" className="col-accent">Zoltic PDV</th>
                    <th scope="col">Sistemas tradicionais</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td><ComparisonCell value={row.zoltic} /></td>
                      <td><ComparisonCell value={row.traditional} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="comparison-verdict" role="note">
              <strong>Resumo direto:</strong>
              <span>se a loja quer comecar rapido, pagar menos e continuar vendendo mesmo com internet ruim, o Zoltic entrega mais valor desde o primeiro mes.</span>
              <a href="#contato" id="comparison-cta">Quero testar o Zoltic</a>
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────── */}
        <section id="planos" className="pricing-section" aria-labelledby="pricing-heading">
          <div className="section-inner">
            <div className="section-heading dark">
              <p className="section-label section-label-light" aria-hidden="true">Planos e preços</p>
              <h2 id="pricing-heading">Simples, transparente e sem surpresas.</h2>
              <p>7 dias grátis em qualquer plano. Sem cartão de crédito. Cancele quando quiser.</p>
            </div>
            <div className="pricing-grid" role="list">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={plan.featured ? 'plan-card plan-featured' : 'plan-card'}
                  role="listitem"
                  aria-label={`Plano ${plan.name}`}
                >
                  {plan.featured && <span className="plan-badge">Mais indicado</span>}
                  <h3>{plan.name}</h3>
                  <p>{plan.text}</p>
                  <div className="plan-price">
                    <strong>{plan.price}</strong>
                    {plan.price !== 'Sob consulta' && <small>/mês</small>}
                  </div>
                  <a
                    href="#contato"
                    className="plan-cta"
                    id={`plan-cta-${plan.name.toLowerCase()}`}
                  >
                    {plan.price === 'Sob consulta' ? 'Falar com a equipe' : plan.featured ? 'Começar agora — 7 dias grátis' : 'Testar grátis'}
                  </a>
                  <hr className="plan-divider" aria-hidden="true" />
                  <ul className="plan-features">
                    {plan.features.map((f) => (
                      <li key={f}>
                        <Check size={15} aria-hidden="true" /> {f}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── GUARANTEE STRIP ─────────────────── */}
        <section aria-label="Garantia e risco zero" style={{ background: 'var(--bg)' }}>
          <div className="section-inner" style={{ paddingTop: 'clamp(32px,4vw,52px)', paddingBottom: 'clamp(32px,4vw,52px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }} role="list">
              {[
                { icon: 'M173.66 98.34a8 8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 0M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88', color: '#34d399', label: '7 dias grátis', sub: 'Sem cartão de crédito' },
                { icon: 'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m45.66-93.66a8 8 0 0 1 0 11.32l-32 32a8 8 0 0 1-11.32-11.32L148.69 136H88a8 8 0 0 1 0-16h60.69l-18.35-18.34a8 8 0 0 1 11.32-11.32Z', color: '#60a5fa', label: 'Sem fidelidade', sub: 'Cancele quando quiser' },
                { icon: 'M207.06 72.67A111.24 111.24 0 0 0 128 40h-.4C66.07 40.21 16 91 16 153.13V176a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-24a111.25 111.25 0 0 0-32.94-79.33M224 176H119.71l54.76-75.3a8 8 0 0 0-12.94-9.42L99.92 176H32v-22.87c0-3.08.15-6.12.43-9.13H56a8 8 0 0 0 0-16H35.27c10.32-38.86 44-68.24 84.73-71.66V80a8 8 0 0 0 16 0V56.33A96.14 96.14 0 0 1 221 128h-21a8 8 0 0 0 0 16h23.67c.21 2.65.33 5.31.33 8Z', color: '#fbbf24', label: 'Opera offline', sub: 'Nunca perde uma venda' },
                { icon: 'M208 136H48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16m0 64H48v-48h160zm0-160H48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 64H48V56h160zm-16-24a12 12 0 1 1-12-12a12 12 0 0 1 12 12m0 96a12 12 0 1 1-12-12a12 12 0 0 1 12 12', color: '#a78bfa', label: 'Roda em PC antigo', sub: 'Sem hardware caro' },
                { icon: 'M221.28 34.75a64 64 0 0 0-90.49 0L60.69 104A15.9 15.9 0 0 0 56 115.31v73.38l-29.66 29.65a8 8 0 0 0 11.32 11.32L67.32 200h73.38a15.92 15.92 0 0 0 11.3-4.68l69.23-70a64 64 0 0 0 .05-90.57m-79.21 11.31A48 48 0 0 1 211.79 112h-56.46l34.35-34.34a8 8 0 0 0-11.32-11.32L120 124.69V67.87ZM72 115.35l32-31.67v57l-32 32ZM140.7 184H83.32l56-56h56.74Z', color: '#2563eb', label: 'Suporte humano', sub: 'Via WhatsApp no onboarding' },
              ].map((item) => (
                <div key={item.label} role="listitem" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, flexShrink: 0, display: 'grid', placeItems: 'center', background: `${item.color}18`, borderRadius: 10, border: `1.5px solid ${item.color}33` }} aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" style={{ color: item.color }}>
                      <path fill="currentColor" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.9rem' }}>{item.label}</div>
                    <div style={{ fontWeight: 500, color: 'var(--ink-2)', fontSize: '0.78rem' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────── */}
        <section id="faq" className="faq-section" aria-labelledby="faq-heading">
          <div className="section-inner">
            <div className="section-heading" style={{ maxWidth: '100%', textAlign: 'center', margin: '0 auto clamp(32px,5vw,54px)' }}>
              <p className="section-label" aria-hidden="true">Dúvidas comuns</p>
              <h2 id="faq-heading">O que os lojistas perguntam antes de contratar.</h2>
            </div>
            <div className="faq-list" role="list">
              {faqs.map(([q, a], i) => (
                <FaqItem key={q} question={q} answer={a} id={String(i)} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA + LEAD FORM ────────────── */}
        <section id="contato" className="cta-section" aria-labelledby="cta-heading">
          <div className="cta-copy">
            <p className="section-label section-label-light">Pronto para começar</p>
            <h2 id="cta-heading">
              Transforme sua operação em uma máquina de vender.
            </h2>
            <p>
              Cadastre seus dados e ganhe 7 dias grátis para testar o Zoltic PDV completo na sua loja — sem compromisso, sem cartão de crédito.
            </p>
            <ul className="cta-bullets">
              {[
                'Configuração em horas, não dias',
                'Funciona offline sem perder uma venda',
                'Suporte humano próximo e rápido',
                'Seus dados seguros com backup automático',
              ].map((item) => (
                <li key={item}>
                  <TrendingUp size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm />
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-brand">
          <span className="brand-icon" aria-hidden="true">Z</span>
          <span>Zoltic PDV</span>
        </div>
        <nav className="footer-links" aria-label="Links do rodapé">
          <a href="#recursos">Recursos</a>
          <a href="#planos">Planos</a>
          <a href="#faq">FAQ</a>
          <a href="#contato">Contato</a>
          <a href="/privacidade">Privacidade</a>
          <a href="/termos">Termos</a>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} Zoltic. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
