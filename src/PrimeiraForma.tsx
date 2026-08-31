import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import './PrimeiraForma.css'
import { Scar, SectionLabel, SignatureMark } from './marks'

/**
 * O contador de marteladas vive no localStorage, não no React — é estado
 * externo, e ler estado externo durante o render é exatamente o que
 * useSyncExternalStore existe para resolver.
 *
 * Importa aqui por causa do prerender: o HTML estático não pode conhecer o
 * contador de ninguém, então o snapshot do servidor é sempre 0 e o valor
 * salvo entra na hidratação, sem descompasso.
 */
const STORAGE_KEY = 'pf-marteladas'
const ouvintes = new Set<() => void>()

function readMarteladas(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const n = raw ? parseInt(raw, 10) : 0
    return Number.isFinite(n) && n >= 0 ? n : 0
  } catch {
    return 0
  }
}

function gravaMarteladas(n: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(n))
  } catch {
    /* localStorage indisponível — segue sem persistir */
  }
  ouvintes.forEach((cb) => cb())
}

function assinaMarteladas(cb: () => void) {
  ouvintes.add(cb)
  // 'storage' cobre a mesma página aberta em outra aba.
  window.addEventListener('storage', cb)
  return () => {
    ouvintes.delete(cb)
    window.removeEventListener('storage', cb)
  }
}

const snapshotServidor = () => 0

const SUSSURROS: Record<number, string> = {
  7: 'sete cortes — Hachiren se aproxima',
  49: 'sete por sete — a forma começa a ceder',
  100: 'cem batidas — a impureza está saindo',
  777: 'a sétima forma não é mais segredo',
}

type Tempo = { num: string; kanji: string; titulo: string; texto: string }
type Multi = { numero: string; nome: string; kanji: string; cortes: number; descricao: string }
type Impureza = { titulo: string; texto: string }

const tempos: Tempo[] = [
  {
    num: 'I',
    kanji: '壱',
    titulo: 'Concentração',
    texto: 'Postura baixa. Joelhos flexionados. O corpo carrega para o passo.',
  },
  {
    num: 'II',
    kanji: '弐',
    titulo: 'Aceleração',
    texto: 'Um único passo. O deslocamento acontece antes da consciência registrar.',
  },
  {
    num: 'III',
    kanji: '参',
    titulo: 'Corte',
    texto: 'A katana é desembainhada e devolvida no mesmo movimento. O alvo cai sem perceber.',
  },
]

const multis: Multi[] = [
  {
    numero: '01',
    nome: 'Hekireki Issen',
    kanji: '霹靂一閃',
    cortes: 1,
    descricao: 'A forma base. Um único corte, executado na velocidade do trovão.',
  },
  {
    numero: '06',
    nome: 'Rokuren',
    kanji: '六連',
    cortes: 6,
    descricao: 'Seis cortes consecutivos. Mesmo golpe, repetido sem perder pureza.',
  },
  {
    numero: '08',
    nome: 'Hachiren',
    kanji: '八連',
    cortes: 8,
    descricao: 'O ápice. Oito cortes que duram uma fração de segundo.',
  },
]

const impurezas: Impureza[] = [
  {
    titulo: 'Variedade desnecessária',
    texto:
      'Tentar dominar tudo dilui o foco. O ferreiro descarta o ferro impuro antes de moldar a lâmina.',
  },
  {
    titulo: 'Movimentos extras',
    texto:
      'Cada gesto que não corta é peso. A Primeira Forma só tem o que precisa — passo, postura, corte.',
  },
  {
    titulo: 'Hesitação',
    texto:
      'O medo permanece. Zenitsu nunca deixou de tremer. O golpe sai mesmo assim. Essa é a pureza.',
  },
  {
    titulo: 'Vaidade técnica',
    texto:
      'Não importa quantas formas você conhece. Importa quantas vezes você bateu o martelo na mesma.',
  },
]

