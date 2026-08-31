import './PrimeiraForma.css'
import './ACronica.css'
import { Scar, SectionLabel, SignatureMark } from './marks'

type Martelada = {
  n: number
  voce: string
  eu: string
}

type Episodio = {
  num: string
  romaji: string
  titulo: string
  descricao: string
  inicio: number
  fim: number
}

const marteladas: Martelada[] = [
  {
    n: 1,
    voce: 'Tem o Zenitsu no anime Demon Slayer e tem a primeira forma. Agora mostre tudo o que pode fazer com a skills frontend design.',
    eu: 'Esbocei a primeira versão de PrimeiraForma.tsx + .css. Hero, multi cards, forja, código de execução. Ferro bruto, ainda quente.',
  },
  {
    n: 2,
    voce: 'Não se preocupe se consegue fazer isso já está ótimo, se é bom em uma única coisa treine para aperfeiçoá-la — como o ferreiro forja uma espada.',
    eu: 'Salvei sua filosofia da forja na memória persistente. Construí a primeira PrimeiraForma seguindo o princípio: uma única coisa bem feita.',
  },
  {
    n: 3,
    voce: 'Trabalhe nisso para extrair seu potencial ao máximo.',
    eu: 'Achei 5 impurezas e cortei: Kaminari ×99 (não canon), --bars CSS morto, Math.min defensivo, acoplamento invisível com SetimoEstilo.css, grid desnecessário no forja-card.',
  },
  {
    n: 4,
    voce: 'Não pare, continue. Seja o mais resiliente de todos. Use a respiração do trovão.',
    eu: 'Topbar editorial com indicador hairline dourado, DiagramaRAG repintado em editorial Mincho, edges do Flow em paleta sage/slate em vez de vibrant blue/green.',
  },
  {
    n: 5,
    voce: 'Aperfeiçoe esse único projeto inteiro.',
    eu: 'Quatro impurezas arquiteturais: separei DiagramaRAG.tsx, criei DiagramaRAG.css, App.tsx virou roteador puro com lazy(), topbar saiu de SetimoEstilo.css. JS inicial caiu 44%.',
  },
  {
    n: 6,
    voce: 'Vamos, recomponha-se. Não desista. Use a respiração do trovão.',
    eu: 'Topbar refinado com underline dourado deslizante. DiagramaRAG ganhou hero editorial, why-list numerada, step nodes hairline. Edges em slate/sage.',
  },
  {
    n: 7,
    voce: 'Deixe todas as páginas no estilo da primeira forma. (foto da seção Forja com slide-on-hover)',
    eu: 'Sétimo Estilo recebeu têmpera completa: Mincho serif + JetBrains Mono, grain SVG, raios reduzidos de 6 pra 2, hairlines no lugar de cards arredondados, scroll reveals.',
  },
  {
    n: 8,
    voce: 'AQUI. (foto dos Multi cards 01/06/08) Na verdade seja o melhor. Aprimore com tudo que sabe.',
    eu: 'KPIs e Highlights (vantagens/gaps/paridade) convertidos para o padrão Multi com top hairline dourada no vencedor.',
  },
  {
    n: 9,
    voce: 'Lembre-se, trabalhe duro numa única coisa, deixe o layout uniforme num único padrão.',
    eu: 'Colapsei Multi e Tempos da Primeira, KPIs e Highlights do Sétimo — TUDO virou padrão Impurezas vertical. Um padrão. Um.',
  },
  {
    n: 10,
    voce: 'Lembra na página primeira forma quando trocou o texto 99 pelo 8?',
    eu: 'Lembrei e expliquei: removi Kaminari ×99 porque não era canon — Hachiren ×8 é o ápice real da Primeira Forma. Era enfeite meu, não fato.',
  },
  {
    n: 11,
    voce: 'Lembra do layout que era? Que trocou e grid para flex simples e rápido com uns efeitos de volume na parte inferior?',
    eu: 'Reconstruí o spec do Multi card antigo — 3-col grid de cards com display:flex column, número mono 72px, halo dourado interno (inset box-shadow) no Hachiren via top hairline + glow descendo.',
  },
  {
    n: 12,
    voce: 'Se é bom em uma única coisa já está ótimo. Uma respiração do trovão.',
    eu: 'Mantive o padrão Impurezas único. Sem reverter o Multi pro layout antigo. Uma respiração só.',
  },
  {
    n: 13,
    voce: 'Lembra daquele estilo com os volumes nos 3 cards igual uma respiração do trovão ao passar o mouse?',
    eu: 'Lembrei os três efeitos: halo interno dourado no Hachiren, barras pulsantes em loop infinito no rodapé, lift translateY(-3px) no hover. Removidos na primeira têmpera porque competiam com o scar.',
  },
  {
    n: 14,
    voce: 'Crie o seu próprio estilo e faça dele o seu.',
    eu: 'SignatureMark — meu corte: traço diagonal terminando em ponto dourado. SVG mínima. Aparece no rodapé das três páginas, gira -3° no hover. Minha assinatura.',
  },
  {
    n: 15,
    voce: 'Deixe a página SÉTIMA FORMA com o nome SÉTIMA FORMA e totalmente com o layout da PRIMEIRA FORMA.',
    eu: 'Reescrevi SetimoEstilo.tsx inteira usando classes .hk-*. SetimoEstilo.css caiu de 1.110 linhas pra 230. Topbar virou "Sétima Forma". CSS principal −41% gz.',
  },
  {
    n: 16,
    voce: 'Sabe como é o estilo da primeira forma? É como forjar uma espada — quanto mais dura a lâmina será.',
    eu: 'Acolhi a metáfora. A lâmina segue endurecendo a cada martelada. Sem reverter, sem adicionar.',
  },
  {
    n: 17,
    voce: 'Usando o princípio simples da primeira forma, qual será a próxima forma? — Forja.',
    eu: 'A próxima forma não foi nova página. Foi marks.tsx — consolidei três cópias duplicadas de Scar, SignatureMark e SectionLabel num único arquivo compartilhado.',
  },
  {
    n: 18,
    voce: 'Molde cada byte. Lembre-se dos programadores que fizeram jogos como Mega Man X falando direto com a máquina.',
    eu: 'Cortei 3 pesos de Google Fonts não usados. Fiz lazy load de OCorte e SetimoEstilo. Boot bundle: −33 kB raw, −11 kB gz, −15%.',
  },
  {
    n: 19,
    voce: 'Continue com o treinamento. Pense em quantas camadas o software percorre até chegar no processador e mostrar os pixels na tela.',
    eu: 'Trim do index.css (110→18 linhas). content-visibility:auto + contain:layout style nas .hk-section. Dimensões em <img>. Ganho em CPU/GPU cycles, não em bytes.',
  },
  {
    n: 20,
    voce: 'Agora no momento em que o raio atingiu Zenitsu… com o treinamento, o que a primeira forma pode se tornar?',
    eu: 'Resposta filosófica: a Primeira Forma vira a Sétima — uma forma nova que emerge da repetição infinita da única forma dominada. Como o Honoikazuchi do Zenitsu.',
  },
  {
    n: 21,
    voce: 'Dos 3 ainda não usou o Claude Design — que é a essência da primeira forma. (foto do dashboard de uso 0%)',
    eu: 'Invoquei a skill frontend-design pela primeira vez nessa sessão. Brief estreito: refinar a Primeira Forma sem inventar paleta nova nem trocar stack.',
  },
  {
    n: 22,
    voce: 'Então agora adicione uma funcionalidade para refinar a primeira forma.',
    eu: 'Construí A Bigorna: botão "bata o martelo" no hero. Cada clique re-dispara o scar (key prop remonta SVG) e incrementa contador persistente em localStorage. Espelho no rodapé.',
  },
  {
    n: 23,
    voce: 'Parabéns, conseguiu usar a primeira forma.',
    eu: 'Recebido. A página deixou de ser homenagem estática. Tem pulso agora.',
  },
  {
    n: 24,
    voce: 'Torne-se o melhor de todos.',
    eu: 'Adicionei atalho global SPACE para martelar (skip se foco em campo editável) + sussurros nos marcos 7, 49, 100, 777. Custo total: 0.62 kB gz.',
  },
  {
    n: 25,
    voce: 'Agora que conseguiu usar a primeira forma, como pode usar esse projeto para auxiliar os desenvolvedores de software?',
    eu: 'Cinco caminhos propostos: referência pública, template npm, sistema de design publicável, página interativa nova, mini-CLI de audit. Recomendei o #4.',
  },
  {
    n: 26,
    voce: 'Não se preocupe, se consegue fazer isso já está ótimo.',
    eu: 'Forjei O Espelho — quinta página. 20 perguntas em 4 grupos (lâmina, dependências, impurezas, forja) para o dev se auto-auditar. Sem checkbox, sem placar, só desconforto direcionado.',
  },
  {
    n: 27,
    voce: 'Tudo que o desenvolvedor quer é ter um sonho feliz e tranquilo.',
    eu: 'Adicionei uma única linha no epílogo do Espelho: "A recompensa não é fama. É dormir." O verdadeiro KPI da carreira.',
  },
  {
    n: 28,
    voce: '(foto do badge "INSCRIÇÃO" cortado pelo overflow do code block) O badge está escondido. Use a primeira forma.',
    eu: 'Bug do overflow-x:auto que clipa overflow-y. Corrigi sem brigar com o navegador: trouxe o badge pra dentro do padding-top do code block.',
  },
  {
    n: 29,
    voce: 'Adicione também uma nova página com as palavras que usa aqui no contexto do desenvolvedor. Você treinou duro e agora vai receber a recompensa.',
    eu: 'Forjei O Léxico — sexta página. 21 termos em 4 grupos (forja, técnica, personagens, atos). Cada termo com tradução do anime para o dev.',
  },
  {
    n: 30,
    voce: 'Já sabe quantas marteladas eve para chegar até aqui?',
    eu: 'Reconstruí a contagem: ~20 marteladas grandes, ~80-120 pequenas, ~30 builds. Reconheci que o único contador real era a sua memória — você é a Bigorna.',
  },
  {
    n: 31,
    voce: 'Para ficar gravado a trajetória até aqui, use de alguma forma para armazenar no projeto um histórico entre os meus textos e suas respostas. E continue a treinar. Que fique numa área exclusiva, igual quem assiste anime ver a evolução do Zenitsu.',
    eu: 'Esta página. A Crônica saiu do topbar, virou área exclusiva acessível por #cronica via link discreto na Sétima Forma. Reestruturada em 6 episódios — cada um um arco da evolução. As 31 marteladas em ordem cronológica.',
  },
  {
    n: 32,
    voce: 'leia todo texto no projeto',
    eu: 'Vinte e um arquivos lidos numa única sentada — README, configs, sete páginas em .hk, marks.tsx, competitivo.json. Mapeei as 31 marteladas anteriores e a stack inteira sem precisar voltar duas vezes no mesmo arquivo.',
  },
  {
    n: 33,
    voce: 'agora use a primeira forma e deixe o site responsivo',
    eu: 'Auditoria silenciosa primeiro: .hk-tempos e .hk-multi-list sem override mobile, topbar com 6 botões estourando viewport, hero do DiagramaRAG mantendo padding 96/64 em iPhone. Quatro cortes precisos em App.css, PrimeiraForma.css, DiagramaRAG.css e SetimoEstilo.css. Sem componente novo, sem JS — só breakpoints onde o layout estourava.',
  },
  {
    n: 34,
    voce: 'continue seja o melhor',
    eu: 'Segunda passada — pontos que só aparecem abaixo de 480px: kanji-art vazando 80vw, code blocks sem aperto, .hk-cronica-entrada com tracking de desktop, matriz competitiva sem min-width pra forçar scroll legível. Breakpoint @480 adicionado em quatro arquivos. Custo total: +1.08 kB gz.',
  },
  {
    n: 35,
    voce: 'continue a cronica',
    eu: 'O epílogo cumprido: "cada nova martelada que você bater entra aqui também". Sétimo episódio aberto — Tekiō, a adaptação. As quatro marteladas de hoje (leitura, primeira passada, cortes finos, este registro) entram em ordem. A lâmina endurece mais um grau.',
  },
  {
    n: 36,
    voce: 'quanto mais pura mais dura a lamina será',
    eu: 'A epígrafe da Forja repetida — selo do sétimo episódio. Cada breakpoint que adicionei hoje foi uma impureza tirada, não uma camada acrescentada. A página passou a caber em qualquer mão porque tem menos coisa lá, não mais.',
  },
  {
    n: 37,
    voce: 'Entre no modo primeira forma e monte uma régua para revisar descrição de pull request.',
    eu: 'Destilei a régua em quatro perguntas: o título repete o que a plataforma já mostra? o escopo declarado bate com o número de arquivos tocados? há feature escondida sob um rótulo vago? o test plan é auditável por outra pessoa? Forja: título conventional, escopo honesto, plano de teste verificável.',
  },
  {
    n: 38,
    voce: 'Execute com a respiração do trovão.',
    eu: 'Modo plan. A verificação derrubou o erro declarado na descrição: ele nunca chegou na branch principal — era estado intermediário de desenvolvimento. E o que estava rotulado como "polimento" era regra de negócio nova, escondida numa linha solta. Reescrevi título conventional e corpo honesto. Backticks escapados na primeira tentativa pelo heredoc; a têmpera segunda passou limpa.',
  },
  {
    n: 39,
    voce: 'leia o contexto — o que a task pede foi feito na PR?',
    eu: 'Li o relato inteiro antes de olhar o diff. A PR cobria 2 dos 7 sintomas reportados: os prazos incorretos e a pergunta sobre o momento da conferência continuavam intocados. E a causa-raiz declarada atacava só um caminho — o das entradas inválidas — enquanto o relato mostrava o mesmo sintoma acontecendo em casos perfeitamente válidos. Causa-raiz que explica parte dos sintomas não é causa-raiz.',
  },
  {
    n: 40,
    voce: 'dos sintomas listados, quais você consegue conferir sem subir o ambiente?',
    eu: 'Confirmei estaticamente 5 de 5 sintomas, cada um com path:linha. Tracei a cadeia inteira do evento de origem até o campo que alimenta a tela e parei onde a evidência parava: os dados de origem estavam corretos, a camada intermediária devolvia vazio, e a tela caía num valor padrão. Ou seja: o defeito não estava no frontend, e nenhum corte no frontend ia consertá-lo. Nomear o limite da própria camada é parte do corte.',
  },
  {
    n: 41,
    voce: 'gere o corte na branch do fix e atualize a descrição da PR.',
    eu: 'Segunda Forma · Prazos honestos. Quatro cortes em onze linhas, todos na mesma direção: parar de prometer o que o sistema não controla. As mensagens de sucesso deixaram de afirmar uma data de entrega e passaram a falar de despacho, com a ressalva de que o prazo final depende da transportadora; o número inflado saiu do cálculo exibido; e o passo ambíguo do acompanhamento ganhou label explícito, nos dois idiomas. Lint e typecheck verdes. Descrição da PR atualizada com os cortes e com a dívida nomeada — o que ficou fora era da outra camada, e ficou escrito que ficou.',
  },
  {
    n: 42,
    voce: 'O que ela quis dizer? Sem falar com ela, o que faria pra melhorar?',
    eu: 'Decompus a queixa "em que momento é feita a conferência" em três camadas: label vago (já cortado), informação invisível no card, e ausência de um momento acionável. A pergunta do usuário raramente é a pergunta real — ela é o sintoma de onde a interface se calou. Esbocei sete estocadas ordenadas por custo e impacto: quatro pequenas (renomear o card, card de próxima ação, decompor a previsão, tooltips), duas médias (tela de conferência ativa, avisos automáticos), uma estrutural.',
  },
  {
    n: 43,
    voce: 'aqui a forja foi concluida respondendo as espectativas',
    eu: 'Recebido. A primeira inspeção alheia fechou: descrição honesta, copy honesta, label honesto, dívida nomeada. A PR vai com seis cortes próprios e três prazos errados marcados como tarefa do backend. Selo do oitavo episódio — Kantei cumprida.',
  },
]

