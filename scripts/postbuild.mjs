/**
 * Carimba o build no CACHE do service worker.
 *
 * O sw.js versionado tem `CACHE = 'hekireki-dev'` fixo. Como o handler de
 * activate só apaga chaves diferentes da atual, um CACHE que nunca muda
 * significa que o cache do deploy anterior nunca é apagado — e o comentário
 * pedindo "bumpe CACHE" não sobrevive a um deploy por File Manager.
 * Aqui o valor é reescrito a cada build.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const sw = resolve(import.meta.dirname, '../dist/sw.js')
const id = new Date().toISOString().replace(/\D/g, '').slice(0, 14)
const src = readFileSync(sw, 'utf-8')
const out = src.replace("const CACHE = 'hekireki-dev'", `const CACHE = 'hekireki-${id}'`)

if (out === src) {
  console.error('postbuild: literal de CACHE não encontrado em dist/sw.js')
  process.exit(1)
}
writeFileSync(sw, out)
console.log(`postbuild: CACHE = hekireki-${id}`)
