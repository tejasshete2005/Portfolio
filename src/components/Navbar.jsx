import { useState } from 'react'

import {
  Menu,
  X
} from 'lucide-react'

import { motion } from 'motion/react'

const Navbar = ({ onNavigate }) => {

  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'DSA Focus', link: '#dsa' },
    { name: 'Education', link: '#education' },
    { name: 'Skills', link: '#skills' },
    { name: 'Projects', link: '#projects' },
    { name: 'Experience', link: '#experience' },
    { name: 'Certifications', link: '#certificates' },
    { name: 'Contact', link: '#contact' }
  ]

  return (

    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="navbar"
    >

      {/* Logo */}

      <a
        href="#home"
        className="logo"
        onClick={(event) => {
          event.preventDefault()
          onNavigate('home')
        }}
      >
        TS<span>.</span>
      </a>

      {/* Desktop navigation */}

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>

        {navLinks.map((item, index) => (

          <a
            key={index}
            href={item.link}
            onClick={(event) => {
              event.preventDefault()
              setMenuOpen(false)
              onNavigate(item.link.slice(1))
            }}
          >
            {item.name}
          </a>

        ))}

      </div>

      {/* Mobile menu button */}

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >

        {menuOpen ? <X /> : <Menu />}

      </button>

    </motion.nav>

  )

}

export default Navbar