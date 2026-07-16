import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const rows = [
  {
    from: 'newsletter@acme.io',
    to: 'iamustapha213@gmail.com',
    subject: 'Your July product update is here',
    received: 'Jul 12, 2026 08:11:41',
  },
  {
    from: 'test@example.com',
    to: 'iamustapha213@gmail.com',
    subject: 'Test email with attachment',
    received: 'Jul 12, 2026 08:09:29',
  },
  {
    from: 'test@example.com',
    to: 'iamustapha213@gmail.com',
    subject: 'Test email with attachment',
    received: 'Jul 12, 2026 08:05:47',
  },
]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.08V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.08-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.08V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.13.38.35.72.65 1 .3.28.68.42 1.08.42H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  )
}

function InboxScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      key="inbox"
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -14 }}
      transition={{ duration: .22 }}
      className="mock-screen mock-inbox"
    >
      <div className="mock-page-heading">
        <div>
          <div className="mock-breadcrumb"><span>Emails</span><b>›</b><span>List</span></div>
          <h2>Emails</h2>
        </div>
        <button type="button" className="smtp-button"><SettingsIcon /> SMTP Settings</button>
      </div>

      <div className="mail-table-shell">
        <div className="mail-toolbar">
          <div className="mail-search"><SearchIcon /><span>Search</span></div>
          <span className="filter-icon" aria-hidden="true">▼</span>
          <span className="filter-count">0</span>
        </div>
        <div className="mail-grid mail-grid-head">
          <span className="mock-checkbox" />
          <span>From</span>
          <span className="mail-to">To</span>
          <span>Subject</span>
          <span className="mail-date">Received at ↓</span>
          <span />
        </div>
        {rows.map((row) => (
          <div className="mail-grid mail-row" key={`${row.from}-${row.received}`}>
            <span className="mock-checkbox" />
            <span>{row.from}</span>
            <span className="mail-to">{row.to}</span>
            <span>{row.subject}</span>
            <span className="mail-date">{row.received}</span>
            <span className="mail-actions">
              <button type="button" onClick={onOpen} aria-label={`View ${row.subject}`}>◉ View</button>
              <span>♜ Delete</span>
            </span>
          </div>
        ))}
        <div className="mail-pagination">
          <span>Showing 1 to 3 of 3 results</span>
          <span>Per page&nbsp;&nbsp; <b>10⌄</b></span>
        </div>
      </div>
    </motion.div>
  )
}

function DetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 14 }}
      transition={{ duration: .22 }}
      className="mock-screen mock-detail"
    >
      <button type="button" className="mock-breadcrumb detail-back" onClick={onBack}>
        <span>Emails</span><b>›</b><span>newsletter@acme.io</span><b>›</b><span>View</span>
      </button>
      <h2>View newsletter@acme.io</h2>
      <div className="message-meta">
        <div><b>From</b><span>newsletter@acme.io</span></div>
        <div><b>To</b><span>iamustapha213@gmail.com</span></div>
        <div><b>Subject</b><span>Your July product update is here</span></div>
        <div><b>Received at</b><span>Jul 12, 2026 08:11:41</span></div>
      </div>
      <div className="message-tabs">
        <span className="active">HTML</span><span>HTML Source</span><span>Text</span><span>Headers <b>5</b></span><span>Raw</span><span>Attachments <b>1</b></span><i>87.1 KB</i>
      </div>
      <div className="email-canvas">
        <article className="email-card">
          <header>Acme July Update</header>
          <div>
            <h3>Hi there 👋</h3>
            <p>Here's what's new this month:</p>
            <ul><li><b>Dark mode</b> is now available everywhere</li><li><b>2x faster</b> email delivery pipeline</li><li>New <em>attachment preview</em> in the inbox view</li></ul>
            <button type="button">See what's new</button>
            <small>You're receiving this because you signed up for Acme updates.</small>
          </div>
          <footer>© 2026 Acme Inc. · 123 Demo Street · <u>Unsubscribe</u></footer>
        </article>
      </div>
    </motion.div>
  )
}

export function BrowserMockup() {
  const [screen, setScreen] = useState<'inbox' | 'detail'>('inbox')

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .9, delay: .5, ease: 'easeOut' }}
      className="app-mockup"
    >
      <div className="app-window-glow" />
      <div className="app-window">
        <div className="app-titlebar">
          <div className="traffic-lights"><span /><span /><span /></div>
          <strong>NativeMailer</strong>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {screen === 'inbox'
            ? <InboxScreen onOpen={() => setScreen('detail')} />
            : <DetailScreen onBack={() => setScreen('inbox')} />}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
