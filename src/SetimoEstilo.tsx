import { useEffect, useState } from 'react'
import './PrimeiraForma.css'
import './SetimoEstilo.css'
import { analyticsAtivo } from './analytics'
import { Scar, SectionLabel, SignatureMark } from './marks'

/* =================== TYPES & DATA =================== */

type CompetitivoTotais = {
  rede: string
  lojas: number | string
  paginas: number
  composicao?: { label: string; paginas: number }[]
}
type CompetitivoMatriz = {
  feature: string
  label: string
  redeA: number
  redeB: number
  fabricante: number
  rede_a_eco?: Record<string, number>
}
type Competitivo = {
  totais: { redeA: CompetitivoTotais; redeB: CompetitivoTotais; fabricante: CompetitivoTotais }
  matriz: CompetitivoMatriz[]
  vantagens_rede_a: string[]
  gaps_rede_a: string[]
  paridade: string[]
}

type Golpe = {
  numero: string
  titulo: string
  arquivo: string
  resumo: string
  bullets: string[]
  codigo?: string
}

const golpes: Golpe[] = [
  {
    numero: 'I',
    titulo: 'Diffador Semântico',
    arquivo: '7_diff.py',
    resumo:
      'Compara dois snapshots datados e mostra o que melhorou, piorou ou apareceu de novo. Cada correção feita no site vira um delta visível.',
    bullets: [
      'Evolução numérica — "212 sem meta" → "180 sem meta" ↘ −32',
      'URLs específicas que ganharam ou perderam meta description, H1, alt-text',
      'Mudanças no catálogo do fabricante (preço, ano, motor, modelo novo)',
      'Sumário executivo com melhorias, regressões e estáveis',
    ],
    codigo: `python 6_relatorio.py --tag baseline    # ponto inicial
# ... mexe no site, corrige problemas ...
python 6_relatorio.py                    # snapshot do dia
python 7_diff.py                         # diff automático`,
  },
  {
    numero: 'II',
    titulo: 'Modo Estrategista',
    arquivo: 'app.py · 4º modo',
    resumo:
      'Um quarto modo que dispensa chat livre. Você escolhe uma análise executiva, o app cruza site.db + catálogo oficial + chunks RAG e manda tudo num único prompt para o Sonnet.',
    bullets: [
      'Seis perguntas executivas pré-prontas (plano de 30 dias, SWOT, ROI, …)',
      'Briefing automático com inventário, achados, catálogo e gaps',
      'Resposta no formato de consultoria sênior — direta e quantificada',
      'Tudo gravado no histórico (data/chat.db) pra revisitar depois',
    ],
  },
  {
    numero: 'III',
    titulo: 'Sentinela One-shot',
    arquivo: 'update.sh',
    resumo:
      'Um comando que toca todo o pipeline em ordem: raspagem, reindex Chroma, crawl de sitemaps, extração estruturada, catálogo do fabricante, auditoria de telefones, snapshot e diff vs anterior.',
    bullets: [
      'Nove etapas em sequência, com log silencioso em /tmp/sentinela_*.log',
      'Diff automático contra o snapshot anterior se houver',
      'Modo --skip-rag pra rodar só auditoria (~1 min)',
      'Pronto pra agendar via cron ou launchd',
    ],
    codigo: `./update.sh             # versão completa (~5 min)
./update.sh --skip-rag  # só auditoria (~1 min)`,
  },
  {
    numero: 'IV',
    titulo: 'Castelo do Infinito (mu-plugins)',
    arquivo: 'mu-plugins/castelo-infinito*.php',
    resumo:
      'O ataque deixou de ser análise — virou correção. Seis mu-plugins WordPress que arrumam o site na mesma marretada: meta description, alt-text, H1 fallback, contatos canônicos, dados estruturados e bloco dinâmico de unidade em página de item.',
    bullets: [
      'Parte 1 — meta description + alt-text via output buffer (page builders não usam wp_get_attachment_image)',
      'Parte 2 — tabela de substituição segura normaliza contatos canônicos por unidade',
      'Parte 3 — H1 fallback + JSON-LD schema.org por unidade',
      'Parte 4 — bloco "endereço · telefone · horário" injetado nas páginas de item',
      'Parte 5 — patch_img_alt_in_html() varre HTML e injeta alt derivado de title/figcaption/filename',
      'Parte 6 — admin dashboard em Tools → Castelo do Infinito (por site + visão agregada)',
    ],
    codigo: `wp rede audit-summary --network
wp rede contacts diff
# Tools → Castelo do Infinito (visão agregada)`,
  },
  {
    numero: 'V',
    titulo: 'Inspetor de Conformidade',
    arquivo: 'app.py · modo Inspetor',
    resumo:
      'Quando a política editorial de um catálogo muda, alguém precisa verificar se as páginas acompanharam. O Inspetor compara o catálogo publicado com o catálogo de referência e aponta onde os dois divergem — campo a campo, página a página.',
    bullets: [
      'Divergência de política — lista cada URL cujo conteúdo contraria a regra vigente',
      'Cobertura de itens por unidade — o que falta, o que sobrou de versões antigas',
      'Valores publicados vs oficiais — flagra grafias e variações divergentes',
      'Consistência de especificação — os mesmos atributos batem entre as unidades?',
      'A tabela extraída espelha a de referência: mesmas colunas, comparável direto',
    ],
    codigo: `python extract_models.py          # extrai catálogo publicado
# app.py → Inspetor → divergências contra a política vigente`,
  },
  {
    numero: 'VI',
    titulo: 'Visual UX (Playwright)',
    arquivo: 'app.py · modo Visual UX · 9_playwright_audit.py',
    resumo:
      'O olho do espadachim ganhou três viewports. Playwright headless atravessa Atendente, Inspetor e Estrategista, tira screenshot em 375 / 1024 / 1920 e grava em playwright_audits — sobrepor regressões fica trivial.',
    bullets: [
      'Três viewports simultâneos: 375 (mobile), 1024 (HD), 1920 (Full HD)',
      'Subprocess streaming pro Streamlit — vê cada passo do crawler ao vivo',
      'Detecta LCP > 4s e cumulative layout shift por viewport',
      'Snapshots datados em data/playwright_audits/ — pronto pra diff visual',
    ],
  },
  {
    numero: 'VII',
    titulo: 'Trovão ao Vivo',
    arquivo: 'app.py · sidebar · app_log.py',
    resumo:
      'O sétimo golpe: observabilidade total. Ring buffer compartilhado entre stdout e UI — cada busca RAG, cada chamada do Sonnet, cada linha do pipeline aparece colorida no painel da sidebar. E um botão único toca o pipeline inteiro.',
    bullets: [
      'Logs ao vivo na sidebar com slider 10–200 eventos · DEBUG / INFO / WARNING / ERROR coloridos',
      'Botão "Rodar pipeline completo" — subprocess.Popen com streaming linha-a-linha',
      'Checkboxes "pular RAG" / "pular concorrente" pra escolher peso do golpe',
      'Mesmos eventos vão pro terminal — auditoria zero-touch via tail no journalctl',
      'Status final: tempo total · código de saída + última linha',
    ],
    codigo: `streamlit run app.py
# sidebar → Pipeline → Rodar pipeline completo
# (cada linha do update.sh vira evento INFO no painel)`,
  },
]

