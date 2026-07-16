import { AttachmentsMockup, HeadersMockup, InboxMockupSmall } from './Mockups'
import { Reveal } from './Reveal'

export function Features() {
  return (
    <section id="features" className="section features-section">
      <Reveal className="section-heading">
        <p className="eyebrow">Built for the feedback loop</p>
        <h2>Everything stays<br />on your machine.</h2>
        <p>Inspect the whole message, not a watered-down preview. Native Mailer keeps the local email workflow quick, safe, and focused.</p>
      </Reveal>

      <div className="feature-grid">
        <Reveal className="feature-card feature-card-wide">
          <div className="feature-copy">
            <span className="feature-index">01 / INBOX</span>
            <h3>Every message.<br />Right when it happens.</h3>
            <p>Search, filter, and inspect captured email without waiting on a remote sandbox or leaving your development environment.</p>
          </div>
          <div className="feature-visual inbox-visual"><InboxMockupSmall /></div>
        </Reveal>

        <Reveal className="feature-card">
          <div className="feature-copy">
            <span className="feature-index">02 / SOURCE</span>
            <h3>Headers without the headache.</h3>
            <p>Read transport data, custom headers, return paths, and raw MIME in a view made for debugging.</p>
          </div>
          <div className="feature-visual"><HeadersMockup /></div>
        </Reveal>

        <Reveal className="feature-card">
          <div className="feature-copy">
            <span className="feature-index">03 / FILES</span>
            <h3>Attachments, accounted for.</h3>
            <p>Verify generated invoices, images, and documents before a real recipient ever sees them.</p>
          </div>
          <div className="feature-visual"><AttachmentsMockup /></div>
        </Reveal>
      </div>
    </section>
  )
}
