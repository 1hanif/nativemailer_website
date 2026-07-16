import { REPO_URL } from '../data'
import { Logo } from './Logo'

export function Footer() {
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
