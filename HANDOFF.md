# Handoff — Hekireki (continuar em outro PC)

## Por que este documento existe

Sessão anterior auditou o site `hekireki.infotechjs.com.br` em quatro eixos (leitura,
aquisição de visitantes, métricas e indexação no Google), encontrou conteúdo sensível de
dois clientes publicado, e executou a correção completa em três fases.

**Todo o código está commitado e no GitHub, e o deploy já foi feito.** Verifiquei o
servidor: as 10 páginas prerenderizadas, o `sitemap.xml`, o `robots.txt`, o `404.html` e o
`.htaccess` novo estão no ar — e o `competitivo.json` com dados reais de cliente, que estava
sendo servido publicamente, **foi removido**. O cache do servidor e do CDN foi purgado.

O que falta são decisões e ações que dependem de você: IDs, URLs e deletar o repositório.

Este documento existe porque você trocou de máquina e o container da sessão é efêmero.

---

## 1. Onde está cada coisa

| Item | Onde | Sobrevive à troca de PC? |
| --- | --- | --- |
| Os 7 commits do trabalho | `origin/claude/hostinger-project-types-h1vdef` | **Sim** |
| Branch `main` | `origin/main`, em `35a40f2` (7 commits atrás) | Sim, intocada |
| Branch `historico-limpo` | era só local na sessão anterior | **Não** — recriável em 3 comandos, ver §4 |
| Bundle do histórico antigo (4,2 MB) | enviado a você como arquivo na conversa | Só se você **baixou** |
| `dist/` construído | só local | Não — é só rodar `npm run build` |

**A branch `historico-limpo` sumir não é problema.** Verifiquei: a árvore dela é
**idêntica** à da branch publicada (`git diff --stat` retornou vazio). Ela é um commit
órfão único, recriável em três comandos — estão em §4.

**O bundle é o único item realmente insubstituível.** Ele contém os 35 commits originais.
Se você não baixou o arquivo que enviei na conversa, ele se perde quando este container for
reciclado. Só importa se um dia você quiser consultar o histórico antigo — o código atual
não depende dele.

---

## 2. O que foi feito

Sete commits em `claude/hostinger-project-types-h1vdef`, do mais antigo para o mais novo:

```
97f09e7  redact: remove client audit findings and infra details from public site
d219eba  redact: remove second client's production bug details from A Crônica
d22453a  feat(seo): fix broken link preview and add robots.txt
c0d0245  feat: error boundary, SW hardening and reading fixes
5d7a3f5  feat(seo): single route table with per-route title and description
e60890f  feat: env-gated GA4, honest privacy copy and a global colophon
16c04aa  feat(seo): prerender each route to static HTML with real paths
```

### Fase 0 — Conteúdo sensível (bloqueante, feita)

Os nomes já estavam anonimizados, mas o que restava era pior que nomes:

