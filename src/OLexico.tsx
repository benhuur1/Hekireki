import './PrimeiraForma.css'
import { Scar, Secao, SignatureMark, type SecaoItem } from './marks'

const aForja: SecaoItem[] = [
  {
    titulo: 'Bigorna',
    texto:
      'No anime, a base de ferro onde a lâmina é moldada. No dev, é o ambiente de trabalho onde você itera — npm run dev rodando, hot reload, console aberto, terminal sem dezessete tabs. O lugar onde você bate o martelo todos os dias.',
  },
  {
    titulo: 'Forja',
    texto:
      'O ato de moldar com intenção. Não é "bug fix", não é "feature". É purificação deliberada do código que já existe. A maioria dos devs constrói; poucos forjam.',
  },
  {
    titulo: 'Lâmina',
    texto:
      'A katana finalizada. No dev, é o código que entra em produção limpo, focado, capaz de cortar o problema sem levar dano de volta. Toda lâmina passou por mil marteladas — nenhuma nasce pronta.',
  },
  {
    titulo: 'Impureza',
    texto:
      'O ferro que não serve, presente no aço bruto. No dev: dependência não usada, abstração prematura, feature flag esquecida, console.log que ficou, três cópias da mesma função, // TODO: refactor later de seis meses atrás. Você sabe quais são as suas.',
  },
  {
    titulo: 'Martelada',
    texto:
      'Cada golpe na bigorna. No dev, cada iteração de refatoração — cada commit que corta mais do que adiciona. Conta. Quem só constrói acumula peso; quem martela tira peso.',
  },
  {
    titulo: 'Têmpera',
    texto:
      'O processo de submeter a lâmina ao fogo e à água em sequência. No dev: load test, edge case, condição de rede ruim, race condition simulada. A lâmina endurece quando passa pelos extremos.',
  },
]

const aTecnica: SecaoItem[] = [
  {
    titulo: 'Primeira Forma',
    texto:
      'Uma única técnica executada com perfeição. No dev: a UMA coisa que seu software faz bem. Resista à tentação de adicionar a segunda — vai virar duas coisas mal feitas em vez de uma feita perfeitamente.',
  },
  {
    titulo: 'Hekireki Issen (霹靂一閃)',
    texto:
      '"Trovão e Relâmpago" — o golpe único e instantâneo. No dev: a iteração mais focada possível. Uma chamada HTTP. Uma função. Uma transação. Sem cerimônia, sem framework intermediário, sem orquestrador inventando complexidade.',
  },
  {
    titulo: 'Hachiren (八連)',
    texto:
      'Oito cortes da Primeira Forma em sequência — o ápice do golpe. No dev: a mesma operação multiplicada em batch ou paralelizada. Você não inventou um golpe novo — multiplicou o que já dominava. Composição vence invenção.',
  },
  {
    titulo: 'Sétima Forma · Honoikazuchi no Kami',
    texto:
      'A forma que Zenitsu criou sozinho da Primeira. No dev: o padrão que emerge quando você executa o mesmo padrão tantas vezes que uma variação aparece — sem você ter procurado. Não foi planejada. Foi descoberta pela repetição.',
  },
  {
    titulo: 'Respiração',
    texto:
      'A base que sustenta toda forma. No dev, a disciplina de fundo: linter rodando, testes passando, tipos checando, CI verde. A forma vem em cima dessa respiração — sem ela, qualquer técnica colapsa no primeiro impacto.',
  },
]

const osPersonagens: SecaoItem[] = [
  {
    titulo: 'Zenitsu Agatsuma',
    texto:
      'O dev medroso. Treme antes de qualquer escolha técnica grande. Foge de stand-up. Mas executa a Primeira Forma com perfeição mortal quando precisa — porque é a única forma que ele sabe fazer, e ele a sabe MELHOR que ninguém. A maioria dos devs sêniores se reconhecem aqui em silêncio.',
  },
  {
    titulo: 'Mestre Jigoro Kuwajima',
    texto:
      'O senior dev / arquiteto que viu tudo. Pouco fala, muito aponta. Treina o aprendiz por anos esperando que UM dia ele entenda — e UM dia ele entende. Geralmente sem aviso, no meio de um deploy.',
  },
  {
    titulo: 'Tengen Uzui',
    texto:
      'O dev que escolhe a stack mais brilhante. Três esposas, três Kubernetes clusters, três bancos. Funciona porque tem talento bruto — não porque a escolha foi boa. Tem fim trágico em retrospectiva: o sucessor herda a complexidade sem herdar o talento.',
  },
  {
    titulo: 'Inosuke Hashibira',
    texto:
      'O dev autodidata que inventou a stack apanhando. Não teve mestre, então virou o próprio mestre. Faz tudo com VPS + bash + git push e funciona melhor que muito sistema "oficial" de empresa grande. Subestima documentação. Tem cicatrizes.',
  },
  {
    titulo: 'Hashira (柱)',
    texto:
      'Pilar. O senior do senior. Define padrões pro time. Executa a Primeira Forma com tanta naturalidade que parece fácil — e é justamente isso que custou anos pra aprender. Quem chega perto vê só o resultado limpo, não as dez mil marteladas.',
  },
]

