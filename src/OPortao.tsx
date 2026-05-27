import './PrimeiraForma.css'
import { Scar, SectionLabel, SignatureMark } from './marks'

type Item = { titulo: string; texto: string }

const contratos: Item[] = [
  {
    titulo: 'Rota protegida sem porteiro',
    texto:
      'A pasta se chama `(protected)`. O nome promete sessão autenticada. Mas o arquivo `page.tsx` renderiza sem checar cookie, dispara fetch que volta 403, e cada componente downstream herda a obrigação de defender o que o portão devia ter recusado.',
  },
  {
    titulo: 'Função pública que confia no chamador',
    texto:
      'Assinatura diz `(user: User) => void`, mas em runtime aceita `undefined` porque algum call site passa o resultado de um `find()` sem checar. O TS mente — a peneira é só visual.',
  },
  {
    titulo: 'Prop required no tipo, opcional no runtime',
    texto:
      '`pocketType: { key: string; value: string }` no tipo. O componente lê `pocketType.value` sem hesitar. Em alguma rota patológica, o pai renderiza com `pocketType={undefined}` — e o React explode em produção sem aviso.',
  },
  {
    titulo: 'Migration que assume FK existente',
    texto:
      'O DBA escreveu `ALTER TABLE orders ADD CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES accounts(id)` sem rodar antes `SELECT ... WHERE account_id NOT IN (SELECT id FROM accounts)`. A linha quebra no deploy às 3 da manhã.',
  },
]

const comodos: Item[] = [
  {
    titulo: 'Optional chaining como tapete',
    texto:
      '`a?.b?.c?.d` em toda leitura, sem nunca perguntar por que `a` poderia ser undefined. A tela não quebra mas mostra dado errado em silêncio. O usuário acha que clicou no botão certo. O ferreiro não percebeu que a lâmina amassou.',
  },
  {
    titulo: 'Fallback fictício',
    texto:
      'Quando dado falta, retornar `{ key: "", value: "" }` ou `0` ou `[]` — um valor que parece neutro mas envenena cálculo abaixo. Total vira R$ 0,00 mentindo. Lista vazia esconde erro de carregamento. Default fictício é impureza com gravata de robustez.',
  },
  {
    titulo: 'try/catch que engole',
    texto:
      '`} catch (e) { console.log(e); }`. O erro vira ruído no console e a função retorna como se nada tivesse acontecido. A UI segue. O bug some. Quem investigar daqui a três meses não vai achar a origem — porque ela foi enterrada no momento que aconteceu.',
  },
  {
    titulo: 'Estado inicial mentiroso',
    texto:
      '`useState({ name: "", orders: [] })` num componente que precisa do servidor pra ter sentido. O primeiro render mostra "0 pedidos" e o usuário acha que comprou nada. O dado real chega 200ms depois e a UI pisca. O default mentiu durante 200ms — e em conexões ruins, durante muito mais.',
  },
]

const defesas: Item[] = [
  {
    titulo: 'O middleware do framework',
    texto:
      'Next, Remix, SvelteKit, Rails — todos têm um lugar antes do render onde dá pra cortar a requisição. `if (!session) redirect("/entrar")` em uma linha resolve o que cinquenta `?.` espalhados nunca resolveriam. O portão é o lugar mais barato pra bater o martelo.',
  },
  {
    titulo: 'Schema na borda do dado externo',
    texto:
      'Toda resposta de API, todo payload de webhook, todo arquivo lido do disco — passa por `schema.parse(input)` antes de virar tipo do domínio. Zod, Yup, ou um parser feito à mão. O contrato fica no parser. Depois disso, o tipo é verdade — não promessa.',
  },
  {
    titulo: 'Newtype que recusa criação inválida',
    texto:
      '`type Email = string & { __email: never }` com `function asEmail(s: string): Email | null`. Se o construtor recusou, o resto do programa não vê o caso inválido. A defesa fica no construtor — não em cada função que recebe um Email. Dá pra fazer o mesmo com OrderId, UserId, qualquer coisa cujo formato importa.',
  },
  {
    titulo: 'Gate antes do import dinâmico',
    texto:
      'Feature flag, role, ambiente — checar antes de carregar o módulo, não depois. `if (flagOff) return null; const Mod = await import(...)`. Dispensa todo o componente de saber que pode ser desligado. A peneira fica antes da forja, não dentro.',
  },
]

