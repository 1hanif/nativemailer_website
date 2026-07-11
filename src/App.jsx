import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ---------- data ---------- */

const INCOMING = [
  { from: 'orders@shop.test', subject: 'Order #1042 confirmed 🎉', time: 'now', color: '#00d1b2' },
  { from: 'noreply@app.test', subject: 'Verify your email address', time: 'now', color: '#8b7cf6' },
  { from: 'billing@saas.test', subject: 'Your invoice for July', time: 'now', color: '#fdae4b' },
  { from: 'support@app.test', subject: 'Password reset requested', time: 'now', color: '#f472b6' },
  { from: 'team@startup.test', subject: 'Welcome aboard, Hanif!', time: 'now', color: '#38bdf8' },
]

const FEATURES = [
  {
    icon: '📡',
    title: 'Local SMTP Server',
    desc: 'A full SMTP server on 127.0.0.1:1025 catches every email your app sends. Nothing ever leaves your machine.',
  },
  {
    icon: '⚡',
    title: 'Zero Configuration',
    desc: 'Launch the app and point your mailer at localhost. No accounts, no API keys, no cloud services.',
  },
  {
    icon: '🖥️',
    title: 'True Native App',
    desc: 'A real desktop application for Windows, macOS, and Linux — powered by NativePHP, not a browser tab.',
  },
  {
    icon: '🎨',
    title: 'Beautiful Admin Panel',
    desc: 'A modern Filament 4 interface for browsing, searching, and inspecting everything you capture.',
  },
  {
    icon: '🔍',
    title: 'Rich Email Preview',
    desc: 'Render HTML emails in a sandboxed iframe with full styling, plus raw source and headers when you need them.',
  },
  {
    icon: '🧹',
    title: 'Powerful Management',
    desc: 'Search by sender, recipient, or subject. Bulk-delete with one click. Inspect complete metadata and timestamps.',
  },
]

const STACK = ['Laravel 12', 'NativePHP 2.0', 'Filament 4.0', 'PHP 8.2+', 'SQLite', 'SMTP', 'Windows', 'macOS', 'Linux']

const ENV_LINES = [
  ['MAIL_MAILER', 'smtp'],
  ['MAIL_HOST', '127.0.0.1'],
  ['MAIL_PORT', '1025'],
  ['MAIL_USERNAME', 'null'],
  ['MAIL_PASSWORD', 'null'],
]

/* ---------- motion helpers ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

function Reveal({ children, className, variants = fadeUp }) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- components ---------- */

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal to-violet text-lg shadow-lg shadow-teal/20">
        ✉️
      </div>
      <span className="text-lg font-bold tracking-tight">
        Native<span className="text-teal">Mailer</span>
      </span>
    </div>
  )
}

function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#how" className="transition hover:text-white">How it works</a>
          <a href="#download" className="transition hover:text-white">Download</a>
        </div>
        <a
          href="#download"
          className="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
        >
          Get the app
        </a>
      </nav>
    </motion.header>
  )
}

