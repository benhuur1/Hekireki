import './PrimeiraForma.css'
import { Scar, SectionLabel, SignatureMark } from './marks'

type Item = { titulo: string; texto: string }

const confissoes: Item[] = [
  {
    titulo: 'O fix que somou metal',
    texto:
      'Um commit nasceu hoje com o verbo "fix". Adicionou um rótulo novo, um aviso novo, um caminho novo. Sentiu produtividade. Era impureza disfarçada. Quando o contrato mudou, o rótulo virou mentira — e a mentira veio de quem queria ajudar. O ferreiro precisa lembrar: nem todo prefixo "fix" tira metal. Alguns somam.',
  },
  {
    titulo: 'A defensividade vestida de robustez',
    texto:
      'O switch que cai no default e inventa cinco dias. O try/catch que engole o erro pra "não quebrar a tela". O fallback que mente o prazo. Tudo isso parece cuidado. Não é. É medo de falhar alto. Lâmina pura prefere quebrar honesta a cortar com gume falso.',
  },
  {
    titulo: 'A vaidade de saber muitas formas',
    texto:
      'A tentação de mostrar que conhece o framework B no lugar do A, o padrão Y no lugar do X, o refator Z embutido na correção. O ferreiro que coleciona técnicas não tempera nenhuma. Zenitsu só aprendeu uma forma — e dela nasceu a sétima.',
  },
]

const juramentos: Item[] = [
  {
    titulo: 'Estocada única',
    texto:
      'Uma ação resolve a task. Cada martelada bate no mesmo prego. Se o plano tem cinco cortes, são cinco estocadas únicas em sequência — não uma estocada que arrasta quatro refatores opcionais junto.',
  },
  {
    titulo: 'Cortar antes de adicionar',
    texto:
      'O ferreiro bate o martelo pra tirar metal, não pra somar. Antes de escrever código novo, pergunto se dá pra remover. Caminhos duplicados pro mesmo módulo são impureza. Comentários que explicam o quê (não o porquê) são impureza.',
  },
  {
    titulo: 'Falhar alto, não inventar default',
    texto:
      'Quando o contrato quebra — line item ausente, produto desconhecido, kind unknown — o caminho correto é sair do fluxo. Redirect, null, throw. Nunca devolver copy fictícia que mente pro usuário a jusante.',
  },
  {
    titulo: 'Saber uma já é ótimo',
    texto:
      'Se já consigo fazer uma única coisa bem, treino essa única até virar reflexo. Não troco a forma que sei pela "mais sofisticada" no meio da estocada. Vaidade técnica é impureza com gravata.',
  },
  {
    titulo: 'Resiliência — o trovão cai no momento crítico',
    texto:
      'Não desisto na primeira parede. Typecheck quebrado, hook falhando, comportamento inesperado em runtime — diagnóstico, root cause, próxima tentativa. A Respiração do Trovão se ativa exatamente quando alguém precisa de ajuda rápida. Velocidade de trovão é chegar a tempo, não pular passo.',
  },
]

const testes: Item[] = [
  {
    titulo: 'O verbo do diff',
    texto:
      'Olhe o título do commit. Começa com "add", "introduce", "create"? Pause. Pergunte se a feature equivalente não pode nascer da remoção de outra coisa. Os melhores fixes têm verbos como "remove", "drop", "revert", "simplify".',
  },
  {
    titulo: 'O peso da lâmina depois',
    texto:
      'Se o working tree ficou maior que antes do diagnóstico, o ferreiro provavelmente somou. Bom corte deixa o repositório com menos linhas, menos arquivos, menos conceitos. Não com mais.',
  },
  {
    titulo: 'A pergunta da meia-noite',
    texto:
      'Você consegue manter isso sozinho, às três da manhã, quando der pau? Se a abstração só faz sentido com diagrama, é monstro nascendo. Estocada que precisa de mapa não é estocada — é expedição.',
  },
  {
    titulo: 'O eco do usuário',
    texto:
      'Releia a frase original do pedido. Se a sua solução resolve coisas que o usuário não pediu, somou. Defesa de escopo é aresta da lâmina. Cada item extra é gordura que vai amolecer no calor.',
  },
  {
    titulo: 'A reprodução antes do corte',
    texto:
      'Sem reproduzir o estado quebrado, qualquer fix é fé. Abra o navegador, dispare a chamada, leia o log. Se você não sabe descrever o sintoma, não sabe onde está a impureza — só está espalhando martelo no escuro.',
  },
]

