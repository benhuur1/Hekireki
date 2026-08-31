/**
 * Prerender: transforma a SPA em HTML estático, uma página por rota.
 *
 * Sem isto, o servidor entrega <body><div id="root"></div></body> e todo o
 * texto do manifesto só existe depois que ~200 KB de JavaScript baixam e
 * executam. E, como o roteamento antes vivia no hash, o Google via uma URL
 * só — as outras nove formas eram inalcançáveis para busca.
 *
 * Roda depois do `vite build`, usando react-dom/server, que já vem com o
 * React. Nenhuma dependência nova, nem de build nem de runtime.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const RAIZ = resolve(import.meta.dirname, '..')
const DIST = join(RAIZ, 'dist')
const ORIGEM = 'https://hekireki.infotechjs.com.br'

const { prepararRender, ROTAS } = await import(join(RAIZ, 'dist-ssr/entry-server.js'))
const render = await prepararRender()

const template = readFileSync(join(DIST, 'index.html'), 'utf-8')

const INI = '<!--hk:head-->'
const FIM = '<!--/hk:head-->'
const iHead = template.indexOf(INI)
const fHead = template.indexOf(FIM)
if (iHead === -1 || fHead === -1) {
  console.error('prerender: marcadores hk:head não encontrados em dist/index.html')
  process.exit(1)
}

const escapar = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function cabeca(rota) {
  const url = ORIGEM + rota.path
  const img = `${ORIGEM}/og-image.png`
  const linhas = [
    `<title>${escapar(rota.title)}</title>`,
    `<meta name="description" content="${escapar(rota.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    // A Crônica é log de trabalho vivo: acessível e compartilhável, mas
    // fora do índice. noindex,follow mantém os links dela sendo seguidos.
    rota.indexable ? '' : `<meta name="robots" content="noindex,follow" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="Hekireki" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapar(rota.title)}" />`,
    `<meta property="og:description" content="${escapar(rota.description)}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapar(rota.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapar(rota.title)}" />`,
    `<meta name="twitter:description" content="${escapar(rota.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ].filter(Boolean)
  return linhas.map((l) => '    ' + l).join('\n')
}

let escritas = 0
for (const rota of ROTAS) {
  const html = template
    .slice(0, iHead)
    .concat(cabeca(rota), '\n    ', template.slice(fHead))
    .replace('<div id="root"></div>', `<div id="root">${render(rota.path)}</div>`)

  const destino =
    rota.path === '/'
      ? join(DIST, 'index.html')
      : join(DIST, rota.path.replace(/^\/|\/$/g, ''), 'index.html')

  mkdirSync(dirname(destino), { recursive: true })
  writeFileSync(destino, html)
  escritas++
}

// sitemap: só o que é indexável
const hoje = new Date().toISOString().slice(0, 10)
const urls = ROTAS.filter((r) => r.indexable)
  .map((r) => `  <url>\n    <loc>${ORIGEM}${r.path}</loc>\n    <lastmod>${hoje}</lastmod>\n  </url>`)
  .join('\n')
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

// 404 de verdade, servido pelo ErrorDocument do Apache
const html404 = template
  .slice(0, iHead)
  .concat(
    [
      `<title>Página não encontrada · Hekireki</title>`,
      `<meta name="robots" content="noindex" />`,
    ]
      .map((l) => '    ' + l)
      .join('\n'),
    '\n    ',
    template.slice(fHead),
  )
  .replace(
    '<div id="root"></div>',
    '<div id="root"><div class="hk-erro"><p class="hk-erro-kanji">跡</p>' +
      '<h1 class="hk-erro-titulo">Esse caminho não existe.</h1>' +
      '<p class="hk-erro-texto">A forma que você procurou não está entre as nove.</p>' +
      '<p><a class="hk-erro-botao" href="/">voltar à Primeira Forma</a></p></div></div>',
  )
writeFileSync(join(DIST, '404.html'), html404)

console.log(
  `prerender: ${escritas} páginas, sitemap com ${ROTAS.filter((r) => r.indexable).length} URLs, 404.html`,
)
