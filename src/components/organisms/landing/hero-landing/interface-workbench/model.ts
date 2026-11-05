export const MODULE_TIME = 3.1
export const BUILD_DURATION = MODULE_TIME * 6 + 1.4
export const TOOL_OFFSET = 42
export const SAFE_HEIGHT = 78
export const clamp = (value: number) => Math.max(0, Math.min(1, value))
const ease = (value: number) => {
  const t = clamp(value)

  return t * t * (3 - 2 * t)
}
const mix = (from: number, to: number, t: number) => from + (to - from) * ease(t)
interface Point {
  x: number
  y: number
}
interface Piece {
  center: number[]
  source: number[]
}
export function frameAt(seconds: number, rest: Point, pieces: Piece[]) {
  const time = Math.max(0, seconds)
  const stage = Math.min(pieces.length, Math.floor(time / MODULE_TIME))
  const local = (time - stage * MODULE_TIME) / MODULE_TIME
  const previous =
    stage === 0 ? [rest.x, rest.y + TOOL_OFFSET, SAFE_HEIGHT] : [...pieces[stage - 1].center.slice(0, 2), SAFE_HEIGHT]
  let tip = [...previous],
    action = 'Returning home'
  if (stage < pieces.length) {
    const source = pieces[stage].source,
      target = pieces[stage].center
    if (local < 0.18) {
      tip = [mix(previous[0], source[0], local / 0.18), mix(previous[1], source[1], local / 0.18), SAFE_HEIGHT]
      action = 'Approaching the stack'
    } else if (local < 0.34) {
      tip = [source[0], source[1], mix(SAFE_HEIGHT, source[2], (local - 0.18) / 0.1)]
      action = local < 0.28 ? 'Lowering to pick up' : 'Picking up a piece'
    } else if (local < 0.45) {
      tip = [source[0], source[1], mix(source[2], SAFE_HEIGHT, (local - 0.34) / 0.11)]
      action = 'Lifting from the stack'
    } else if (local < 0.7) {
      tip = [mix(source[0], target[0], (local - 0.45) / 0.25), mix(source[1], target[1], (local - 0.45) / 0.25), SAFE_HEIGHT]
      action = 'Carrying the piece'
    } else if (local < 0.86) {
      tip = [target[0], target[1], mix(SAFE_HEIGHT, target[2], (local - 0.7) / 0.1)]
      action = local < 0.8 ? 'Placing on the canvas' : 'Releasing the piece'
    } else {
      tip = [target[0], target[1], mix(target[2], SAFE_HEIGHT, (local - 0.86) / 0.14)]
      action = 'Ready for the next piece'
    }
  } else {
    const t = (time - pieces.length * MODULE_TIME) / 1.4
    tip = [mix(previous[0], rest.x, t), mix(previous[1], rest.y + TOOL_OFFSET, t), SAFE_HEIGHT]
  }
  const modules = pieces.map((piece, index) => {
    let position = index < stage ? piece.center : piece.source
    let tilt = 0
    if (index === stage && local >= 0.28) {
      position = local < 0.8 ? tip : piece.center
      if (local > 0.45 && local < 0.7) {
        const travel = (local - 0.45) / 0.25
        tilt = Math.sin(travel * Math.PI * 2) * Math.sin(travel * Math.PI) * 1.8
      }
    }

    return {
      x: position[0] - piece.center[0],
      y: position[1] - piece.center[1],
      z: position[2] - piece.center[2],
      tilt,
      position
    }
  })

  return {
    x: tip[0],
    y: tip[1] - TOOL_OFFSET,
    toolZ: tip[2] - 48,
    modules,
    count: Math.min(6, stage + (local >= 0.8 ? 1 : 0)),
    phase: stage,
    action,
    done: time >= BUILD_DURATION,
    progress: Math.round(clamp(time / BUILD_DURATION) * 100)
  }
}
