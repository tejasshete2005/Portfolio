import { motion } from 'motion/react'
import { ArrowUpRight, Cloud, Code2, LineChart } from 'lucide-react'

const certificates = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
    issuer: 'Oracle',
    date: 'September 2025',
    focus: 'Cloud infrastructure · Data science',
    file: 'Oracle_eCertificate_copy (2).pdf',
    icon: Cloud
  },
  {
    title: 'Software Engineering Job Simulation',
    issuer: 'Accenture · Forage',
    date: 'June 2025',
    focus: 'Architecture · Security · Programming · Testing · Agile',
    file: 'AccentureSWEnggCertification.pdf',
    icon: Code2
  },
  {
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Tata · Forage',
    date: 'June 2025',
    focus: 'EDA · AI risk profiling · Data storytelling',
    file: 'TataDataAnalyticsCertification.pdf',
    icon: LineChart
  }
]

const Certificates = () => (
  <motion.section
    className="content-section section-muted"
    id="certificates"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.65 }}
  >
    <div className="section-inner">
      <p className="section-eyebrow">LEARNING & RECOGNITION</p>
      <h2 className="section-heading">Professional <span className="gradient-text">certifications.</span></h2>
      <p className="section-description section-lead">
        Credentials in software engineering, data science, and analytics.
        Open a certificate to view the original PDF.
      </p>
      <div className="certificate-grid">
        {certificates.map(({ title, issuer, date, focus, file, icon: Icon }, index) => (
          <motion.a
            className="certificate-card"
            href={`/certificates/${encodeURIComponent(file)}`}
            target="_blank"
            rel="noreferrer"
            key={file}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <span className="certificate-icon"><Icon size={21} /></span>
            <span className="certificate-issuer">{issuer}</span>
            <span className="certificate-title">{title}</span>
            <span className="certificate-focus">{focus}</span>
            <span className="certificate-footer">
              <span>{date}</span>
              <span className="certificate-open">View PDF <ArrowUpRight size={15} /></span>
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  </motion.section>
)

export default Certificates