export const ANIMATED_VARIANT = {
  ANIMATE_ON: {
    hiddenTop: {
      opacity: 0,
      y: -40,
    },
    visibleTop: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 1,
        ease: 'easeInOut',
      },
    },
    hiddenBottom: {
      opacity: 0,
      y: 40,
    },
    visibleBottom: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 1,
        ease: 'easeInOut',
      },
    },
  },
  ANIMATE_OFF: {
    hiddenTop: {
      opacity: 1,
    },
    visibleTop: {
      opacity: 1,
    },
    hiddenBottom: {
      opacity: 1,
    },
    visibleBottom: {
      opacity: 1,
    },
  },
}
