import { motion } from 'motion/react'
import { ArrowUpRight, Braces, Code2, Gauge, GitBranch } from 'lucide-react'
import DsaVisualizer from './DsaVisualizer'

const focusAreas = [
  {
    icon: Braces,
    title: 'Data structures & algorithms',
    description: 'Strengthening the fundamentals behind clear and efficient solutions.'
  },
  {
    icon: Code2,
    title: 'Problem-solving',
    description: 'Breaking problems down and turning a plan into working code.'
  },
  {
    icon: Gauge,
    title: 'Efficiency mindset',
    description: 'Paying attention to how implementation choices affect performance.'
  }
]

const DSA = () => (
  <motion.section
    className="content-section section-muted"
    id="dsa"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.65 }}
  >
    <div className="section-inner">
      <p className="section-eyebrow">MY PRIMARY TECHNICAL FOCUS</p>
      <h2 className="section-heading">Data structures & <span className="gradient-text">algorithms.</span></h2>
      <p className="section-description section-lead">
        I’m focused on growing as a problem solver through DSA, writing code
        that is not only correct but thoughtfully structured and efficient.
      </p>
      <div className="highlight-grid">
        {focusAreas.map(({ icon: Icon, title, description }, index) => (
          <motion.article
            className="highlight-card"
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.12 }}
          >
            <span className="card-icon"><Icon size={20} /></span>
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.article>
        ))}
      </div>
      <DsaVisualizer />
      <div className="coding-profiles">
        <div>
          <p className="section-eyebrow">CODING PROFILES</p>
          <h3>Follow my <span className="gradient-text">progress.</span></h3>
          <p className="section-description">
            Visit my profiles for current coding activity and public work.
            No live counts are shown here so the information stays accurate.
          </p>
        </div>
        <div className="coding-profile-links">
          <a
            className="coding-profile-card"
            href="https://leetcode.com/u/tejasshete00/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="card-icon"><Code2 size={20} /></span>
            <span><strong>LeetCode</strong><small>View profile & problem-solving activity</small></span>
            <ArrowUpRight size={17} />
          </a>
          <a
            className="coding-profile-card"
            href="https://github.com/tejasshete2005"
            target="_blank"
            rel="noreferrer"
          >
            <span className="card-icon"><GitBranch size={20} /></span>
            <span><strong>GitHub</strong><small>Explore repositories and contributions</small></span>
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </div>
  </motion.section>
)

export default DSA
