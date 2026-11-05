// Interface workbench scene: pure, browser-safe, rebuilt at any azimuth (wheresryan22/anatomy, MIT).
// Turning the whole machine about a vertical axis is the kit's own drawing at another azimuth, because
// the kit light is camera-locked. Paint order below is authored on separating planes along x, y and z,
// so it holds for every azimuth strictly between 0 and 90 degrees.
import * as k from './iso-kit.mjs'

export const WIDTH = 1100
export const HEIGHT = 660
export const ELEVATION = 34
export const REST_AZIMUTH = 48
// The vertical axis the machine turns about: the middle of its deck.
const AXIS = [-102, 26, 30]
const FIT = k.fitProjection(
  [
    [-380, -123, 0],
    [211, -123, 0],
    [-380, 175, 0],
    [211, 175, 0],
    [-360, -95, 150],
    [155, 110, 150]
  ],
  WIDTH,
  HEIGHT,
  { pad: 42, azimuth: REST_AZIMUTH, elevation: ELEVATION }
)
const ANCHOR = k.iso(AXIS, FIT)

export function projectionAt(azimuth) {
  const unit = k.iso(AXIS, { origin: [0, 0], scale: FIT.scale, azimuth, elevation: ELEVATION })

  return { origin: [ANCHOR[0] - unit[0], ANCHOR[1] - unit[1]], scale: FIT.scale, azimuth, elevation: ELEVATION }
}

