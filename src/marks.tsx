/* ================================================================
   marks.tsx — peças compartilhadas entre as páginas .hk
   uma única fonte de verdade pra cada elemento visual repetido.
   ================================================================ */

export function SectionLabel({ num, tag }: { num: string; tag: string }) {
  return (
    <header className="hk-section-label">
      <span className="hk-section-num">{num}</span>
      <span className="hk-section-tag">{tag}</span>
      <span className="hk-section-rule" aria-hidden />
    </header>
  )
}

export function Scar() {
  return (
    <svg
      className="hk-scar"
      viewBox="0 0 200 1000"
      aria-hidden
      preserveAspectRatio="xMidYMin slice"
    >
      <defs>
        <linearGradient id="hk-scar-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff8c5" stopOpacity="0" />
          <stop offset="6%" stopColor="#fff8c5" stopOpacity="1" />
          <stop offset="35%" stopColor="#ffd84d" stopOpacity="1" />
          <stop offset="78%" stopColor="#f6a93c" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7a4f00" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        className="hk-scar-glow"
        d="M 110 0 L 78 230 L 132 270 L 48 540 L 122 580 L 28 870 L 92 1000"
        stroke="url(#hk-scar-grad)"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="hk-scar-line"
        d="M 110 0 L 78 230 L 132 270 L 48 540 L 122 580 L 28 870 L 92 1000"
        stroke="#fff8c5"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SignatureMark() {
  return (
    <svg className="signature-mark" viewBox="0 0 32 32" aria-hidden>
      <line x1="6" y1="26" x2="24" y2="8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="24" cy="8" r="1.5" fill="currentColor" />
    </svg>
  )
}

export type SecaoItem = { titulo: string; texto: string }

export function Secao({
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
  items: SecaoItem[]
}) {
  return (
    <section className="hk-section">
      <SectionLabel num={num} tag={tag} />
      <h2 className="hk-h2">{h2}</h2>
      <p className="hk-sub">{sub}</p>
      <ol className="hk-impurezas">
        {items.map((item, i) => (
          <li key={item.titulo}>
            <span className="hk-imp-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{item.titulo}</h3>
            <p>{item.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
