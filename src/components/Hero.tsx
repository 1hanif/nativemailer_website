import { APP_VERSION, DOWNLOADS, REPO_URL } from '../data'
import type { DetectedPlatform } from '../hooks/useDetectedPlatform'
import { useDetectedPlatform } from '../hooks/useDetectedPlatform'
import { formatDownloads } from '../hooks/useGitHubDownloads'
import { BrowserMockup } from './BrowserMockup'

interface HeroProps {
  downloads: number | null
}

const SUGGESTED_DOWNLOADS: Record<DetectedPlatform, { href: string; label: string }> = {
  macos: { href: DOWNLOADS.macArm, label: 'Download for macOS' },
  windows: { href: DOWNLOADS.windows, label: 'Download for Windows' },
  linux: { href: DOWNLOADS.linuxAppImage, label: 'Download for Linux' },
  unknown: { href: '#download', label: 'Download' },
}

export function Hero({ downloads }: HeroProps) {
  const platform = useDetectedPlatform()
  const suggestedDownload = SUGGESTED_DOWNLOADS[platform]

  return (
    <section id="top" className="hero container">
      <a className="release-link" href={`${REPO_URL}/releases/tag/v${APP_VERSION}`}>
        v{APP_VERSION} <span aria-hidden="true">→</span>
      </a>
      <h1>Email testing, without leaving localhost.</h1>
      <p className="lead">
        A fast, open-source desktop inbox for every email your app sends during development.
      </p>
      <div className="actions">
        <a className="button button-primary" href={suggestedDownload.href}>
          {suggestedDownload.label}
        </a>
        <a className="button button-quiet" href={REPO_URL} target="_blank" rel="noreferrer">
          View source <span aria-hidden="true">→</span>
        </a>
      </div>
      <p className="meta">
        macOS · Windows · Linux
        {downloads === null ? null : (
          <> · {formatDownloads(downloads)} {downloads === 1 ? 'download' : 'downloads'}</>
        )}
      </p>
      <div className="hero-product">
        <BrowserMockup />
      </div>
    </section>
  )
}