function InboxMockup() {
  const [emails, setEmails] = useState(INCOMING.slice(0, 3))

  useEffect(() => {
    let i = 3
    const id = setInterval(() => {
      setEmails((prev) => [INCOMING[i % INCOMING.length], ...prev].slice(0, 4))
      i++
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
      className="float-slow relative mx-auto w-full max-w-2xl"
      style={{ perspective: 1200 }}
    >
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal/30 via-violet/25 to-amber/25 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-white/40">NativeMailer — Inbox</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-2.5 py-1 text-[10px] font-medium text-teal">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-teal" />
            SMTP :1025
          </span>
        </div>
        {/* inbox rows */}
        <div className="divide-y divide-line/60 p-2">
          <AnimatePresence initial={false}>
            {emails.map((m, idx) => (
              <motion.div
                key={m.subject + idx}
                layout
                initial={{ opacity: 0, x: -32, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 32, scale: 0.97 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="flex items-center gap-3 rounded-lg px-3 py-3"
              >
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold"
                  style={{ background: `${m.color}22`, color: m.color }}
                >
                  {m.from[0].toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white/90">{m.subject}</p>
                  <p className="truncate font-mono text-xs text-white/40">{m.from}</p>
                </div>
                <span className="shrink-0 text-xs text-white/30">{m.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36">
      <div className="grid-bg absolute inset-0" />
      <div className="glow-orb left-1/2 top-[-120px] h-[420px] w-[560px] -translate-x-1/2 bg-teal/20" />
      <div className="glow-orb right-[8%] top-[240px] h-72 w-72 bg-violet/20" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-teal" />
            Open source · MIT licensed
          </motion.div>

          <motion.h1 variants={fadeUp} className="mx-auto max-w-3xl text-5xl font-extrabold leading-[1.08] tracking-tight md:text-7xl">
            Catch every email.
            <br />
            <span className="text-gradient">Ship with confidence.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-white/55">
            Native Mailer is a beautiful desktop app with a built-in SMTP server that
            captures your app's outgoing email during development. No cloud. No config. Just
            <span className="font-mono text-teal"> 127.0.0.1:1025</span>.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#download"
              className="group rounded-xl bg-teal px-7 py-3.5 font-semibold text-ink shadow-lg shadow-teal/25 transition hover:shadow-xl hover:shadow-teal/35 hover:brightness-110"
            >
              Download for free
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#how"
              className="rounded-xl border border-white/15 px-7 py-3.5 font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-20">
          <InboxMockup />
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const items = [...STACK, ...STACK]
  return (
    <div className="relative overflow-hidden border-y border-line/60 py-5">
      <div className="marquee-track flex w-max gap-4">
        {items.map((s, i) => (
          <span key={i} className="rounded-full border border-line bg-panel px-5 py-2 font-mono text-sm text-white/50">
            {s}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent" />
    </div>
  )
}

function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="glow-orb left-[-100px] top-1/3 h-80 w-80 bg-violet/10" />
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-teal">Features</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Everything email testing <span className="text-gradient">should be</span>
        </h2>
      </Reveal>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((f) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            className="card-glow rounded-2xl border border-line bg-panel/80 p-7"
          >
            <span className="text-3xl">{f.icon}</span>
            <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Launch Native Mailer', desc: 'Open the app — the SMTP server starts automatically on port 1025.' },
    { n: '02', title: 'Point your app at it', desc: 'Set your framework’s mail config to localhost. Works with Laravel, Rails, Django, Node — anything that speaks SMTP.' },
    { n: '03', title: 'Send & inspect', desc: 'Every email lands in the inbox instantly. Preview HTML, check headers, search, and clean up in bulk.' },
  ]

  return (
    <section id="how" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-widest text-teal">How it works</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Up and running in <span className="text-gradient">under a minute</span>
            </h2>
          </Reveal>
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-10 space-y-8"
          >
            {steps.map((s) => (
              <motion.li key={s.n} variants={fadeUp} className="flex gap-5">
                <span className="font-mono text-sm font-semibold text-teal">{s.n}</span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">{s.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <Reveal>
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet/25 to-teal/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-white/40">.env</span>
              </div>
              <div className="p-6 font-mono text-sm leading-8">
                {ENV_LINES.map(([k, v]) => (
                  <div key={k}>
                    <span className="text-violet">{k}</span>
                    <span className="text-white/40">=</span>
                    <span className="text-teal">{v}</span>
                  </div>
                ))}
                <span className="cursor-blink text-white/70">▌</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Download() {
  const platforms = [
    { icon: '🪟', name: 'Windows' },
    { icon: '🍎', name: 'macOS' },
    { icon: '🐧', name: 'Linux' },
  ]
  return (
    <section id="download" className="relative overflow-hidden px-6 py-28">
      <div className="glow-orb left-1/2 top-1/2 h-96 w-[600px] -translate-x-1/2 -translate-y-1/2 bg-teal/15" />
      <Reveal className="relative mx-auto max-w-3xl rounded-3xl border border-line bg-panel/80 p-12 text-center backdrop-blur">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Stop emailing <span className="text-gradient">real people</span> by accident
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/55">
          Free, open source, and cross-platform. Grab Native Mailer and keep your test emails where they belong.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {platforms.map((p) => (
            <a
              key={p.name}
              href="https://github.com"
              className="card-glow flex items-center gap-2 rounded-xl border border-line bg-ink px-6 py-3 font-medium"
            >
              <span>{p.icon}</span> {p.name}
            </a>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-white/30">MIT License · PHP 8.2+ · No sign-up required</p>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <Logo />
        <p className="text-sm text-white/35">
          Built with Laravel, NativePHP & Filament · © {new Date().getFullYear()} Native Mailer
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="bg-ink text-white antialiased">
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <HowItWorks />
      <Download />
      <Footer />
    </div>
  )
}
