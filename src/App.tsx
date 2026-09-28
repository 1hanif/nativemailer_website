import { Download } from './components/Download'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Workflow } from './components/Workflow'
import { useGitHubReleases } from './hooks/useGitHubReleases'

export default function App() {
  const { downloads, latest } = useGitHubReleases()

  return (
    <>
      <Nav />
      <main>
        <Hero downloads={downloads} release={latest} />
        <Features />
        <Workflow />
        <Download downloads={downloads} release={latest} />
      </main>
      <Footer />
    </>
  )
}
