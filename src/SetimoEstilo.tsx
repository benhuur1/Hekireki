import './PrimeiraForma.css'
import './SetimoEstilo.css'
import { Scar, SectionLabel, SignatureMark } from './marks'

/* =================== DATA =================== */

type Camada = { titulo: string; resumo: string }

const camadas: Camada[] = [
  {
    titulo: 'Crawl',
    resumo: 'Sitemaps e páginas percorridos site a site — toda URL conhecida entra no funil.',
  },
  {
    titulo: 'Extração',
    resumo: 'Cada página vira dado estruturado: links, imagens, formulários, contatos, meta.',
  },
  {
    titulo: 'Snapshot',
    resumo: 'O estado do site num arquivo datado — o ponto fixo que torna qualquer comparação possível.',
  },
  {
    titulo: 'Diff',
    resumo: 'Dois snapshots comparados; o que melhorou, piorou ou apareceu vira delta visível.',
  },
  {
    titulo: 'Auditoria visual',
    resumo: 'Browser headless percorre as telas e grava a evidência — regressão visual deixa rastro.',
  },
  {
    titulo: 'Logs',
    resumo: 'Cada passo do pipeline aparece ao vivo — observabilidade sem ferramenta externa.',
  },
]

const perguntas = [
  { titulo: 'Plano de ação 30 dias', desc: 'Quatro sprints × entregas × responsável × KPI.' },
  { titulo: 'Análise SWOT', desc: 'Forças, fraquezas, oportunidades e ameaças com dados do site real.' },
  { titulo: 'ROI das correções', desc: 'Correções priorizadas com esforço, ganho esperado e payback.' },
  { titulo: 'Pauta para a direção', desc: 'Reunião de 30min — três dados + duas perguntas + uma recomendação.' },
  { titulo: 'Riscos e bombas-relógio', desc: 'Severidade, mitigação imediata e mitigação definitiva.' },
]

const presaUnica = [
  { titulo: 'WordPress multisite com mu-plugins diretos', texto: 'Em vez de tema headless + Next.js SSR + plugin marketplace pago. Arquivos PHP no mu-plugins/ consertam o que precisava ser consertado, sem deploy ritual.' },
  { titulo: 'Pipeline em sequência num único shell', texto: 'Em vez de Airflow + DAG distribuído + Celery + Redis broker + Flower dashboard. Um único script e o pipeline inteiro roda do crawl ao snapshot.' },
  { titulo: 'Lando local em domínio próprio', texto: 'Em vez de ambiente de homologação full stack + CI/CD multi-stage + Vault + feature flags. O /etc/hosts e o Docker do Lando dão conta do que um time inteiro de DevOps faria.' },
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
    corpo: (
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
        Projeto pessoal de demonstração — RAG e auditoria aplicados a um multisite
        WordPress de varejo. Nenhum dado de terceiros é publicado nesta página.
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
            da repetição infinita da Primeira. Aqui é a mesma coisa em código: um pipeline
            de auditoria para um multisite WordPress de varejo, que floresceu da raiz
            simples (<em>RAG sobre um site</em>) e se tornou um sistema que se monitora,
            se corrige e se explica sozinho.
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

      {/* CAMADAS */}
      <section className="hk-section">
        <SectionLabel num="02" tag="As camadas" />
        <h2 className="hk-h2">Seis camadas, uma só técnica.</h2>
        <p className="hk-sub">
          Cada camada faz uma coisa. Juntas formam o Sétimo Estilo do código —
          um sistema que se monitora, se corrige e se explica sozinho.
        </p>
        <ol className="hk-impurezas">
          {camadas.map((c, i) => (
            <li key={c.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.titulo}</h3>
              <p>{c.resumo}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* PERGUNTAS */}
      <section className="hk-section">
        <SectionLabel num="03" tag="Modo Estrategista" />
        <h2 className="hk-h2">Cinco perguntas executivas.</h2>
        <p className="hk-sub">
          O chat conversa. O Estrategista responde — sempre com os dados do pipeline
          cruzados num único prompt.
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

      {/* PRESA ÚNICA */}
      <section className="hk-section">
        <SectionLabel num="04" tag="A presa única" />
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
        <SectionLabel num="05" tag="Respirações" />
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
        <SectionLabel num="06" tag="Direitos" />
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
        <a href="/cronica/" className="hk-cronica-entrada">
          ver a trajetória até aqui
        </a>
      </footer>
    </main>
  )
}

export default SetimaForma
