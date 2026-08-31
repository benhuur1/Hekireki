import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './ErrorBoundary.tsx'
import { iniciarAnalytics } from './analytics.ts'
import { carregarPagina } from './pages.ts'
import { rotaPorPath } from './routes.ts'

iniciarAnalytics()

const raiz = document.getElementById('root')!

const arvore = (
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)

/**
 * O componente da rota tem que estar carregado ANTES de hidratar: se ele
 * ainda não estiver, a primeira renderização do cliente não bate com o HTML
 * prerenderizado e o React descarta justamente o conteúdo que o prerender
 * gerou. Em dev o #root vem vazio, então é montagem normal.
 */
carregarPagina(rotaPorPath(window.location.pathname).slug)
  .catch(() => {})
  .finally(() => {
    if (raiz.hasChildNodes()) hydrateRoot(raiz, arvore)
    else createRoot(raiz).render(arvore)
  })

/**
 * Chunk lazy que some depois de um deploy é o modo de falha mais provável
 * deste site. O Vite emite este evento exatamente para esse caso: recarregar
 * busca o index.html novo, com os hashes novos.
 */
window.addEventListener('vite:preloadError', (evento) => {
  evento.preventDefault()
  window.location.reload()
})

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch((erro) => {
        // Engolir o erro aqui deixava qualquer falha de registro invisível.
        console.error('[hekireki] service worker não registrou', erro)
        window.gtag?.('event', 'exception', {
          description: `sw-register: ${erro}`,
          fatal: false,
        })
      })
  })
}
