import { motion } from 'motion/react'
import { Braces, Code2, Database, GitBranch, Sparkles, TestTube2 } from 'lucide-react'

const groups = [
  {
    icon: Braces,
    title: 'DSA & computer science foundations',
    items: ['Data Structures & Algorithms', 'Problem-solving', 'OOP', 'DBMS', 'Operating Systems']
  },
  {
    icon: Code2,
    title: 'Programming languages',
    items: ['Java', 'C', 'C++', 'JavaScript']
  },
  {
    icon: Braces,
    title: 'Frontend development',
    items: ['HTML', 'CSS', 'React.js', 'Bootstrap', 'EJS']
  },
  {
    icon: Code2,
    title: 'Backend development',
    items: ['Node.js', 'Express.js', 'RESTful APIs']
  },
  {
    icon: Database,
    title: 'Databases',
    items: ['MongoDB', 'MySQL', 'SQL']
  },
  {
    icon: TestTube2,
    title: 'Testing & analytics',
    items: ['Selenium WebDriver', 'Web application testing', 'Test case design', 'STLC', 'Python', 'Pandas', 'NumPy', 'Power BI']
  },
  {
    icon: GitBranch,
    title: 'Developer tools',
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Eclipse', 'Maven']
  },
  {
    icon: Sparkles,
    title: 'Core strengths',
    items: ['Analytical thinking', 'Problem-solving', 'Debugging', 'Communication', 'Teamwork']
  }
]

const Skills = () => (
  <motion.section
    className="content-section"
    id="skills"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.65 }}
  >
    <div className="section-inner">
      <p className="section-eyebrow">DSA-FIRST TOOLKIT</p>
      <h2 className="section-heading">Problem-solving <span className="gradient-text">at the core.</span></h2>
      <p className="section-description section-lead">
        Data structures and algorithms are my primary focus, supported by
        programming fundamentals and the tools I use to build software.
      </p>
      <div className="skill-grid">
        {groups.map(({ icon: Icon, title, items }, index) => (
          <motion.article
            className="skill-card"
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.12 }}
          >
            <span className="card-icon"><Icon size={20} /></span>
            <h3>{title}</h3>
            <div className="skill-tags">
              {items.map((item) => <span className="skill-tag" key={item}>{item}</span>)}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </motion.section>
)

export default Skills