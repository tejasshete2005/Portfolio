import { motion } from 'motion/react'

const stickerFrames = {
  center: 'sasuke-center.png',
  up: 'sasuke-up.png',
  down: 'sasuke-down.png',
  left: 'sasuke-left.png',
  right: 'sasuke-right.png',
  'up-left': 'sasuke-left.png',
  'up-right': 'sasuke-up-right.png',
  'down-left': 'sasuke-down-left.png',
  'down-right': 'sasuke-up-right-alt.png'
}

const HeroSticker = ({ direction, stickerRef }) => {
  const image = stickerFrames[direction] ?? stickerFrames.center

  return (
    <span ref={stickerRef} className="hero-sticker" aria-hidden="true">
      <motion.img
        key={image}
        src={`/images/sasuke-stickers/${image}`}
        alt=""
        initial={{ opacity: 0.65, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        draggable="false"
      />
    </span>
  )
}

export default HeroSticker
