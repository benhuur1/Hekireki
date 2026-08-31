import { useEffect, useState } from 'react'
import { MENU, ROTAS, rotaPorPath, rotaPorSlug, type Slug } from './routes'
import { carregarPagina, paginaCarregada } from './pages'
import { registrarPageview } from './analytics'
import './App.css'

type View = Slug

type Props = {
  /** Rota inicial. O prerender passa o path; no browser vem da URL. */
  initialPath?: string
}

/**
 * Resolve a rota de entrada.
 *
 * Também normaliza links antigos com hash (#/corte) para o path canônico,
 * sem recarregar — tudo que já foi compartilhado continua funcionando.
 * Fica no inicializador do estado, e não num efeito, porque acontece uma
 * única vez e não deve provocar um segundo render.
 */
function rotaInicial(initialPath?: string) {
  if (initialPath) return rotaPorPath(initialPath)
  if (typeof window === 'undefined') return rotaPorPath('/')
  const m = window.location.hash.match(/^#\/?([\w-]+)$/)
  const porHash = m ? ROTAS.find((r) => r.slug === m[1]) : undefined
  if (porHash) {
    window.history.replaceState(null, '', porHash.path)
    return porHash
  }
  return rotaPorPath(window.location.pathname)
}

function App({ initialPath }: Props) {
  const [view, setView] = useState<View>(() => rotaInicial(initialPath).slug)
  const [drawerOpen, setDrawerOpen] = useState(false)
  // Força re-render quando um chunk de rota termina de carregar.
  const [, setCarregou] = useState(0)

  /* back/forward do browser. A rota agora é um path de verdade, então o
     evento é popstate — hashchange não é mais disparado. */
  useEffect(() => {
    function sync() {
      setView(rotaPorPath(window.location.pathname).slug)
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  /* Garante que o componente da rota atual está carregado. */
  useEffect(() => {
    if (paginaCarregada(view)) return
    let vivo = true
    carregarPagina(view).then(() => {
      if (vivo) setCarregou((n) => n + 1)
    })
    return () => {
      vivo = false
    }
  }, [view])

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
    window.history.pushState(null, '', rotaPorSlug(v).path)
    setView(v)
    setDrawerOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

  /* Deixa o browser fazer o trabalho dele em ctrl/cmd/shift-clique, botão do
     meio e "abrir em nova aba" — só intercepta o clique simples. */
  function aoClicar(e: React.MouseEvent, v: View) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigateTo(v)
  }

  const rotaAtual = rotaPorSlug(view)
  const currentLabel = rotaAtual.label
  /* O registro devolve sempre a MESMA referência de componente para um slug
     (Map de módulo), então não há criação de componente por render — o que a
     regra existe para impedir. Sem a supressão, o lookup dinâmico que a
     hidratação exige seria impossível. */
  const Pagina = paginaCarregada(view)

  return (
    <>
      <div className="topbar-wrap">
        {/* Desktop: topbar horizontal com 9 botões */}
        <nav className="topbar" aria-label="Formas do manifesto">
          {MENU.map((f) => (
            <a
              key={f.slug}
              href={f.path}
              className={view === f.slug ? 'topbar-btn active' : 'topbar-btn'}
              aria-current={view === f.slug ? 'page' : undefined}
              onClick={(e) => aoClicar(e, f.slug)}
            >
              <span className="topbar-num" aria-hidden>{f.kanji}</span>
              <span className="topbar-label">{f.label}</span>
            </a>
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
                  <a
                    href={f.path}
                    className={view === f.slug ? 'topbar-drawer-item active' : 'topbar-drawer-item'}
                    aria-current={view === f.slug ? 'page' : undefined}
                    onClick={(e) => aoClicar(e, f.slug)}
                  >
                    <span className="topbar-drawer-kanji" aria-hidden>{f.kanji}</span>
                    <span className="topbar-drawer-meta">
                      <span className="topbar-drawer-label">{f.label}</span>
                      <span className="topbar-drawer-desc">{f.desc}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {Pagina ? (
        // eslint-disable-next-line react-hooks/static-components
        <Pagina />
      ) : (
        <div className="topbar-loading">carregando {rotaAtual.label.toLowerCase()}…</div>
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
          <a href="/cronica/" onClick={(e) => aoClicar(e, 'cronica')}>A Crônica</a>
        </nav>
      </footer>
    </>
  )
}

export default App
