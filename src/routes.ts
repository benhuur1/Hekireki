/**
 * Tabela única de rotas.
 *
 * Alimenta o menu (topbar + drawer), a resolução da rota a partir do path,
 * o <title>/description em runtime, o <head> estático que o prerender
 * escreve em cada HTML, e o sitemap.xml.
 *
 * Uma fonte, vários consumidores: título de aba, preview de link e sitemap
 * não podem divergir do menu.
 */
export const SLUGS = [
  'primeira', 'lentes', 'corte', 'espelho', 'lexico',
  'portao', 'tanren', 'setimo', 'kakurai', 'cronica',
] as const

export type Slug = (typeof SLUGS)[number]

export type Rota = {
  slug: Slug
  /** Caminho canônico. Usado pelo prerender e pelo sitemap. */
  path: string
  kanji: string
  label: string
  /** Descrição curta, exibida no drawer mobile. */
  desc: string
  /** <title> da aba e og:title. */
  title: string
  /** meta description e og:description. */
  description: string
  /** Aparece no menu? A Crônica é alcançável só por URL direta. */
  inMenu: boolean
  /** Entra no sitemap e fica sem noindex? */
  indexable: boolean
}

const SITE = 'Hekireki'

export const ROTAS: Rota[] = [
  {
    slug: 'primeira', path: '/', kanji: '壱', label: 'Primeira Forma',
    desc: 'A essência — uma técnica, executada com perfeição',
    title: 'Primeira Forma · 壱ノ型',
    description:
      '壱ノ型 — o manifesto da Primeira Forma: entregar task com qualidade. Do Portão ao Trovão do Núcleo, as formas do ofício.',
    inMenu: true, indexable: true,
  },
  {
    slug: 'lentes', path: '/lentes/', kanji: '質', label: 'As Quatro Lentes',
    desc: 'Os quatro donos da qualidade',
    title: `As Quatro Lentes · ${SITE}`,
    description:
      'Toda entrega responde a quatro donos: quem usa, o computador, o dono do problema e o dev que vem depois. Qualidade é servir os quatro de uma vez.',
    inMenu: true, indexable: true,
  },
  {
    slug: 'corte', path: '/corte/', kanji: '道', label: 'O Corte',
    desc: 'A Primeira Forma aplicada a stack, infra e carreira',
    title: `O Corte · ${SITE}`,
    description:
      'A Primeira Forma aplicada a stack, infraestrutura e carreira: os monstros do overengineering, a lei do corte e os caminhos possíveis.',
    inMenu: true, indexable: true,
  },
  {
    slug: 'espelho', path: '/espelho/', kanji: '鏡', label: 'O Espelho',
    desc: 'Auto-audit: 20 perguntas pro próprio código',
    title: `O Espelho · ${SITE}`,
    description:
      'Vinte perguntas para olhar o próprio código sem piedade: a lâmina, as dependências, as impurezas e a forja. Sem placar, só desconforto direcionado.',
    inMenu: true, indexable: true,
  },
  {
    slug: 'lexico', path: '/lexico/', kanji: '辞', label: 'O Léxico',
    desc: 'Dicionário do trovão pra devs',
    title: `O Léxico · ${SITE}`,
    description:
      'Vinte e um termos do trovão traduzidos para o ofício: a forja, a técnica, os personagens e os atos. O dicionário do manifesto.',
    inMenu: true, indexable: true,
  },
  {
    slug: 'portao', path: '/portao/', kanji: '門', label: 'O Portão',
    desc: 'Onde o contrato é forjado',
    title: `O Portão · ${SITE}`,
    description:
      'Validação na borda: onde o contrato é forjado, por que a defesa espalhada envenena o cálculo lá embaixo, e como testar a espada antes de confiar nela.',
    inMenu: true, indexable: true,
  },
  {
    slug: 'tanren', path: '/tanren/', kanji: '鍛', label: 'A Têmpera',
    desc: 'A disciplina virando reflexo',
    title: `A Têmpera · ${SITE}`,
    description:
      'Tanren: a disciplina que vira reflexo. As confissões, os juramentos, o teste do ferreiro — repetir a mesma forma até ela deixar de exigir esforço.',
    inMenu: true, indexable: true,
  },
  {
    slug: 'setimo', path: '/setimo/', kanji: '漆', label: 'Sétima Forma',
    desc: 'A forma que nasce da repetição da primeira',
    title: `Sétima Forma · ${SITE}`,
    description:
      'A forma que nasce da repetição da primeira: sete golpes de ferramental, modo estrategista e o argumento de por que o projeto cabe num servidor pequeno.',
    inMenu: true, indexable: true,
  },
  {
    slug: 'kakurai', path: '/kakurai/', kanji: '核', label: 'Trovão do Núcleo',
    desc: 'A forma que nasce do limite — usar o que o runtime já tem',
    title: `Trovão do Núcleo · ${SITE}`,
    description:
      'A forma que nasce do limite: usar o que o runtime já tem. O contrato do gate, a política do repositório e os cinco golpes do movimento autoral.',
    inMenu: true, indexable: true,
  },
  {
    // Fora do menu por decisão editorial, e fora do índice de busca: é um
    // log de trabalho vivo, que cresce a cada semana. Manter indexável
    // transformaria qualquer descuido futuro em resultado de busca.
    slug: 'cronica', path: '/cronica/', kanji: '跡', label: 'A Crônica',
    desc: 'A evolução do projeto até aqui',
    title: `A Crônica · ${SITE}`,
    description:
      'A evolução do projeto, martelada a martelada: o registro de como o manifesto foi forjado.',
    inMenu: false, indexable: false,
  },
]

export const MENU = ROTAS.filter((r) => r.inMenu)

const PADRAO = ROTAS[0]

export function rotaPorSlug(slug: string): Rota {
  return ROTAS.find((r) => r.slug === slug) ?? PADRAO
}

/**
 * Resolve um pathname para a rota. Aceita com e sem barra final, para que um
 * link para /corte e um para /corte/ levem ao mesmo lugar — a forma canônica
 * (com barra) é a que o `path` declara e a que vai no canonical e no sitemap.
 */
export function rotaPorPath(pathname: string): Rota {
  const limpo = pathname.replace(/\/+$/, '') || '/'
  return (
    ROTAS.find((r) => (r.path.replace(/\/+$/, '') || '/') === limpo) ?? PADRAO
  )
}
