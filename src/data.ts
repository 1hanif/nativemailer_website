import type { ReactNode } from 'react'

export const REPO_URL = 'https://github.com/1hanif/nativemailer'
export const REPO_API = 'https://api.github.com/repos/1hanif/nativemailer'

// Fallback used before the GitHub API responds or if it's unreachable.
// The live site reads the latest release from GitHub, so this rarely needs bumping.
const FALLBACK_VERSION = '2.0.0'
const DL = `${REPO_URL}/releases/download/v${FALLBACK_VERSION}`

export type DownloadKey = 'macArm' | 'macIntel' | 'windows' | 'linuxAppImage' | 'linuxDebArm64'

export interface LatestRelease {
  version: string
  url: string
  links: Record<DownloadKey, string>
}

export const FALLBACK_RELEASE: LatestRelease = {
  version: FALLBACK_VERSION,
  url: `${REPO_URL}/releases/tag/v${FALLBACK_VERSION}`,
  links: {
    macArm: `${DL}/NativeMailer-${FALLBACK_VERSION}-arm64.dmg`,
    macIntel: `${DL}/NativeMailer-${FALLBACK_VERSION}-x64.dmg`,
    windows: `${DL}/NativeMailer-${FALLBACK_VERSION}-setup.exe`,
    linuxAppImage: `${DL}/NativeMailer-${FALLBACK_VERSION}.AppImage`,
    linuxDebArm64: `${DL}/nativemailer_${FALLBACK_VERSION}_arm64.deb`,
  },
}

export const STACKS: string[] = ['Laravel', 'Symfony', 'Rails', 'Django', 'Express', 'Phoenix']

export interface Step {
  n: string
  title: string
  desc: ReactNode
}