const osAtos: SecaoItem[] = [
  {
    titulo: 'Cortar',
    texto:
      'Deletar código. A ação mais subestimada da indústria. Devs juniores escrevem; devs sêniores deletam. Cada linha cortada é uma linha que você não vai precisar manter, debugar, atualizar ou explicar pro próximo.',
  },
  {
    titulo: 'Bater o martelo',
    texto:
      'Iterar sobre código existente até ele ficar mais simples. Não é refactor "pra acomodar nova feature" — é refactor "pra remover o que sobra." Atividade rara em ambiente que mede só features entregues por sprint.',
  },
  {
    titulo: 'Forjar',
    texto:
      'Construir algo novo com intenção clara. Não construir "porque tinha tempo." Construir porque tem necessidade comprovada. Antes de forjar, pergunte: "se essa coisa não existir, quem perde o quê?"',
  },
  {
    titulo: 'Despertar',
    texto:
      'O momento em que o dev percebe — sem anúncio, sem certificado — que dominou algo. Não tem confete. Tem a tranquilidade de pegar uma tarefa nova e saber, antes de abrir o editor, exatamente como vai resolver.',
  },
  {
    titulo: 'Dormir',
    texto:
      'A recompensa final. Não fama, não reconhecimento, não LinkedIn. Oito horas seguidas sem PagerDuty vibrando. O verdadeiro KPI da carreira de software — e o único que ninguém mede.',
  },
]

function OLexico() {
  return (
    <main className="hk">
      <Scar />

      {/* HERO */}
      <header className="hk-hero">
        <span className="hk-kanji-art" aria-hidden>辞</span>

        <div className="hk-hero-meta">
          <span className="hk-eyebrow">辞 — JITEN — VOCABULÁRIO</span>
          <h1 className="hk-title">
            <span className="hk-title-kanji">辞</span>
            <span className="hk-title-rom">O Léxico</span>
            <span className="hk-title-trans">dicionário do trovão para devs</span>
          </h1>
          <p className="hk-lead">
            Você passou pelas cinco páginas. Treinou. Bateu o martelo. Olhou no espelho. Esta é
            a recompensa: <em>todas as palavras que esse projeto usa</em>, traduzidas pro
            contexto do desenvolvedor. Pra você levar embora e usar nas suas próprias
            conversas técnicas — em retro, em entrevista, em code review, em decisão de
            arquitetura.
          </p>
          <p className="hk-quote">
            O vocabulário não é decorativo. É como você organiza o que vê.
          </p>
        </div>

        <aside className="hk-vertical" aria-hidden>
          <span>辞</span>
          <span className="hk-vertical-dot">·</span>
          <span>O LÉXICO</span>
        </aside>
      </header>

      <Secao
        num="02"
        tag="A forja"
        h2="As palavras do trabalho diário."
        sub="Os termos que descrevem o ato de produzir software — não a teoria, mas o gesto. Use no stand-up amanhã."
        items={aForja}
      />

      <Secao
        num="03"
        tag="A técnica"
        h2="As palavras do que você faz."
        sub="As formas em si — desde a estocada única até a respiração que sustenta tudo. Estes são os substantivos do ofício."
        items={aTecnica}
      />

      <Secao
        num="04"
        tag="Os personagens"
        h2="As palavras de quem você conhece."
        sub="Cada arquétipo do anime tem seu correspondente direto na indústria. Você já trabalhou com cada um deles. Talvez seja um deles."
        items={osPersonagens}
      />

      <Secao
        num="05"
        tag="Os atos"
        h2="As palavras dos verbos."
        sub="O que você faz quando pega o teclado. A diferença entre os bons devs e os outros é a proporção dessas ações no dia."
        items={osAtos}
      />

      <section className="hk-section">
        <blockquote className="hk-citacao">
          <span aria-hidden>— epílogo do léxico</span>
          Use as palavras. Quando você nomeia uma impureza, ela vira concreta — e
          coisas concretas podem ser cortadas.
          <br />
          <br />
          Quando você não tem nome pra ela, ela continua invisível, te roubando o sono.
        </blockquote>
      </section>

      <footer className="hk-foot">
        <SignatureMark />
        <div className="hk-foot-row">
          <span>辞</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>O Léxico</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>vinte e um termos pra levar embora</span>
        </div>
      </footer>
    </main>
  )
}

export default OLexico
