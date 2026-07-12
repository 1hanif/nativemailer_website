import { REPO_URL } from '../data'
import { Reveal } from './Reveal'
import { AppleIcon } from './icons'

export function Download() {
  return (
    <section id="download" className="relative overflow-hidden px-6 py-24">
      <div className="glow-orb left-1/2 top-1/2 h-80 w-[560px] -translate-x-1/2 -translate-y-1/2 bg-white/6" />
      <Reveal className="relative mx-auto max-w-3xl rounded-2xl border border-line bg-panel/80 p-12 text-center backdrop-blur">
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">Build better emails today.</h2>
        <p className="mx-auto mt-4 max-w-md text-white/50">
          Free for individuals, open source, and built for speed. Join thousands of
          developers using Native Mailer to ship with confidence.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`${REPO_URL}/releases`}
            className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-ink shadow-lg shadow-white/10 transition hover:bg-white"
          >
            <AppleIcon /> macOS (Apple Silicon)
          </a>
          <a
            href={`${REPO_URL}/releases`}
            className="flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/35 hover:text-white"
          >
            🖥 Windows & Linux
          </a>
        </div>
        <p className="mt-6 font-mono text-[11px] text-white/30">No registration. No tracking. Pure utility.</p>
      </Reveal>
    </section>
  )
}
