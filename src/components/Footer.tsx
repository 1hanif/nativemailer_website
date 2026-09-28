import { REPO_URL } from '../data'

export function Footer() {
  return (
    <footer className="footer container">
      <p>© {new Date().getFullYear()} Native Mailer</p>
      <nav aria-label="Footer navigation">
        <a href={REPO_URL}>GitHub</a>
        <a href={`${REPO_URL}/releases`}>Releases</a>
        <a href={`${REPO_URL}/issues`}>Issues</a>
      </nav>
    </footer>
  )
}
