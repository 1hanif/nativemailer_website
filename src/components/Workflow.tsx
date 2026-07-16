import { Reveal } from './Reveal'

const STEPS = [
  {
    number: '01',
    title: 'Launch Native Mailer',
    body: 'Your local SMTP server starts immediately. No account, API key, or cloud project required.',
    code: '$ nativemailer\n✓ listening on localhost:1025',
  },
  {
    number: '02',
    title: 'Point your app at it',
    body: 'Use the same SMTP settings in Laravel, Rails, Django, Node, Phoenix, or anything else.',
    code: 'MAIL_HOST=localhost\nMAIL_PORT=1025',
  },
  {
    number: '03',
    title: 'Send. Inspect. Repeat.',
    body: 'Every message appears instantly with the detail you need to debug content and delivery.',
    code: 'POST /welcome-email\n202 Accepted  ·  18ms',
  },
] as const

export function Workflow() {
  return (
    <section id="workflow" className="section workflow-section">
      <Reveal className="workflow-heading">
        <p className="eyebrow">Three steps. No ceremony.</p>
        <h2>From setup to inbox<br />in under a minute.</h2>
      </Reveal>
      <div className="workflow-grid">
        {STEPS.map((step) => (
          <Reveal className="workflow-card" key={step.number}>
            <span className="workflow-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <pre><code>{step.code}</code></pre>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
