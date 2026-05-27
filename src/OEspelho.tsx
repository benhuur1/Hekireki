import './PrimeiraForma.css'
import { Scar, SectionLabel, SignatureMark } from './marks'

type Pergunta = { texto: string; nota: string }

const aLamina: Pergunta[] = [
  {
    texto: 'Qual é a UMA coisa que seu produto faz?',
    nota: 'Se você precisar de duas frases, ele já faz duas coisas. Cuidado.',
  },
  {
    texto: 'Você consegue explicar a arquitetura em uma única frase?',
    nota: 'Se a frase começa com "depende", a arquitetura já está overengineered.',
  },
  {
    texto: 'Quanto tempo do git clone até a primeira execução?',
    nota: 'Mais de cinco minutos é dívida técnica não amortizada — e o novo dev já desistiu.',
  },
  {
    texto: 'Quantos arquivos de configuração existem na raiz?',
    nota: 'Você entende o que cada um faz, sem consultar a internet?',
  },
  {
    texto: 'Se você sumir amanhã, quem mantém isso?',
    nota: 'Se a resposta sincera é "ninguém", então você é a impureza — e o projeto não sobrevive a você.',
  },
]

const asDependencias: Pergunta[] = [
  {
    texto: 'Quantas deps no package.json? Quantas você realmente usa?',
    nota: 'A diferença é o seu débito invisível — bytes pra rede, tempo pra build, superfície pra CVE.',
  },
  {
    texto: 'Tem alguma dependência que sobrou depois que a feature foi cortada?',
    nota: 'Cemitério de imports é o segundo maior tipo de impureza — só perde pra código morto.',
  },
  {
    texto: 'Tem ferramenta resolvendo problema que outra ferramenta da pilha já resolve?',
    nota: 'Webpack + esbuild. Lodash + métodos nativos. Axios + fetch. Moment + Date. Pague-se um café e arruma isso.',
  },
  {
    texto: 'Você consegue rodar npm install offline e o build passar?',
    nota: 'Se não, sua stack está pendurada num CDN que pode cair amanhã.',
  },
  {
    texto: 'Quanto da bundle final é dependência vs código seu?',
    nota: 'Geralmente 90/10 a favor das deps. Pense por quê — e o que daria pra cortar.',
  },
]

const asImpurezas: Pergunta[] = [
  {
    texto: 'Qual feature dos últimos seis meses ninguém usa?',
    nota: 'Você sabe a resposta. Tem coragem de cortar?',
  },
  {
    texto: 'Tem código que você tem medo de tocar há mais de um ano?',
    nota: 'Medo é o sintoma — impureza acumulada é a doença.',
  },
  {
    texto: 'Tem abstração criada pensando em "necessidades futuras" que nunca chegaram?',
    nota: 'DRY prematuro é overengineering disfarçado de boa prática. Três linhas iguais é melhor que uma fábrica errada.',
  },
  {
    texto: 'Tem duplicação que você sabe que existe mas nunca consolidou?',
    nota: 'Três cópias da mesma coisa fingindo ser três coisas — esperando você reconhecer.',
  },
  {
    texto: 'Quantos comentários "TODO: refactor later" o repo tem?',
    nota: 'Roda um grep agora. "later" significa "nunca" em qualquer base de código com mais de seis meses.',
  },
]

const aForja: Pergunta[] = [
  {
    texto: 'Quando foi a última vez que você deletou código?',
    nota: 'Não foi escrevendo — foi apagando. Se faz mais de duas semanas, a forja está fria.',
  },
  {
    texto: 'Você tem coragem de remover a feature mais antiga se ninguém a usa?',
    nota: 'Tem ou não tem. Sentimentalismo técnico custa em manutenção.',
  },
  {
    texto: 'Você tem coragem de trocar a stack se a atual já não serve mais?',
    nota: 'Lealdade à ferramenta é vaidade disfarçada. A lealdade certa é com o problema.',
  },
  {
    texto: 'Você sabe quando o projeto está pronto, ou só empilha pra sempre?',
    nota: 'Se a resposta é "nunca está pronto", o projeto está te dirigindo, e não o contrário.',
  },
  {
    texto: 'Quanto do seu tempo é forja vs construção?',
    nota: 'Boas lâminas exigem tempo igual nas duas. Quem só constrói acumula impureza. Quem só forja não entrega.',
  },
]

