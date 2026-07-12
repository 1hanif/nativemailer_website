import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'

/* ---------- types & data ---------- */

interface Email {
  from: string
  subject: string
  tag: string
  color: string
}

const INCOMING: Email[] = [
  { from: 'orders@shop.test', subject: 'Order #1042 confirmed', tag: 'HTML', color: '#ff5f54' },
  { from: 'noreply@app.test', subject: 'Verify your email address', tag: 'HTML', color: '#fdae4b' },
  { from: 'billing@saas.test', subject: 'Your invoice for July', tag: 'PDF', color: '#38bdf8' },
  { from: 'support@app.test', subject: 'Password reset requested', tag: 'TEXT', color: '#a3e635' },
  { from: 'team@startup.test', subject: 'Welcome aboard, Hanif!', tag: 'HTML', color: '#f472b6' },
]

const STACKS: string[] = ['Laravel', 'Symfony', 'Rails', 'Django', 'Express', 'Phoenix']

interface Step {
  n: string
  title: string
  desc: ReactNode
}

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

const HEADERS: [string, string][] = [
  ['Return-Path', '<bounce@nativemailer.test>'],
  ['Received', 'from localhost [127.0.0.1]:1025'],
  ['Message-ID', '<a1b2c3d4@nativemailer.test>'],
  ['X-Mailer', 'Native Mailer v2.4.0'],
  ['DKIM-Signature', 'v=1; a=rsa-sha256; d=app.test'],
  ['Content-Type', 'multipart/alternative'],
  ['Subject', 'Order #1042 confirmed'],
]

/* ---------- motion helpers ---------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

interface RevealProps {
  children: ReactNode
  className?: string
  variants?: Variants
}

function Reveal({ children, className, variants = fadeUp }: RevealProps) {
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

/* ---------- shared bits ---------- */

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-red shadow-lg shadow-red/30">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="#0a0a0a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </div>
      <span className="text-[15px] font-bold tracking-tight">Native Mailer</span>
    </div>
  )
}

function WindowDots({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-3 font-mono text-[11px] text-white/35">{label}</span>
    </div>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

/* ---------- sections ---------- */

function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <div className="hidden items-center gap-8 text-sm text-white/55 md:flex">
          <a href="#features" className="text-red transition hover:text-redsoft">Features</a>
          <a href="#how" className="transition hover:text-white">How it works</a>
          <a href="#download" className="transition hover:text-white">Download</a>
        </div>
        <a
          href="#download"
          className="rounded-lg bg-red px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Get the app
        </a>
      </nav>
    </motion.header>
  )
}

