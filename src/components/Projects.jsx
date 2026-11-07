import { motion } from 'motion/react'
import { ArrowUpRight, Building2, Wallet } from 'lucide-react'

const projects = [
  {
    name: 'StayNest',
    url: 'https://staynest-zutw.onrender.com/',
    type: 'REAL-TIME HOTEL BOOKING PLATFORM',
    description: 'A web-based booking experience for discovering and booking hotels and accommodation, with location-based listings, price filters, reviews, and interactive maps.',
    features: ['Hotel search', 'Location listings', 'Price filtering', 'Reviews', 'Interactive maps'],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'EJS', 'Bootstrap', 'REST APIs'],
    architecture: ['React / EJS interface', 'Node.js + Express REST APIs', 'MongoDB data storage'],
    challenge: 'Connecting hotel discovery and booking tasks across searchable listings, location and price filters, reviews, maps, and hotel management.',
    learning: 'Responsive UI development, REST API integration, MongoDB-backed features, and multi-step product workflows.',
    status: 'Live',
    icon: Building2,
    tone: 'staynest'
  },
  {
    name: 'FinTrack',
    url: 'https://fintrack-04c2.onrender.com/',
    type: 'PERSONAL EXPENSE TRACKER',
    description: 'A full-stack finance tracker for managing income and expenses, categorizing transactions, monitoring balances, and viewing interactive summaries of spending patterns.',
    features: ['Transaction management', 'Income & expense categories', 'Balance tracking', 'Financial dashboards'],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    architecture: ['React interface', 'Node.js + Express REST APIs', 'MongoDB data storage'],
    challenge: 'Turning individual income and expense entries into useful balance tracking and clear summaries of spending patterns.',
    learning: 'Transaction-focused data handling, REST API integration, and dashboard-driven summaries.',
    status: 'Live',
    icon: Wallet,
    tone: 'fintrack'
  }
]

const Projects = () => (
  <motion.section
    className="content-section section-muted"
    id="projects"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.65 }}
  >
    <div className="section-inner">
      <p className="section-eyebrow">SELECTED WORK</p>
      <h2 className="section-heading">Live projects, <span className="gradient-text">behind the build.</span></h2>
      <p className="section-description section-lead">
        Live full-stack applications solving practical, everyday problems.
      </p>
      <div className="projects-grid">
        {projects.map(({ name, url, type, description, features, technologies, architecture, challenge, learning, status, icon: Icon, tone }, index) => (
          <motion.article
            className={`project-card ${tone}`}
            key={name}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
          >
            <div className="project-preview" aria-hidden="true">
              <span className="project-preview-orbit" />
              <span className="project-preview-icon"><Icon size={34} /></span>
              <span className="project-preview-name">{name}</span>
            </div>
            <div className="project-copy">
              <div className="project-title-row">
                <div>
                  <p className="card-kicker">{type}</p>
                  <h3>{name}</h3>
                </div>
                <span className="project-status">{status}</span>
              </div>
              <p className="section-description">{description}</p>
              <p className="project-feature-label">FEATURES</p>
              <ul className="project-features">
                {features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <div className="skill-tags">
                {technologies.map((item) => <span className="skill-tag" key={item}>{item}</span>)}
              </div>
              <details className="project-case-study">
                <summary>How I built it <span aria-hidden="true">+</span></summary>
                <div className="case-study-content">
                  <div>
                    <h4>Problem & approach</h4>
                    <p>{description}</p>
                  </div>
                  <div>
                    <h4>High-level architecture</h4>
                    <ol className="project-flow">
                      {architecture.map((layer) => <li key={layer}>{layer}</li>)}
                    </ol>
                  </div>
                  <div>
                    <h4>Engineering challenge</h4>
                    <p>{challenge}</p>
                  </div>
                  <div>
                    <h4>Technical concepts practiced</h4>
                    <p>{learning}</p>
                  </div>
                </div>
              </details>
              <a className="text-link" href={url} target="_blank" rel="noreferrer">
                Visit {name} <ArrowUpRight size={16} />
              </a>
            </div>
            <span className="project-mark" aria-hidden="true"><ArrowUpRight size={21} /></span>
          </motion.article>
        ))}
      </div>
    </div>
  </motion.section>
)

export default Projects