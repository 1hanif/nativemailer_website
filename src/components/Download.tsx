import { useState } from 'react'
import { REPO_URL } from '../data'
import type { LatestRelease } from '../data'
import { formatDownloads } from '../hooks/useGitHubReleases'
import { Reveal } from './Reveal'

interface DownloadProps {
  downloads: number | null
  release: LatestRelease
}

const MACOS_RECOVERY_COMMAND = 'xattr -cr /Applications/NativeMailer.app'

export function Download({ downloads, release }: DownloadProps) {
  const [copied, setCopied] = useState(false)

  async function copyRecoveryCommand() {
    await navigator.clipboard.writeText(MACOS_RECOVERY_COMMAND)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="download" className="section container">
      <Reveal className="download">
        <h2>Download Native Mailer</h2>
        <p className="lead">Free and open source. Version {release.version}.</p>
        <div className="actions">
          <a className="button button-primary" href={release.links.macArm}>macOS</a>
          <a className="button button-secondary" href={release.links.windows}>Windows</a>
          <a className="button button-secondary" href={release.links.linuxAppImage}>Linux</a>
        </div>
        <p className="meta">
          <a href={release.links.macIntel}>Intel Mac</a> · <a href={release.links.linuxDebArm64}>.deb (ARM64)</a> ·{' '}
          <a href={`${REPO_URL}/releases`}>All releases</a>
          {downloads === null ? null : (
            <span aria-live="polite">
              {' '}· {formatDownloads(downloads)} installer {downloads === 1 ? 'download' : 'downloads'}
            </span>
          )}
        </p>

        <aside className="note" aria-labelledby="macos-install-title">
          <h3 id="macos-install-title">macOS says the app is damaged?</h3>
          <p>Move NativeMailer to Applications, then run this once in Terminal:</p>
          <div className="command">
            <code>{MACOS_RECOVERY_COMMAND}</code>
            <button type="button" onClick={copyRecoveryCommand} aria-label="Copy Terminal command">
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="note-footnote">
            NativeMailer isn't notarized by Apple yet. This removes macOS's download quarantine attribute.
          </p>
        </aside>
      </Reveal>
    </section>
  )
}
