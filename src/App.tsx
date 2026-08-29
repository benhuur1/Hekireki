import { lazy, Suspense, useEffect, useState } from 'react'
import PrimeiraForma from './PrimeiraForma'
import './App.css'

const OCorte = lazy(() => import('./OCorte'))
const OEspelho = lazy(() => import('./OEspelho'))
const OLexico = lazy(() => import('./OLexico'))
const OPortao = lazy(() => import('./OPortao'))
const TanRen = lazy(() => import('./TanRen'))
const ACronica = lazy(() => import('./ACronica'))
const SetimoEstilo = lazy(() => import('./SetimoEstilo'))
const KakuRaiNoKami = lazy(() => import('./KakuRaiNoKami'))
const AsQuatroLentes = lazy(() => import('./AsQuatroLentes'))

const VIEWS = [
  'primeira', 'lentes', 'corte', 'espelho', 'lexico',
  'portao', 'tanren', 'setimo', 'kakurai', 'cronica',
] as const
type View = (typeof VIEWS)[number]

/* As 9 formas do menu (a Crônica fica fora — só acessível por #cronica direto).
   Centralizado aqui pra alimentar topbar (desktop) + drawer (mobile) da mesma fonte. */
const FORMS = [
  { view: 'primeira', kanji: '壱', label: 'Primeira Forma',   desc: 'A essência — uma técnica, executada com perfeição' },
  { view: 'lentes',   kanji: '質', label: 'As Quatro Lentes', desc: 'Os quatro donos da qualidade' },
  { view: 'corte',    kanji: '道', label: 'O Corte',          desc: 'A Primeira Forma aplicada a stack, infra e carreira' },
  { view: 'espelho',  kanji: '鏡', label: 'O Espelho',        desc: 'Auto-audit: 20 perguntas pro próprio código' },
  { view: 'lexico',   kanji: '辞', label: 'O Léxico',         desc: 'Dicionário do trovão pra devs' },
  { view: 'portao',   kanji: '門', label: 'O Portão',         desc: 'Onde o contrato é forjado' },
  { view: 'tanren',   kanji: '鍛', label: 'A Têmpera',        desc: 'A disciplina virando reflexo' },
  { view: 'setimo',   kanji: '漆', label: 'Sétima Forma',     desc: 'A forma que nasce da repetição da primeira' },
  { view: 'kakurai',  kanji: '核', label: 'Trovão do Núcleo', desc: 'A forma que nasce do limite — usar o que o runtime já tem' },
] as const

/* A view ativa vive no caminho da URL (/setimo) — toda forma é deep-linkable,
   compartilhável, e back/forward do browser funcionam. Cada rota também existe
   como HTML estático no servidor (ver scripts/prerender.mjs). */
function viewFromPath(path?: string): View {
  const slug = (path ?? window.location.pathname).replace(/^\/+|\/+$/g, '')
  return (VIEWS as readonly string[]).includes(slug) ? (slug as View) : 'primeira'
}