function Secao({
  num,
  tag,
  h2,
  sub,
  items,
}: {
  num: string
  tag: string
  h2: string
  sub: string
  items: Pergunta[]
}) {
  return (
    <section className="hk-section">
      <SectionLabel num={num} tag={tag} />
      <h2 className="hk-h2">{h2}</h2>
      <p className="hk-sub">{sub}</p>
      <ol className="hk-impurezas">
        {items.map((p, i) => (
          <li key={p.texto}>
            <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
            <h4>{p.texto}</h4>
            <p>{p.nota}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function OEspelho() {
  return (
    <main className="hk">
      <Scar />

      {/* HERO */}
      <header className="hk-hero">
        <span className="hk-kanji-art" aria-hidden>鏡</span>

        <div className="hk-hero-meta">
          <span className="hk-eyebrow">鏡 — KAGAMI — AUTO-AUDIT</span>
          <h1 className="hk-title">
            <span className="hk-title-kanji">鏡</span>
            <span className="hk-title-rom">O Espelho</span>
            <span className="hk-title-trans">vinte perguntas pra olhar o próprio código</span>
          </h1>
          <p className="hk-lead">
            Você acabou de ler quatro páginas sobre a Primeira Forma. Esta é a única que
            pergunta sobre <em>você</em>. Vinte perguntas em quatro grupos. Não tem
            checkbox, não tem placar — você lê, sente o desconforto, anota mentalmente.
            Sair daqui sem incomodar significa que o espelho não funcionou.
          </p>
          <p className="hk-quote">
            O mestre olha pra dentro antes de pegar o martelo.
          </p>
        </div>

        <aside className="hk-vertical" aria-hidden>
          <span>鏡</span>
          <span className="hk-vertical-dot">·</span>
          <span>O ESPELHO</span>
        </aside>
      </header>

      <Secao
        num="02"
        tag="A lâmina"
        h2="Olhe primeiro o que está nas suas mãos."
        sub="Cinco perguntas sobre o projeto que você abriu agora. Responda em voz alta — quem mente pra si mesmo nunca afia nada."
        items={aLamina}
      />

      <Secao
        num="03"
        tag="As dependências"
        h2="A pilha que você não escolheu, mas carrega."
        sub="Cada lib é um pedaço de aço importado. Algumas justificam o peso. Outras estão lá porque alguém empurrou e ninguém parou pra desempurrar."
        items={asDependencias}
      />

      <Secao
        num="04"
        tag="As impurezas"
        h2="O que você sabe que está errado e finge que não vê."
        sub="Toda base de código carrega impurezas conhecidas. O dev maduro é quem aponta o dedo pras suas próprias antes de alguém apontar."
        items={asImpurezas}
      />

      <Secao
        num="05"
        tag="A forja"
        h2="A disciplina que decide se a lâmina endurece ou enferruja."
        sub="Construir todo dia é fácil — qualquer iniciante consegue. Forjar exige coragem de tirar. Coragem é hábito; hábito é tempo agendado."
        items={aForja}
      />

      <section className="hk-section">
        <blockquote className="hk-citacao">
          <span aria-hidden>— epílogo do aprendiz</span>
          Se você respondeu mentalmente "não sei" pra mais de cinco perguntas dessas,
          o próximo passo não é adicionar nada. É abrir o repositório e cortar.
          <br />
          <br />
          A recompensa não é fama. É dormir.
        </blockquote>
      </section>

      <footer className="hk-foot">
        <SignatureMark />
        <div className="hk-foot-row">
          <span>鏡</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>O Espelho</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>vinte perguntas, zero respostas prontas</span>
        </div>
      </footer>
    </main>
  )
}

export default OEspelho