- **`src/SetimoEstilo.tsx`**: achados de conformidade de um cliente real (*"preço vazado
  contra política"*, *"~10 leak detectados"*, repetidos em 3 lugares), o mapa da instalação
  (caminho dos mu-plugins, page builder, comandos CLI) e a declaração de que os dados vinham
  de *"ambiente local de staging do cliente"*. Generalizados para descrição de técnica.
- **`src/ACronica.tsx`**: as marteladas 37–43 expunham um **segundo cliente** — cadeia de
  causa-raiz de bug em produção com caminhos de arquivo, estado do seed do backend, nomes de
  constantes e componente, prints de uma atendente, o pipeline de deploy, e uma afirmação de
  defeito no catálogo vivo. Reescritas preservando a lição e a voz.
- **`competitivo.json`**: contagens reais de lojas e páginas de duas redes → dados
  ilustrativos, declarados como tal na prosa e na seção renderizada.

### Fase 1 — Preview, métricas, robustez, leitura (feita)

- **Preview de link**: era SVG com caminho relativo — WhatsApp e LinkedIn não renderizam
  SVG, então todo link saía sem imagem. Agora `og-image.png` 1200×630 absoluto, mais
  `og:url`, `canonical`, `og:site_name` e dimensões. O SVG original tinha um bug real: a
  linha "ICHI NO KATA" estourava os 1200px do canvas.
- **GA4** (`src/analytics.ts`): ligado por `VITE_GA_ID`. Sem a variável nada carrega e o ID
  nem entra no bundle. `send_page_view` desligado, com disparo manual por rota.
- **Honestidade**: o texto *"Sem coleta. Nada de analytics"* da Sétima Forma agora lê a
  mesma variável e descreve o estado real nos dois casos.
- **Error boundary** (`src/ErrorBoundary.tsx`) + `vite:preloadError`: chunk lazy que dava
  404 após deploy desmontava a árvore inteira — tela branca. O fallback tem escape que
  limpa service worker e caches.
- **Service worker**: `url.pathname.startsWith('/')` casava com qualquer URL, inclusive
  cross-origin → guarda de origem. `CACHE` era fixo em `'hekireki-v1'` e nunca invalidava
  nada → carimbado a cada build por `scripts/postbuild.mjs`.
- **Leitura**: `opacity: 0` estava na regra base da coreografia — falha de animação escondia
  o texto para sempre; movido para o keyframe com `fill-mode: both`, e atrasos encurtados
  (hero fechava em 3,55s, agora 1,7s). Space deixou de sequestrar o page-down. Duas larguras
  fora de controle (uma chegava a 149 caracteres por linha) alinhadas.
- **Colofão global** em `App.tsx`: o site inteiro tinha **uma** tag `<a>`. Agora tem GitHub
  e Crônica, inclusive no Trovão do Núcleo, que não tinha rodapé nenhum.

### Fase 2 — Indexação real (feita)

O servidor entregava `<body><div id="root"></div></body>`, e o Google trata `#/corte` como
a mesma URL que `/` — havia 1 URL indexável, não 10, e nem link para o crawler seguir
(os menus eram `<button>`).

- **Roteamento por path**: `history.pushState` + `popstate`; menus viraram `<a href>` reais
  com `aria-current`. Links antigos com hash são normalizados sem recarregar.
- **`src/pages.ts`**: registro síncrono no lugar de `React.lazy` — com `lazy`, a primeira
  renderização do cliente suspende e o React **descarta** o HTML do servidor.
- **`scripts/prerender.mjs`**: `renderToString` por rota, `<head>` próprio entre marcadores
  `<!--hk:head-->`, `sitemap.xml` e `404.html`. A Crônica sai com `noindex,follow`.
- **Zero dependência nova** — `react-dom/server` já vinha com o React.

**Resultado medido:** 0 → 66.990 caracteres de prosa em HTML estático; 1 → 9 URLs no
sitemap; 1 → 9 âncoras rastreáveis. Hidratação sem um único mismatch no Chromium.

---

## 3. O que falta (em ordem)

| # | Pendência | Depende de | Bloqueia |
| --- | --- | --- | --- |
| ~~1~~ | ~~Deploy na Hostinger~~ | — | **feito e verificado** |
| 1 | Enviar sitemap no Search Console | você | indexação |
| 2 | Recriar o repositório no GitHub | você (irreversível) | limpar o histórico |
| 3 | ID do GA4 no `.env`, rebuild e novo deploy | criar a propriedade | métricas |
| 4 | URL do LinkedIn no colofão | você | aquisição |

Notas:

- **(1)** O DNS de `infotechjs.com.br` já tem um `google-site-verification`. Se a
  propriedade no Search Console for do tipo **Domínio**, o subdomínio já está coberto e
  basta enviar `https://hekireki.infotechjs.com.br/sitemap.xml`.
- **(2)** Você aprovou recriar o histórico. Não deletei o repositório porque não tenho
  ferramenta para isso e é irreversível — comandos em §4.
- **(4)** Não publiquei seu e-mail sem perguntar. Se quiser, é uma linha em `App.tsx`.
- **(3)** O site funciona sem GA4; o texto da Sétima Forma continua dizendo "sem coleta"
  enquanto a variável não existir, então nada fica incoerente.

---

## 4. Como retomar no PC novo

### Recuperar o trabalho

```bash
git clone https://github.com/benhuur1/Hekireki.git
cd Hekireki
git checkout claude/hostinger-project-types-h1vdef
npm install
npm run build          # tsc + bundle + bundle SSR + prerender + carimbo do SW
```

Se `npm run build` terminar com `prerender: 10 páginas, sitemap com 9 URLs, 404.html`,
está tudo íntegro.

### Recriar a branch de histórico limpo

A branch local se perdeu com o container, mas a árvore é idêntica à publicada:

```bash
git checkout claude/hostinger-project-types-h1vdef
git checkout --orphan historico-limpo
git add -A
git commit -m "Hekireki — manifesto da Primeira Forma"
```

### Trocar o histórico (passo irreversível)

Só depois de ter o bundle guardado offline, se você quiser preservá-lo.

```bash
# 1. no GitHub: Settings → Danger Zone → Delete this repository
# 2. criar de novo, mesmo nome, privado
git branch -M historico-limpo main
git remote set-url origin https://github.com/benhuur1/Hekireki.git
git push -u origin main --force
```

Verificar depois:
```bash
git log --oneline | wc -l                                    # 1
git log -p | grep -ciE "applauso|comeri|nissan|fnlivros"     # 0
```

### Ligar o GA4

```bash
cp .env.example .env
# editar: VITE_GA_ID=G-XXXXXXXXXX
npm run build
```

### Adicionar o LinkedIn

Em `src/App.tsx`, no bloco `.hk-colofao-links`, ao lado do link do GitHub:

```tsx
<a href="https://linkedin.com/in/SEU-PERFIL" target="_blank" rel="noopener noreferrer">
  LinkedIn
</a>
```

---

## 5. Deploy — a ordem importa

`npm run build` gera em `dist/`: `index.html`, uma pasta por rota (`corte/`, `espelho/`,
`lentes/`, `lexico/`, `portao/`, `tanren/`, `setimo/`, `kakurai/`, `cronica/`),
`sitemap.xml`, `404.html`, `robots.txt`, `og-image.png`, `sw.js`, `.htaccess` e `assets/`.

No File Manager do hPanel, no doc root do subdomain, subir **nesta ordem**:

1. `assets/` primeiro
2. as pastas de rota e o `404.html`
3. `index.html`, `sitemap.xml`, `robots.txt`, `og-image.png`, `.htaccess`
4. `sw.js` por último

**Não apague a `assets/` antiga por alguns dias.** Deixar os chunks com hash antigo no ar é
o que impede o 404 de chunk nas abas que ficaram abertas — previne, em vez de remediar.

Depois do deploy, no Search Console: enviar `sitemap.xml` e usar Inspeção de URL em três
rotas distintas, conferindo na aba **HTML** (não "renderizado") que a prosa está lá.

---

## 6. Armadilhas específicas deste projeto

- **`base` em três lugares.** Mover para subpasta ou outro host exige mudar `base` no
  `vite.config.ts`, `SCOPE` no `public/sw.js` **e** `ORIGEM` no `scripts/prerender.mjs`.
- **`og-image.png` tem cache imutável de 1 ano** (`.htaccess`). Se um dia regerar a imagem,
  WhatsApp e LinkedIn ficam com a antiga — versione o nome (`og-image-v2.png`).
- **Nenhum `useEffect` pode produzir conteúdo visível.** Ele não roda no `renderToString`,
  então vira buraco no HTML estático. Foi exatamente isso com o `competitivo.json`, que era
  `fetch` e virou import estático. Hoje só `App` e `PrimeiraForma` têm estado.
- **O site está atrás do CDN da Hostinger** (`cdn.hstgr.net`). Depois de subir arquivos, o
  CDN pode continuar servindo a versão anterior — inclusive para o Googlebot. Limpe o cache
  (hPanel → Cache → Limpar, ou pelo conector) sempre que fizer deploy.
- **`hekireki.infotechjs.com.br` é domínio addon, não subdomínio.** Tem zona DNS própria e
  doc root próprio (`domains/hekireki.infotechjs.com.br/public_html`) — por isso não aparece
  na lista de subdomínios de `infotechjs.com.br` nem na zona DNS do domínio pai.
- **`scripts/og-image.mjs` precisa de Chromium local.** Roda sob demanda, não no build.
  Aponte com `CHROMIUM=/caminho/para/chrome` se necessário.
- **Regenerar o `og-image.svg`**: o canvas é 1200×630 e a fonte é mais larga que o design
  original supunha — confira se o texto não estoura antes de rasterizar.
- **Ainda em aberto (não corrigido, por ser decisão sua):** os itálicos não renderizam. A
  Shippori Mincho não tem face itálica e `index.css` define `font-synthesis: none`, então
  os ~30 `.hk-sub` que pedem itálico saem em pé. Ou troca a fonte, ou marca a voz secundária
  por cor e tamanho.

---

## 7. Verificação de que está tudo certo

```bash
npm run build && npm run lint && npx tsc -b     # tudo limpo

find dist -name index.html | wc -l              # 10
grep -c "<loc>" dist/sitemap.xml                # 9
grep -o 'content="noindex[^"]*"' dist/cronica/index.html   # noindex,follow
grep -o "hekireki-[0-9]*" dist/sw.js            # CACHE carimbado

# a prosa está no HTML, sem executar JS:
python3 -c "import re,io; h=io.open('dist/corte/index.html',encoding='utf-8').read(); \
t=re.sub(r'<script.*?</script>','',h,flags=re.S); print(len(re.sub(r'<[^>]+>',' ',t).split()))"
# ~1000 palavras

# nada de cliente sobrou na árvore:
git grep -icE "applauso|comeri|nissan|daniele|fnlivros" -- .    # vazio

# hidratação limpa: servir dist/ e abrir /corte/ com o console aberto
# → zero warning de hydration mismatch
```
