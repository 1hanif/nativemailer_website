import { APP_VERSION, DOWNLOADS, REPO_URL, STACKS } from './data'
import { BrowserMockup } from './components/BrowserMockup'
import { Reveal } from './components/Reveal'
import { AttachmentsMockup, HeadersMockup, InboxMockupSmall } from './components/Mockups'
import { AppleIcon, GitHubIcon } from './components/icons'
import { Logo } from './components/Logo'

const Arrow = () => <span aria-hidden="true">↗</span>

const highlights = [
  ['01', 'Local SMTP', 'A private inbox on port 1025.'],
  ['02', 'Instant preview', 'HTML, text, headers, and raw source.'],
  ['03', 'Attachments', 'Inspect every file before it ships.'],
  ['04', 'Zero accounts', 'Open the app and start sending.'],
]

const steps = [
  {
    number: '01',
    title: 'Launch Native Mailer',
    body: 'Your local SMTP server starts immediately. No account, API key, or cloud project required.',
    code: '$ nativemailer\n✓ listening on localhost:1025',
  },
  {
    number: '02',
    title: 'Point your app at it',
    body: 'Use the same SMTP settings in Laravel, Rails, Django, Node, Phoenix, or anything else.',
    code: 'MAIL_HOST=localhost\nMAIL_PORT=1025',
  },
  {
    number: '03',
    title: 'Send. Inspect. Repeat.',
    body: 'Every message appears instantly with the detail you need to debug content and delivery.',
    code: 'POST /welcome-email\n202 Accepted  ·  18ms',
  },
]

function Nav() {
  return (
    <header className="site-nav">
      <a href="#top" aria-label="Native Mailer home" className="brand-link">
        <Logo />
      </a>
      <nav aria-label="Main navigation" className="nav-links">
        <a href="#features">Features</a>
        <a href="#workflow">Workflow</a>
        <a href={`${REPO_URL}/releases`}>Releases</a>
      </nav>
      <div className="nav-actions">
        <a className="nav-github" href={REPO_URL} target="_blank" rel="noreferrer">
          <GitHubIcon />
          <span>GitHub</span>
        </a>
        <a className="button button-light button-small" href="#download">
          Get the app <span aria-hidden="true">↓</span>
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-copy">
        <a className="release-pill" href={`${REPO_URL}/releases`}>
          <span className="release-dot" />
          v{APP_VERSION} is available
          <Arrow />
        </a>
        <h1>
          Email testing,
          <span>without leaving localhost.</span>
        </h1>
        <p className="hero-description">
          A fast, open-source desktop inbox for every email your app sends during development.
          Private by default. Ready in seconds.
        </p>
        <div className="hero-actions">
          <a className="button button-light" href={DOWNLOADS.macArm}>
            <AppleIcon /> Download for macOS
          </a>
          <a className="button button-ghost" href={REPO_URL} target="_blank" rel="noreferrer">
            <GitHubIcon /> View source
          </a>
        </div>
        <div className="platform-note" aria-label="Available platforms">
          <span>macOS</span><i />
          <span>Windows</span><i />
          <span>Linux</span>
        </div>
      </div>
      <div className="hero-product">
        <div className="product-aura" aria-hidden="true" />
        <BrowserMockup />
        <div className="floating-status floating-status-left">
          <span className="status-icon">↳</span>
          <span><b>SMTP ready</b><small>localhost:1025</small></span>
        </div>
        <div className="floating-status floating-status-right">
          <span className="live-pulse" />
          <span><b>Message captured</b><small>just now</small></span>
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section className="highlight-rail" aria-label="Native Mailer highlights">
      {highlights.map(([number, title, body]) => (
        <article key={number}>
          <span>{number}</span>
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        </article>
      ))}
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="section features-section">
      <Reveal className="section-heading">
        <p className="eyebrow">Built for the feedback loop</p>
        <h2>Everything stays<br />on your machine.</h2>
        <p>Inspect the whole message, not a watered-down preview. Native Mailer keeps the local email workflow quick, safe, and focused.</p>
      </Reveal>

      <div className="feature-grid">
        <Reveal className="feature-card feature-card-wide">
          <div className="feature-copy">
            <span className="feature-index">01 / INBOX</span>
            <h3>Every message.<br />Right when it happens.</h3>
            <p>Search, filter, and inspect captured email without waiting on a remote sandbox or leaving your development environment.</p>
          </div>
          <div className="feature-visual inbox-visual"><InboxMockupSmall /></div>
        </Reveal>

        <Reveal className="feature-card">
          <div className="feature-copy">
            <span className="feature-index">02 / SOURCE</span>
            <h3>Headers without the headache.</h3>
            <p>Read transport data, custom headers, return paths, and raw MIME in a view made for debugging.</p>
          </div>
          <div className="feature-visual"><HeadersMockup /></div>
        </Reveal>

        <Reveal className="feature-card">
          <div className="feature-copy">
            <span className="feature-index">03 / FILES</span>
            <h3>Attachments, accounted for.</h3>
            <p>Verify generated invoices, images, and documents before a real recipient ever sees them.</p>
          </div>
          <div className="feature-visual"><AttachmentsMockup /></div>
        </Reveal>
      </div>
    </section>
  )
}

function Workflow() {
  return (
    <section id="workflow" className="section workflow-section">
      <Reveal className="workflow-heading">
        <p className="eyebrow">Three steps. No ceremony.</p>
        <h2>From setup to inbox<br />in under a minute.</h2>
      </Reveal>
      <div className="workflow-grid">
        {steps.map((step) => (
          <Reveal className="workflow-card" key={step.number}>
            <span className="workflow-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <pre><code>{step.code}</code></pre>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function StackBand() {
  return (
    <section className="stack-band" aria-label="Compatible frameworks">
      <p>Works wherever SMTP does</p>
      <div className="stack-list">
        {STACKS.map((stack) => <span key={stack}>{stack}</span>)}
      </div>
    </section>
  )
}

function Download() {
  return (
    <section id="download" className="download-section">
      <div className="download-glow" aria-hidden="true" />
      <Reveal className="download-inner">
        <p className="eyebrow">Your local inbox is waiting</p>
        <h2>Ship email with confidence.</h2>
        <p>Free, open source, and built to disappear into your workflow.</p>
        <div className="download-actions">
          <a className="button button-light" href={DOWNLOADS.macArm}><AppleIcon /> macOS</a>
          <a className="button button-ghost" href={DOWNLOADS.windows}>Windows <span aria-hidden="true">↓</span></a>
          <a className="button button-ghost" href={DOWNLOADS.linuxAppImage}>Linux <span aria-hidden="true">↓</span></a>
        </div>
        <small>v{APP_VERSION} · Apple Silicon, Intel, Windows, and Linux</small>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <Logo />
        <p>A quiet place for development email.</p>
      </div>
      <div className="footer-links">
        <div>
          <span>Product</span>
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#download">Download</a>
        </div>
        <div>
          <span>Project</span>
          <a href={REPO_URL}>GitHub</a>
          <a href={`${REPO_URL}/releases`}>Releases</a>
          <a href={`${REPO_URL}/issues`}>Issues</a>
        </div>
      </div>
      <p className="footer-meta">© {new Date().getFullYear()} Native Mailer · Open source software</p>
    </footer>
  )
}

export default function App() {
  return (
    <div className="site-shell">
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <Features />
        <Workflow />
        <StackBand />
        <Download />
      </main>
      <Footer />
    </div>
  )
}
