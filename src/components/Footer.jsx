const Footer = ({ onNavigate }) => (
  <footer className="site-footer">
    <button className="logo footer-logo" onClick={() => onNavigate('home')} aria-label="Back to top">
      TS<span>.</span>
    </button>
    <p>Designed and built by Tejas Shete.</p>
    <div className="footer-actions">
      <a className="footer-top" href="/Updated_resume.pdf" target="_blank" rel="noreferrer">Resume PDF ↗</a>
      <button className="footer-top" onClick={() => onNavigate('home')}>Back to top ↑</button>
    </div>
  </footer>
)

export default Footer