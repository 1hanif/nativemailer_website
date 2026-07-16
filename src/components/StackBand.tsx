import { STACKS } from '../data'

export function StackBand() {
  return (
    <section className="stack-band" aria-label="Compatible frameworks">
      <p>Works wherever SMTP does</p>
      <div className="stack-list">
        {STACKS.map((stack) => <span key={stack}>{stack}</span>)}
      </div>
    </section>
  )
}
