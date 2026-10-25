import { DISCORD_URL } from "@/data/constants";

const LINKS = [
  ["About", "#about"],
  ["Tracks", "#tracks"],
  ["Timeline", "#timeline"],
  ["Prizes", "#prizes"],
  ["FAQs", "#faqs"],
] as const;

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="eyebrow footer-eyebrow"><span>The end / 2026</span></p>
            <a className="footer-wordmark" href="#about" data-wiggle aria-label="Baddiethon - back to top">
              Baddiethon
              <svg className="star" viewBox="0 0 100 100" aria-hidden="true">
                <use href="#i-star5" />
              </svg>
            </a>
            <p className="footer-tag">Ideas are everywhere. Build something people actually use.</p>
          </div>

          <div className="footer-cta">
            <p className="footer-kicker">Registrations close Oct 30</p>
            <button className="btn btn-lg" type="button" data-register>
              Register Now
              <svg className="ico-s" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M8 6h10v10" /></svg>
            </button>
            <a className="footer-discord" href={DISCORD_URL} target="_blank" rel="noopener">
              Join the Discord
              <svg className="ico-s" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M8 6h10v10" /></svg>
            </a>
          </div>
        </div>

        <div className="footer-cols">
          <nav className="footer-col" aria-label="Footer sections">
            <h3>Explore</h3>
            <ul>
              {LINKS.map(([label, href]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h3>Key dates</h3>
            <p className="footer-dates"><strong>Oct 30 &mdash; Nov 20, 2026</strong><br />Fully online. Every round.</p>
            <p className="footer-small">Idea PPT &rarr; Top 100 &rarr; Finale</p>
          </div>

          <div className="footer-col">
            <h3>Community</h3>
            <p>Find teammates, ask questions and get updates before the clock starts.</p>
            <a className="footer-inline" href={DISCORD_URL} target="_blank" rel="noopener">
              Say hi in the Discord
              <span aria-hidden="true">&nearr;</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Baddiethon</p>
          <p className="footer-sign">Built by builders. Bad ideas welcome.</p>
          <a className="footer-top-link" href="#about">Back to top <span aria-hidden="true">&uarr;</span></a>
        </div>
      </div>
    </footer>
  );
}
