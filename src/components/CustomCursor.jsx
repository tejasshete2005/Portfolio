import { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!pointerQuery.matches || motionQuery.matches) return undefined

    const cursor = cursorRef.current
    const body = document.body
    body.classList.add('custom-cursor-enabled')

    const moveCursor = (event) => {
      cursor.style.setProperty('--cursor-x', `${event.clientX}px`)
      cursor.style.setProperty('--cursor-y', `${event.clientY}px`)
      cursor.classList.add('is-visible')
      cursor.classList.toggle(
        'is-hovering',
        Boolean(event.target.closest('a, button, input, textarea, select, [role="button"]'))
      )
    }

    const hideCursor = () => cursor.classList.remove('is-visible')

    window.addEventListener('pointermove', moveCursor)
    document.documentElement.addEventListener('pointerleave', hideCursor)

    return () => {
      window.removeEventListener('pointermove', moveCursor)
      document.documentElement.removeEventListener('pointerleave', hideCursor)
      body.classList.remove('custom-cursor-enabled')
    }
  }, [])

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <svg viewBox="0 0 48 48" focusable="false">
        <circle className="cursor-disc" cx="24" cy="24" r="21" />
        <g className="cursor-marks">
          <path d="M23 20c-5-4-7-8-4-13 6 1 9 5 8 10-.4 2-1.4 3.2-2.8 4.3L23 20Z" />
          <path d="M23 20c-5-4-7-8-4-13 6 1 9 5 8 10-.4 2-1.4 3.2-2.8 4.3L23 20Z" transform="rotate(120 24 24)" />
          <path d="M23 20c-5-4-7-8-4-13 6 1 9 5 8 10-.4 2-1.4 3.2-2.8 4.3L23 20Z" transform="rotate(240 24 24)" />
        </g>
        <circle className="cursor-pupil" cx="24" cy="24" r="3.1" />
        <circle className="cursor-pupil-core" cx="24" cy="24" r="1.25" />
      </svg>
    </div>
  )
}

export default CustomCursor
