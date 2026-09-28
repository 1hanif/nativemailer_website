import { STACKS } from '../data'
import { Reveal } from './Reveal'

const STEPS = [
  {
    title: 'Launch Native Mailer',
    body: 'The local SMTP server starts immediately.',
    code: '✓ listening on localhost:1025',
  },
  {
    title: 'Point your app at it',
    body: 'Same settings in any framework. No credentials.',
    code: 'MAIL_HOST=localhost\nMAIL_PORT=1025',
  },
  {
    title: 'Send and inspect',
    body: 'Every message appears in the inbox instantly.',
    code: 'POST /welcome-email\n202 Accepted · 18ms',
  },
] as const

export function Workflow() {
  return (
    <section id="workflow" className="section container">
      <Reveal className="section-head">
        <p className="label">How it works</p>
        <h2>From setup to inbox in under a minute.</h2>
      </Reveal>
      <Reveal>
        <ol className="steps">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="step-number">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <pre><code>{step.code}</code></pre>
            </li>
          ))}
        </ol>
        <p className="stacks">Works with {STACKS.join(', ')}, and anything else that speaks SMTP.</p>
      </Reveal>
    </section>
  )
}
