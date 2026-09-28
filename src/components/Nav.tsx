import { REPO_URL } from '../data'
import { Logo } from './Logo'

export function Nav() {
  return (
    <header className="site-nav container">
      <a href="#top" aria-label="Native Mailer home" className="brand-link">
        <Logo />
      </a>
      <nav aria-label="Main navigation" className="nav-links">
        <a href="#features">Features</a>
        <a href="#workflow">How it works</a>
        <a href={REPO_URL} target="_blank" rel="noreferrer">GitHub</a>
        <a className="nav-download" href="#download">Download</a>
      </nav>
    </header>
  )
}
