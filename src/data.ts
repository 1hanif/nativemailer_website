import type { ReactNode } from 'react'

export const REPO_URL = 'https://github.com/1hanif/nativemailer'
export const REPO_API = 'https://api.github.com/repos/1hanif/nativemailer'

export const APP_VERSION = '2.0.0'
const DL = `${REPO_URL}/releases/download/v${APP_VERSION}`

export const DOWNLOADS = {
  macArm: `${DL}/NativeMailer-${APP_VERSION}-arm64.dmg`,
  macIntel: `${DL}/NativeMailer-${APP_VERSION}-x64.dmg`,
  windows: `${DL}/NativeMailer-${APP_VERSION}-setup.exe`,
  linuxAppImage: `${DL}/NativeMailer-${APP_VERSION}.AppImage`,
  linuxDebArm64: `${DL}/nativemailer_${APP_VERSION}_arm64.deb`,
} as const

export const STACKS: string[] = ['Laravel', 'Symfony', 'Rails', 'Django', 'Express', 'Phoenix']

export interface Step {
  n: string
  title: string
  desc: ReactNode
}