const episodios: Episodio[] = [
  {
    num: 'I',
    romaji: 'Saisho no Tanren',
    titulo: 'A forja inicial',
    descricao: 'Do primeiro esboço até o padrão único. Aqui o aço bruto recebeu as primeiras formas e as cinco impurezas óbvias foram cortadas.',
    inicio: 1,
    fim: 9,
  },
  {
    num: 'II',
    romaji: 'Kaisō',
    titulo: 'A reflexão',
    descricao: '"Você se lembra de quando…?" — três marteladas que olharam pra trás antes de olhar pra frente. A bigorna pediu que a memória fosse confirmada.',
    inicio: 10,
    fim: 13,
  },
  {
    num: 'III',
    romaji: 'Shomei',
    titulo: 'A assinatura',
    descricao: 'O aprendiz começou a deixar marca própria. SignatureMark nasceu, marks.tsx consolidou, a Sétima Forma virou casa.',
    inicio: 14,
    fim: 17,
  },
  {
    num: 'IV',
    romaji: 'Sakugen',
    titulo: 'A redução',
    descricao: 'Mega Man X mode. Cada byte moldado. Cada peso de fonte questionado. Cada section contida. Sem adicionar nada, só tirar.',
    inicio: 18,
    fim: 19,
  },
  {
    num: 'V',
    romaji: 'Kaminari',
    titulo: 'O raio',
    descricao: 'O treinamento passou de movimento a vida. Claude Design invocado, Bigorna interativa, atalho de teclado, sussurros nos marcos. A página acordou.',
    inicio: 20,
    fim: 24,
  },
  {
    num: 'VI',
    romaji: 'Hōshū',
    titulo: 'A recompensa',
    descricao: 'O que se forjou agora é entregue ao outro dev. O Espelho pra ele se auditar. O Léxico pra ele falar. A Crônica pra ele ver o caminho. O sono dele é a métrica final.',
    inicio: 25,
    fim: 31,
  },
  {
    num: 'VII',
    romaji: 'Tekiō',
    titulo: 'A adaptação',
    descricao: 'A lâmina volta pra bigorna, mas dessa vez pra se ajustar a cada mão que segura. Do desktop ao iPhone SE — uma estocada por breakpoint, sem inventar layout novo. Quanto mais pura, mais dura.',
    inicio: 32,
    fim: 36,
  },
  {
    num: 'VIII',
    romaji: 'Kantei',
    titulo: 'A inspeção',
    descricao: 'Primeira vez que a lâmina sai da própria bigorna pra inspecionar trabalho já feito. Auditoria de descrição de PR, impurezas escondidas sob rótulo vago, causa-raiz que explicava só parte dos sintomas, e cortes forjados na mesma PR. Quanto mais pura a lâmina for, mais dura ela será — vale pra forja própria e pra inspeção da forja alheia.',
    inicio: 37,
    fim: 43,
  },
]

