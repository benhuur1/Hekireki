/**
 * Gera public/og-image.png (1200x630) a partir de public/og-image.svg.
 *
 * Redes sociais (WhatsApp, LinkedIn, Facebook, X) nao renderizam SVG como
 * preview de link — o card sai sem imagem. Este script rasteriza o SVG uma
 * vez, com as fontes reais do site, e o PNG resultante e commitado como
 * asset estatico. Nao roda no build e nao adiciona dependencia ao projeto.
 *
 * Uso:  node scripts/og-image.mjs
 * Requer um Chromium local (CHROMIUM=/caminho/para/chrome para apontar outro).
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const RAIZ = resolve(import.meta.dirname, '..')
const SVG = join(RAIZ, 'public/og-image.svg')
const PNG = join(RAIZ, 'public/og-image.png')
const FONTES =
  'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600' +
  '&family=JetBrains+Mono:wght@300;400;500&display=block'

const CHROMIUM =
  process.env.CHROMIUM ||
  (process.env.PLAYWRIGHT_BROWSERS_PATH
    ? join(process.env.PLAYWRIGHT_BROWSERS_PATH, 'chromium')
    : 'chromium')

const tmp = mkdtempSync(join(tmpdir(), 'og-'))
try {
  // O SVG e embutido inline para que as webfonts se apliquem ao <text>;
  // referenciado como <img> ele renderizaria isolado, sem as fontes.
  writeFileSync(
    join(tmp, 'og.html'),
    `<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="${FONTES}">
<style>html,body{margin:0;padding:0;height:100%;overflow:hidden;background:#0a0807}
svg{display:block;position:fixed;inset:0;width:100vw;height:100vh}</style>
${readFileSync(SVG, 'utf-8')}`,
  )

  execFileSync(
    CHROMIUM,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      // Deixa as webfonts baixarem e aplicarem antes do frame ser capturado.
      '--virtual-time-budget=10000',
      `--screenshot=${PNG}`,
      join(tmp, 'og.html'),
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  )
  console.log(`og-image.png gerado: ${PNG}`)
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
