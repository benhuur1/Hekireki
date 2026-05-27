import { useEffect, useState } from 'react'
import './PrimeiraForma.css'
import './SetimoEstilo.css'
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
  applauso: number
  comeri: number
  oficial: number
  applauso_eco?: Record<string, number>
}
type Competitivo = {
  totais: { applauso: CompetitivoTotais; comeri: CompetitivoTotais; oficial: CompetitivoTotais }
  matriz: CompetitivoMatriz[]
  vantagens_applauso: string[]
  gaps_applauso: string[]
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
    arquivo: 'wp-content/mu-plugins/applauso-castelo-infinito*.php',
    resumo:
      'O ataque deixou de ser análise — virou correção. Seis mu-plugins WordPress que arrumam o site na mesma marretada: meta description, alt-text, H1 fallback, contatos canônicos, schema.org AutoDealer e bloco dinâmico de loja em página de veículo.',
    bullets: [
      'Parte 1 — meta description + alt-text via output buffer (Elementor não usa wp_get_attachment_image)',
      'Parte 2 — REPLACEMENTS_SAFE corrige 99160-4959 → 99660-4959 + WhatsApps canônicos por loja',
      'Parte 3 — H1 fallback + Schema.org AutoDealer JSON-LD por loja',
      'Parte 4 — bloco "endereço · telefone · horário" injetado em /veiculo/* (hooks Elementor)',
      'Parte 5 — patch_img_alt_in_html() varre HTML e injeta alt derivado de title/figcaption/filename',
      'Parte 6 — admin dashboard em Tools → Castelo do Infinito (per-site + visão rede agregada)',
    ],
    codigo: `lando wp applauso audit-summary --network
lando wp applauso contacts diff
# Tools → Castelo do Infinito (visão rede)`,
  },
  {
    numero: 'V',
    titulo: 'Inspetor de Conformidade',
    arquivo: 'app.py · modo Inspetor',
    resumo:
      'A política mudou: a rede NÃO publica preço. O Inspetor virou guardião da conformidade — extrai catálogo Applauso vs Nissan oficial e expõe vazamentos, cobertura por loja, cores divergentes e spec hero inconsistente.',
    bullets: [
      'Preço vazado contra política — lista cada URL que ainda mostra R$',
      'Cobertura de modelos por loja (Sentra ausente em 1 loja, Kicks Play legado em 3)',
      'Cores publicadas vs oficiais — flagra "Azul Cobaldo" e variações de grafia',
      'Spec hero consistência — motor / potência batem entre lojas?',
      'Tabela applauso_modelos espelha oficial_modelos (mesmas colunas, comparável)',
    ],
    codigo: `python 4b_extract_applauso_models.py    # 28 páginas, ~10 leak detectados
# app.py → Inspetor → "Preço vazado contra política"`,
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
    arquivo: 'app.py · sidebar · applauso_log.py',
    resumo:
      'O sétimo golpe: observabilidade total. Ring buffer compartilhado entre stdout e UI — cada busca RAG, cada chamada do Sonnet, cada linha do pipeline aparece colorida no painel da sidebar. E um botão único toca o pipeline inteiro.',
    bullets: [
      'Logs ao vivo na sidebar com slider 10–200 eventos · DEBUG / INFO / WARNING / ERROR coloridos',
      'Botão "Rodar pipeline completo" — subprocess.Popen com streaming linha-a-linha',
      'Checkboxes "pular RAG" / "pular Comeri" pra escolher peso do golpe',
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
  { titulo: 'Posicionamento competitivo', desc: 'Applauso vs Nissan oficial vs concorrência, com três movimentos.' },
  { titulo: 'Pauta para a direção', desc: 'Reunião de 30min — três dados + duas perguntas + uma recomendação.' },
  { titulo: 'Riscos e bombas-relógio', desc: 'Severidade, mitigação imediata e mitigação definitiva.' },
  { titulo: 'Catálogo Applauso vs oficial', desc: 'Cobertura, preço vazado contra política, cores e spec divergentes.' },
]

const arvore = `rag-nissan/
├── 1c_wp_loader.py             ─ raspa WP (texto pro RAG)
├── 2_index.py                  ─ Chroma (vetores)
├── 2b_sitemap_crawler.py       ─ descobre URLs
├── 2c_comeri_crawler.py        ─ concorrência (Comeri)
├── 2d_applauso_eco_crawler.py  ─ ecossistema Applauso (3 domínios)
├── 3_site_extract.py           ─ links / imgs / forms / contatos / meta
├── 3b_comeri_extract.py        ─ extração Comeri
├── 4_compare_oficial.py        ─ catálogo do fabricante
├── 4b_extract_applauso_models.py ─ catálogo Applauso (versões / cores / preço)
├── 5_audit_telefones.py        ─ relatório de telefones
├── 6_relatorio.py              ─ snapshot datado
├── 7_diff.py                   ─ comparador entre snapshots
├── 8_compare_comeri.py         ─ matriz Applauso × Comeri × oficial
├── 9_playwright_audit.py       ─ Playwright multi-viewport
├── update.sh                   ─ sentinela one-shot
├── app.py                      ─ 5 modos: Atendente · Auditor · Inspetor · Estrategista · Visual UX
├── applauso_log.py             ─ ring buffer logs (stdout + sidebar)
├── db.py                       ─ chat history SQLite
├── db_site.py                  ─ banco estruturado SQLite
├── network.json                ─ config dos 5 sites
└── data/
    ├── chroma/                 ─ vetores
    ├── site.db                 ─ pages + applauso_modelos + oficial_modelos
    ├── chat.db                 ─ histórico conversas
    └── COMPETITIVO.md          ─ matriz Applauso × Comeri × oficial`

const ritual = [
  { titulo: 'Sidebar · Logs do app', detalhe: 'Abre o painel. Cada movimento dali pra frente aparece colorido em tempo real — INFO azul, ERROR vermelho-Nissan.' },
  { titulo: 'Modo Inspetor — preço vazado', detalhe: 'Flagra ~10 URLs que ainda mostram R$ contra a política da rede.' },
  { titulo: 'Modo Inspetor — cobertura', detalhe: 'Confirma que Sentra falta na matriz e Kicks Play é legado em 3 lojas.' },
  { titulo: 'Modo Estrategista — catálogo', detalhe: 'Sonnet cruza applauso_modelos × oficial_modelos e devolve plano executivo.' },
  { titulo: 'Modo Visual UX', detalhe: 'Roda Playwright em 375 / 1024 / 1920 — cada linha do crawler aparece no painel de logs ao vivo.' },
  { titulo: 'WP Admin · Castelo do Infinito', detalhe: 'Abre /wp-admin/tools.php?page=applauso-castelo — visão rede agregada com tudo que o mu-plugin já corrigiu hoje.' },
  { titulo: 'Sidebar · Pipeline completo', detalhe: 'Toca update.sh inteiro, cada linha vira evento de log. Ao final: tempo total e código de saída.' },
]

const presaUnica = [
  { titulo: 'WordPress multisite com mu-plugins diretos', texto: 'Em vez de tema headless + Next.js SSR + plugin marketplace pago. Seis arquivos PHP no mu-plugins/ consertam o que precisava ser consertado, sem deploy ritual.' },
  { titulo: 'update.sh — 9 etapas em sequência num único shell', texto: 'Em vez de Airflow + DAG distribuído + Celery + Redis broker + Flower dashboard. Um ./update.sh e o pipeline inteiro roda do scraping ao snapshot.' },
  { titulo: 'Lndo local em .lndo.site', texto: 'Em vez de ambiente staging full stack + CI/CD multi-stage + Vault + feature flags. O /etc/hosts e o Docker do Lndo dão conta do que um time inteiro de DevOps faria.' },
  { titulo: 'Snapshot file-based + diff semântico', texto: 'Em vez de Snowflake + dbt + Looker + DataDog + alerting cluster. Um arquivo JSON datado no disco, um script Python que compara dois — a regressão fica visível sem precisar de dashboard.' },
  { titulo: 'JSON estático em /public + fetch direto', texto: 'Em vez de API REST + GraphQL + Apollo + Redis cache + CDN edge functions. O dado é estático, o caminho é uma URL, o navegador resolve. A "API" é o sistema de arquivos.' },
]

const respiracoes = [
  { arquivo: 'Zenitsu-concentrado.png', titulo: 'Concentração', legenda: 'Antes do golpe, a quietude. Ouvidos atentos, olhos fechados.' },
  { arquivo: 'Zenitsu-olhos-fecchados.png', titulo: 'A escuta', legenda: 'Quando os olhos não veem, o som guia a lâmina.' },
  { arquivo: 'Zenitsu-primeiro-movimento.jpeg', titulo: 'Primeiro Movimento', legenda: 'O passo único — rápido demais para ser visto.' },
  { arquivo: 'zenitsu-preparado para o golpe.webp', titulo: 'Postura de ataque', legenda: 'Joelhos dobrados, lâmina pronta, raios convergindo.' },
  { arquivo: 'zenitsu-do-trovao.webp', titulo: 'Sob a tempestade', legenda: 'A respiração entra em ressonância com o trovão.' },
  { arquivo: 'zenitsu-7th-form-fanart.webp', titulo: 'Sétimo Estilo (fan art)', legenda: 'A técnica original — só executada uma vez.' },
  { arquivo: 'Zenitsu-lendo-carta.png', titulo: 'A carta de Jigoro', legenda: 'Antes do raio, a memória do mestre.' },
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
    titulo: 'Galeria Respirações do Trovão',
    corpo: (
      <>
        Imagens em <code>public/imagens/samurai/</code> foram colocadas pelo dono do projeto
        como <strong>referência pessoal / educacional</strong>. Direitos pertencem aos
        detentores originais — autor da obra, editora, animação, licenciamento e / ou
        artistas das fan arts. Uso aqui não é comercial, não substitui o material oficial e
        pode ser removido a qualquer pedido.
      </>
    ),
  },
  {
    titulo: 'Código do projeto',
    corpo: (
      <>
        <code>rag-nissan</code> é projeto pessoal de demonstração de RAG aplicado a uma rede
        multisite WordPress. Os dados raspados são da rede <em>Applauso Nissan</em> em
        ambiente <code>.lndo.site</code> (local), não do site público. Catálogo do
        fabricante vem de <code>nissan.com.br</code> com fins de comparação interna.
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
            de ferramentas que floresceu da raiz simples (<em>RAG sobre o site da Nissan</em>) e
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
              <h4>
                {g.titulo}
                <code className="hk-imp-tag">{g.arquivo}</code>
              </h4>
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
              <h4>{p.titulo}</h4>
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
              <h4>{r.titulo}</h4>
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
              <h4>{p.titulo}</h4>
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
          Imagens de referência pessoal — direitos pertencem aos detentores originais da
          obra. Veja a seção <em>Direitos &amp; Inspiração</em> abaixo.
        </p>
        <div className="hk-galeria">
          {respiracoes.map((r, i) => (
            <figure key={r.arquivo} className="hk-galeria-item">
              <div className="hk-galeria-frame">
                <img
                  src={`${import.meta.env.BASE_URL}imagens/samurai/${encodeURI(r.arquivo)}`}
                  alt={r.titulo}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                />
                <span className="hk-galeria-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <figcaption>
                <h4>{r.titulo}</h4>
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
              <h4>{d.titulo}</h4>
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
      <h2 className="hk-h2">Applauso × Comeri × Nissan oficial.</h2>
      <p className="hk-sub">
        Cruzamento direto entre <em>Applauso Nissan</em>, <em>Comeri Nissan</em>{' '}
        (concorrente multisite) e <em>nissan.com.br</em> (catálogo oficial). Dados gerados
        pelo <code>8_compare_comeri.py</code>.
      </p>

      {!data && !erro && (
        <p className="hk-comp-status">
          Aguardando <code>web-scraping-rag/public/competitivo.json</code>. Rode{' '}
          <code>python 8_compare_comeri.py</code> pra gerar.
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
            {(['applauso', 'comeri', 'oficial'] as const).map((k) => {
              const t = data.totais[k]
              return (
                <li key={k} data-pico={k === 'applauso' ? 'true' : 'false'}>
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
                  <th>Applauso</th>
                  <th>Comeri</th>
                  <th>Nissan oficial</th>
                </tr>
              </thead>
              <tbody>
                {data.matriz.map((r) => {
                  const ecoEntries = r.applauso_eco ? Object.entries(r.applauso_eco) : []
                  const ecoTotal = ecoEntries.reduce((s, [, n]) => s + n, 0)
                  return (
                    <tr key={r.feature}>
                      <td>{r.label}</td>
                      <td className={r.applauso > 0 ? 'sim' : 'nao'}>
                        {r.applauso > 0 ? (
                          <>
                            ✓ {r.applauso}
                            {ecoTotal > 0 && (
                              <span
                                className="eco-suffix"
                                title={ecoEntries.map(([k, n]) => `${k.replace('applauso_', '')}: ${n}`).join(' · ')}
                              >
                                {' '}+{ecoTotal} eco
                              </span>
                            )}
                          </>
                        ) : '—'}
                      </td>
                      <td className={r.comeri > 0 ? 'sim' : 'nao'}>
                        {r.comeri > 0 ? `✓ ${r.comeri}` : '—'}
                      </td>
                      <td className={r.oficial > 0 ? 'sim' : 'nao'}>
                        {r.oficial > 0 ? `✓ ${r.oficial}` : '—'}
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
              { num: '01', label: 'Vantagens da Applauso', items: data.vantagens_applauso, fallback: 'Nenhuma vantagem exclusiva detectada nesta rodada.' },
              { num: '02', label: 'Gaps a fechar (Comeri tem)', items: data.gaps_applauso, fallback: 'Applauso cobre tudo que a Comeri cobre.' },
              { num: '03', label: 'Paridade', items: data.paridade, fallback: 'Sem features em paridade.' },
            ] as const
          ).map((h) => (
            <ol className="hk-impurezas" key={h.label} style={{ marginTop: 24, borderTop: 'none' }}>
              <li>
                <span className="hk-imp-num">{h.num}</span>
                <h4>{h.label}</h4>
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