const perguntas = [
  { titulo: 'Plano de ação 30 dias', desc: 'Quatro sprints × entregas × responsável × KPI.' },
  { titulo: 'Análise SWOT', desc: 'Forças, fraquezas, oportunidades e ameaças com dados do site real.' },
  { titulo: 'ROI das correções', desc: 'Cinco correções com horas-homem, ganho esperado e payback.' },
  { titulo: 'Posicionamento competitivo', desc: 'Rede A vs Fabricante vs concorrência, com três movimentos.' },
  { titulo: 'Pauta para a direção', desc: 'Reunião de 30min — três dados + duas perguntas + uma recomendação.' },
  { titulo: 'Riscos e bombas-relógio', desc: 'Severidade, mitigação imediata e mitigação definitiva.' },
  { titulo: 'Catálogo publicado vs referência', desc: 'Cobertura, divergência de política, valores e specs inconsistentes.' },
]

const arvore = `rag-rede/
├── 1c_wp_loader.py             ─ raspa WP (texto pro RAG)
├── 2_index.py                  ─ Chroma (vetores)
├── 2b_sitemap_crawler.py       ─ descobre URLs
├── 2c_concorrente_crawler.py   ─ concorrência (Rede B)
├── 2d_rede_a_eco_crawler.py    ─ ecossistema Rede A (3 domínios)
├── 3_site_extract.py           ─ links / imgs / forms / contatos / meta
├── 3b_concorrente_extract.py   ─ extração concorrente
├── 4_compare_oficial.py        ─ catálogo do fabricante
├── 4b_extract_rede_a_models.py ─ catálogo Rede A (versões / cores / preço)
├── 5_audit_telefones.py        ─ relatório de telefones
├── 6_relatorio.py              ─ snapshot datado
├── 7_diff.py                   ─ comparador entre snapshots
├── 8_compare_concorrente.py    ─ matriz Rede A × Rede B × Fabricante
├── 9_playwright_audit.py       ─ Playwright multi-viewport
├── update.sh                   ─ sentinela one-shot
├── app.py                      ─ 5 modos: Atendente · Auditor · Inspetor · Estrategista · Visual UX
├── app_log.py                  ─ ring buffer logs (stdout + sidebar)
├── db.py                       ─ chat history SQLite
├── db_site.py                  ─ banco estruturado SQLite
├── network.json                ─ config dos 5 sites
└── data/
    ├── chroma/                 ─ vetores
    ├── site.db                 ─ pages + modelos_rede_a + modelos_fabricante
    ├── chat.db                 ─ histórico conversas
    └── COMPETITIVO.md          ─ matriz Rede A × Rede B × Fabricante`

