import { Reveal } from './Reveal'

export function Workflow() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <Reveal>
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Designed for the local workflow.</h2>
        <p className="mt-5 leading-relaxed text-white/50">
          We believe that development environments should be sandboxed, fast, and private.
          Native Mailer eliminates the friction of setting up sandbox accounts or dealing
          with rate limits on third-party API services. It acts as a black hole for your
          app's outgoing emails, ensuring zero leaks to real-world addresses while
          providing professional-grade inspection tools for high-precision debugging.
        </p>
      </Reveal>
    </section>
  )
}
