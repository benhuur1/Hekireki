import './PrimeiraForma.css'
import { Scar, SectionLabel, SignatureMark } from './marks'

type Lente = { titulo: string; texto: string }

const donos: Lente[] = [
  {
    titulo: 'Quem usa → UX / UI',
    texto:
      'Pra quem aperta o botão, o sistema É a tela: o que vê, o que toca, quão rápido entende. A arquitetura por trás não importa pra ele — importa resolver o que veio fazer, sem fricção. UX e UI não são enfeite; são o produto, do ponto de vista de quem usa.',
  },
  {
    titulo: 'O computador → compila e roda correto',
    texto:
      'Pra máquina existe uma pergunta só: compila e roda certo? Tipo que bate, build que passa, sem estourar em runtime. É a lente mais binária — passa ou não passa — e a base sobre a qual as outras três se apoiam. Sem respiração, nenhuma forma fica de pé.',
  },
  {
    titulo: 'O dono → reflete a necessidade',
    texto:
      'Pra quem é dono do software, a única medida é: resolve a necessidade que eu propus? Código lindo que não fecha a dor do negócio é impureza cara. A entrega existe pra resolver um problema do mundo real — não pra impressionar no diff.',
  },
  {
    titulo: 'O dev (você, depois) → evolui e mantém',
    texto:
      'Pro dev — em especial você daqui a seis meses — a pergunta é: consigo evoluir e dar manutenção a qualquer momento? Se só você entende, se trava ao tocar, a lâmina enferruja. Mantível é o que sobrevive depois que a empolgação passa.',
  },
]

function AsQuatroLentes() {
  return (
    <main className="hk">
      <Scar />

      {/* HERO */}
      <header className="hk-hero">
        <span className="hk-kanji-art" aria-hidden>質</span>

        <div className="hk-hero-meta">
          <span className="hk-eyebrow">質 — SHITSU — QUALIDADE</span>
          <h1 className="hk-title">
            <span className="hk-title-kanji">質</span>
            <span className="hk-title-rom">Shitsu</span>
            <span className="hk-title-trans">As Quatro Lentes · os donos da qualidade</span>
          </h1>
          <p className="hk-lead">
            No fim, toda entrega responde a <em>quatro donos</em> — e qualidade é servir os
            quatro de uma vez. Não são padrões de moda: são as lentes que sobraram depois de
            ver a tecnologia evoluir. As outras formas afiam a lâmina; esta diz pra quem ela corta.
          </p>
          <p className="hk-quote">
            Otimizar uma lente e esquecer as outras é o atalho pra dívida.
          </p>
        </div>

        <aside className="hk-vertical" aria-hidden>
          <span>質</span>
          <span className="hk-vertical-dot">·</span>
          <span>AS QUATRO LENTES</span>
        </aside>
      </header>

      {/* OS QUATRO DONOS */}
      <section className="hk-section">
        <SectionLabel num="02" tag="Os quatro donos" />
        <h2 className="hk-h2">Toda entrega responde a quatro.</h2>
        <p className="hk-sub">
          Cada dono mede a mesma entrega por um critério diferente e objetivo. Servir três e
          falhar um não é qualidade — é dívida com cara de pronto.
        </p>
        <ol className="hk-impurezas">
          {donos.map((d, i) => (
            <li key={d.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h4>{d.titulo}</h4>
              <p>{d.texto}</p>
            </li>
          ))}
        </ol>
        <blockquote className="hk-citacao">
          <span aria-hidden>— a régua</span>
          A maioria dos problemas de software é servir um dono e esquecer outro: UX linda que
          não compila, código limpo que não resolve a dor, solução perfeita que ninguém mantém.
          Servir os quatro é o ofício.
        </blockquote>
      </section>

      <footer className="hk-foot">
        <SignatureMark />
        <div className="hk-foot-row">
          <span>質</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>As Quatro Lentes</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>servir os quatro de uma vez</span>
        </div>
      </footer>
    </main>
  )
}

export default AsQuatroLentes
