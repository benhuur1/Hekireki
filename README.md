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