function App({ ssrPath }: { ssrPath?: string }) {
  const [view, setView] = useState<View>(() => viewFromPath(ssrPath))
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    function sync() {
      setView(viewFromPath())
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  /* centra o botão ativo no topbar desktop — defesa pra deep-link onde a ativa
     pode estar fora da viewport horizontal. scrollLeft direto no .topbar evita
     que scrollIntoView tente também mexer no scroll vertical da página. */
  useEffect(() => {
    const topbar = document.querySelector<HTMLElement>('.topbar')
    const btn = document.querySelector<HTMLElement>('.topbar-btn.active')
    if (!topbar || !btn) return
    const target = btn.offsetLeft + btn.offsetWidth / 2 - topbar.clientWidth / 2
    topbar.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [view])

  /* drawer: Esc fecha + scroll-lock no body enquanto aberto */
  useEffect(() => {
    if (!drawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen])

  function navigateTo(v: View) {
    window.history.pushState(null, '', v === 'primeira' ? '/' : `/${v}/`)
    setView(v)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    setDrawerOpen(false)
  }

  const currentForm = FORMS.find((f) => f.view === view)
  const currentLabel = currentForm?.label ?? 'A Crônica'

  return (
    <>
      <div className="topbar-wrap">
        {/* Desktop: topbar horizontal com 9 botões */}
        <nav className="topbar" aria-label="Formas do manifesto">
          {FORMS.map((f) => (
            <button
              key={f.view}
              className={view === f.view ? 'topbar-btn active' : 'topbar-btn'}
              onClick={() => navigateTo(f.view)}
            >
              <span className="topbar-num" aria-hidden>{f.kanji}</span>
              <span className="topbar-label">{f.label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile: barra compacta com forma atual + menu icon */}
        <div className="topbar-mobile">
          <span className="topbar-mobile-current">{currentLabel}</span>
          <button
            className="topbar-mobile-menu"
            aria-label="Abrir índice das formas"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <svg viewBox="0 0 24 24" aria-hidden width="22" height="22">
              <line x1="4" y1="8"  x2="20" y2="8"  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="4" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Drawer (só renderiza enquanto aberto) */}
      {drawerOpen && (
        <div className="topbar-drawer" role="dialog" aria-modal="true" aria-label="Índice das formas">
          <button
            type="button"
            className="topbar-drawer-backdrop"
            aria-label="Fechar índice"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="topbar-drawer-panel">
            <header className="topbar-drawer-header">
              <span className="topbar-drawer-title">壱ノ型 · índice</span>
              <button
                type="button"
                className="topbar-drawer-close"
                aria-label="Fechar índice"
                onClick={() => setDrawerOpen(false)}
              >
                ×
              </button>
            </header>
            <ul className="topbar-drawer-list">
              {FORMS.map((f) => (
                <li key={f.view}>
                  <button
                    type="button"
                    className={view === f.view ? 'topbar-drawer-item active' : 'topbar-drawer-item'}
                    onClick={() => navigateTo(f.view)}
                  >
                    <span className="topbar-drawer-kanji" aria-hidden>{f.kanji}</span>
                    <span className="topbar-drawer-meta">
                      <span className="topbar-drawer-label">{f.label}</span>
                      <span className="topbar-drawer-desc">{f.desc}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {view === 'primeira' && <PrimeiraForma />}
      {view === 'lentes' && (
        <Suspense fallback={<div className="topbar-loading">carregando as quatro lentes…</div>}>
          <AsQuatroLentes />
        </Suspense>
      )}
      {view === 'corte' && (
        <Suspense fallback={<div className="topbar-loading">carregando o corte…</div>}>
          <OCorte />
        </Suspense>
      )}
      {view === 'espelho' && (
        <Suspense fallback={<div className="topbar-loading">carregando o espelho…</div>}>
          <OEspelho />
        </Suspense>
      )}
      {view === 'lexico' && (
        <Suspense fallback={<div className="topbar-loading">carregando o léxico…</div>}>
          <OLexico />
        </Suspense>
      )}
      {view === 'portao' && (
        <Suspense fallback={<div className="topbar-loading">carregando o portão…</div>}>
          <OPortao />
        </Suspense>
      )}
      {view === 'tanren' && (
        <Suspense fallback={<div className="topbar-loading">carregando a têmpera…</div>}>
          <TanRen />
        </Suspense>
      )}
      {view === 'cronica' && (
        <Suspense fallback={<div className="topbar-loading">carregando a crônica…</div>}>
          <ACronica />
        </Suspense>
      )}
      {view === 'setimo' && (
        <Suspense fallback={<div className="topbar-loading">carregando sétima forma…</div>}>
          <SetimoEstilo />
        </Suspense>
      )}
      {view === 'kakurai' && (
        <Suspense fallback={<div className="topbar-loading">carregando o trovão do núcleo…</div>}>
          <KakuRaiNoKami />
        </Suspense>
      )}
    </>
  )
}

export default App
