import './PrimeiraForma.css'
import { Scar, SectionLabel, SignatureMark } from './marks'

type Item = { titulo: string; texto: string }

const monstros: Item[] = [
  {
    titulo: 'Kubernetes para um blog pessoal',
    texto:
      'Cluster de três nodes, ingress controller, service mesh Istio, Helm charts, ArgoCD pra GitOps, Prometheus + Grafana, Velero pra backup. Custo: R$ 800/mês. Visitas: a sua mãe e um bot russo confuso.',
  },
  {
    titulo: 'Quarenta e sete microsserviços para um TODO',
    texto:
      'auth-service · user-service · notification-service · todo-service · todo-search-service · todo-analytics-service · audit-service · BFF pra costurar tudo. Três sprints pra adicionar o campo "prioridade".',
  },
  {
    titulo: 'SAP — quatorze meses para mudar a cor de um botão',
    texto:
      'Seis consultorias contratadas, comitê de governança, workshop em Düsseldorf, treinamento de 80h pros usuários finais. O TCO de 5 anos compra um prédio em Brooklin.',
  },
  {
    titulo: 'Webpack mais quatro mil dependências para um Hello World',
    texto:
      'npx create-react-app baixa 1.487 pacotes, 387MB, antes da primeira linha de código. Existe um pacote chamado is-odd. Ele importa is-number. Três pacotes pra uma operação de módulo.',
  },
  {
    titulo: 'Jira — quatorze status num único workflow',
    texto:
      'To Do → Refinement → Ready for Dev → Blocked → In Dev → Code Review → QA → Blocked Again → Staging → UAT → Approved → Ready for Release → Deployed → Done. E ainda existe o status "Done Done", porque "Done" não era confiável.',
  },
  {
    titulo: 'Hadoop para um CSV de cinco megabytes',
    texto:
      'Cluster de seis máquinas, particionamento, MapReduce, YARN, HDFS, Hive metastore. Pra processar uma planilha que o LibreOffice abre instantaneamente no notebook do estagiário.',
  },
  {
    titulo: 'Emacs querendo gerenciar sua vida amorosa',
    texto:
      'Você instala pra editar um .conf. Sai catorze anos depois com cliente de email, leitor de RSS, IRC, navegador, jogo de aventura, terapeuta (M-x doctor — sério, existe) e Tetris. É overengineering elevado a religião.',
  },
]

const leis: Item[] = [
  {
    titulo: 'Resolve o problema que você tem, ou inventa cinco novos?',
    texto:
      'A pergunta-mãe. Toda ferramenta que pede pra você "crescer junto" inventa problemas pra justificar o tamanho. Boa ferramenta resolve UM problema e some.',
  },
  {
    titulo: 'Estocada precisa, ou armadura inteira pra matar uma mosca?',
    texto:
      'Antes de subir Kubernetes, abra um terminal e calcule quantos servidores você realmente precisa. Geralmente o número é um.',
  },
  {
    titulo: 'A Netflix tem o seu problema?',
    texto:
      'Não copie a arquitetura da Netflix se você não tem milhões de usuários simultâneos em três continentes. A Netflix usa Netflix porque é Netflix. Você não é.',
  },
  {
    titulo: 'Você consegue manter isso sozinho, às três da manhã, quando der pau?',
    texto:
      'Se a resposta é não, a pilha é grande demais. Stack honesta é a que cabe na cabeça de uma pessoa.',
  },
]

const estocadas: Item[] = [
  {
    titulo: 'Frontend',
    texto:
      'HTMX (interatividade só com atributos HTML), Alpine.js (jQuery moderno em 15kb), Svelte (compila pra zero runtime), Solid (signals nativos). Em vez de Angular ou Next.js inteiros pra renderizar um botão.',
  },
  {
    titulo: 'Backend',
    texto:
      'Express, Fastify, Hono (roda em qualquer runtime), Flask, Sinatra, Echo, Fiber. Um módulo focado e você adiciona o que precisar. Em vez de Spring Boot ou NestJS com decorators pra tudo.',
  },
  {
    titulo: 'CSS / UI',
    texto:
      'Pico.css, Water.css ou Tailwind. Em vez de Material UI com 300kb de runtime React pra você usar três botões.',
  },
  {
    titulo: 'Build tools',
    texto:
      'Vite, esbuild (Go, ridiculamente rápido), Bun (runtime + bundler num binário). Em vez de Webpack com doze loaders, oito plugins e um config que vira propriedade ancestral do time.',
  },
  {
    titulo: 'Estado (frontend)',
    texto:
      'Zustand (8kb, um hook), Jotai (átomos), signals nativos. Em vez de Redux + Saga + Thunk + Reselect + Persist + Toolkit, quatro arquivos pra mudar uma checkbox.',
  },
  {
    titulo: 'Banco e ORM',
    texto:
      'SQLite (um arquivo, sem servidor — Discord usa em escala). Postgres com Drizzle (queries que parecem SQL, com tipagem). Em vez de Hibernate com lazy loading e proxies dinâmicos.',
  },
  {
    titulo: 'CMS',
    texto:
      'Hugo (binário Go que gera o site em 0.3s), Astro, Eleventy, Kirby. Em vez de WordPress com 47 plugins instalados (12 desativados que ninguém ousa apagar).',
  },
  {
    titulo: 'Infraestrutura',
    texto:
      'Caddy (1 binário, HTTPS automático), Fly.io ou Railway (git push e tá no ar), VPS com systemd + Nginx. Em vez de EKS + ArgoCD + Istio + Prometheus + Vault pra hospedar uma landing page.',
  },
]