const ritual = [
  { titulo: 'Sidebar · Logs do app', detalhe: 'Abre o painel. Cada movimento dali pra frente aparece colorido em tempo real — INFO azul, ERROR vermelho intenso.' },
  { titulo: 'Modo Inspetor — divergência de política', detalhe: 'Flagra as URLs cujo conteúdo contraria a regra editorial vigente.' },
  { titulo: 'Modo Inspetor — cobertura', detalhe: 'Confirma que Modelo X falta na matriz e Modelo Y é legado em 3 lojas.' },
  { titulo: 'Modo Estrategista — catálogo', detalhe: 'Sonnet cruza modelos_rede_a × modelos_fabricante e devolve plano executivo.' },
  { titulo: 'Modo Visual UX', detalhe: 'Roda Playwright em 375 / 1024 / 1920 — cada linha do crawler aparece no painel de logs ao vivo.' },
  { titulo: 'WP Admin · Castelo do Infinito', detalhe: 'Abre /wp-admin/tools.php?page=castelo — visão rede agregada com tudo que o mu-plugin já corrigiu hoje.' },
  { titulo: 'Sidebar · Pipeline completo', detalhe: 'Toca update.sh inteiro, cada linha vira evento de log. Ao final: tempo total e código de saída.' },
]

const presaUnica = [
  { titulo: 'WordPress multisite com mu-plugins diretos', texto: 'Em vez de tema headless + Next.js SSR + plugin marketplace pago. Seis arquivos PHP no mu-plugins/ consertam o que precisava ser consertado, sem deploy ritual.' },
  { titulo: 'update.sh — 9 etapas em sequência num único shell', texto: 'Em vez de Airflow + DAG distribuído + Celery + Redis broker + Flower dashboard. Um ./update.sh e o pipeline inteiro roda do scraping ao snapshot.' },
  { titulo: 'Lando local em domínio de staging', texto: 'Em vez de ambiente staging full stack + CI/CD multi-stage + Vault + feature flags. O /etc/hosts e o Docker do Lando dão conta do que um time inteiro de DevOps faria.' },
  { titulo: 'Snapshot file-based + diff semântico', texto: 'Em vez de Snowflake + dbt + Looker + DataDog + alerting cluster. Um arquivo JSON datado no disco, um script Python que compara dois — a regressão fica visível sem precisar de dashboard.' },
  { titulo: 'JSON estático em /public + fetch direto', texto: 'Em vez de API REST + GraphQL + Apollo + Redis cache + CDN edge functions. O dado é estático, o caminho é uma URL, o navegador resolve. A "API" é o sistema de arquivos.' },
]

const respiracoes = [
  { kanji: '静', titulo: 'Concentração', legenda: 'Antes do golpe, a quietude. Ouvidos atentos, olhos fechados.' },
  { kanji: '聞', titulo: 'A escuta', legenda: 'Quando os olhos não veem, o som guia a lâmina.' },
  { kanji: '歩', titulo: 'Primeiro Movimento', legenda: 'O passo único — rápido demais para ser visto.' },
  { kanji: '構', titulo: 'Postura de ataque', legenda: 'Joelhos dobrados, lâmina pronta, raios convergindo.' },
  { kanji: '嵐', titulo: 'Sob a tempestade', legenda: 'A respiração entra em ressonância com o trovão.' },
  { kanji: '漆', titulo: 'Sétimo Estilo', legenda: 'A técnica original — só executada uma vez.' },
  { kanji: '文', titulo: 'A carta de Jigoro', legenda: 'Antes do raio, a memória do mestre.' },
]

