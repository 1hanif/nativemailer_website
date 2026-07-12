import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Workflow } from './components/Workflow'
import { StackBand } from './components/StackBand'
import { Steps } from './components/Steps'
import { Features } from './components/Features'
import { Download } from './components/Download'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="bg-ink text-white antialiased">
      <Nav />
      <main>
        <Hero />
        <Workflow />
        <StackBand />
        <Steps />
        <Features />
        <Download />
      </main>
      <Footer />
    </div>
  )
}
