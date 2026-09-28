import { Download } from './components/Download'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Workflow } from './components/Workflow'
import { useGitHubDownloads } from './hooks/useGitHubDownloads'

export default function App() {
  const downloads = useGitHubDownloads()

  return (
    <>
      <Nav />
      <main>
        <Hero downloads={downloads} />
        <Features />
        <Workflow />
        <Download downloads={downloads} />
      </main>
      <Footer />
    </>
  )
}
