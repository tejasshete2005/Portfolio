import { motion } from 'motion/react'
import { Braces, Code2, Database } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Full-stack development',
    description: 'Building database-driven applications and REST APIs with React, Node.js, Express, and MongoDB.'
  },
  {
    icon: Database,
    title: 'Data analytics',
    description: 'Using Python-based analysis and visualization to find patterns and communicate useful insights.'
  },
  {
    icon: Braces,
    title: 'DSA & problem-solving',
    description: 'My main technical focus is strengthening algorithmic thinking and applying it to efficient software.'
  }
]

const About = () => (
  <motion.section
    className="content-section"
    id="about"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.65 }}
  >
    <div className="section-inner">
      <p className="section-eyebrow">A LITTLE ABOUT ME</p>
      <h2 className="section-heading">Computer engineer. <span className="gradient-text">DSA-focused problem solver.</span></h2>
      <p className="section-description about-intro">
        I’m Tejas Shete, a Computer Engineering student at PCCOER focused on
        data structures, algorithms, and problem-solving. I’m building a strong
        foundation in efficient software development while continuing to explore
        full-stack engineering.
      </p>
      <div className="highlight-grid">
        {highlights.map(({ icon: Icon, title, description }, index) => (
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
    </div>
  </motion.section>
)

export default About