const caminhos: Item[] = [
  {
    titulo: 'CLT bem feito — a forma mais subestimada',
    texto:
      'Sênior em empresa boa: R$ 15-30k/mês. PJ em multinacional gringa: R$ 25-60k/mês. A maioria dos devs "que vive do que ama" no Twitter ganha menos que um pleno do Itaú. Trocar de empresa a cada dois anos é onde sai aumento de verdade.',
  },
  {
    titulo: 'Contracting PJ em multinacional gringa',
    texto:
      'Freela com estabilidade. Você é PJ mas dedica 40h pra UMA empresa de fora — Toptal, Turing, Lemon, Andela ou contratação direta no LinkedIn. Hoje é a melhor relação esforço-retorno pra quem tem 4+ anos de experiência.',
  },
  {
    titulo: 'Freelance especializado em UM nicho',
    texto:
      'Migração de WordPress, integração com Bling/Tiny, automação Shopify, e-commerce Magento. Generalista é massacrado pelo preço. Especialista cobra o que vale — e tem cliente esperando na fila.',
  },
  {
    titulo: 'Produto próprio em nicho B2B',
    texto:
      'A loteria dos sonhos. Construir o produto é 10% do trabalho. Os outros 90% são distribuição, marketing, sales, suporte. Valide com 10 clientes pagantes antes de codar muito. Prepare o emocional pra dois anos sem retorno.',
  },
  {
    titulo: 'Plugin ou extensão paga em marketplace ativo',
    texto:
      'Shopify Apps, WordPress plugins, VSCode extensions, templates Themeforest, plugins Figma. Renda passiva real existe aqui — tem dev brasileiro ganhando R$ 30-200k/mês com um único app na Shopify App Store.',
  },
]

function OCorte() {
  return (
    <main className="hk">
      <Scar />

      {/* HERO */}
      <header className="hk-hero">
        <span className="hk-kanji-art" aria-hidden>斬</span>

        <div className="hk-hero-meta">
          <span className="hk-eyebrow">道 — A APLICAÇÃO — DESTILADO</span>
          <h1 className="hk-title">
            <span className="hk-title-kanji">斬</span>
            <span className="hk-title-rom">O Corte</span>
            <span className="hk-title-trans">Primeira Forma aplicada ao software</span>
          </h1>
          <p className="hk-lead">
            Tudo que o Zenitsu nos ensinou sobre escolher framework, infraestrutura e
            carreira — destilado num único princípio. Cada escolha pode ser feita pela
            mesma pergunta: <em>uma estocada única, ou uma armadura inteira pra matar
            uma mosca?</em>
          </p>
          <p className="hk-quote">
            Uma técnica simples, executada com perfeição, vence mil técnicas mal usadas.
          </p>
        </div>

        <aside className="hk-vertical" aria-hidden>
          <span>道</span>
          <span className="hk-vertical-dot">·</span>
          <span>O CORTE</span>
        </aside>
      </header>

      {/* MONSTROS */}
      <section className="hk-section">
        <SectionLabel num="02" tag="Os monstros" />
        <h2 className="hk-h2">O que vence quando ninguém escolhe.</h2>
        <p className="hk-sub">
          Catálogo de extravagância arquitetural. Cada item começou como um problema
          pequeno que alguém resolveu com violência desnecessária — e virou padrão.
        </p>
        <ol className="hk-impurezas">
          {monstros.map((m, i) => (
            <li key={m.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{m.titulo}</h3>
              <p>{m.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* LEI */}
      <section className="hk-section">
        <SectionLabel num="03" tag="A lei" />
        <h2 className="hk-h2">Uma única pergunta separa tudo.</h2>
        <p className="hk-sub">
          Antes de adicionar a próxima camada, o próximo serviço, o próximo framework —
          pare. Pergunte. Se a resposta de qualquer uma das quatro abaixo for desconfortável,
          é monstro nascendo.
        </p>
        <ol className="hk-impurezas">
          {leis.map((l, i) => (
            <li key={l.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{l.titulo}</h3>
              <p>{l.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ESTOCADAS */}
      <section className="hk-section">
        <SectionLabel num="04" tag="As estocadas" />
        <h2 className="hk-h2">Ferramentas que dominam a Primeira Forma.</h2>
        <p className="hk-sub">
          Categoria por categoria, as opções que fazem uma coisa e fazem bem. Não te
          exigem virar especialista pra render. Não inventam problema novo a cada
          atualização.
        </p>
        <ol className="hk-impurezas">
          {estocadas.map((e, i) => (
            <li key={e.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CAMINHOS */}
      <section className="hk-section">
        <SectionLabel num="05" tag="Os caminhos" />
        <h2 className="hk-h2">A Primeira Forma também serve pra carreira.</h2>
        <p className="hk-sub">
          Cinco rotas honestas pra ganhar dinheiro programando. Escolha uma. Viva dela
          por dois anos sem flertar com as outras. Aí avalie.
        </p>
        <ol className="hk-impurezas">
          {caminhos.map((c, i) => (
            <li key={c.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.titulo}</h3>
              <p>{c.texto}</p>
            </li>
          ))}
        </ol>
        <blockquote className="hk-citacao">
          <span aria-hidden>— regra do trovão</span>
          Estocada única. Foco absoluto. Sem firula.
        </blockquote>
      </section>

      <footer className="hk-foot">
        <SignatureMark />
        <div className="hk-foot-row">
          <span>道</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>O Corte</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>Primeira Forma aplicada</span>
        </div>
      </footer>
    </main>
  )
}

export default OCorte
