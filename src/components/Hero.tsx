import { REPO_URL } from '../data'
import type { LatestRelease } from '../data'
import type { DetectedPlatform } from '../hooks/useDetectedPlatform'
import { useDetectedPlatform } from '../hooks/useDetectedPlatform'
import { formatDownloads } from '../hooks/useGitHubReleases'
import { BrowserMockup } from './BrowserMockup'

interface HeroProps {
  downloads: number | null
  release: LatestRelease
}

function suggestedDownloads(
  links: LatestRelease['links'],
): Record<DetectedPlatform, { href: string; label: string }> {
  return {
    macos: { href: links.macArm, label: 'Download for macOS' },
    windows: { href: links.windows, label: 'Download for Windows' },
    linux: { href: links.linuxAppImage, label: 'Download for Linux' },
    unknown: { href: '#download', label: 'Download' },
  }
}

export function Hero({ downloads, release }: HeroProps) {
  const platform = useDetectedPlatform()
  const suggestedDownload = suggestedDownloads(release.links)[platform]

  return (
    <section id="top" className="hero container">
      <a className="release-link" href={release.url}>
        v{release.version} <span aria-hidden="true">→</span>
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
