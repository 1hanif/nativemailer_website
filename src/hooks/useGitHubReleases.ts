import { useEffect, useState } from "react";
import { FALLBACK_RELEASE, REPO_API, REPO_URL } from "../data";
import type { DownloadKey, LatestRelease } from "../data";

const RELEASES_CACHE_KEY = "gh-releases";
// Short enough that a newly published release shows up without closing the tab.
const RELEASES_CACHE_TTL_MS = 5 * 60 * 1000;

interface ReleaseAsset {
  name?: string;
  download_count?: number;
  browser_download_url?: string;
}

interface Release {
  tag_name?: string;
  html_url?: string;
  draft?: boolean;
  prerelease?: boolean;
  assets?: ReleaseAsset[];
}

export interface ReleaseInfo {
  downloads: number | null;
  latest: LatestRelease;
}

const ASSET_PATTERNS: Record<DownloadKey, RegExp> = {
  macArm: /^NativeMailer-.+-arm64\.dmg$/,
  macIntel: /^NativeMailer-.+-x64\.dmg$/,
  windows: /^NativeMailer-.+-setup\.exe$/,
  linuxAppImage: /^NativeMailer-.+\.AppImage$/,
  linuxDebArm64: /^nativemailer_.+_arm64\.deb$/,
};

function isInstaller(name: string): boolean {
  return (
    /^NativeMailer-.+\.(?:dmg|exe|AppImage)$/.test(name) ||
    /^nativemailer_.+\.deb$/.test(name)
  );
}

function isPublished(release: Release): boolean {
  return !release.draft && !release.prerelease;
}

export function countInstallerDownloads(releases: Release[]): number {
  return releases
    .filter(isPublished)
    .flatMap((release) => release.assets ?? [])
    .filter(
      (asset) => typeof asset.name === "string" && isInstaller(asset.name),
    )
    .reduce(
      (total, asset) =>
        total +
        (typeof asset.download_count === "number" ? asset.download_count : 0),
      0,
    );
}

// GitHub returns releases newest first, so the first published one is the latest.
// Each platform links to the newest release that actually ships its installer,
// since not every release includes a build for every platform.
export function findLatestRelease(releases: Release[]): LatestRelease | null {
  const published = releases.filter(isPublished);
  const release = published[0];
  if (!release?.tag_name) return null;

  const findAsset = (pattern: RegExp) =>
    published
      .flatMap((r) => r.assets ?? [])
      .find(
        (asset) => typeof asset.name === "string" && pattern.test(asset.name),
      )?.browser_download_url;

  const links = Object.fromEntries(
    (Object.keys(ASSET_PATTERNS) as DownloadKey[]).map((key) => [
      key,
      findAsset(ASSET_PATTERNS[key]) ?? `${REPO_URL}/releases/latest`,
    ]),
  ) as Record<DownloadKey, string>;

  return {
    version: release.tag_name.replace(/^v/, ""),
    url: release.html_url ?? `${REPO_URL}/releases/tag/${release.tag_name}`,
    links,
  };
}

export function formatDownloads(downloads: number): string {
  return new Intl.NumberFormat("en-US").format(downloads);
}

function readCache(): ReleaseInfo | null {
  try {
    const cached = sessionStorage.getItem(RELEASES_CACHE_KEY);
    if (cached === null) return null;

    const { savedAt, info } = JSON.parse(cached) as {
      savedAt?: number;
      info?: ReleaseInfo;
    };
    if (typeof savedAt !== "number" || !info) return null;
    return Date.now() - savedAt < RELEASES_CACHE_TTL_MS ? info : null;
  } catch {
    return null;
  }
}

export function useGitHubReleases(): ReleaseInfo {
  const [info, setInfo] = useState<ReleaseInfo>(
    () => readCache() ?? { downloads: null, latest: FALLBACK_RELEASE },
  );

  useEffect(() => {
    if (readCache() !== null) return;

    const controller = new AbortController();
    fetch(`${REPO_API}/releases?per_page=100`, { signal: controller.signal })
      .then((res) => {
        return res.ok
          ? res.json()
          : Promise.reject(new Error(String(res.status)));
      })
      .then((data: unknown) => {
        console.log("GitHub releases data:", data);
        if (!Array.isArray(data)) return;

        const releases = data as Release[];
        const next: ReleaseInfo = {
          downloads: countInstallerDownloads(releases),
          latest: findLatestRelease(releases) ?? FALLBACK_RELEASE,
        };
        try {
          sessionStorage.setItem(
            RELEASES_CACHE_KEY,
            JSON.stringify({ savedAt: Date.now(), info: next }),
          );
        } catch {
          /* storage unavailable — skip caching */
        }
        setInfo(next);
      })
      .catch((error: unknown) => {
        // StrictMode unmounts once in dev, aborting the first request — not a failure.
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        /* releases unreachable — keep the fallback links and hide the count */
      });

    return () => controller.abort();
  }, []);

  return info;
}
