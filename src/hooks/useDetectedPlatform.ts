import { useState } from 'react'

export type DetectedPlatform = 'macos' | 'windows' | 'linux' | 'unknown'

interface BrowserPlatform {
  platform: string
  userAgent: string
  maxTouchPoints: number
}

export function detectPlatform({
  platform,
  userAgent,
  maxTouchPoints,
}: BrowserPlatform): DetectedPlatform {
  const normalizedPlatform = platform.toLowerCase()
  const normalizedUserAgent = userAgent.toLowerCase()

  const isMobile =
    /android|iphone|ipad|ipod/.test(normalizedUserAgent) ||
    (normalizedPlatform === 'macintel' && maxTouchPoints > 1)

  if (isMobile) return 'unknown'
  if (normalizedPlatform.includes('win')) return 'windows'
  if (normalizedPlatform.includes('mac')) return 'macos'
  if (normalizedPlatform.includes('linux') || normalizedPlatform.includes('x11')) return 'linux'

  if (normalizedUserAgent.includes('windows')) return 'windows'
  if (normalizedUserAgent.includes('mac os')) return 'macos'
  if (normalizedUserAgent.includes('linux')) return 'linux'

  return 'unknown'
}

function readBrowserPlatform(): DetectedPlatform {
  if (typeof navigator === 'undefined') return 'unknown'

  const userAgentData = (
    navigator as Navigator & { userAgentData?: { platform?: string } }
  ).userAgentData

  return detectPlatform({
    platform: userAgentData?.platform || navigator.platform || '',
    userAgent: navigator.userAgent || '',
    maxTouchPoints: navigator.maxTouchPoints || 0,
  })
}

export function useDetectedPlatform(): DetectedPlatform {
  const [platform] = useState(readBrowserPlatform)
  return platform
}
