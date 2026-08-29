/* Pós-build: gera dist/<slug>/index.html com o HTML real de cada forma e
   title/description/canonical/og próprios. O client re-renderiza por cima
   (createRoot), então o HTML estático é só a primeira pintura + SEO. */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE = 'https://hekireki.infotechjs.com.br'
const dist = resolve('dist')
const { renderPath } = await import(resolve('dist-server/prerender.js'))

/* slug '' = raiz (mesmo conteúdo da primeira). modulo aponta o chunk lazy da
   rota no manifest do vite, pro CSS dele entrar no <head> estático — sem isso
   a primeira pintura das seções exclusivas (galeria, crônica) chega sem estilo. */
const PAGES = [
  { slug: '',         modulo: null,                       title: 'Primeira Forma · 壱ノ型', desc: '壱ノ型 — o manifesto da Primeira Forma: entregar task com qualidade. Do Portão ao Trovão do Núcleo, as formas do ofício.' },
  { slug: 'primeira', modulo: null,                       title: 'Primeira Forma · 壱ノ型', desc: 'Hekireki Issen — uma técnica, executada com perfeição. A essência do manifesto: entregar task com qualidade.' },
  { slug: 'lentes',   modulo: 'src/AsQuatroLentes.tsx',   title: 'As Quatro Lentes · 質',   desc: 'Os quatro donos da qualidade: quem usa, quem paga, quem mantém, quem opera. Toda entrega responde aos quatro.' },
  { slug: 'corte',    modulo: 'src/OCorte.tsx',           title: 'O Corte · 道',            desc: 'A Primeira Forma aplicada a stack, infra e carreira — cortar antes de adicionar.' },
  { slug: 'espelho',  modulo: 'src/OEspelho.tsx',         title: 'O Espelho · 鏡',          desc: 'Auto-audit: vinte perguntas pro dev fazer ao próprio código antes de dizer "pronto".' },
  { slug: 'lexico',   modulo: 'src/OLexico.tsx',          title: 'O Léxico · 辞',           desc: 'Dicionário do trovão pra devs — os termos da forja traduzidos pro contexto de software.' },
  { slug: 'portao',   modulo: 'src/OPortao.tsx',          title: 'O Portão · 門',           desc: 'Onde o contrato é forjado: validar na entrada em vez de defender em cada cômodo.' },
  { slug: 'tanren',   modulo: 'src/TanRen.tsx',           title: 'A Têmpera · 鍛',          desc: 'A disciplina virando reflexo: confissões, juramentos e as quatro fases da têmpera.' },
  { slug: 'setimo',   modulo: 'src/SetimoEstilo.tsx',     title: 'Sétima Forma · 漆',       desc: 'A forma que nasce da repetição da primeira: um pipeline de auditoria que se monitora, se corrige e se explica sozinho.' },
  { slug: 'kakurai',  modulo: 'src/KakuRaiNoKami.tsx',    title: 'Trovão do Núcleo · 核',   desc: 'A forma que nasce do limite — cobertura de testes usando só o que o runtime do Node já tem.' },
  { slug: 'cronica',  modulo: 'src/ACronica.tsx',         title: 'A Crônica · 跡',          desc: 'A evolução do projeto, martelada a martelada: os comandos do autor e o que o agente respondeu.' },
]

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const manifest = JSON.parse(readFileSync(resolve(dist, '.vite/manifest.json'), 'utf8'))
const entryCss = new Set(manifest['index.html']?.css ?? [])

function chunkCssLinks(modulo) {
  const css = manifest[modulo]?.css ?? []
  return css
    .filter((f) => !entryCss.has(f))
    .map((f) => `    <link rel="stylesheet" href="/${f}">\n`)
    .join('')
}

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

const out = []
for (const p of PAGES) {
  const path = p.slug ? `/${p.slug}/` : '/'
  const html = await renderPath(path)
  const url = `${SITE}${path}`

  let page = template
    .replace(/<title>[^<]*<\/title>/, `<title>${p.title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escapeAttr(p.desc)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(p.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${escapeAttr(p.desc)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeAttr(p.title)}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${escapeAttr(p.desc)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  if (p.modulo) {
    page = page.replace('</head>', chunkCssLinks(p.modulo) + '  </head>')
  }

  const dir = p.slug ? resolve(dist, p.slug) : dist
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'index.html'), page)
  out.push(`${path.padEnd(10)} ${(html.length / 1024).toFixed(1)} kB de HTML`)
}

if (existsSync(resolve('dist-server'))) rmSync(resolve('dist-server'), { recursive: true })
console.log(out.join('\n'))
