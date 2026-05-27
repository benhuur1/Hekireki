import { lazy, Suspense, useEffect, useState } from 'react'
import PrimeiraForma from './PrimeiraForma'
import './App.css'

const DiagramaRAG = lazy(() => import('./DiagramaRAG'))
const OCorte = lazy(() => import('./OCorte'))
const OEspelho = lazy(() => import('./OEspelho'))
const OLexico = lazy(() => import('./OLexico'))
const OPortao = lazy(() => import('./OPortao'))
const TanRen = lazy(() => import('./TanRen'))
const ACronica = lazy(() => import('./ACronica'))
const SetimoEstilo = lazy(() => import('./SetimoEstilo'))
const KakuRaiNoKami = lazy(() => import('./KakuRaiNoKami'))

const VIEWS = [
  'diagrama', 'primeira', 'corte', 'espelho', 'lexico',
  'portao', 'tanren', 'setimo', 'kakurai', 'cronica',
] as const
type View = (typeof VIEWS)[number]

/* The active view lives in the URL hash (#/o-corte) so every forma is
   deep-linkable, shareable and works with browser back/forward. Accepts the
   legacy #cronica (no slash); A Crônica stays out of the topbar, reachable
   only by typing its hash directly. */
function viewFromHash(): View {
  const slug = window.location.hash.replace(/^#\/?/, '')
  return (VIEWS as readonly string[]).includes(slug) ? (slug as View) : 'primeira'
}

function App() {
  const [view, setView] = useState<View>(viewFromHash)

  useEffect(() => {
    function sync() {
      setView(viewFromHash())
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  function navigateTo(v: View) {
    window.location.hash = `/${v}`
  }

  return (
    <>
      <nav className="topbar">
        <button
          className={view === 'diagrama' ? 'topbar-btn active' : 'topbar-btn'}
          onClick={() => navigateTo('diagrama')}
        >
          <span className="topbar-num">01</span>
          <span className="topbar-label">Diagrama RAG</span>
        </button>
        <button
          className={view === 'primeira' ? 'topbar-btn active' : 'topbar-btn'}
          onClick={() => navigateTo('primeira')}
        >
          <span className="topbar-num">壱</span>
          <span className="topbar-label">Primeira Forma</span>
        </button>
        <button
          className={view === 'corte' ? 'topbar-btn active' : 'topbar-btn'}
          onClick={() => navigateTo('corte')}
        >
          <span className="topbar-num">道</span>
          <span className="topbar-label">O Corte</span>
        </button>
        <button
          className={view === 'espelho' ? 'topbar-btn active' : 'topbar-btn'}
          onClick={() => navigateTo('espelho')}
        >
          <span className="topbar-num">鏡</span>
          <span className="topbar-label">O Espelho</span>
        </button>
        <button
          className={view === 'lexico' ? 'topbar-btn active' : 'topbar-btn'}
          onClick={() => navigateTo('lexico')}
        >
          <span className="topbar-num">辞</span>
          <span className="topbar-label">O Léxico</span>
        </button>
        <button
          className={view === 'portao' ? 'topbar-btn active' : 'topbar-btn'}
          onClick={() => navigateTo('portao')}
        >
          <span className="topbar-num">門</span>
          <span className="topbar-label">O Portão</span>
        </button>
        <button
          className={view === 'tanren' ? 'topbar-btn active' : 'topbar-btn'}
          onClick={() => navigateTo('tanren')}
        >
          <span className="topbar-num">鍛</span>
          <span className="topbar-label">A Têmpera</span>
        </button>
        <button
          className={view === 'setimo' ? 'topbar-btn active' : 'topbar-btn'}
          onClick={() => navigateTo('setimo')}
        >
          <span className="topbar-num">漆</span>
          <span className="topbar-label">Sétima Forma</span>
        </button>
        <button
          className={view === 'kakurai' ? 'topbar-btn active' : 'topbar-btn'}
          onClick={() => navigateTo('kakurai')}
        >
          <span className="topbar-num">核</span>
          <span className="topbar-label">Trovão do Núcleo</span>
        </button>
      </nav>

      {view === 'primeira' && <PrimeiraForma />}
      {view === 'diagrama' && (
        <Suspense fallback={<div className="topbar-loading">carregando diagrama…</div>}>
          <DiagramaRAG />
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