const direitos: { titulo: string; corpo: React.ReactNode }[] = [
  {
    titulo: 'Arte da página',
    corpo: (
      <>
        Tipografia, hairlines, raios, animações e o <em>scar</em> dourado são{' '}
        <strong>originais do projeto</strong>, gerados em SVG e CSS. Reaproveite livremente.
      </>
    ),
  },
  {
    titulo: 'Referência cultural',
    corpo: (
      <>
        <em>Honoikazuchi no Kami (火雷神)</em> e o conceito da Sétima Forma do Trovão são
        referências narrativas à obra <strong>Kimetsu no Yaiba (Demon Slayer)</strong> de
        Koyoharu Gotouge — publicada pela Shueisha, animada pela Ufotable, licenciada pela
        Aniplex. Esta página é homenagem cultural / educacional, não reproduz arte oficial,
        não comercializa o IP citado.
      </>
    ),
  },
  {
    titulo: 'Dados do visitante',
    /* Lê a mesma variável que liga o analytics, para o texto não poder
       divergir do que o site realmente faz. Página sobre honestidade
       técnica não pode afirmar "sem coleta" enquanto coleta. */
    corpo: analyticsAtivo ? (
      <>
        Audiência agregada via Google Analytics 4 — quantas pessoas chegam, por
        quais formas passam, de onde vieram. Usa os cookies <code>_ga</code>. Não há
        formulário, login nem identificação pessoal, e nada do que você lê aqui é
        associado a você. O contador de marteladas da Primeira Forma continua só no{' '}
        <code>localStorage</code> do seu browser — fica com você, ninguém mais vê.
        Um bloqueador como <em>uBlock Origin</em> derruba o analytics inteiro, e a
        página funciona igual.
      </>
    ) : (
      <>
        Sem coleta. Nada de formulário, login, analytics, cookie próprio. O contador
        de marteladas da Primeira Forma vive no <code>localStorage</code> do seu próprio
        browser — fica com você, ninguém mais vê. O único request externo que sai daqui
        é pro CSS do Google Fonts, que registra seu IP no log deles uma vez por sessão.
        Pra evitar até isso, basta um bloqueador como <em>uBlock Origin</em>.
      </>
    ),
  },
  {
    titulo: 'Código do projeto',
    corpo: (
      <>
        <code>rag-rede</code> é projeto pessoal de demonstração de RAG aplicado a uma rede
        multisite WordPress. Os números exibidos aqui são <strong>ilustrativos</strong>,
        gerados para demonstrar o formato da análise — não descrevem nenhuma operação real
        nem identificam qualquer organização.
      </>
    ),
  },
]

/* =================== PAGE =================== */

