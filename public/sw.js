/* Hekireki — Service Worker mínimo
 * Estratégia:
 *   - /assets/* (hashados pelo Vite): cache-first, imortal.
 *   - Navegação / index.html: network-first, cache como fallback offline.
 *
 * O sufixo de CACHE é reescrito a cada build por scripts/postbuild.mjs, de
 * modo que o activate abaixo apaga sozinho o cache do deploy anterior.
 * Não edite o literal à mão — o script depende do formato.
 */
const CACHE = 'hekireki-dev'
const SCOPE = '/'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)
  // pathname.startsWith('/') casa com QUALQUER url, inclusive cross-origin
  // (Google Fonts, analytics) — só a origem separa de verdade.
  if (url.origin !== self.location.origin) return
  if (!url.pathname.startsWith(SCOPE)) return

  if (url.pathname.startsWith(SCOPE + 'assets/')) {
    event.respondWith(cacheFirst(event.request))
    return
  }

  if (
    event.request.mode === 'navigate' ||
    url.pathname === SCOPE ||
    url.pathname === SCOPE + 'index.html'
  ) {
    event.respondWith(networkFirst(event.request))
  }
})

async function cacheFirst(req) {
  const cached = await caches.match(req)
  if (cached) return cached
  const res = await fetch(req)
  if (res.ok) {
    const cache = await caches.open(CACHE)
    cache.put(req, res.clone())
  }
  return res
}

async function networkFirst(req) {
  try {
    const fresh = await fetch(req)
    if (fresh.ok) {
      const cache = await caches.open(CACHE)
      cache.put(req, fresh.clone())
    }
    return fresh
  } catch {
    const cached = await caches.match(req)
    return cached || Response.error()
  }
}
