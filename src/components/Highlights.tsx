const HIGHLIGHTS = [
  ['01', 'Local SMTP', 'A private inbox on port 1025.'],
  ['02', 'Instant preview', 'HTML, text, headers, and raw source.'],
  ['03', 'Attachments', 'Inspect every file before it ships.'],
  ['04', 'Zero accounts', 'Open the app and start sending.'],
] as const

export function Highlights() {
  return (
    <section className="highlight-rail" aria-label="Native Mailer highlights">
      {HIGHLIGHTS.map(([number, title, body]) => (
        <article key={number}>
          <span>{number}</span>
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