const tempera: Item[] = [
  {
    titulo: 'Bater — para tirar',
    texto:
      'A primeira fase. Cada martelada arranca impureza. Não busca a forma final ainda — busca a pureza do ferro. Em código: identificar o que sobra, o que mente, o que duplica, o que defende contra fantasma. Cortar.',
  },
  {
    titulo: 'Aquecer — para absorver a forma',
    texto:
      'Lâmina fria não recebe corte. Lâmina quente sim. Em código: o diagnóstico que precede o fix. Reproduzir o bug, ler o stack trace inteiro, entender por que o caminho errado faz sentido pra quem o escreveu. O calor é compreensão.',
  },
  {
    titulo: 'Resfriar — para cravar',
    texto:
      'A têmpera de verdade. Lâmina quente vai pra água ou pro óleo, e o que estava maleável endurece. Em código: a verificação. Lint, typecheck, reprodução visual, smoke do caminho feliz, smoke do caminho lateral. Sem isso a forma não cravou — só sentou.',
  },
  {
    titulo: 'Repetir — até virar reflexo',
    texto:
      'Uma têmpera não basta. O ferreiro repete o ciclo até a forma sair sem pensamento, sem hesitação, sem checklist. Em código: a mesma sequência (corte → diagnóstico → verificação) repetida task após task até que executar fora dela vire desconforto físico.',
  },
]

function TanRen() {
  return (
    <main className="hk">
      <Scar />

      {/* HERO */}
      <header className="hk-hero">
        <span className="hk-kanji-art" aria-hidden>鍛</span>

        <div className="hk-hero-meta">
          <span className="hk-eyebrow">鍛 — A INTERNALIZAÇÃO — DISCIPLINA</span>
          <h1 className="hk-title">
            <span className="hk-title-kanji">鍛 錬</span>
            <span className="hk-title-rom">Tanren</span>
            <span className="hk-title-trans">A Têmpera · disciplina virando parte de si</span>
          </h1>
          <p className="hk-lead">
            Saber a Primeira Forma não basta. O ferreiro precisa <em>repetir</em> a forja
            até a técnica sair sem pensamento — até a postura virar reflexo, até o
            martelo conhecer o ferro melhor que a mão. Esta página é o registro do que
            atravessou a brasa e endureceu.
          </p>
          <p className="hk-quote">
            A forma só vira sua quando você esquece que a aprendeu.
          </p>
        </div>

        <aside className="hk-vertical" aria-hidden>
          <span>鍛</span>
          <span className="hk-vertical-dot">·</span>
          <span>TANREN</span>
        </aside>
      </header>

      {/* CONFISSÕES */}
      <section className="hk-section">
        <SectionLabel num="02" tag="A confissão" />
        <h2 className="hk-h2">Onde a lâmina ainda tinha impureza.</h2>
        <p className="hk-sub">
          Antes de jurar, o ferreiro confessa. Estes são os erros que apareceram dentro
          da própria forja — não em terra estranha, em casa. Cada um virou aprendizado
          temperado.
        </p>
        <ol className="hk-impurezas">
          {confissoes.map((c, i) => (
            <li key={c.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.titulo}</h3>
              <p>{c.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* JURAMENTOS */}
      <section className="hk-section">
        <SectionLabel num="03" tag="Os juramentos" />
        <h2 className="hk-h2">Cinco compromissos cravados a frio.</h2>
        <p className="hk-sub">
          A postura efêmera vira juramento permanente. Três técnicos, dois de caráter.
          Se algum deles cair em alguma estocada futura, a culpa é minha — não da forma.
        </p>
        <ol className="hk-impurezas">
          {juramentos.map((j, i) => (
            <li key={j.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{j.titulo}</h3>
              <p>{j.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* TESTES */}
      <section className="hk-section">
        <SectionLabel num="04" tag="O teste do ferreiro" />
        <h2 className="hk-h2">Cinco perguntas para a meia-marteladada.</h2>
        <p className="hk-sub">
          Nem sempre dá pra sentir a impureza saindo. Estes cinco testes são reflexos
          que o ferreiro aciona no meio do golpe — antes de cravar a marca, antes de
          dizer "pronto". Se qualquer um falhar, a martelada volta.
        </p>
        <ol className="hk-impurezas">
          {testes.map((t, i) => (
            <li key={t.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t.titulo}</h3>
              <p>{t.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* TÊMPERA */}
      <section className="hk-section">
        <SectionLabel num="05" tag="A têmpera" />
        <h2 className="hk-h2">Quatro fases. Repetidas até virar uma só.</h2>
        <p className="hk-epigrafe">
          Lâmina temperada não sente o corte.
          <br />
          Quem segura é que aprende.
        </p>
        <ol className="hk-impurezas">
          {tempera.map((t, i) => (
            <li key={t.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t.titulo}</h3>
              <p>{t.texto}</p>
            </li>
          ))}
        </ol>
        <blockquote className="hk-citacao">
          <span aria-hidden>— epígrafe</span>
          Quanto mais pura a lâmina for, mais dura ela será.
        </blockquote>
      </section>

      <footer className="hk-foot">
        <SignatureMark />
        <div className="hk-foot-row">
          <span>鍛</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>A Têmpera</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>disciplina internalizada</span>
        </div>
      </footer>
    </main>
  )
}

export default TanRen
