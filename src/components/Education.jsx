import { motion } from 'motion/react'
import { GraduationCap } from 'lucide-react'

const Education = () => (
  <motion.section
    className="content-section section-muted"
    id="education"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.65 }}
  >
    <div className="section-inner">
      <p className="section-eyebrow">THE LEARNING PATH</p>
      <h2 className="section-heading">Education<span className="gradient-text"> & growth.</span></h2>
      <article className="timeline-card">
        <span className="timeline-icon"><GraduationCap size={24} /></span>
        <div>
          <p className="card-kicker">JULY 2026 — MAY 2029 · CGPA 9.5 / 10</p>
          <h3>B.Tech in Computer Engineering</h3>
          <p className="section-description">
            Pimpri Chinchwad College of Engineering and Research (PCCOER), Ravet.
          </p>
        </div>
      </article>
    </div>
  </motion.section>
)

export default Education