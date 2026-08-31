import { renderToString } from 'react-dom/server'
import App from './App'
import { carregarTodas } from './pages'
import { ROTAS } from './routes'

export { ROTAS }

/**
 * Entrada do prerender. renderToString é síncrono e não espera import(),
 * então todas as páginas são carregadas antes de qualquer render.
 */
export async function prepararRender() {
  await carregarTodas()
  return (path: string) => renderToString(<App initialPath={path} />)
}
