import { INCOMING, HEADERS, ATTACHMENTS } from '../data'
import { WindowDots } from './WindowDots'

export function InboxMockupSmall() {
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

export function HeadersMockup() {
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

export function AttachmentsMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/50">
      <WindowDots label="Attachments (3)" />
      <div className="grid gap-3 p-5 sm:grid-cols-3">
        {ATTACHMENTS.map((f) => (
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
