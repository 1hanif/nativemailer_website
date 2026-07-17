import { useState } from 'react'
import { APP_VERSION, DOWNLOADS } from '../data'
import { formatDownloads } from '../hooks/useGitHubDownloads'
import { AppleIcon } from './icons'
import { Reveal } from './Reveal'

interface DownloadProps {
  downloads: number | null
}

const MACOS_RECOVERY_COMMAND = 'xattr -cr /Applications/NativeMailer.app'

export function Download({ downloads }: DownloadProps) {
  const [copied, setCopied] = useState(false)

  async function copyRecoveryCommand() {
    await navigator.clipboard.writeText(MACOS_RECOVERY_COMMAND)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

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
        <aside className="macos-install-note" aria-labelledby="macos-install-title">
          <div className="macos-install-copy">
            <span className="macos-install-icon" aria-hidden="true"><AppleIcon /></span>
            <div>
              <h3 id="macos-install-title">macOS says the app is damaged?</h3>
              <p>Move NativeMailer to Applications, then run this once in Terminal.</p>
            </div>
          </div>
          <div className="command-copy">
            <code>{MACOS_RECOVERY_COMMAND}</code>
            <button type="button" onClick={copyRecoveryCommand} aria-label="Copy Terminal command">
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="macos-install-footnote">
            NativeMailer is currently distributed without Apple notarization. This command removes
            macOS's download quarantine attribute. Using an Intel Mac?{' '}
            <a href={DOWNLOADS.macIntel}>Download the x64 build.</a>
          </p>
        </aside>
      </Reveal>
    </section>
  )
}
