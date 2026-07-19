import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';

type LegalPageProps = {
  kind: 'privacy' | 'terms';
};

const LEGAL_COMPANY_NAME = String((import.meta as any).env?.VITE_LEGAL_COMPANY_NAME || 'Zoltic Sistemas');
const LEGAL_COMPANY_DOCUMENT = String((import.meta as any).env?.VITE_LEGAL_COMPANY_DOCUMENT || 'CNPJ a informar');
const LEGAL_CONTACT_EMAIL = String((import.meta as any).env?.VITE_LEGAL_CONTACT_EMAIL || 'privacidade@seudominio.com.br');

const privacySections = [
  {
    title: 'Quem controla os dados',
    body: [
      'O Zoltic trata dados como controlador quando recebe contatos comerciais, dados de licenca, cobranca, suporte e uso do site.',
      'Quando o lojista usa backup, sincronizacao, suporte ou recursos contratados que envolvem os dados inseridos no PDV, o lojista normalmente e o controlador e o Zoltic atua como operador.',
    ],
  },
  {
    title: 'Dados tratados',
    body: [
      'Podemos tratar nome, e-mail, telefone, empresa, dados de licenca, plano contratado, registros de suporte, logs tecnicos, versao do aplicativo e informacoes necessarias para atendimento.',
      'No PDV, podem existir dados de clientes finais, vendedores, fornecedores, vendas, orcamentos, estoque, documentos fiscais, backups e auditoria, conforme configuracao do lojista.',
    ],
  },
  {
    title: 'Finalidades',
    body: [
      'Usamos dados para vender, ativar, manter e dar suporte ao Zoltic PDV, operar backups e sincronizacao quando contratados, melhorar seguranca, cumprir obrigacoes legais e responder solicitacoes.',
      'Recursos de IA externa ficam desativados por padrao e dependem de configuracao consciente pelo lojista.',
    ],
  },
  {
    title: 'Compartilhamento',
    body: [
      'Podemos usar fornecedores de hospedagem, banco de dados, backup, fiscal, monitoramento, comunicacao, suporte, cobranca e IA opcional.',
      'Esses fornecedores devem ser usados somente para a finalidade contratada e conforme medidas de seguranca aplicaveis.',
    ],
  },
  {
    title: 'Direitos dos titulares',
    body: [
      'Titulares podem pedir confirmacao de tratamento, acesso, correcao, informacoes de compartilhamento, revogacao de consentimento, oposicao, portabilidade e eliminacao quando cabivel.',
      'Quando o pedido envolver dados controlados por um lojista, poderemos orientar o titular a falar com o lojista responsavel.',
    ],
  },
  {
    title: 'Seguranca e incidentes',
    body: [
      'O produto possui controles como auditoria, protecao local de segredos, token forte de rede, confirmacao antes de exportacoes sensiveis e minimizacao de dados em recursos externos.',
      'Se houver incidente com risco ou dano relevante, a avaliacao e a comunicacao seguem os papeis definidos pela LGPD e pelas regras da ANPD.',
    ],
  },
];

const termsSections = [
  {
    title: 'Uso do produto',
    body: [
      'O Zoltic PDV e licenciado ao lojista conforme plano contratado, limites de terminais, recursos habilitados e status da licenca.',
      'E proibido copiar, revender, burlar licenca, fazer engenharia reversa ou usar o software para fins ilicitos.',
    ],
  },
  {
    title: 'Responsabilidades do lojista',
    body: [
      'O lojista deve manter dados fiscais corretos, controlar usuarios e PINs, proteger computadores, rede local, backups exportados e credenciais.',
      'Configuracoes fiscais, certificado digital, prazos legais e validacao contabil devem ser revisados com contador ou responsavel fiscal.',
    ],
  },
  {
    title: 'Responsabilidades do Zoltic',
    body: [
      'O Zoltic fornece o software, suporte e recursos contratados, alem de medidas razoaveis de seguranca, atualizacao, backup e auditoria nos pontos sob sua responsabilidade.',
      'Falhas de internet, energia, hardware, rede local, configuracao fiscal ou uso indevido por usuarios do lojista ficam sob responsabilidade do lojista.',
    ],
  },
  {
    title: 'Backup, rede e atualizacoes',
    body: [
      'Backups podem conter dados pessoais e fiscais. O lojista deve guardar arquivos exportados com cuidado e testar restauracao quando aplicavel.',
      'O modo multi-terminal deve ser usado somente em rede local confiavel. Nao recomendamos expor a porta local do servidor na internet.',
    ],
  },
  {
    title: 'Protecao de dados',
    body: [
      'O lojista normalmente e controlador dos dados de clientes finais, vendedores e fornecedores inseridos no PDV.',
      'O Zoltic atua como operador quando processa esses dados em backup, sincronizacao, suporte ou recursos contratados.',
    ],
  },
  {
    title: 'Contrato final',
    body: [
      'Esta pagina resume condicoes gerais. A proposta comercial, contrato assinado, anexo de tratamento de dados, politica de privacidade e tabela de planos podem complementar ou prevalecer conforme o caso.',
    ],
  },
];

export const LegalPage = ({ kind }: LegalPageProps) => {
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? 'Politica de Privacidade' : 'Termos de Uso';
  const lead = isPrivacy
    ? 'Como o Zoltic trata dados no site, no relacionamento comercial e nos recursos contratados do PDV.'
    : 'Condicoes gerais para uso comercial do Zoltic PDV por lojistas, operadores e administradores.';
  const sections = isPrivacy ? privacySections : termsSections;

  return (
    <div className="legal-page">
      <header className="legal-nav">
        <a href="/" className="legal-brand" aria-label="Voltar para a pagina inicial">
          <span className="brand-icon" aria-hidden="true">Z</span>
          <strong>Zoltic PDV</strong>
        </a>
        <a className="legal-back" href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          Inicio
        </a>
      </header>

      <main className="legal-main">
        <section className="legal-hero">
          <div className="legal-symbol" aria-hidden="true">
            <ShieldCheck size={26} />
          </div>
          <p className="legal-kicker">Documento publico</p>
          <h1>{title}</h1>
          <p>{lead}</p>
          <dl>
            <div>
              <dt>Empresa</dt>
              <dd>{LEGAL_COMPANY_NAME}</dd>
            </div>
            <div>
              <dt>Documento</dt>
              <dd>{LEGAL_COMPANY_DOCUMENT}</dd>
            </div>
            <div>
              <dt>Atualizacao</dt>
              <dd>14/07/2026</dd>
            </div>
          </dl>
        </section>

        <section className="legal-content" aria-label={title}>
          {sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </section>

        <section className="legal-contact" aria-label="Canal de privacidade">
          <div>
            <h2>Canal de privacidade</h2>
            <p>
              Para pedidos de titulares, duvidas sobre dados pessoais ou comunicacoes relacionadas a LGPD,
              use o canal abaixo. Podemos solicitar confirmacao de identidade antes de responder.
            </p>
          </div>
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>
            <Mail size={18} aria-hidden="true" />
            {LEGAL_CONTACT_EMAIL}
          </a>
        </section>
      </main>
    </div>
  );
};
