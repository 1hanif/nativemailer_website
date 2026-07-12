import { APP_VERSION, DOWNLOADS, REPO_URL } from '../data'
import { Reveal } from './Reveal'
import { AppleIcon } from './icons'

const secondary =
  'flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/35 hover:text-white'

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
            href={DOWNLOADS.macArm}
            className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-ink shadow-lg shadow-white/10 transition hover:bg-white"
          >
            <AppleIcon /> macOS (Apple Silicon)
          </a>
          <a href={DOWNLOADS.macIntel} className={secondary}>
            <AppleIcon /> macOS (Intel)
          </a>
          <a href={DOWNLOADS.windows} className={secondary}>
            🖥 Windows
          </a>
          <a href={DOWNLOADS.linuxAppImage} className={secondary}>
            🐧 Linux (AppImage)
          </a>
          <a href={DOWNLOADS.linuxDeb} className={secondary}>
            🐧 Linux (.deb)
          </a>
        </div>
        <p className="mt-6 font-mono text-[11px] text-white/30">
          v{APP_VERSION} ·{' '}
          <a href={`${REPO_URL}/releases`} className="underline decoration-white/20 underline-offset-2 transition hover:text-white/60">
            all releases
          </a>{' '}
          · No registration. No tracking. Pure utility.
        </p>
      </Reveal>
    </section>
  )
}
