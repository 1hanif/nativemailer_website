import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { INCOMING } from '../data'
import type { Email } from '../data'

export function BrowserMockup() {
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