function SetimaForma() {
  return (
    <main className="hk">
      <Scar />

      {/* HERO */}
      <header className="hk-hero">
        <span className="hk-kanji-art" aria-hidden>漆</span>

        <div className="hk-hero-meta">
          <span className="hk-eyebrow">漆ノ型 — SHICHI NO KATA — ORIGINAL</span>
          <h1 className="hk-title">
            <span className="hk-title-kanji">火 雷 神</span>
            <span className="hk-title-rom">Honoikazuchi no Kami</span>
            <span className="hk-title-trans">Sétima Forma · Deus do Trovão Flamejante</span>
          </h1>
          <p className="hk-lead">
            A forma que Zenitsu criou sozinho — não foi ensinada por mestre nenhum, nasceu
            da repetição infinita da Primeira. Aqui é a mesma coisa em código: o conjunto
            de ferramentas que floresceu da raiz simples (<em>RAG sobre um site cliente</em>) e
            se tornou um sistema que se monitora, se corrige e se explica sozinho.
          </p>
          <p className="hk-quote">
            A maestria de uma forma única abre o caminho pra criar a sua própria.
          </p>
        </div>

        <aside className="hk-vertical" aria-hidden>
          <span>漆ノ型</span>
          <span className="hk-vertical-dot">·</span>
          <span>HONOIKAZUCHI</span>
        </aside>
      </header>

      {/* GOLPES */}
      <section className="hk-section">
        <SectionLabel num="02" tag="Os sete golpes" />
        <h2 className="hk-h2">Sete ferramentas, uma só técnica.</h2>
        <p className="hk-sub">
          Cada golpe é uma camada do pipeline. Juntos formam o Sétimo Estilo do código —
          um sistema que se monitora, se corrige e se explica sozinho.
        </p>
        <ol className="hk-impurezas">
          {golpes.map((g, i) => (
            <li key={g.numero}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>
                {g.titulo}
                <code className="hk-imp-tag">{g.arquivo}</code>
              </h3>
              <div>
                <p>{g.resumo}</p>
                {g.bullets.length > 0 && (
                  <ul className="hk-imp-bullets">
                    {g.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
                {g.codigo && (
                  <pre className="hk-imp-codigo"><code>{g.codigo}</code></pre>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* PERGUNTAS */}
      <section className="hk-section">
        <SectionLabel num="03" tag="Modo Estrategista" />
        <h2 className="hk-h2">Sete perguntas executivas.</h2>
        <p className="hk-sub">
          O Atendente conversa. O Inspetor audita. O Estrategista responde — sempre com
          dados cruzados de <em>site.db</em>, catálogo oficial e RAG num único prompt.
        </p>
        <ol className="hk-impurezas">
          {perguntas.map((p, i) => (
            <li key={p.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.titulo}</h3>
              <p>{p.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ESTRUTURA */}
      <section className="hk-section">
        <SectionLabel num="04" tag="Estrutura" />
        <h2 className="hk-h2">Mapa do tesouro.</h2>
        <p className="hk-sub">
          A árvore inteira do projeto, com cada arquivo e seu papel. A complexidade é só
          aparente — cada script faz uma coisa.
        </p>
        <pre className="hk-codigo"><code>{arvore}</code></pre>
      </section>

      {/* RITUAL */}
      <section className="hk-section">
        <SectionLabel num="05" tag="Ritual" />
        <h2 className="hk-h2">Ordem de demonstração.</h2>
        <p className="hk-sub">
          Os sete passos pra mostrar o sistema inteiro a quem nunca viu — em menos de
          quinze minutos.
        </p>
        <ol className="hk-impurezas">
          {ritual.map((r, i) => (
            <li key={r.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{r.titulo}</h3>
              <p>{r.detalhe}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* COMPETITIVO */}
      <CompetitivoSection />

      {/* PRESA ÚNICA */}
      <section className="hk-section">
        <SectionLabel num="07" tag="A presa única" />
        <h2 className="hk-h2">Por que esse projeto cabe num servidor pequeno.</h2>
        <p className="hk-sub">
          Cada peça da pilha foi escolhida pela <em>Primeira Presa do Inosuke</em>: a
          estocada bruta que resolve o problema sem inventar mais cinco.
        </p>
        <ol className="hk-impurezas">
          {presaUnica.map((p, i) => (
            <li key={p.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* RESPIRAÇÕES */}
      <section className="hk-section">
        <SectionLabel num="08" tag="Respirações" />
        <h2 className="hk-h2">Sete momentos da técnica.</h2>
        <p className="hk-sub">
          Sete momentos da técnica, em vinhetas originais. Os kanjis carregam a ação
          que a imagem mostraria.
        </p>
        <div className="hk-galeria">
          {respiracoes.map((r, i) => (
            <figure key={r.titulo} className="hk-galeria-item">
              <div className="hk-galeria-frame">
                <div className="hk-galeria-glyph" aria-hidden>{r.kanji}</div>
                <span className="hk-galeria-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <figcaption>
                <h3>{r.titulo}</h3>
                <p>{r.legenda}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* DIREITOS */}
      <section className="hk-section">
        <SectionLabel num="09" tag="Direitos" />
        <h2 className="hk-h2">Direitos &amp; Inspiração.</h2>
        <ol className="hk-impurezas">
          {direitos.map((d, i) => (
            <li key={d.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{d.titulo}</h3>
              <p>{d.corpo}</p>
            </li>
          ))}
        </ol>
        <blockquote className="hk-citacao">
          <span aria-hidden>— Honoikazuchi no Kami</span>
          A maestria de uma forma única abre o caminho pra criar a sua própria.
        </blockquote>
      </section>

      <footer className="hk-foot">
        <SignatureMark />
        <div className="hk-foot-row">
          <span>漆ノ型</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>Sétima Forma</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>Honoikazuchi no Kami</span>
        </div>
        <a href="#cronica" className="hk-cronica-entrada">
          ver a trajetória até aqui
        </a>
      </footer>
    </main>
  )
}

/* =================== COMPETITIVO =================== */

function CompetitivoSection() {
  const [data, setData] = useState<Competitivo | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}competitivo.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(setData)
      .catch((e) => setErro(String(e)))
  }, [])

  return (
    <section className="hk-section">
      <SectionLabel num="06" tag="Resultado competitivo" />
      <h2 className="hk-h2">Rede A × Rede B × Referência.</h2>
      <p className="hk-sub">
        Cruzamento direto entre <em>Rede A</em>, <em>Rede B</em>{' '}
        (concorrente multisite) e <em>Referência</em> (catálogo oficial), gerado pelo{' '}
        <code>8_compare_concorrente.py</code>. Os números abaixo são{' '}
        <strong>ilustrativos</strong>: demonstram o formato da análise e não descrevem
        nenhuma operação real.
      </p>

      {!data && !erro && (
        <p className="hk-comp-status">
          Aguardando <code>public/competitivo.json</code>. Rode{' '}
          <code>python 8_compare_concorrente.py</code> pra gerar.
        </p>
      )}
      {erro && (
        <p className="hk-comp-status erro">
          Não consegui ler <code>/competitivo.json</code> ({erro}).
        </p>
      )}

      {data && (
        <>
          {/* KPIs verticais — padrão impurezas com número */}
          <ol className="hk-kpis">
            {(['redeA', 'redeB', 'fabricante'] as const).map((k) => {
              const t = data.totais[k]
              return (
                <li key={k} data-pico={k === 'redeA' ? 'true' : 'false'}>
                  <span className="hk-kpi-num">{t.paginas.toLocaleString('pt-BR')}</span>
                  <span className="hk-kpi-label">{t.rede}</span>
                  <div className="hk-kpi-body">
                    <span className="hk-kpi-unit">páginas indexadas</span>
                    <span className="hk-kpi-meta">
                      {typeof t.lojas === 'number' ? `${t.lojas} loja${t.lojas !== 1 ? 's' : ''}` : t.lojas}
                    </span>
                    {t.composicao && t.composicao.length > 0 && (
                      <ul className="hk-kpi-comp">
                        {t.composicao.map((c) => (
                          <li key={c.label}>
                            <span>{c.label}</span>
                            <span>{c.paginas}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Matriz de features */}
          <div className="hk-matriz-wrap">
            <table className="hk-matriz">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Rede A</th>
                  <th>Rede B</th>
                  <th>Fabricante</th>
                </tr>
              </thead>
              <tbody>
                {data.matriz.map((r) => {
                  const ecoEntries = r.rede_a_eco ? Object.entries(r.rede_a_eco) : []
                  const ecoTotal = ecoEntries.reduce((s, [, n]) => s + n, 0)
                  return (
                    <tr key={r.feature}>
                      <td>{r.label}</td>
                      <td className={r.redeA > 0 ? 'sim' : 'nao'}>
                        {r.redeA > 0 ? (
                          <>
                            ✓ {r.redeA}
                            {ecoTotal > 0 && (
                              <span
                                className="eco-suffix"
                                title={ecoEntries.map(([k, n]) => `${k.replace('rede_a_', '')}: ${n}`).join(' · ')}
                              >
                                {' '}+{ecoTotal} eco
                              </span>
                            )}
                          </>
                        ) : '—'}
                      </td>
                      <td className={r.redeB > 0 ? 'sim' : 'nao'}>
                        {r.redeB > 0 ? `✓ ${r.redeB}` : '—'}
                      </td>
                      <td className={r.fabricante > 0 ? 'sim' : 'nao'}>
                        {r.fabricante > 0 ? `✓ ${r.fabricante}` : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Highlights — três listas em padrão impurezas */}
          {(
            [
              { num: '01', label: 'Vantagens da Rede A', items: data.vantagens_rede_a, fallback: 'Nenhuma vantagem exclusiva detectada nesta rodada.' },
              { num: '02', label: 'Gaps a fechar (Rede B tem)', items: data.gaps_rede_a, fallback: 'Rede A cobre tudo que a Rede B cobre.' },
              { num: '03', label: 'Paridade', items: data.paridade, fallback: 'Sem features em paridade.' },
            ] as const
          ).map((h) => (
            <ol className="hk-impurezas" key={h.label} style={{ marginTop: 24, borderTop: 'none' }}>
              <li>
                <span className="hk-imp-num">{h.num}</span>
                <h3>{h.label}</h3>
                <div>
                  {h.items.length === 0 ? (
                    <p>{h.fallback}</p>
                  ) : (
                    <ul className="hk-imp-bullets">
                      {h.items.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  )}
                </div>
              </li>
            </ol>
          ))}
        </>
      )}
    </section>
  )
}

export default SetimaForma
