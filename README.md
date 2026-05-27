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

Cada forma tem URL própria via hash (`#/corte`) — deep-link e back/forward funcionam.

| Forma | Rota | Sobre |
| --- | --- | --- |
| Primeira Forma | `#/primeira` | A essência: uma técnica, executada com perfeição |
| As Quatro Lentes | `#/lentes` | Os quatro donos da qualidade |
| O Corte | `#/corte` | A Primeira Forma aplicada a stack, infra e carreira |
| O Espelho | `#/espelho` | Auto-audit: 20 perguntas pro próprio código |
| O Léxico | `#/lexico` | Dicionário do trovão pra devs |
| O Portão | `#/portao` | Onde o contrato é forjado (validação na borda) |
| A Têmpera | `#/tanren` | A disciplina virando reflexo |
| Sétima Forma | `#/setimo` | A forma que nasce da repetição da primeira |
| Trovão do Núcleo | `#/kakurai` | A forma que nasce do limite — usar o que o runtime já tem |

> Esta régua e estas formas alimentam a skill `/primeira-forma` do Claude Code — cada pergunta dela tem seu gabarito numa destas páginas.

## Stack

Vite 8 · React 19 · TypeScript 6. Sem framework de roteamento — a view vive no hash da URL. Zero dependência de runtime além do React.

## Rodar

```bash
npm install
npm run dev      # servidor de dev
npm run build    # tsc -b + build de produção
npm run lint     # ESLint
```

## Deploy

Hospedado em **Hostinger**, subpasta `/hekireki/` sob `infotechjs.com.br` (WordPress na raiz convive sem conflito).

1. `npm run build` — gera `dist/` com paths reescritos para `/hekireki/`.
2. Pelo **File Manager** do hPanel (ou FTP), abrir `public_html/`.
3. Garantir que a pasta `hekireki/` existe na raiz pública. Limpar se quiser substituir.
4. Subir **o conteúdo** de `dist/` (não a pasta) para `public_html/hekireki/`:
   - `index.html`, `og-image.svg`, `favicon.svg`, `competitivo.json`, `sw.js`, `.htaccess`
   - pasta `assets/` inteira
5. Conferir https://infotechjs.com.br/hekireki/ no browser. Em caso de cache antigo do SW, hard refresh (Ctrl+Shift+R).

O `public/.htaccess` (incluso no `dist/`) define:
- `Cache-Control: public, max-age=31536000, immutable` em assets hashados (Vite já gera nome com hash → seguro)
- `Cache-Control: no-cache, must-revalidate` em `index.html` e `sw.js` (deploy novo visto na hora)
- `Options -Indexes` (sem listagem de diretório)
- Compressão gzip via `mod_deflate`

Mudar a subpasta no futuro? Edite `vite.config.ts` (`base`) **e** `public/sw.js` (`SCOPE`) para o mesmo slug, depois `npm run build`.