function BrowserMockup() {
  const [emails, setEmails] = useState<Email[]>(INCOMING.slice(0, 4))
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    let i = 4
    const id = setInterval(() => {
      setEmails((prev) => [INCOMING[i % INCOMING.length], ...prev].slice(0, 5))
      i++
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
      className="relative mx-auto mt-16 w-full max-w-4xl"
    >
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-b from-red/25 via-red/5 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/60">
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-line bg-panel2 px-4 py-2.5">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex w-1/2 items-center justify-center gap-2 rounded-md bg-ink px-3 py-1 font-mono text-[11px] text-white/40">
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-current" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
            localhost:1025
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-red/30 bg-red/10 px-2.5 py-1 text-[10px] font-medium text-redsoft">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-red" />
            LIVE
          </span>
        </div>
        {/* app: sidebar + list + preview */}
        <div className="grid grid-cols-[150px_1fr] md:grid-cols-[150px_1.1fr_1.4fr]">
          <aside className="hidden border-r border-line bg-panel2/60 p-3 sm:block">
            <div className="mb-3 flex items-center gap-2 px-2">
              <span className="grid h-5 w-5 place-items-center rounded bg-red text-[9px] font-bold text-white">N</span>
              <span className="text-xs font-semibold text-white/80">Mailer</span>
            </div>
            {['Inbox', 'Starred', 'Attachments', 'Trash'].map((item, i) => (
              <div
                key={item}
                className={`mb-1 rounded-md px-2 py-1.5 text-xs ${i === 0 ? 'bg-red/15 font-medium text-redsoft' : 'text-white/40'}`}
              >
                {item}
                {i === 0 && <span className="float-right rounded bg-red px-1.5 text-[9px] font-bold text-white">{emails.length}</span>}
              </div>
            ))}
          </aside>
          <div className="border-r border-line">
            <div className="border-b border-line px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white/30">Inbox — captured</div>
            <AnimatePresence initial={false}>
              {emails.map((m, idx) => (
                <motion.button
                  key={m.subject + idx}
                  layout
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  onClick={() => setSelected(idx)}
                  className={`block w-full border-b border-line/50 px-3 py-2.5 text-left ${idx === selected ? 'bg-red/8' : ''}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-medium text-white/85">{m.subject}</p>
                    <span className="shrink-0 rounded px-1 font-mono text-[8px] font-bold" style={{ background: `${m.color}22`, color: m.color }}>
                      {m.tag}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate font-mono text-[10px] text-white/35">{m.from}</p>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
          <div className="hidden flex-col md:flex">
            <div className="border-b border-line px-4 py-2.5">
              <p className="text-xs font-semibold text-white/85">{emails[selected]?.subject ?? emails[0]?.subject}</p>
              <p className="mt-0.5 font-mono text-[10px] text-white/35">from {emails[selected]?.from ?? emails[0]?.from} · just now</p>
            </div>
            <div className="flex-1 space-y-2.5 p-4">
              <div className="h-2 w-3/4 rounded bg-white/10" />
              <div className="h-2 w-full rounded bg-white/6" />
              <div className="h-2 w-5/6 rounded bg-white/6" />
              <div className="mt-4 h-8 w-32 rounded-md bg-red/80" />
              <div className="h-2 w-2/3 rounded bg-white/6" />
              <div className="h-2 w-1/2 rounded bg-white/6" />
            </div>
            <div className="border-t border-line px-4 py-2 font-mono text-[10px] text-white/30">
              HTML · Source · Headers · Raw
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36">
      <div className="grid-bg absolute inset-0" />
      <div className="glow-orb left-1/2 top-[-140px] h-[380px] w-[560px] -translate-x-1/2 bg-red/15" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-red" />
            v2.4.0 Now Available
          </motion.div>

          <motion.h1 variants={fadeUp} className="mx-auto max-w-3xl text-5xl font-extrabold leading-[1.06] tracking-tight md:text-7xl">
            Catch every email <span className="text-red">locally.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base text-white/55 md:text-lg">
            Native Mailer runs a local SMTP server that captures every email your
            application sends, letting you inspect HTML, headers, attachments, and raw
            source without configuring external services.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#download"
              className="group flex items-center gap-2 rounded-lg bg-red px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red/25 transition hover:shadow-xl hover:shadow-red/35 hover:brightness-110"
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

function Workflow() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <Reveal>
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Designed for the local workflow.</h2>
        <p className="mt-5 leading-relaxed text-white/50">
          We believe that development environments should be sandboxed, fast, and private.
          Native Mailer eliminates the friction of setting up sandbox accounts or dealing
          with rate limits on third-party API services. It acts as a black hole for your
          app's outgoing emails, ensuring zero leaks to real-world addresses while
          providing professional-grade inspection tools for high-precision debugging.
        </p>
      </Reveal>
    </section>
  )
}

function StackBand() {
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

function Steps() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-12 md:grid-cols-3"
      >
        {STEPS.map((s) => (
          <motion.div key={s.n} variants={fadeUp}>
            <p className="font-mono text-xs font-semibold tracking-widest text-red">{s.n}</p>
            <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ---------- feature mockups ---------- */

function InboxMockupSmall() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/50">
      <WindowDots label="Native Mailer — Inbox" />
      <div className="divide-y divide-line/60">
        {INCOMING.map((m) => (
          <div key={m.subject} className="flex items-center gap-3 px-4 py-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px] font-bold" style={{ background: `${m.color}22`, color: m.color }}>
              {m.from[0]?.toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white/85">{m.subject}</p>
              <p className="truncate font-mono text-[10px] text-white/35">{m.from}</p>
            </div>
            <span className="rounded px-1.5 py-0.5 font-mono text-[8px] font-bold" style={{ background: `${m.color}22`, color: m.color }}>
              {m.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeadersMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/50">
      <WindowDots label="message-source.eml" />
      <div className="space-y-1.5 p-5 font-mono text-[11px] leading-relaxed">
        {HEADERS.map(([k, v], i) => (
          <div key={k} className="flex gap-2">
            <span className="w-5 shrink-0 select-none text-right text-white/20">{i + 1}</span>
            <span className="text-red">{k}:</span>
            <span className="truncate text-white/60">{v}</span>
          </div>
        ))}
        <div className="flex gap-2">
          <span className="w-5 shrink-0 select-none text-right text-white/20">8</span>
          <span className="cursor-blink text-white/70">▌</span>
        </div>
      </div>
    </div>
  )
}

function AttachmentsMockup() {
  const files: { name: string; size: string; kind: string; color: string }[] = [
    { name: 'invoice-1042.pdf', size: '182 KB', kind: 'PDF', color: '#ff5f54' },
    { name: 'receipt-photo.png', size: '2.4 MB', kind: 'IMG', color: '#38bdf8' },
    { name: 'terms.docx', size: '96 KB', kind: 'DOC', color: '#a3e635' },
  ]
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/50">
      <WindowDots label="Attachments (3)" />
      <div className="grid gap-3 p-5 sm:grid-cols-3">
        {files.map((f) => (
          <div key={f.name} className="rounded-lg border border-line bg-panel2 p-3">
            <div className="mb-3 grid h-16 place-items-center rounded-md" style={{ background: `${f.color}14` }}>
              <span className="font-mono text-xs font-bold" style={{ color: f.color }}>{f.kind}</span>
            </div>
            <p className="truncate text-[11px] font-medium text-white/80">{f.name}</p>
            <p className="font-mono text-[10px] text-white/35">{f.size}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

interface FeatureRowProps {
  icon: string
  title: string
  desc: string
  mock: ReactNode
  flip?: boolean
}

function FeatureRow({ icon, title, desc, mock, flip = false }: FeatureRowProps) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? 'lg:order-2' : ''}>
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-red/30 bg-red/10 text-lg">{icon}</span>
        <h3 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">{title}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-white/50">{desc}</p>
      </Reveal>
      <Reveal className={flip ? 'lg:order-1' : ''}>
        <div className="card-hover relative">
          <div className="absolute -inset-1 rounded-xl bg-red/10 blur-xl" />
          <div className="relative">{mock}</div>
        </div>
      </Reveal>
    </div>
  )
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl space-y-28 px-6 py-24">
      <FeatureRow
        icon="📥"
        title="The Inbox"
        desc="A blazing fast, native list that handles thousands of emails without breaking a sweat. Search, filter, and categorize by recipient or subject with sub-millisecond latency."
        mock={<InboxMockupSmall />}
      />
      <FeatureRow
        icon="🧾"
        title="Inspect Headers"
        desc="Dive deep into the transport layer. Native Mailer exposes every raw SMTP header, including X-Headers, return paths, and authentication markers, styled for readability."
        mock={<HeadersMockup />}
        flip
      />
      <FeatureRow
        icon="📎"
        title="Attachment Preview"
        desc="Don't just see the filename — preview the content. PDFs, images, and documents are rendered natively within the app, allowing you to verify generated assets instantly."
        mock={<AttachmentsMockup />}
      />
    </section>
  )
}

function Download() {
  return (
    <section id="download" className="relative overflow-hidden px-6 py-24">
      <div className="glow-orb left-1/2 top-1/2 h-80 w-[560px] -translate-x-1/2 -translate-y-1/2 bg-red/12" />
      <Reveal className="relative mx-auto max-w-3xl rounded-2xl border border-line bg-panel/80 p-12 text-center backdrop-blur">
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">Build better emails today.</h2>
        <p className="mx-auto mt-4 max-w-md text-white/50">
          Free for individuals, open source, and built for speed. Join thousands of
          developers using Native Mailer to ship with confidence.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="https://github.com"
            className="flex items-center gap-2 rounded-lg bg-red px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red/25 transition hover:brightness-110"
          >
            <AppleIcon /> macOS (Apple Silicon)
          </a>
          <a
            href="https://github.com"
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

function Footer() {
  const links: [string, string][] = [
    ['Documentation', '#'],
    ['Privacy Policy', '#'],
    ['Changelog', '#'],
    ['GitHub', 'https://github.com'],
  ]
  return (
    <footer className="border-t border-line/70 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div>
          <Logo />
          <p className="mt-2 text-xs text-white/35">
            © {new Date().getFullYear()} Native Mailer. Built for developers by developers.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs text-white/45">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-white">{label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="bg-ink text-white antialiased">
      <Nav />
      <Hero />
      <Workflow />
      <StackBand />
      <Steps />
      <Features />
      <Download />
      <Footer />
    </div>
  )
}