function PrimeiraForma() {
  const marteladas = useSyncExternalStore(
    assinaMarteladas,
    readMarteladas,
    snapshotServidor,
  )
  const [sussurro, setSussurro] = useState<string | null>(null)
  const sussurroTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const anvilRef = useRef<HTMLButtonElement | null>(null)

  function bata() {
    const next = readMarteladas() + 1
    gravaMarteladas(next)
    /* sussurro nos marcos — disparado pela ação do usuário, nunca na carga */
    const msg = SUSSURROS[next]
    if (msg) {
      setSussurro(msg)
      if (sussurroTimeoutRef.current) clearTimeout(sussurroTimeoutRef.current)
      sussurroTimeoutRef.current = setTimeout(() => setSussurro(null), 4000)
    }
  }

  /* SPACE em qualquer lugar = bata o martelo (pula campos editáveis e botões).
     bataRef guarda a última versão de bata pra o listener (deps []) não
     capturar uma closure obsoleta de marteladas. */
  const bataRef = useRef(bata)
  useEffect(() => {
    bataRef.current = bata
  })

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code !== 'Space') return
      const target = e.target as HTMLElement | null
      if (target?.matches('button, input, textarea, select, [contenteditable="true"]')) return
      // Auto-repeat de Space segurado remontava o SVG do scar a cada
      // repetição e inflava o contador.
      if (e.repeat) return
      /* O atalho só vale enquanto a bigorna está na tela. Fora daí, Space
         é o page-down do usuário — sequestrá-lo durante a leitura das
         seções quebrava a navegação por teclado da página inteira. */
      const caixa = anvilRef.current?.getBoundingClientRect()
      if (!caixa || caixa.bottom < 0 || caixa.top > window.innerHeight) return
      e.preventDefault()
      bataRef.current()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    return () => {
      if (sussurroTimeoutRef.current) clearTimeout(sussurroTimeoutRef.current)
    }
  }, [])

  return (
    <main className="hk">
      {/* a key força o remount do SVG a cada martelada → animação re-dispara */}
      <Scar key={marteladas} />

      {/* HERO */}
      <header className="hk-hero">
        <span className="hk-kanji-art" aria-hidden>壱</span>

        <div className="hk-hero-meta">
          <span className="hk-eyebrow">壱ノ型 — Ichi no Kata — 001</span>
          <h1 className="hk-title">
            <span className="hk-title-kanji">霹 靂 一 閃</span>
            <span className="hk-title-rom">Hekireki Issen</span>
            <span className="hk-title-trans">Primeira Forma · Trovão e Relâmpago</span>
          </h1>
          <p className="hk-lead">
            Zenitsu Agatsuma só conseguiu aprender <em>uma</em> das seis formas da Respiração
            do Trovão. Nunca dominou as outras. Treinou essa única até virar a forma mais
            perfeita de toda a respiração — tão pura que dela nasceu a Sétima.
          </p>
          <p className="hk-quote">
            Tudo bem se for só uma. Se for só uma, faça dela a sua.
          </p>

          <button
            ref={anvilRef}
            type="button"
            className="hk-anvil"
            onClick={bata}
            aria-label={`Bata o martelo. ${marteladas} marteladas até agora. Atalho: barra de espaço.`}
          >
            <SignatureMark />
            <span className="hk-anvil-text">
              <span className="hk-anvil-label">bata o martelo</span>
              <strong className="hk-anvil-count" aria-live="polite">
                {String(marteladas).padStart(4, '0')}
              </strong>
            </span>
            <kbd className="hk-anvil-key" aria-hidden>space</kbd>
          </button>
        </div>

        <aside className="hk-vertical" aria-hidden>
          <span>壱ノ型</span>
          <span className="hk-vertical-dot">·</span>
          <span>HEKIREKI ISSEN</span>
        </aside>
      </header>

      {/* ANATOMIA */}
      <section className="hk-section hk-anatomia">
        <SectionLabel num="02" tag="A técnica" />
        <h2 className="hk-h2">Três tempos. Nada além.</h2>
        <p className="hk-sub">
          O suficiente para atravessar a distância antes do som do trovão chegar.
        </p>
        <ol className="hk-tempos">
          {tempos.map((t) => (
            <li key={t.num}>
              <span className="hk-tempo-num">{t.num}</span>
              <h3>
                <span className="hk-tempo-kanji" aria-hidden>{t.kanji}</span>
                {t.titulo}
              </h3>
              <p>{t.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* MULTIPLICAÇÃO */}
      <section className="hk-section hk-multi">
        <SectionLabel num="03" tag="A multiplicação" />
        <h2 className="hk-h2">O mesmo corte, outra vez.</h2>
        <p className="hk-sub">
          A Primeira Forma não muda. É repetida — uma, seis, oito vezes — em sequência tão
          rápida que parece um único movimento.
        </p>
        <ol className="hk-multi-list">
          {multis.map((m, idx) => (
            <li
              key={m.numero}
              data-pico={idx === multis.length - 1 ? 'true' : 'false'}
            >
              <span className="hk-multi-numero">{m.numero}</span>
              <h3>
                <span className="hk-multi-kanji">{m.kanji}</span>
                {m.nome}
              </h3>
              <div className="hk-multi-body">
                <p>{m.descricao}</p>
                <Cortes n={m.cortes} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FORJA */}
      <section className="hk-section hk-forja">
        <SectionLabel num="04" tag="A filosofia" />
        <h2 className="hk-h2">Forjar a lâmina.</h2>
        <p className="hk-epigrafe">
          O ferreiro não bate o martelo para adicionar metal.
          <br />
          Bate para tirar.
        </p>
        <ol className="hk-impurezas">
          {impurezas.map((imp, i) => (
            <li key={imp.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{imp.titulo}</h3>
              <p>{imp.texto}</p>
            </li>
          ))}
        </ol>
        <blockquote className="hk-citacao">
          <span aria-hidden>— epígrafe</span>
          Quanto mais pura a lâmina for, mais dura ela será.
        </blockquote>
      </section>

      {/* RITUAL */}
      <section className="hk-section hk-ritual">
        <SectionLabel num="05" tag="A execução" />
        <h2 className="hk-h2">Para executar a Primeira Forma.</h2>
        <pre className="hk-codigo">
          <code>{`# escolha uma única coisa
foco = "Primeira Forma"

# remova tudo o que não serve a ela
while existem_impurezas(foco):
    martelar(foco)
    descartar(impurezas)

# repita até virar reflexo
for _ in range(infinito):
    executar(foco)
    # cada repetição é mais pura que a anterior

# então — e só então — uma sétima forma surgirá
sozinha`}</code>
        </pre>
      </section>

      <footer className="hk-foot">
        <SignatureMark />
        <div className="hk-foot-row">
          <span>壱ノ型</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>uma única lâmina</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>
            marteladas <strong className="hk-foot-num">{String(marteladas).padStart(4, '0')}</strong>
          </span>
        </div>
      </footer>

      {sussurro && (
        <div className="hk-sussurro" role="status" key={sussurro + marteladas}>
          {sussurro}
        </div>
      )}
    </main>
  )
}

function Cortes({ n }: { n: number }) {
  const w = n * 16 + 4
  return (
    <div className="hk-cortes" aria-hidden>
      <svg viewBox={`0 0 ${w} 60`} preserveAspectRatio="xMinYMid meet">
        {Array.from({ length: n }).map((_, i) => {
          const x = i * 16 + 6
          const y1 = 4 + ((i * 7) % 9)
          const y2 = 56 - ((i * 11) % 8)
          return (
            <line
              key={i}
              x1={x}
              y1={y1}
              x2={x + 4}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="hk-corte"
              style={{ animationDelay: `${i * 90 + 800}ms` }}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default PrimeiraForma
