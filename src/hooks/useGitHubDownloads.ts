import { useEffect, useState } from 'react'
import { REPO_API } from '../data'

const DOWNLOADS_CACHE_KEY = 'gh-installer-downloads'

interface ReleaseAsset {
  name?: string
  download_count?: number
}

interface Release {
  draft?: boolean
  prerelease?: boolean
  assets?: ReleaseAsset[]
}

function isInstaller(name: string): boolean {
  return (
    /^NativeMailer-.+\.(?:dmg|exe|AppImage)$/.test(name) ||
    /^nativemailer_.+\.deb$/.test(name)
  )
}

export function countInstallerDownloads(releases: Release[]): number {
  return releases
    .filter((release) => !release.draft && !release.prerelease)
    .flatMap((release) => release.assets ?? [])
    .filter((asset) => typeof asset.name === 'string' && isInstaller(asset.name))
    .reduce(
      (total, asset) =>
        total + (typeof asset.download_count === 'number' ? asset.download_count : 0),
      0,
    )
}

export function formatDownloads(downloads: number): string {
  return new Intl.NumberFormat('en-US').format(downloads)
}

export function useGitHubDownloads(): number | null {
  const [downloads, setDownloads] = useState<number | null>(null)

  useEffect(() => {
    const cached = sessionStorage.getItem(DOWNLOADS_CACHE_KEY)
    if (cached !== null) {
      setDownloads(Number(cached))
      return
    }

    const controller = new AbortController()
    fetch(`${REPO_API}/releases?per_page=100`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: unknown) => {
        if (!Array.isArray(data)) return

        const count = countInstallerDownloads(data as Release[])
        sessionStorage.setItem(DOWNLOADS_CACHE_KEY, String(count))
        setDownloads(count)
      })
      .catch(() => {
        /* releases unreachable — hide the count */
      })

    return () => controller.abort()
  }, [])

  return downloads
}
