import { useEffect, useState } from 'react'
import { REPO_API } from '../data'

export function formatStars(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n)
}

export function useGitHubStars(): number | null {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    const cached = sessionStorage.getItem('gh-stars')
    if (cached !== null) {
      setStars(Number(cached))
      return
    }
    const controller = new AbortController()
    fetch(REPO_API, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: { stargazers_count?: number }) => {
        if (typeof data.stargazers_count === 'number') {
          sessionStorage.setItem('gh-stars', String(data.stargazers_count))
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {
        /* repo unreachable — hide the count */
      })
    return () => controller.abort()
  }, [])

  return stars
}
