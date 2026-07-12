import { STACKS } from '../data'
import { Reveal } from './Reveal'

export function StackBand() {
  return (
    <section className="border-y border-line/70 bg-panel/40 py-14">
      <Reveal className="mx-auto max-w-5xl px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">Works with any stack</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {STACKS.map((s) => (
            <span key={s} className="flex items-center gap-2 text-sm font-semibold text-white/45 transition hover:text-white/80">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
              </svg>
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
