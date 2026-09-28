import { Reveal } from './Reveal'

const FEATURES = [
  ['Local SMTP', 'A private inbox on localhost:1025. Nothing leaves your machine.'],
  ['Full inspection', 'Rendered HTML, plain text, headers, and raw MIME source.'],
  ['Attachments', 'Open generated invoices, images, and documents before anyone else does.'],
  ['Search & filter', 'Find any captured message in seconds.'],
  ['Zero accounts', 'No sign-up, API key, or cloud project. Open it and send.'],
  ['Open source', 'Free, and built in the open on GitHub.'],
] as const

export function Features() {
  return (
    <section id="features" className="section container">
      <Reveal className="section-head">
        <p className="label">Features</p>
        <h2>Everything stays on your machine.</h2>
      </Reveal>
      <Reveal className="feature-list">
        {FEATURES.map(([title, body]) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
