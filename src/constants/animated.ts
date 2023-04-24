export const ANIMATED_VARIANT = {
  hiddenTop: {
    opacity: 0,
    y: -40,
  },
  visibleTop: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 2,
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
      delay: 2,
      duration: 1,
      ease: 'easeInOut',
    },
  },
}
