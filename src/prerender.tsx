/* Entry SSR — usado só pelo build (vite build --ssr) via scripts/prerender.mjs.
   react-dom/static espera os lazy() do App resolverem antes de emitir o HTML. */
import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import App from './App.tsx'

export async function renderPath(path: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <App ssrPath={path} />
    </StrictMode>,
  )
  const reader = prelude.getReader()
  const decoder = new TextDecoder()
  let html = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    html += decoder.decode(value, { stream: true })
  }
  return html
}