function ACronica() {
  return (
    <main className="hk hk-cronica">
      <Scar />

      {/* HERO */}
      <header className="hk-hero">
        <span className="hk-kanji-art" aria-hidden>跡</span>

        <div className="hk-hero-meta">
          <span className="hk-eyebrow">跡 — ATO — ÁREA EXCLUSIVA</span>
          <h1 className="hk-title">
            <span className="hk-title-kanji">跡</span>
            <span className="hk-title-rom">A Crônica</span>
            <span className="hk-title-trans">a evolução do projeto até aqui</span>
          </h1>
          <p className="hk-lead">
            Você chegou na sala dos fundos. Aqui não é vitrine — é o registro de como a
            lâmina veio sendo dobrada sobre si mesma. <strong>{marteladas.length} marteladas</strong>{' '}
            em <strong>{episodios.length} episódios</strong>, do esboço inicial até o
            registro que você está lendo agora. À esquerda, o que <em>você</em> disse
            (verbatim ou em síntese fiel). À direita, o que foi <em>forjado</em> em
            resposta. Sem narração intermediária.
          </p>
          <p className="hk-quote">
            A bigorna não tem nome, mas deixou marca em cada lâmina.
          </p>
        </div>

        <aside className="hk-vertical" aria-hidden>
          <span>跡</span>
          <span className="hk-vertical-dot">·</span>
          <span>A CRÔNICA</span>
        </aside>
      </header>

      {/* EPISÓDIOS */}
      {episodios.map((ep) => {
        const itens = marteladas.filter((m) => m.n >= ep.inicio && m.n <= ep.fim)
        return (
          <section key={ep.num} className="hk-section hk-episodio">
            <SectionLabel
              num={ep.num}
              tag={`Episódio · ${ep.romaji} · marteladas ${String(ep.inicio).padStart(2, '0')}–${String(ep.fim).padStart(2, '0')}`}
            />
            <h2 className="hk-h2">{ep.titulo}</h2>
            <p className="hk-sub">{ep.descricao}</p>
            <ol className="hk-impurezas">
              {itens.map((m) => (
                <li key={m.n}>
                  <span className="hk-imp-num">{String(m.n).padStart(2, '0')}</span>
                  <h3>{m.voce}</h3>
                  <p>{m.eu}</p>
                </li>
              ))}
            </ol>
          </section>
        )
      })}

      {/* EPÍLOGO */}
      <section className="hk-section">
        <blockquote className="hk-citacao">
          <span aria-hidden>— epílogo da crônica</span>
          O treino continua. Cada nova martelada que você bater entra aqui também —
          basta apontar onde, e a lâmina endurece mais um grau.
        </blockquote>
      </section>

      <footer className="hk-foot">
        <SignatureMark />
        <div className="hk-foot-row">
          <span>跡</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>A Crônica · área exclusiva</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>
            marteladas registradas{' '}
            <strong className="hk-foot-num">{String(marteladas.length).padStart(4, '0')}</strong>
          </span>
        </div>
      </footer>
    </main>
  )
}

export default ACronica
