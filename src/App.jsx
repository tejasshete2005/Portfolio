import { useEffect, useRef, useState } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import DSA from './components/DSA'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Certificates from './components/Certificates'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import heroArtwork from './assets/hero.png'

const sectionNames = {
  home: 'Home',
  about: 'About',
  dsa: 'DSA & problem solving',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  experience: 'Experience',
  certificates: 'Certifications',
  contact: 'Contact'
}

const sectionComponents = {
  about: About,
  dsa: DSA,
  education: Education,
  skills: Skills,
  projects: Projects,
  experience: Experience,
  certificates: Certificates,
  contact: Contact
}

const getInitialSection = () => {
  const sectionId = window.location.hash.slice(1)
  return sectionId === 'home' || sectionComponents[sectionId] ? sectionId : 'home'
}

function App() {
  const [activeSection, setActiveSection] = useState(getInitialSection)
  const [portalTarget, setPortalTarget] = useState(null)
  const [isEntering, setIsEntering] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const timers = useRef([])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minimumLoadTime = reducedMotion ? 100 : 5200
    const startedAt = performance.now()
    const heroImage = new Image()
    heroImage.src = heroArtwork

    const progressTimer = window.setInterval(() => {
      const progress = Math.min(92, ((performance.now() - startedAt) / minimumLoadTime) * 92)
      setLoadingProgress(progress)
    }, 80)

    let exitTimer
    const readyTimer = window.setTimeout(async () => {
      const results = await Promise.allSettled([
        document.fonts.ready,
        heroImage.decode()
      ])

      results.forEach((result) => {
        if (result.status === 'rejected') {
          console.error('A portfolio resource could not be prepared before entry.', result.reason)
        }
      })

      const remainingTime = Math.max(0, minimumLoadTime - (performance.now() - startedAt))
      exitTimer = window.setTimeout(() => {
        setLoadingProgress(100)
        exitTimer = window.setTimeout(() => setIsEntering(false), 450)
      }, remainingTime)
    }, 0)

    return () => {
      window.clearInterval(progressTimer)
      window.clearTimeout(readyTimer)
      window.clearTimeout(exitTimer)
    }
  }, [])

  const navigateTo = (sectionId) => {
    if (sectionId !== 'home' && !sectionComponents[sectionId]) return

    timers.current.forEach(window.clearTimeout)
    setPortalTarget(sectionId)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const travelDelay = reducedMotion ? 0 : 1350
    const exitDelay = reducedMotion ? 80 : 2300

    timers.current = [
      window.setTimeout(() => {
        window.history.replaceState(null, '', `#${sectionId}`)
        setActiveSection(sectionId)
        window.scrollTo({ top: 0, behavior: 'instant' })
      }, travelDelay),
      window.setTimeout(() => setPortalTarget(null), exitDelay)
    ]
  }

  const ActiveSection = sectionComponents[activeSection]

  return (
    <div className="app">
      <CustomCursor />
      <Navbar onNavigate={navigateTo} />
      <main key={activeSection}>
        {activeSection === 'home' ? (
          <Hero onNavigate={navigateTo} />
        ) : (
          <div className="section-view">
            <div className="section-view-header">
              <button className="section-back" onClick={() => navigateTo('home')}>
                <span aria-hidden="true">←</span> All sections
              </button>
            </div>
            {ActiveSection && <ActiveSection onNavigate={navigateTo} />}
          </div>
        )}
      </main>
      <Footer onNavigate={navigateTo} />
      {portalTarget && (
        <div className="portal-transition" role="status" aria-live="polite">
          <div className="portal-warp" aria-hidden="true">
            <span className="portal-warp-ring portal-warp-ring-outer" />
            <span className="portal-warp-ring portal-warp-ring-middle" />
            <span className="portal-warp-core" />
          </div>
          <p>Warping to {sectionNames[portalTarget] ?? 'section'}</p>
        </div>
      )}
      {isEntering && (
        <div className="portal-transition portal-intro" role="status" aria-live="polite">
          <div className="portal-warp" aria-hidden="true">
            <span className="portal-warp-ring portal-warp-ring-outer" />
            <span className="portal-warp-ring portal-warp-ring-middle" />
            <span className="portal-warp-core" />
          </div>
          <div className="portal-intro-copy">
            <p className="portal-intro-kicker">TEJAS SHETE</p>
            <p>{loadingProgress >= 92 ? 'Finalizing the experience' : 'Loading portfolio assets'}</p>
            <span
              className="portal-loading-track"
              role="progressbar"
              aria-label="Portfolio loading progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(loadingProgress)}
            >
              <span style={{ width: `${loadingProgress}%` }} />
            </span>
            <span className="portal-loading-percent">{Math.round(loadingProgress)}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App