import './PrimeiraForma.css'
import './SetimoEstilo.css'
import { Scar, SectionLabel, SignatureMark } from './marks'

/* =================== DATA =================== */

type Golpe = {
  numero: string
  titulo: string
  resumo: string
}

const golpes: Golpe[] = [
  {
    numero: 'I',
    titulo: 'Dentro da janela',
    resumo:
      '`createdAt` 23h atrás → retorna `true`. Confirma que a comparação `Date.now() - start < windowMs` aceita o limite inferior.',
  },
  {
    numero: 'II',
    titulo: 'Fora da janela',
    resumo:
      '`createdAt` 25h atrás → retorna `false`. Confirma que a janela é fechada exatamente em 24h.',
  },
  {
    numero: 'III',
    titulo: 'paidAt vence createdAt',
    resumo:
      '`paidAt` 5h atrás + `createdAt` 26h atrás → retorna `true`. Confirma a precedência do timestamp de pagamento confirmado quando ele existe.',
  },
  {
    numero: 'IV',
    titulo: 'Ambos ausentes',
    resumo:
      '`{}` → retorna `false`. Cobre o early return quando nenhum timestamp chega no payload.',
  },
  {
    numero: 'V',
    titulo: 'Order null ou undefined',
    resumo:
      '`algumaFuncao(null)` e `algumaFuncao(undefined)` → `false`. Encerra a árvore — sem inputs, sem janela.',
  },
]

const arvore = `# Sétima Forma — Trovão do Núcleo

repo-cliente/
├── src/utils/
│   ├── janela.ts        # algumaFuncao + JANELA_HORAS
│   └── janela.test.ts   # 5 unit tests (node:test)
├── tsconfig.json        # allowImportingTsExtensions: true
└── package.json
    └── "test": "node --test --experimental-strip-types 'src/**/*.test.ts'"

# Zero dependências novas. Zero lock file alterado. Runner: o próprio Node.`

/* =================== PAGE =================== */