const testes: Item[] = [
  {
    titulo: 'Quem foi o primeiro a tocar nesse dado?',
    texto:
      'Suba a stack. Rastreia até a origem — fetch, parse de URL, leitura de cookie, deserialização de localStorage. Se o ponto de entrada não validou, todo mundo abaixo tá patrulhando o que devia ser garantido.',
  },
  {
    titulo: 'Quem deveria tê-lo recusado?',
    texto:
      'O middleware? O parser? O type system? O construtor? Pelo menos um desses tinha jurisdição pra dizer não. Identificar qual e mover a defesa pra lá. O resto do código relaxa.',
  },
  {
    titulo: 'Se eu apagar todos os ?. deste arquivo, onde a tela explode?',
    texto:
      'Experimento mental brutal. Cada explosão é um contrato esquecido lá em cima. Cada `?.` que sobreviver é uma cobertura legítima de caso opcional. Os outros são ruído defensivo herdado.',
  },
  {
    titulo: 'A peneira atual fica em qual andar?',
    texto:
      'Mapeie a cadeia: portão, parser, tipo, componente. A peneira efetiva é a primeira que recusa entrada inválida — todas as outras são redundância (boa ou má, depende). Se a peneira tá no quinto andar e a impureza entrou no térreo, sobrou poeira em todos os cômodos do meio.',
  },
]

function OPortao() {
  return (
    <main className="hk">
      <Scar />

      {/* HERO */}
      <header className="hk-hero">
        <span className="hk-kanji-art" aria-hidden>門</span>

        <div className="hk-hero-meta">
          <span className="hk-eyebrow">門 — A FRONTEIRA — DISCIPLINA</span>
          <h1 className="hk-title">
            <span className="hk-title-kanji">門 番</span>
            <span className="hk-title-rom">Monban</span>
            <span className="hk-title-trans">O Portão · onde o contrato é forjado</span>
          </h1>
          <p className="hk-lead">
            Toda rota declara um contrato. Toda função recebe pré-condição. Toda
            chamada de API espera um shape. Quando o contrato é declarado e
            <em> não validado no portão</em>, todo cômodo abaixo herda a
            obrigação de defender contra estado inválido — e cada um trata mal do
            seu jeito.
          </p>
          <p className="hk-quote">
            Quem cuida do portão decide o que entra na forja.
          </p>
        </div>

        <aside className="hk-vertical" aria-hidden>
          <span>門</span>
          <span className="hk-vertical-dot">·</span>
          <span>MONBAN</span>
        </aside>
      </header>

      {/* CONTRATOS ESQUECIDOS */}
      <section className="hk-section">
        <SectionLabel num="02" tag="O contrato esquecido" />
        <h2 className="hk-h2">Quando a promessa do nome não é validada na entrada.</h2>
        <p className="hk-sub">
          Quatro casos onde o sistema declara um pré-requisito mas o esquece de
          checar. Cada um vira fogo no chão dos componentes downstream — que
          nem sabiam ter sido eleitos guardiões.
        </p>
        <ol className="hk-impurezas">
          {contratos.map((c, i) => (
            <li key={c.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h4>{c.titulo}</h4>
              <p>{c.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CÔMODOS DEFENSIVOS */}
      <section className="hk-section">
        <SectionLabel num="03" tag="Os cômodos defensivos" />
        <h2 className="hk-h2">As patrulhas mal pagas que nascem da peneira faltante.</h2>
        <p className="hk-sub">
          Quatro anti-padrões que aparecem quando o portão falhou e cada cômodo
          tenta proteger sozinho. Parecem cuidado. São silêncio. Defendem a
          estética, não a verdade do dado.
        </p>
        <ol className="hk-impurezas">
          {comodos.map((c, i) => (
            <li key={c.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h4>{c.titulo}</h4>
              <p>{c.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ONDE A DEFESA PERTENCE */}
      <section className="hk-section">
        <SectionLabel num="04" tag="Onde a defesa pertence" />
        <h2 className="hk-h2">Quatro andares que aceitam o porteiro.</h2>
        <p className="hk-sub">
          A defesa de contrato tem domicílio. Não é todo lugar — é o primeiro
          ponto da cadeia que pode dizer não com autoridade. Saber qual
          dispensa todo o código abaixo de checagem redundante.
        </p>
        <ol className="hk-impurezas">
          {defesas.map((d, i) => (
            <li key={d.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h4>{d.titulo}</h4>
              <p>{d.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* TESTE DA ESPADA */}
      <section className="hk-section">
        <SectionLabel num="05" tag="O teste da espada" />
        <h2 className="hk-h2">Quatro perguntas antes de cravar a defesa.</h2>
        <p className="hk-epigrafe">
          O ferreiro que defende em cada cômodo não tem portão.
          <br />
          Quem tem portão raramente precisa defender em cômodo.
        </p>
        <ol className="hk-impurezas">
          {testes.map((t, i) => (
            <li key={t.titulo}>
              <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
              <h4>{t.titulo}</h4>
              <p>{t.texto}</p>
            </li>
          ))}
        </ol>
        <blockquote className="hk-citacao">
          <span aria-hidden>— epígrafe</span>
          A peneira mais barata é a primeira da cadeia.
        </blockquote>
      </section>

      <footer className="hk-foot">
        <SignatureMark />
        <div className="hk-foot-row">
          <span>門</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>O Portão</span>
          <span className="hk-foot-rule" aria-hidden />
          <span>contrato no porteiro</span>
        </div>
      </footer>
    </main>
  )
}

export default OPortao
