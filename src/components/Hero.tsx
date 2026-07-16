import { APP_VERSION, DOWNLOADS, REPO_URL } from '../data'
import type { DetectedPlatform } from '../hooks/useDetectedPlatform'
import { useDetectedPlatform } from '../hooks/useDetectedPlatform'
import { formatDownloads } from '../hooks/useGitHubDownloads'
import { BrowserMockup } from './BrowserMockup'
import { AppleIcon, GitHubIcon } from './icons'

interface HeroProps {
  downloads: number | null
}

const SUGGESTED_DOWNLOADS: Record<DetectedPlatform, { href: string; label: string }> = {
  macos: { href: DOWNLOADS.macArm, label: 'Download for macOS' },
  windows: { href: DOWNLOADS.windows, label: 'Download for Windows' },
  linux: { href: DOWNLOADS.linuxAppImage, label: 'Download for Linux' },
  unknown: { href: '#download', label: 'Choose your download' },
}

const Arrow = () => <span aria-hidden="true">↗</span>

export function Hero({ downloads }: HeroProps) {
  const platform = useDetectedPlatform()
  const suggestedDownload = SUGGESTED_DOWNLOADS[platform]

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
          <a className="button button-light" href={suggestedDownload.href}>
            {platform === 'macos' ? <AppleIcon /> : <span aria-hidden="true">↓</span>}
            {suggestedDownload.label}
          </a>
          <a className="button button-ghost" href={REPO_URL} target="_blank" rel="noreferrer">
            <GitHubIcon /> View source
          </a>
        </div>
        <div className="platform-note" aria-label="Available platforms">
          <span>macOS</span><i />
          <span>Windows</span><i />
          <span>Linux</span>
          {downloads === null ? null : (
            <>
              <i />
              <span className="hero-download-count">
                {formatDownloads(downloads)} {downloads === 1 ? 'download' : 'downloads'}
              </span>
            </>
          )}
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
