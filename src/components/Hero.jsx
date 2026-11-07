import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import heroArtwork from '../assets/hero.png'
import HeroSticker from './HeroSticker'

import {
  ArrowUpRight,
  Download,
  UserRound,
  GraduationCap,
  Code2,
  FolderKanban,
  BriefcaseBusiness,
  Award,
  Mail,
  GitBranch
} from 'lucide-react'

const sectionCards = [
  { id: 'dsa', title: 'DSA & problem solving', description: 'My core technical focus', icon: Code2 },
  { id: 'about', title: 'About me', description: 'A little about who I am', icon: UserRound },
  { id: 'education', title: 'Education', description: 'My learning journey', icon: GraduationCap },
  { id: 'skills', title: 'Skills', description: 'Tools in my toolkit', icon: Code2 },
  { id: 'projects', title: 'Projects', description: 'Things I have built', icon: FolderKanban },
  { id: 'experience', title: 'Experience', description: 'What I am working on', icon: BriefcaseBusiness },
  { id: 'certificates', title: 'Certifications', description: 'Credentials and training', icon: Award },
  { id: 'contact', title: 'Contact', description: 'Let’s get in touch', icon: Mail }
]

const Hero = ({ onNavigate }) => {
  const portraitRef = useRef(null)
  const [portraitDirection, setPortraitDirection] = useState('center')

  const socialLinks = [
    { name: 'Gmail', href: 'mailto:tejasshete2610@gmail.com', icon: Mail },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/tejas-shete-4b01a9284', icon: UserRound },
    { name: 'GitHub', href: 'https://github.com/tejasshete2005', icon: GitBranch },
    { name: 'LeetCode', href: 'https://leetcode.com/u/tejasshete00/', icon: Code2 }
  ]

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return

    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)

    const portrait = portraitRef.current
    if (!portrait || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const portraitBounds = portrait.getBoundingClientRect()
    const pointerX = (event.clientX - portraitBounds.left - portraitBounds.width / 2) / portraitBounds.width
    const pointerY = (event.clientY - portraitBounds.top - portraitBounds.height / 2) / portraitBounds.height
    const horizontalLook = pointerX < -0.12 ? 'left' : pointerX > 0.12 ? 'right' : ''
    const verticalLook = pointerY < -0.12 ? 'up' : pointerY > 0.12 ? 'down' : ''
    const nextDirection = [verticalLook, horizontalLook].filter(Boolean).join('-') || 'center'

    setPortraitDirection((currentDirection) => (
      currentDirection === nextDirection ? currentDirection : nextDirection
    ))
  }

  const handlePointerLeave = () => {
    setPortraitDirection('center')
  }

  return (
    <>
    <section
      className="hero section"
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >

      {/* Background effects */}

      <div className="hero-glow"></div>
      <div className="hero-grid" aria-hidden="true"></div>

      <div className="hero-content">

        {/* Availability badge */}

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.7 }}

          className="availability"

        >

          <span className="status-dot"></span>

          Open to opportunities

        </motion.div>


        {/* Introduction */}

        <motion.div
          className="hero-greeting"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="hero-intro">HELLO, WORLD! I'M</p>
        </motion.div>


        {/* Main name */}

        <motion.h1

          initial={{ opacity: 0, y: 60 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 1 }}

          className="hero-title"

        >

          <span className="hero-name-line">
            TEJAS<HeroSticker direction={portraitDirection} stickerRef={portraitRef} />
          </span>

          <br />

          <span className="gradient-text">

            SHETE.

          </span>

        </motion.h1>


        {/* Developer role */}

        <motion.h2

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 0.7 }}

          className="hero-role"

        >

          Computer Engineering Student

          <span> & </span>

          DSA Problem-Solving Enthusiast

        </motion.h2>


        {/* Description */}

        <motion.p

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 0.9 }}

          className="hero-description"

        >

          Focused on strengthening my data structures and algorithms,
          sharpening problem-solving skills, and applying that mindset
          to build efficient software.

        </motion.p>


        {/* Buttons */}

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 1.1 }}

          className="hero-buttons"

        >

          <a
            href="#dsa"
            className="primary-btn"
            onClick={(event) => {
              event.preventDefault()
              onNavigate('dsa')
            }}
          >

            Explore DSA Focus

            <ArrowUpRight size={18} />

          </a>


          <a
            href="/Updated_resume.pdf"
            download
            className="secondary-btn"
          >

            <Download size={18} />

            Download Resume

          </a>

        </motion.div>


        {/* Social links */}

        <motion.div
          className="hero-social"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } }
          }}
          aria-label="Contact and coding profiles"
        >
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <motion.a
              key={name}
              className="hero-social-button"
              href={href}
              target={name === 'Gmail' ? undefined : '_blank'}
              rel={name === 'Gmail' ? undefined : 'noreferrer'}
              aria-label={name}
              title={name}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{name}</span>
              {name !== 'Gmail' && <ArrowUpRight size={13} aria-hidden="true" />}
            </motion.a>
          ))}
        </motion.div>

      </div>


      {/* Floating hero artwork */}

      <motion.div

        animate={{ y: [0, -16, 0], rotate: [0, 2, 0, -2, 0] }}

        transition={{
          duration: 8,
          repeat: Infinity
        }}

        className="hero-art"

      >

        <div className="hero-art-orbit" aria-hidden="true"></div>
        <motion.img
          src={heroArtwork}
          alt="Floating crimson layered 3D cube"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <span className="hero-art-label" aria-hidden="true">&lt; build /&gt;</span>

      </motion.div>


      {/* Scroll indicator */}

      <div className="scroll-indicator">

        SCROLL TO EXPLORE

        <span></span>

      </div>

    </section>

    <section className="section-hub" aria-labelledby="section-hub-title">
      <div className="section-hub-inner">
        <p className="section-eyebrow">EXPLORE MY PORTFOLIO</p>
        <h2 className="section-hub-title" id="section-hub-title">
          Pick a destination<span className="gradient-text">.</span>
        </h2>
        <p className="section-hub-description">
          Start with DSA and problem solving, or explore the rest of my journey.
        </p>
        <div className="section-card-grid">
          {sectionCards.map(({ id, title, description, icon: Icon }, index) => (
            <motion.button
              className="section-card"
              key={id}
              onClick={() => onNavigate(id)}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="section-card-icon"><Icon size={20} /></span>
              <span className="section-card-copy">
                <span className="section-card-title">{title}</span>
                <span className="section-card-description">{description}</span>
              </span>
              <ArrowUpRight className="section-card-arrow" size={18} />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
    </>
  )

}

export default Hero