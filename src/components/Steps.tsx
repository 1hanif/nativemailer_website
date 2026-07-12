import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../motion'
import type { Step } from '../data'

const STEPS: Step[] = [
  {
    n: 'STEP 01',
    title: 'Launch Native Mailer',
    desc: 'Open the application. The local SMTP server starts automatically on port 1025, ready to capture traffic.',
  },
  {
    n: 'STEP 02',
    title: 'Point your app at it',
    desc: (
      <>
        Configure your development environment to use{' '}
        <code className="font-mono text-white/70">localhost</code> and port{' '}
        <code className="font-mono text-white/70">1025</code>. No credentials needed.
      </>
    ),
  },
  {
    n: 'STEP 03',
    title: 'Send & Inspect',
    desc: 'Trigger an email from your code. It appears instantly in the inbox for full visual and source inspection.',
  },
]

export function Steps() {
  return (
    <section id="how" aria-label="How it works" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="sr-only">How it works</h2>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-12 md:grid-cols-3"
      >
        {STEPS.map((s) => (
          <motion.div key={s.n} variants={fadeUp}>
            <p className="font-mono text-xs font-semibold tracking-widest text-white/60">{s.n}</p>
            <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