export function buildScene({ azimuth = REST_AZIMUTH, logo = '' } = {}) {
  const P = projectionAt(azimuth)
  const at = (p) => k.iso(p, P)
  let out = [],
    count = 0
  const emit = (s) => out.push(s)
  function box(x, y, w, d, z, h, r = 2, cls = '') {
    count++
    emit(
      k.solidSvg(k.slabOf({ x, y, w, d, r }, z, h, P, 6, Math.min(0.7, h / 3)), {
        tone: 'mid',
        crease: 'faint',
        className: cls
      })
    )
  }
  function round(x, y, r, z, h, cls = '') {
    count++
    emit(k.solidSvg(k.cylinder(x, y, r, z, h, P, 40, 0.35), { tone: 'mid', className: cls }))
  }
  const line = (points, tone = 'lo', free = false) => emit(k.lineSvg(k.pathOf(points.map(at)), { tone, free }))
  const ring = (x, y, r, z, tone = 'lo') => emit(k.lineSvg(k.ring(x, y, r, z, P, 40), { tone }))
  const top = (x, y, z, markup) => emit(`<g transform="${k.topMatrix([x, y], z, P)}">${markup}</g>`)
  function screws(plan, z) {
    for (const [x, y] of k.corners(plan, 5)) {
      ring(x, y, 1.55, z)
      line(
        [
          [x - 0.65, y, z],
          [x + 0.65, y, z]
        ],
        'mid'
      )
    }
  }
  function capture(build) {
    const saved = out
    out = []
    build()
    const body = out.join('')
    out = saved
    return body
  }

  function rail(x) {
    box(x - 9, -111, 18, 235, 30, 8, 3, 'wb-metal')
    box(x - 3, -103, 6, 217, 38, 7, 2, 'wb-rail')
    for (const y of [-113, 114]) {
      box(x - 11, y, 22, 10, 30, 18, 2, 'wb-endstop')
      screws({ x: x - 11, y, w: 22, d: 10, r: 2 }, 48)
    }
    for (let i = 0; i < 5; i++) round(x, -80 + i * 43, 1.6, 45, 0.3, 'wb-screw')
  }

  const base = capture(() => {
    emit(`<path class="wb-shadow" d="${k.planOutline({ x: -370, y: -112, w: 570, d: 260, r: 24 }, 0, P)}"/>`)
    for (const x of [-350, -105, 145])
      for (const y of [-99, 135]) {
        round(x, y, 12, 0, 4, 'wb-rubber')
        round(x, y, 9, 4, 8, 'wb-metal')
        round(x, y, 10, 11, 1, 'wb-metal')
        ring(x, y, 8, 11)
      }
    box(-375, -120, 545, 286, 12, 15, 10, 'wb-base')
    box(-369, -114, 533, 274, 27, 3, 7, 'wb-deck')
    emit(k.lineSvg(k.planOutline({ x: -362, y: -107, w: 519, d: 260, r: 5 }, 30, P), { tone: 'faint' }))
    screws({ x: -368, y: -113, w: 531, d: 272, r: 6 }, 30)
    // The far rail is behind the beds. The near rail is painted after the sheets.
    rail(-350)
    // Paper feeder: one physical stack; modules are picked from its top in order.
    box(-329, -42, 198, 124, 30, 6.2, 5, 'wb-platen')
    for (const x of [-329, -136]) box(x, -42, 5, 124, 36.2, 4, 1, 'wb-clamp')
    top(
      -315,
      61,
      36.3,
      '<text y="7" font-family="monospace" font-size="4.5" letter-spacing="1" fill="#8a8a8f">THE PARTS / SIX SMALL IDEAS</text>'
    )
    screws({ x: -329, y: -42, w: 198, d: 124, r: 5 }, 36.2)
    // Flat build bed, locating clamps and a recessed browser frame.
    box(-119, -86, 238, 194, 30, 4, 5, 'wb-platen')
    box(-106, -73, 212, 168, 34, 2, 4, 'wb-paper')
    for (const x of [-120, 113])
      for (const y of [-60, 76]) {
        box(x, y, 7, 15, 34, 3, 1, 'wb-clamp')
        round(x + 3.5, y + 7, 1.5, 37, 0.8, 'wb-screw')
      }
    top(
      -100,
      -67,
      36.1,
      `<rect width="200" height="156" rx="3" fill="#fbfbfa" stroke="#b4b4b8" stroke-width=".65"/><path d="M0 14H200" stroke="#d4d4d6" stroke-width=".6"/><circle cx="7" cy="7" r="1.4" fill="#8c8c90"/><circle cx="13" cy="7" r="1.4" fill="#b4b4b8"/><circle cx="19" cy="7" r="1.4" fill="#d4d4d6"/><rect x="57" y="4" width="92" height="6" rx="2" fill="#eeefec"/><text x="103" y="8.6" text-anchor="middle" font-family="monospace" font-size="3.7" fill="#8a8a8f">wanfahdiva.com</text>`
    )
    // Side electronics enclosure, stepped cover, vents, fasteners and connector.
    box(171, -99, 37, 82, 12, 26, 5, 'wb-housing')
    box(174, -96, 31, 76, 38, 2, 3, 'wb-paper')
    for (let i = 0; i < 8; i++) top(180, -82 + i * 5.5, 40.1, '<rect width="19" height="1.7" rx=".85" fill="#b4b4b8"/>')
    screws({ x: 174, y: -96, w: 31, d: 76, r: 3 }, 40)
    box(178, -15, 22, 15, 12, 10, 3, 'wb-housing')
    top(
      181,
      -12,
      22.1,
      '<rect width="16" height="9" rx="1.3" fill="#26262a"/><path d="M8 2V6" stroke="#fbfbfa" stroke-width=".8"/>'
    )
    // Front rotary control, status window and one engraved identification plate.
    box(-134, 121, 72, 18, 30, 1.2, 2, 'wb-metal')
    top(
      -130,
      125,
      31.3,
      '<text y="6" font-family="monospace" font-size="5" letter-spacing="1" fill="#57575a">WD - WORKBRENCH</text>'
    )
    round(124, 130, 8, 30, 4, 'wb-metal')
    round(124, 130, 6, 34, 3, 'wb-knob')
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8
      line(
        [
          [124 + 5.5 * Math.cos(a), 130 + 5.5 * Math.sin(a), 34.5],
          [124 + 5.5 * Math.cos(a), 130 + 5.5 * Math.sin(a), 36.3]
        ],
        'lo'
      )
    }
    line(
      [
        [124, 130, 37],
        [128, 130, 37]
      ],
      'hi',
      true
    )
    box(74, 124, 31, 12, 30, 1, 2, 'wb-indicator')
    top(
      78,
      127,
      31.1,
      '<circle cx="2" cy="3" r="1.4" fill="#26262a"/><path d="M8 1H22M8 4H18" fill="none" stroke="#8a8a8f" stroke-width=".7"/>'
    )
  })

  // Quiet wireframe plates, each carried from the stack onto a blank browser sheet.
  const wd = logo
  const modules = [
    {
      name: 'Header',
      x: -94,
      y: -49,
      w: 188,
      d: 17,
      draw: () =>
        top(
          -88,
          -46,
          38.1,
          `<svg width="12" height="12" viewBox="40 75 265 180">${wd}</svg><path d="M121 5H133M142 5H153M163 5H174" stroke="#b4b4b8" stroke-width="1.5" stroke-linecap="round"/>`
        )
    },
    {
      name: 'Text',
      x: -94,
      y: -23,
      w: 104,
      d: 46,
      draw: () =>
        top(
          -88,
          -18,
          38.1,
          '<path d="M0 3H71M0 11H83" stroke="#8a8a8f" stroke-width="3" stroke-linecap="round"/><path d="M0 23H85M0 28H66" stroke="#c4c4c1" stroke-width="1.4" stroke-linecap="round"/><rect y="31" width="32" height="6" rx="2" fill="none" stroke="#b4b4b8" stroke-width=".8"/>'
        )
    },
    {
      name: 'Image',
      x: 20,
      y: -23,
      w: 74,
      d: 46,
      draw: () =>
        top(
          24,
          -19,
          38.1,
          '<rect width="66" height="38" rx="2" fill="#f4f4f1" stroke="#d4d4d6" stroke-width=".6"/><path d="M0 0L66 38M66 0L0 38" fill="none" stroke="#d4d4d6" stroke-width=".6"/><circle cx="33" cy="19" r="8" fill="#fbfbfa" stroke="#b4b4b8" stroke-width=".7"/>'
        )
    },
    { name: 'Card one', x: -94, y: 33, w: 57, d: 42, draw: () => card(-89, 38) },
    { name: 'Card two', x: -28, y: 33, w: 57, d: 42, draw: () => card(-23, 38) },
    { name: 'Card three', x: 38, y: 33, w: 56, d: 42, draw: () => card(43, 38) }
  ]
  function card(x, y) {
    top(
      x,
      y,
      38.1,
      '<rect width="47" height="20" rx="2" fill="#f4f4f1" stroke="#d4d4d6" stroke-width=".5"/><path d="M0 26H37M0 31H27" stroke="#b4b4b8" stroke-width="1.3" stroke-linecap="round"/>'
    )
  }
  const pieces = modules.map((m, index) => {
    const center = [m.x + m.w / 2, m.y + m.d / 2, 38]
    const source = [-230, 20, 38 + (5 - index) * 1.8]
    return {
      name: m.name,
      center,
      source,
      plan: [m.x, m.y, m.w, m.d],
      pivot: at(center),
      body: capture(() => {
        box(m.x, m.y, m.w, m.d, 36.2, 1.8, 2, 'wb-ui')
        m.draw()
      })
    }
  })

  // The bridge travels along Y. Tool carriage travels along X on the bridge.
  const rest = { x: -300, y: -83 }
  const bridge = capture(() => {
    for (const x of [-350, 145]) {
      box(x - 10, rest.y - 14, 20, 28, 45, 9, 3, 'wb-bearing')
      for (const y of [-9, 9]) round(x, rest.y + y, 1.5, 54, 0.7, 'wb-screw')
      box(x - 7, rest.y - 11, 14, 22, 54, 46, 2, 'wb-upright')
      box(x - 10, rest.y - 13, 20, 26, 100, 4, 2, 'wb-metal')
      screws({ x: x - 10, y: rest.y - 13, w: 20, d: 26, r: 2 }, 104)
    }
    box(-360, rest.y - 7, 515, 14, 104, 13, 3, 'wb-bridge')
    box(-345, rest.y + 7, 485, 3, 106, 4, 1, 'wb-rail')
    box(-341, rest.y - 7.5, 477, 1, 112, 3, 0.2, 'wb-belt')
    for (const x of [-352, 147]) {
      round(x, rest.y, 5, 117, 3, 'wb-metal')
      ring(x, rest.y, 3, 120)
    }
    for (let x = -330; x <= 125; x += 10)
      line(
        [
          [x, rest.y - 7.7, 112],
          [x, rest.y - 7.7, 114]
        ],
        'faint'
      )
  })
  const head = capture(() => {
    box(rest.x - 14, rest.y - 9, 28, 18, 117, 7, 2, 'wb-metal')
    box(rest.x - 14, rest.y + 9, 28, 14, 124, 3, 2, 'wb-head')
    box(rest.x - 14, rest.y + 9, 28, 14, 101, 23, 3, 'wb-head')
    box(rest.x - 12, rest.y + 23, 24, 2, 105, 16, 2, 'wb-headface')
    // A forward-reaching vacuum actuator leaves room to carry broad sheets past the uprights.
    box(rest.x - 7, rest.y + 25, 14, 23, 98, 8, 2, 'wb-metal')
    // Coaxial stacks paint bottom-up; the body starts on the collar instead of sharing its volume.
    round(rest.x, rest.y + 42, 8.2, 86, 4, 'wb-metal')
    round(rest.x, rest.y + 42, 6.5, 90, 44, 'wb-metal')
    round(rest.x, rest.y + 42, 5.5, 134, 2, 'wb-metal')
    for (const x of [-8, 8]) for (const y of [-7, 7]) round(rest.x + x, rest.y + y, 1.2, 127, 0.6, 'wb-screw')
    top(
      rest.x - 8,
      rest.y - 6,
      127.1,
      '<rect width="16" height="12" rx="1.5" fill="#26262a"/><path d="M4 6H12M8 2V10" stroke="#fbfbfa" stroke-width=".9"/>'
    )
  })
  const tool = capture(() => {
    round(rest.x, rest.y + 42, 5.2, 48, 2, 'wb-nozzle')
    round(rest.x, rest.y + 42, 5.5, 50, 4, 'wb-collet')
    round(rest.x, rest.y + 42, 3.2, 54, 55, 'wb-metal')
  })
  const frontRail = capture(() => rail(145))
  const origin = at([0, 0, 0])
  const axes = {
    x: at([1, 0, 0]).map((v, i) => v - origin[i]),
    y: at([0, 1, 0]).map((v, i) => v - origin[i]),
    z: at([0, 0, 1]).map((v, i) => v - origin[i])
  }
  const a = (azimuth * Math.PI) / 180,
    e = (ELEVATION * Math.PI) / 180

  return {
    width: WIDTH,
    height: HEIGHT,
    azimuth,
    base,
    frontRail,
    bridge,
    head,
    tool,
    pieces,
    rest,
    axes,
    origin,
    depth: [Math.cos(a) * Math.cos(e), Math.sin(a) * Math.cos(e), Math.sin(e)],
    parts: count
  }
}
