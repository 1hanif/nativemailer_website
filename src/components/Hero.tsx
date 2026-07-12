import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../motion'
import { BrowserMockup } from './BrowserMockup'

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36">
      <div className="grid-bg absolute inset-0" />
      <div className="glow-orb left-1/2 top-[-140px] h-[380px] w-[560px] -translate-x-1/2 bg-white/8" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.h1 variants={fadeUp} className="mx-auto max-w-3xl text-5xl font-extrabold leading-[1.06] tracking-tight md:text-7xl">
            Catch every email <span className="text-fade">locally.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-white/55 md:text-lg">
            Native Mailer runs a local SMTP server that captures every email your
            application sends, letting you inspect HTML, headers, attachments, and raw
            source without configuring external services.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#download"
              className="group flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-ink shadow-lg shadow-white/10 transition hover:bg-white hover:shadow-xl hover:shadow-white/20"
            >
              Download for macOS
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#download" className="flex items-center gap-2 rounded-lg border border-white/12 px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white">
              🖥 Windows
            </a>
            <a href="#download" className="flex items-center gap-2 rounded-lg border border-white/12 px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white">
              🐧 Linux
            </a>
          </motion.div>
        </motion.div>

        <BrowserMockup />
      </div>
    </section>
  )
}
