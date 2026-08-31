import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

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