function KakuRaiNoKami() {
  return (
    <main className="hk">
      <Scar />

      {/* HERO */}
      <header className="hk-hero">
        <span className="hk-kanji-art" aria-hidden>核</span>

        <div className="hk-hero-meta">
          <span className="hk-eyebrow">漆ノ型 — KAKU RAI NO KAMI — ORIGINAL</span>
          <h1 className="hk-title">
            <span className="hk-title-kanji">核 雷 神</span>
            <span className="hk-title-rom">Kaku Rai no Kami</span>
            <span className="hk-title-trans">Sétima Forma · Deus do Trovão do Núcleo</span>
          </h1>
          <p className="hk-lead">
            A Segunda Sétima Forma — nasceu não da repetição da Primeira, mas do
            limite imposto por um adversário automatizado. Pediu cobertura numa
            função pura de oito linhas. Pediu armadura inteira pra matar uma
            mosca. A resposta veio de dentro do próprio runtime: o núcleo do
            Node já tinha o que era preciso. Não foi necessário forjar nova
            armadura — bastou estender a mão pra dentro.
          </p>
          <p className="hk-quote">
            A forma que vence sem importar nada já estava dentro.
          </p>
        </div>

        <aside className="hk-vertical" aria-hidden>
          <span>漆ノ型</span>
          <span className="hk-vertical-dot">·</span>
          <span>KAKU RAI</span>
        </aside>
      </header>

      {/* O CONTRATO */}
      <section className="hk-section">
        <SectionLabel num="01" tag="O contrato do gate" />
        <h2 className="hk-h2">Cinco casos, uma função pura.</h2>
        <p className="hk-sub">
          O revisor automatizado pediu cobertura para <code>algumaFuncao</code>:
          dentro da janela, fora da janela, <code>paidAt</code> presente,
          <code> createdAt</code> ausente, <code>order</code> null. Função pura,
          oito linhas executáveis, quatro branches lineares com <em>early return</em>.
          O pedido era razoável em abstrato; o problema estava em como atendê-lo
          sem violar a política do repositório.
        </p>
      </section>

      {/* A POLÍTICA */}
      <section className="hk-section">
        <SectionLabel num="02" tag="A política do repo" />
        <h2 className="hk-h2">O repositório fechou a porta — de propósito.</h2>
        <p className="hk-sub">
          O <code>CLAUDE.md</code> do <em>repo cliente</em> declara
          textualmente: <em>"No test framework configured. Verification after
          changes: <code>npm run lint</code> + <code>npm run build</code>"</em>.
          Não é omissão. É decisão arquitetural deliberada. Adicionar Jest ou
          Vitest pra cobrir uma função isolada significava forjar uma armadura
          completa — runner, lock file, integração CI, decisão de ambiente,
          padrão de pasta — pra matar uma mosca de oito linhas. Armadura
          inteira pra mosca. A Primeira Forma proíbe.
        </p>
      </section>

      {/* O MOVIMENTO */}
      <section className="hk-section">
        <SectionLabel num="03" tag="O movimento autoral" />
        <h2 className="hk-h2">A força veio do núcleo, não da forja.</h2>
        <p className="hk-sub">
          O runtime do Node já oferecia, em sua engine 24, um <em>test runner
          nativo</em> (<code>node:test</code>) e <em>type stripping</em>
          experimental para TypeScript (<code>--experimental-strip-types</code>).
          Nada novo precisava ser instalado. O caminho foi:
        </p>
        <ul className="hk-imp-bullets">
          <li>Mover <code>algumaFuncao</code> + <code>JANELA_HORAS</code> para
          módulo próprio <code>janela.ts</code>, isolando-os de qualquer dependência
          de <em>path alias</em> que o runner nativo não resolveria.</li>
          <li>Adicionar <code>allowImportingTsExtensions: true</code> no <code>tsconfig.json</code> —
          permite o import com extensão <code>.ts</code> exigido pelo strip-types.</li>
          <li>Criar <code>janela.test.ts</code> usando <code>describe</code>,
          <code> it</code>, <code>mock.timers</code> e <code>assert</code> — todos
          importados de <code>node:test</code> e <code>node:assert/strict</code>.</li>
          <li>Adicionar o script <code>npm run test</code>: <code>node --test
          --experimental-strip-types 'src/**/*.test.ts'</code>.</li>
        </ul>
        <p className="hk-sub">
          Resultado: cobertura entregue. Zero dependência nova. Zero lock file
          alterado. <code>CLAUDE.md</code> permanece literalmente válido — não
          há framework instalado.
        </p>
      </section>

      {/* OS CINCO GOLPES */}
      <section className="hk-section">
        <SectionLabel num="04" tag="Os cinco golpes" />
        <h2 className="hk-h2">Cinco testes, cinco verdes.</h2>
        <p className="hk-sub">
          Cada golpe cobre uma das ramificações da função. Juntos esgotam o
          espaço de estados — não há branch combinatório, race ou caminho
          indireto que escape da leitura sequencial.
        </p>
        <ol className="hk-impurezas">
          {golpes.map((g, i) => (
            <li key={g.numero}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h4>{g.titulo}</h4>
              <div>
                <p>{g.resumo}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ESTRUTURA */}
      <section className="hk-section">
        <SectionLabel num="05" tag="Estrutura" />
        <h2 className="hk-h2">O mapa do golpe.</h2>
        <p className="hk-sub">
          Tudo cabe em quatro arquivos. A força é a ausência: nenhuma pasta
          nova de testes, nenhum binário novo no <code>node_modules</code>.
        </p>
        <pre className="hk-codigo"><code>{arvore}</code></pre>
      </section>

      {/* PRINCÍPIO */}
      <section className="hk-section">
        <SectionLabel num="06" tag="Princípio" />
        <h2 className="hk-h2">A Sétima é a Primeira levada ao limite.</h2>
        <p className="hk-sub">
          Zenitsu não aprendeu as seis formas que não conseguiu dominar. Poliu
          a Primeira até criar a Sétima. Aqui o paralelo é literal: a Primeira
          Forma já havia produzido o argumento técnico denso contra adicionar
          framework. Quando o adversário insistiu — pattern match em loop fechado —
          a saída não foi cair pra outra técnica. Foi aprofundar a mesma. O
          mesmo princípio que recusa armadura desnecessária revelou o caminho
          autoral: usar o que <em>já estava dentro</em> do runtime.
        </p>
        <p className="hk-quote">
          Não vence quem domina mais formas. Vence quem leva uma só ao núcleo.
        </p>
      </section>

      {/* INSPIRAÇÃO */}
      <section className="hk-section">
        <SectionLabel num="07" tag="Inspiração" />
        <h2 className="hk-h2">O movimento que ninguém viu.</h2>
        <p className="hk-sub">
          Zenitsu desfere a Sétima Forma diante de Kaigaku — o outro discípulo,
          que dominou as seis e perdeu a primeira. Os espectadores não veem o
          golpe: percebem só o silêncio depois. É o mesmo que aconteceu aqui —
          o bot pediu armadura, recebeu silêncio técnico, registrou
          <code> APPROVED</code> sem entender por onde passou.
        </p>
      </section>

      <SignatureMark />
    </main>
  )
}

export default KakuRaiNoKami
