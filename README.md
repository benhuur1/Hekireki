# Hekireki · 壱ノ型

> 霹靂一閃 — *Trovão e Relâmpago*. Manifesto da **Primeira Forma** em código: padrões que enxerguei usando tecnologia pra desenvolver software, destilados numa régua única — **entregar task com qualidade.**

Site de página única (SPA) que apresenta o manifesto como uma série de "formas", no visual *Hekireki Issen*. Começou como um relatório técnico e virou o manifesto inteiro — o diagrama de RAG original foi aposentado no caminho.

## A régua: as 4 lentes da qualidade

No fim, toda entrega responde a **quatro donos** — e qualidade é servir os quatro de uma vez:

| Dono | Critério |
| --- | --- |
| **Quem usa** | UX/UI: resolve sem fricção |
| **O computador** | o código compila e roda correto |
| **O dono** | reflete a necessidade que ele propõe resolver |
| **O dev (você, depois)** | dá pra evoluir e manter a qualquer momento |

A maioria dos problemas de software é servir um dono e esquecer outro: UX linda que não compila, código limpo que não resolve a dor, solução perfeita que ninguém mantém.

## As formas (páginas)

Cada forma tem URL própria (`/corte/`) — um arquivo HTML de verdade, com título, descrição e preview próprios. Links antigos com hash (`#/corte`) são normalizados para o path canônico sem recarregar.

| Forma | Rota | Sobre |
| --- | --- | --- |
| Primeira Forma | `/` | A essência: uma técnica, executada com perfeição |
| As Quatro Lentes | `/lentes/` | Os quatro donos da qualidade |
| O Corte | `/corte/` | A Primeira Forma aplicada a stack, infra e carreira |
| O Espelho | `/espelho/` | Auto-audit: 20 perguntas pro próprio código |
| O Léxico | `/lexico/` | Dicionário do trovão pra devs |
| O Portão | `/portao/` | Onde o contrato é forjado (validação na borda) |
| A Têmpera | `/tanren/` | A disciplina virando reflexo |
| Sétima Forma | `/setimo/` | A forma que nasce da repetição da primeira |
| Trovão do Núcleo | `/kakurai/` | A forma que nasce do limite — usar o que o runtime já tem |

> Esta régua e estas formas alimentam a skill `/primeira-forma` do Claude Code — cada pergunta dela tem seu gabarito numa destas páginas.

## Stack

Vite 8 · React 19 · TypeScript 6. Sem framework de roteamento e sem gerador de site estático: o roteamento são ~20 linhas sobre `history.pushState`, e o prerender usa `react-dom/server`, que já vem com o React. Zero dependência de runtime além do React, e zero dependência de build além do Vite.

## Rodar

```bash
npm install
npm run dev      # servidor de dev
npm run build    # tsc -b + build de produção
npm run lint     # ESLint
```

## Deploy

Hospedado em **Hostinger** no subdomain `hekireki.infotechjs.com.br` (doc root próprio, isolado do WordPress na raiz).

1. `npm run build` — roda typecheck, bundle, bundle SSR, prerender e carimbo do
   service worker. Gera em `dist/`: um `index.html` por rota (`corte/`,
   `espelho/`, …), `sitemap.xml`, `404.html`, `robots.txt` e `assets/`.
2. No **hPanel**, abrir o File Manager no doc root do subdomain.
3. Subir o conteúdo de `dist/` **nesta ordem** — ela evita que uma aba aberta
   quebre no meio do deploy:
   1. `assets/` primeiro
   2. depois as pastas de rota e o `404.html`
   3. depois `index.html`, `sitemap.xml`, `robots.txt`
   4. por último `sw.js`
4. **Não apague a `assets/` antiga imediatamente.** Deixe os chunks com hash
   antigo no ar por alguns dias: é isso que impede o 404 de chunk nas abas que
   ficaram abertas — mais eficaz que o error boundary, porque previne em vez
   de remediar.
5. Conferir https://hekireki.infotechjs.com.br e, no Search Console, enviar o
   `sitemap.xml`.

### Analytics (opcional)

Sem `VITE_GA_ID`, nenhum script de analytics é carregado e o texto "Dados do
visitante" da Sétima Forma continua dizendo "sem coleta" — os dois leem a mesma
variável, então a página não tem como mentir. Para ligar, copie `.env.example`
para `.env` e preencha o ID de medição do GA4.

### O que o `public/.htaccess` define

- `Cache-Control: public, max-age=31536000, immutable` em assets hashados
- `Cache-Control: no-cache, must-revalidate` em `.html` e `sw.js`
- `ErrorDocument 404 /404.html` — cada rota é um arquivo real, então **não há
  fallback de SPA**: uma URL inventada devolve 404 de verdade, não um 200 que o
  Google indexaria como soft-404
- Headers de segurança: `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy` e CSP
- `Options -Indexes` e compressão gzip via `mod_deflate`

Se um dia mover para subpasta ou outro host, ajuste `base` no `vite.config.ts`,
`SCOPE` no `public/sw.js` e `ORIGEM` no `scripts/prerender.mjs` para o mesmo valor.
