import { AOSOptions, IAnimate, IAnimation } from 'aos-animation'

/**
 * Animate element
 *
 * @param type type of animations
 * @param offset offset between element
 * @param duration animation duration
 * @param delay delay before animation
 * @returns object
 */

const AOS = ({
  type,
  offset = 0,
  duration = 500,
  delay = 300,
  anchor = '',
  anchorPlacement = 'center-center',
  once = false,
}: AOSOptions) => {
  const options: IAnimation = {
    'data-aos': type,
    'data-aos-offset': offset,
    'data-aos-duration': duration,
    'data-aos-delay': delay,
    'data-aos-anchor': anchor,
    'data-aos-anchor-placement': anchorPlacement,
    'data-aos-once': once,
  }
  if (anchor === '') {
    delete options['data-aos-anchor']
    delete options['data-aos-anchor-placement']
  }
  return options
}

export const Animate: IAnimate = {
  AOS,
}
