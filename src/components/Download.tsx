import { APP_VERSION, DOWNLOADS } from '../data'
import { formatDownloads } from '../hooks/useGitHubDownloads'
import { AppleIcon } from './icons'
import { Reveal } from './Reveal'

interface DownloadProps {
  downloads: number | null
}

export function Download({ downloads }: DownloadProps) {
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
        <div className="download-meta">
          <small>v{APP_VERSION} · Apple Silicon, Intel, Windows, and Linux</small>
          {downloads === null ? null : (
            <small className="download-count" aria-live="polite">
              {formatDownloads(downloads)} installer {downloads === 1 ? 'download' : 'downloads'} via GitHub
            </small>
          )}
        </div>
      </Reveal>
    </section>
  )
}
