import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { InboxMockupSmall, HeadersMockup, AttachmentsMockup } from './Mockups'

interface FeatureRowProps {
  icon: string
  title: string
  desc: string
  mock: ReactNode
  flip?: boolean
}

function FeatureRow({ icon, title, desc, mock, flip = false }: FeatureRowProps) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? 'lg:order-2' : ''}>
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/5 text-lg">{icon}</span>
        <h3 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">{title}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-white/50">{desc}</p>
      </Reveal>
      <Reveal className={flip ? 'lg:order-1' : ''}>
        <div className="card-hover relative">
          <div className="absolute -inset-1 rounded-xl bg-white/5 blur-xl" />
          <div className="relative">{mock}</div>
        </div>
      </Reveal>
    </div>
  )
}

export function Features() {
  return (
    <section id="features" aria-label="Features" className="mx-auto max-w-6xl space-y-28 px-6 py-24">
      <h2 className="sr-only">Features</h2>
      <FeatureRow
        icon="📥"
        title="The Inbox"
        desc="A blazing fast, native list that handles thousands of emails without breaking a sweat. Search, filter, and categorize by recipient or subject with sub-millisecond latency."
        mock={<InboxMockupSmall />}
      />
      <FeatureRow
        icon="🧾"
        title="Inspect Headers"
        desc="Dive deep into the transport layer. Native Mailer exposes every raw SMTP header, including X-Headers, return paths, and authentication markers, styled for readability."
        mock={<HeadersMockup />}
        flip
      />
      <FeatureRow
        icon="📎"
        title="Attachment Preview"
        desc="Don't just see the filename — preview the content. PDFs, images, and documents are rendered natively within the app, allowing you to verify generated assets instantly."
        mock={<AttachmentsMockup />}
      />
    </section>
  )
}
