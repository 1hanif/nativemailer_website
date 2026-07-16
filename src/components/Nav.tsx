import { REPO_URL } from '../data'
import { GitHubIcon } from './icons'
import { Logo } from './Logo'

export function Nav() {
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
