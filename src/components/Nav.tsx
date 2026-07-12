import { motion, AnimatePresence } from 'framer-motion'
import { REPO_URL } from '../data'
import { useGitHubStars, formatStars } from '../hooks/useGitHubStars'
import { Logo } from './Logo'
import { GitHubIcon, StarIcon } from './icons'

export function Nav() {
  const stars = useGitHubStars()
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <div className="hidden items-center gap-8 text-sm text-white/55 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#how" className="transition hover:text-white">How it works</a>
          <a href="#download" className="transition hover:text-white">Download</a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/12 px-3 py-2 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white"
          >
            <GitHubIcon />
            <span className="hidden sm:inline">Star</span>
            <AnimatePresence>
              {stars !== null && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1 rounded-md bg-white/8 px-1.5 py-0.5 font-mono text-xs text-white/80"
                >
                  <StarIcon />
                  {formatStars(stars)}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
          <a
            href="#download"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Get the app
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
