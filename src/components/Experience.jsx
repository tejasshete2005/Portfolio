import { motion } from 'motion/react'
import { ArrowUpRight, BadgeCheck, BarChart3, Check } from 'lucide-react'

const certificateUrl = '/certificates/Tejas%20Shete_ITR_Completion_SVERI%20(3).pdf'

const Experience = () => (
  <motion.section
    className="content-section"
    id="experience"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.65 }}
  >
    <div className="section-inner">
      <p className="section-eyebrow">PROFESSIONAL EXPERIENCE</p>
      <h2 className="section-heading">Turning data into <span className="gradient-text">insight.</span></h2>
      <motion.article
        className="timeline-card experience-card"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <span className="timeline-icon"><BarChart3 size={22} /></span>
        <div>
          <p className="card-kicker">JUNE 2025 — AUGUST 2025 · 3 MONTHS</p>
          <h3>Data Analytics Intern</h3>
          <p className="experience-company">ProAzure Software Solutions Pvt. Ltd.</p>
          <p className="section-description">
            Completed hands-on internship training in data analytics, applying
            data preparation and analysis techniques to extract and communicate insights.
          </p>
          <ul className="experience-highlights">
            {[
              'Cleaned and preprocessed data; performed exploratory data analysis.',
              'Used Python, Pandas, and NumPy to analyze datasets and identify trends.',
              'Created data visualizations to communicate findings and support data-informed decisions.',
              'Built practical skills in analytical problem-solving and presenting insights.'
            ].map((item) => (
              <li key={item}><Check size={16} /><span>{item}</span></li>
            ))}
          </ul>
          <div className="skill-tags">
            {['Python', 'Pandas', 'NumPy', 'MySQL', 'Power BI', 'Data Visualization'].map((item) => (
              <span className="skill-tag" key={item}>{item}</span>
            ))}
          </div>
          <motion.a
            className="certificate-card internship-certificate-card"
            href={certificateUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -5 }}
          >
            <span className="certificate-icon"><BarChart3 size={21} /></span>
            <span className="certificate-issuer">PROAZURE SOFTWARE SOLUTIONS</span>
            <span className="certificate-title">Data Science and Analytics Internship</span>
            <span className="certificate-focus">
              Completed June 2 – August 23, 2025 · 12 weeks
            </span>
            <span className="internship-certificate-skills">
              <span><BadgeCheck size={15} /> Data analysis</span>
              <span><BadgeCheck size={15} /> Department operations</span>
              <span><BadgeCheck size={15} /> Management processes</span>
            </span>
            <span className="certificate-footer">
              <span>Internship completion</span>
              <span className="certificate-open">View PDF <ArrowUpRight size={15} /></span>
            </span>
          </motion.a>
        </div>
      </motion.article>
    </div>
  </motion.section>
)

export default Experience