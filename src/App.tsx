import { Download } from './components/Download'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Highlights } from './components/Highlights'
import { Nav } from './components/Nav'
import { StackBand } from './components/StackBand'
import { Workflow } from './components/Workflow'
import { useGitHubDownloads } from './hooks/useGitHubDownloads'

export default function App() {
  const downloads = useGitHubDownloads()

  return (
    <div className="site-shell">
      <Nav />
      <main>
        <Hero downloads={downloads} />
        <Highlights />
        <Features />
        <Workflow />
        <StackBand />
        <Download downloads={downloads} />
      </main>
      <Footer />
    </div>
  )
}
