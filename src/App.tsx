import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'

/* ---------- types & data ---------- */

const REPO_URL = 'https://github.com/1hanif/nativemailer'
const REPO_API = 'https://api.github.com/repos/1hanif/nativemailer'

interface Email {
  from: string
  subject: string
  tag: string
  color: string
}

const INCOMING: Email[] = [
  { from: 'orders@shop.test', subject: 'Order #1042 confirmed', tag: 'HTML', color: '#e3b341' },
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

/* ---------- hooks & icons ---------- */

function formatStars(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n)
}

function useGitHubStars(): number | null {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    const cached = sessionStorage.getItem('gh-stars')
    if (cached !== null) {
      setStars(Number(cached))
      return
    }
    const controller = new AbortController()
    fetch(REPO_API, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: { stargazers_count?: number }) => {
        if (typeof data.stargazers_count === 'number') {
          sessionStorage.setItem('gh-stars', String(data.stargazers_count))
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {
        /* repo unreachable — hide the count */
      })
    return () => controller.abort()
  }, [])

  return stars
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-[#e3b341]">
      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

/* ---------- shared bits ---------- */

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

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <img src="/logo.png" alt="Native Mailer logo" className="h-9 w-auto" />
      <span className="text-[15px] font-bold tracking-tight">Native Mailer</span>
    </div>
  )
}

function WindowDots({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="ml-3 font-mono text-[11px] text-white/35">{label}</span>
    </div>
  )
}

/* ---------- sections ---------- */

function Nav() {
  const stars = useGitHubStars()
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
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#how" className="transition hover:text-white">How it works</a>
          <a href="#download" className="transition hover:text-white">Download</a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/12 px-3 py-2 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white"
          >
            <GitHubIcon />
            <span className="hidden sm:inline">Star</span>
            <AnimatePresence>
              {stars !== null && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1 rounded-md bg-white/8 px-1.5 py-0.5 font-mono text-xs text-white/80"
                >
                  <StarIcon />
                  {formatStars(stars)}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
          <a
            href="#download"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Get the app
          </a>
        </div>
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
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-b from-white/10 via-white/3 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/60">
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-line bg-panel2 px-4 py-2.5">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="mx-auto flex w-1/2 items-center justify-center gap-2 rounded-md bg-ink px-3 py-1 font-mono text-[11px] text-white/40">
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-current" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
            localhost:1025
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[10px] font-medium text-white/70">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            LIVE
          </span>
        </div>
        {/* app: sidebar + list + preview */}
        <div className="grid grid-cols-[150px_1fr] md:grid-cols-[150px_1.1fr_1.4fr]">
          <aside className="hidden border-r border-line bg-panel2/60 p-3 sm:block">
            <div className="mb-3 flex items-center gap-2 px-2">
              <img src="/logo.png" alt="" className="h-5 w-auto" />
              <span className="text-xs font-semibold text-white/80">Mailer</span>
            </div>
            {['Inbox', 'Starred', 'Attachments', 'Trash'].map((item, i) => (
              <div
                key={item}
                className={`mb-1 rounded-md px-2 py-1.5 text-xs ${i === 0 ? 'bg-white/10 font-medium text-white' : 'text-white/40'}`}
              >
                {item}
                {i === 0 && <span className="float-right rounded bg-accent px-1.5 text-[9px] font-bold text-ink">{emails.length}</span>}
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
                  className={`block w-full border-b border-line/50 px-3 py-2.5 text-left ${idx === selected ? 'bg-white/5' : ''}`}
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
              <div className="mt-4 h-8 w-32 rounded-md bg-white/70" />
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
            <p className="font-mono text-xs font-semibold tracking-widest text-white/60">{s.n}</p>
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
            <span className="text-white/90">{k}:</span>
            <span className="truncate text-white/50">{v}</span>
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
    { name: 'invoice-1042.pdf', size: '182 KB', kind: 'PDF', color: '#e3b341' },
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
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/5 text-lg">{icon}</span>
        <h3 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">{title}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-white/50">{desc}</p>
      </Reveal>
      <Reveal className={flip ? 'lg:order-1' : ''}>
        <div className="card-hover relative">
          <div className="absolute -inset-1 rounded-xl bg-white/5 blur-xl" />
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

function Footer() {
  const links: [string, string][] = [
    ['Documentation', '#'],
    ['Privacy Policy', '#'],
    ['Changelog', '#'],
    ['GitHub', REPO_URL],
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
