import { REPO_URL } from '../data'
import { Logo } from './Logo'

export function Footer() {
  const links: [string, string][] = [
    ['Documentation', '#'],
    ['Privacy Policy', '#'],
    ['Changelog', '#'],
    ['GitHub', REPO_URL],
  ]
  return (
    <footer className="border-t border-line/70 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div>
          <Logo />
          <p className="mt-2 text-xs text-white/35">
            © {new Date().getFullYear()} Native Mailer. Built for developers by developers.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs text-white/45">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-white">{label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
