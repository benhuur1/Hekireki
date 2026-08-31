import { lazy, Suspense, useEffect, useState } from 'react'
import PrimeiraForma from './PrimeiraForma'
import { MENU, ROTAS, SLUGS, rotaPorSlug, type Slug } from './routes'
import { registrarPageview } from './analytics'
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

type View = Slug

/* A view ativa vive no hash da URL (#/setimo) — toda forma é deep-linkable,
   compartilhável, e back/forward do browser funcionam. */
function viewFromHash(): View {
  const slug = window.location.hash.replace(/^#\/?/, '')
  return (SLUGS as readonly string[]).includes(slug) ? (slug as View) : 'primeira'
}

function App() {
  const [view, setView] = useState<View>(viewFromHash)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    function sync() {
      setView(viewFromHash())
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  /* Título e description por rota. Sem isso as 10 formas dividiam o mesmo
     <title>, o histórico do navegador ficava com entradas idênticas e o
     leitor de tela não tinha como saber que a página mudou.
     Ressalva honesta: crawler social não executa JS, então isso muda a aba
     e a telemetria — o preview por rota só chega com o prerender. */
  useEffect(() => {
    const rota = rotaPorSlug(view)
    document.title = rota.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', rota.description)
    registrarPageview(rota.path, rota.title)
  }, [view])

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
    // eslint-disable-next-line react-hooks/immutability
    window.location.hash = `/${v}`
    setDrawerOpen(false)
  }

  const currentForm = ROTAS.find((f) => f.slug === view)
  const currentLabel = currentForm?.label ?? 'A Crônica'

  return (
    <>
      <div className="topbar-wrap">
        {/* Desktop: topbar horizontal com 9 botões */}
        <nav className="topbar" aria-label="Formas do manifesto">
          {MENU.map((f) => (
            <button
              key={f.slug}
              className={view === f.slug ? 'topbar-btn active' : 'topbar-btn'}
              onClick={() => navigateTo(f.slug)}
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
              {MENU.map((f) => (
                <li key={f.slug}>
                  <button
                    type="button"
                    className={view === f.slug ? 'topbar-drawer-item active' : 'topbar-drawer-item'}
                    onClick={() => navigateTo(f.slug)}
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

      {/* Colofão. Os rodapés das páginas são decorativos e não levam a lugar
          nenhum — até aqui o site inteiro tinha um único link, para a
          Crônica. Quem chegava não tinha para onde ir. Global de propósito:
          vale também para o Trovão do Núcleo, que não tem rodapé próprio. */}
      <footer className="hk-colofao">
        <p className="hk-colofao-marca">霹靂一閃 · Hekireki</p>
        <nav className="hk-colofao-links" aria-label="Links do autor">
          <a href="https://github.com/benhuur1" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="#cronica">A Crônica</a>
        </nav>
      </footer>
    </>
  )
}

export default App
