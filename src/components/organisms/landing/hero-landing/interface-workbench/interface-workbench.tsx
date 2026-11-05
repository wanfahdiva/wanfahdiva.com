'use client'

import { Layers, Pause, Play, RotateCcw } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'

import geometry from './geometry.json'
import styles from './interface-workbench.module.css'
import { BUILD_DURATION, TOOL_OFFSET, frameAt } from './model'

type Scene = Omit<typeof geometry, 'logo'>
type Mode = 'ready' | 'building' | 'paused' | 'complete'

const INITIAL = frameAt(0, geometry.rest, geometry.pieces)
// The machine turns about its own vertical axis: rest view, and the view that faces its front plate.
const REST_AZIMUTH = geometry.azimuth
const FRONT_AZIMUTH = 68
// Exploded view: placed sheets rise in rows (back row highest) and drift apart from the canvas centre.
// Rows open as a cascade: the front cards first, the header last. Every lifted sheet stays under the tool.
const LIFT = [44, 30, 30, 16, 16, 16]
const CASCADE = [0.16, 0.08, 0.08, 0, 0, 0]
const CANVAS_CENTER = [0, 11]
const SPREAD = [0.13, 0.2]
const SLOT_Z = 36.3
// While the layers are open the vacuum tool retracts into its housing, clear of every lifted sheet.
const RETRACTED_TIP = 86
const TOUCH_HOLD_DELAY = 120

export function InterfaceWorkbench() {
  const id = useId()
  const stage = useRef<HTMLElement>(null)
  const layers = {
    base: useRef<SVGGElement>(null),
    frontRail: useRef<SVGGElement>(null),
    bridge: useRef<SVGGElement>(null),
    head: useRef<SVGGElement>(null),
    tool: useRef<SVGGElement>(null)
  }
  const bridge = useRef<SVGGElement>(null)
  const head = useRef<SVGGElement>(null)
  const tool = useRef<SVGGElement>(null)
  const slots = useRef<SVGPathElement>(null)
  const pieceLayer = useRef<SVGGElement>(null)
  const modules = useRef<(SVGGElement | null)[]>([])
  const bodies = useRef<(SVGGElement | null)[]>([])
  const leaders = useRef<SVGPathElement>(null)
  const focusRing = useRef<SVGPathElement>(null)
  const readout = useRef<HTMLSpanElement>(null)
  const status = useRef<HTMLSpanElement>(null)
  const control = useRef<(action: 'build' | 'pause') => void>(() => undefined)
  const hold = useRef<(on: boolean) => void>(() => undefined)
  const hover = useRef<(inside: boolean) => void>(() => undefined)
  const [mode, setMode] = useState<Mode>('ready')
  const [open, setOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    let animation = 0,
      previous = 0,
      elapsed = media.matches ? BUILD_DURATION : 0,
      visible = false,
      running = false,
      resuming = false,
      holding = false,
      resumeAfterHold = false,
      inside = false,
      autoStarted = false,
      disposed = false
    let autoTimer: ReturnType<typeof setTimeout> | undefined
    let lastPhase = -1
    // Re-projected scenes, one per whole degree, built lazily from the same kit as the committed geometry.
    let scene: Scene = geometry
    let shown = REST_AZIMUTH
    let build: ((azimuth: number) => Scene) | null = null
    let loading: Promise<void> | null = null
    const frames = new Map<number, Scene>([[REST_AZIMUTH, geometry]])
    const sceneAt = (azimuth: number) => {
      let frame = frames.get(azimuth)
      if (!frame && build) {
        frame = build(azimuth)
        frames.set(azimuth, frame)
      }

      return frame
    }
    const warm = () => {
      const next = Array.from({ length: FRONT_AZIMUTH - REST_AZIMUTH }, (_, i) => REST_AZIMUTH + i + 1).find(
        (azimuth) => !frames.has(azimuth)
      )
      if (next === undefined || disposed) return
      sceneAt(next)
      const idle = window.requestIdleCallback ?? ((callback: () => void) => setTimeout(callback, 60))
      idle(warm)
    }
    const load = () => {
      if (loading || media.matches || !fine.matches) return
      loading = import('scripts/anatomy/workbench-scene.mjs').then((kit) => {
        if (disposed) return
        build = (azimuth) => kit.buildScene({ azimuth, logo: geometry.logo }) as unknown as Scene
        warm()
        run()
      })
    }

    const view = { azimuth: REST_AZIMUTH, open: 0, lift: 0 }
    let velocity = 0
    let settled = true
    const follow = (key: 'azimuth' | 'lift', target: number, dt: number, tau: number) => {
      const next = view[key] + (target - view[key]) * (1 - Math.exp(-dt / tau))
      const close = Math.abs(next - target) < 0.01
      view[key] = close ? target : next
      if (!close) settled = false
    }
    // Opening overshoots a little like a sprung lid; closing is critically damped so sheets never sink.
    const spring = (target: number, dt: number) => {
      const omega = 15,
        zeta = target > 0 ? 0.6 : 1
      for (let left = dt; left > 0; left -= 1 / 240) {
        const h = Math.min(left, 1 / 240)
        velocity += (omega * omega * (target - view.open) - 2 * zeta * omega * velocity) * h
        view.open += velocity * h
      }
      if (Math.abs(target - view.open) < 0.0005 && Math.abs(velocity) < 0.005) {
        view.open = target
        velocity = 0
      } else settled = false
    }
    const point = (x: number, y: number, z: number) => [
      scene.origin[0] + scene.axes.x[0] * x + scene.axes.y[0] * y + scene.axes.z[0] * z,
      scene.origin[1] + scene.axes.x[1] * x + scene.axes.y[1] * y + scene.axes.z[1] * z
    ]
    const shift = (x: number, y: number, z = 0) => [
      scene.axes.x[0] * x + scene.axes.y[0] * y + scene.axes.z[0] * z,
      scene.axes.x[1] * x + scene.axes.y[1] * y + scene.axes.z[1] * z
    ]
    const translate = (x: number, y: number, z = 0) => `translate(${shift(x, y, z).join(' ')})`
    const show = (azimuth: number) => {
      const frame = sceneAt(azimuth)
      if (!frame) return
      scene = frame
      shown = azimuth
      ;(Object.keys(layers) as (keyof typeof layers)[]).forEach((key) => {
        const layer = layers[key].current
        if (layer) layer.innerHTML = frame[key]
      })
      bodies.current.forEach((body, index) => {
        if (body) body.innerHTML = frame.pieces[index].body
      })
    }

    const paint = (dt = 0) => {
      const state = frameAt(elapsed, geometry.rest, geometry.pieces)
      const held = state.modules.findIndex(
        (part, index) =>
          index >= state.count &&
          Math.abs(part.position[0] - state.x) < 0.01 &&
          Math.abs(part.position[1] - state.y - TOOL_OFFSET) < 0.01 &&
          Math.abs(part.position[2] - state.toolZ - 48) < 0.01
      )
      settled = true
      const facing = (inside || holding) && fine.matches && build ? FRONT_AZIMUTH : REST_AZIMUTH
      const clearance = holding ? Math.max(0, RETRACTED_TIP - state.toolZ - 48) : 0
      if (media.matches) {
        Object.assign(view, { azimuth: REST_AZIMUTH, open: holding ? 1 : 0, lift: clearance })
        velocity = 0
      } else {
        follow('azimuth', facing, dt, 0.15)
        follow('lift', clearance, dt, 0.08)
        spring(holding ? 1 : 0, dt)
      }
      const azimuth = Math.round(view.azimuth)
      if (azimuth !== shown) show(azimuth)

      const open = view.open
      bridge.current?.setAttribute('transform', translate(0, state.y - geometry.rest.y))
      head.current?.setAttribute('transform', translate(state.x - geometry.rest.x, state.y - geometry.rest.y))
      tool.current?.setAttribute('transform', translate(0, 0, state.toolZ + view.lift))
      const positions = state.modules.map((movement, index) => {
        const piece = geometry.pieces[index]
        let [x, y, z] = [movement.x, movement.y, movement.z]
        let raised = 0
        if (index < state.count) {
          const k = Math.max(0, (open - CASCADE[index]) / (1 - CASCADE[index]))
          x += (piece.center[0] - CANVAS_CENTER[0]) * SPREAD[0] * k
          y += (piece.center[1] - CANVAS_CENTER[1]) * SPREAD[1] * k
          raised = LIFT[index] * k
        } else if (index === held) raised = view.lift
        // Sheets still on the stack fan upward, the top sheet furthest.
        else raised = (5 - index) * 5.5 * open
        z += raised

        return { x, y, z, guide: index < state.count && open > 0.002 }
      })
      positions.forEach((offset, index) => {
        const part = modules.current[index]
        const pivot = scene.pieces[index].pivot
        part?.setAttribute(
          'transform',
          `${translate(offset.x, offset.y, offset.z)} rotate(${state.modules[index].tilt} ${pivot[0]} ${pivot[1]})`
        )
        part?.setAttribute('data-location', index < state.count ? 'canvas' : index === held ? 'carried' : 'stack')
      })
      // Leader lines sit under every sheet, so a sheet in front always hides the lines of the sheets behind it.
      if (leaders.current) {
        const lines = positions
          .map((offset, index) => {
            if (!offset.guide) return ''
            const [px, py, w, d] = geometry.pieces[index].plan
            const [dx, dy] = shift(offset.x, offset.y, offset.z)

            return [
              [px, py + d],
              [px + w, py + d],
              [px + w, py]
            ]
              .map(([cx, cy]) => {
                const [sx, sy] = point(cx, cy, SLOT_Z)

                return `M${sx.toFixed(2)} ${sy.toFixed(2)}L${(sx + dx).toFixed(2)} ${(sy + dy).toFixed(2)}`
              })
              .join('')
          })
          .join('')
        if (leaders.current.getAttribute('d') !== lines) leaders.current.setAttribute('d', lines)
        leaders.current.style.opacity = String(Math.min(1, open))
      }
      // Keyboard focus ring hugs the deck at the current view instead of boxing the whole drawing.
      if (focusRing.current) {
        const ring = [
          [-385, -130],
          [220, -130],
          [220, 176],
          [-385, 176]
        ]
          .map(([cx, cy], corner) => `${corner ? 'L' : 'M'}${point(cx, cy, 0).map((v) => v.toFixed(2))}`)
          .join('')
          .concat('Z')
        if (focusRing.current.getAttribute('d') !== ring) focusRing.current.setAttribute('d', ring)
      }
      if (slots.current) {
        const outline =
          open > 0.002
            ? geometry.pieces
                .slice(0, state.count)
                .map(({ plan: [px, py, w, d] }) =>
                  [
                    [px, py],
                    [px + w, py],
                    [px + w, py + d],
                    [px, py + d]
                  ]
                    .map(([cx, cy], corner) => `${corner ? 'L' : 'M'}${point(cx, cy, SLOT_Z).map((v) => v.toFixed(2))}`)
                    .join('')
                    .concat('Z')
                )
                .join('')
            : ''
        if (slots.current.getAttribute('d') !== outline) slots.current.setAttribute('d', outline)
        slots.current.style.opacity = String(Math.min(1, open))
      }
      // Stack top stays on top; the carried and lifted sheets move in front of what they clear.
      const order = positions
        .map((offset, index) => {
          const center = geometry.pieces[index].center

          return {
            index,
            depth:
              (center[0] + offset.x) * scene.depth[0] +
              (center[1] + offset.y) * scene.depth[1] +
              (center[2] + offset.z) * scene.depth[2]
          }
        })
        .sort((a, b) => a.depth - b.depth)
        .map(({ index }) => index)
        .join(',')
      if (pieceLayer.current?.dataset.order !== order) {
        order.split(',').forEach((value) => {
          const part = modules.current[Number(value)]
          if (part) pieceLayer.current?.appendChild(part)
        })
        if (pieceLayer.current) pieceLayer.current.dataset.order = order
      }
      if (readout.current) readout.current.textContent = `${state.count}/6`
      if (status.current) {
        const detail = state.done
          ? 'Complete · 6 of 6 pieces placed'
          : `${state.action} · ${state.count} of 6 placed · ${state.progress}%`
        status.current.title = detail
        status.current.setAttribute('aria-label', detail)
      }
      if (state.phase !== lastPhase) {
        lastPhase = state.phase
        stage.current?.setAttribute('data-phase', String(state.phase))
      }

      return state.done
    }
    const tick = (now: number) => {
      animation = 0
      if (!visible || document.hidden) return
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0
      if (running) elapsed += dt
      previous = now
      if (paint(dt) && running) {
        running = false
        setMode('complete')
        setAnnouncement('Interface complete. Six pieces placed.')
        settled = false
      }
      // The pickup path continues only once every sheet and the tool are back where the timeline left them.
      if (resuming && !holding && view.open === 0 && view.lift === 0) {
        resuming = false
        running = true
      }
      if (running || resuming || !settled) animation = requestAnimationFrame(tick)
    }
    const run = () => {
      if (!animation && visible && !document.hidden) {
        previous = 0
        animation = requestAnimationFrame(tick)
      }
    }
    const assemble = () => {
      clearTimeout(autoTimer)
      elapsed = media.matches ? BUILD_DURATION : 0
      running = !media.matches && !holding
      resumeAfterHold = !media.matches && holding
      resuming = false
      paint()
      setMode(media.matches ? 'complete' : 'building')
      setAnnouncement(
        media.matches
          ? 'Interface complete. Six pieces placed.'
          : 'Picking up six wireframe pieces from a stack and placing them onto the canvas.'
      )
      run()
    }
    control.current = (action) => {
      autoStarted = true
      if (action === 'build') assemble()
      else {
        if (running || resuming || resumeAfterHold) {
          running = resuming = resumeAfterHold = false
          setMode('paused')
          setAnnouncement('Assembly paused.')
        } else {
          if (holding) resumeAfterHold = true
          else resuming = true
          setMode('building')
          setAnnouncement('Assembly resumed.')
        }
        run()
      }
    }
    hold.current = (on) => {
      if (on === holding) return
      holding = on
      setOpen(on)
      if (on) {
        resumeAfterHold = running || resuming
        running = resuming = false
      } else if (resumeAfterHold) {
        resumeAfterHold = false
        resuming = true
      }
      run()
    }
    hover.current = (value) => {
      inside = value
      if (value) load()
      run()
    }
    paint()
    if (media.matches) setMode('complete')
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[entries.length - 1].isIntersecting
        if (!visible) {
          clearTimeout(autoTimer)
          cancelAnimationFrame(animation)
          animation = 0
          previous = 0
        } else if (!autoStarted && !media.matches) {
          autoTimer = setTimeout(() => {
            autoStarted = true
            assemble()
          }, 2500)
        } else run()
      },
      { threshold: 0.15 }
    )
    if (stage.current) observer.observe(stage.current)
    const changeMotion = () => {
      if (media.matches) {
        clearTimeout(autoTimer)
        running = resuming = resumeAfterHold = false
        elapsed = BUILD_DURATION
        cancelAnimationFrame(animation)
        animation = 0
        paint()
        setMode('complete')
      }
    }
    media.addEventListener('change', changeMotion)
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animation)
        animation = 0
        previous = 0
      } else run()
    }
    document.addEventListener('visibilitychange', visibility)

    return () => {
      disposed = true
      clearTimeout(autoTimer)
      observer.disconnect()
      media.removeEventListener('change', changeMotion)
      document.removeEventListener('visibilitychange', visibility)
      cancelAnimationFrame(animation)
      control.current = () => undefined
      hold.current = () => undefined
      hover.current = () => undefined
    }
    // Layer refs are stable objects created once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const touchTimer = useRef<ReturnType<typeof setTimeout>>()
  const release = () => {
    clearTimeout(touchTimer.current)
    hold.current(false)
  }

  // The drawing is mutated in place while the machine turns; React must never re-render it after mount.
  const drawing = useMemo(
    () => (
      <>
        <title id={`${id}-title`}>The interface workbench</title>
        <desc id={`${id}-desc`}>
          A vacuum gripper picks up wireframe sheets from a visible stack and carries each one onto a blank browser canvas.
          Press and hold, or hold Space, to lift the placed sheets apart into an exploded view; release to let them settle
          back. On hover the machine turns to face you.
        </desc>
        <path ref={focusRing} className={styles.focusRing} d="" />
        <g ref={layers.base} dangerouslySetInnerHTML={{ __html: geometry.base }} />
        <path ref={slots} className={styles.slots} d="" />
        <path ref={leaders} className={styles.guide} d="" />
        <g ref={pieceLayer}>
          {[...geometry.pieces].reverse().map((piece) => {
            const index = geometry.pieces.indexOf(piece),
              movement = INITIAL.modules[index]
            const dx = geometry.axes.x[0] * movement.x + geometry.axes.y[0] * movement.y + geometry.axes.z[0] * movement.z
            const dy = geometry.axes.x[1] * movement.x + geometry.axes.y[1] * movement.y + geometry.axes.z[1] * movement.z

            return (
              <g
                key={piece.name}
                ref={(element) => {
                  modules.current[index] = element
                }}
                data-module={piece.name}
                transform={`translate(${dx} ${dy})`}
              >
                <g
                  ref={(element) => {
                    bodies.current[index] = element
                  }}
                  dangerouslySetInnerHTML={{ __html: piece.body }}
                />
              </g>
            )
          })}
        </g>
        <g ref={layers.frontRail} dangerouslySetInnerHTML={{ __html: geometry.frontRail }} />
        <g ref={bridge}>
          <g ref={layers.bridge} dangerouslySetInnerHTML={{ __html: geometry.bridge }} />
        </g>
        <g ref={head}>
          <g
            ref={tool}
            data-tool
            transform={`translate(${geometry.axes.z[0] * INITIAL.toolZ} ${geometry.axes.z[1] * INITIAL.toolZ})`}
          >
            <g ref={layers.tool} dangerouslySetInnerHTML={{ __html: geometry.tool }} />
          </g>
          <g ref={layers.head} dangerouslySetInnerHTML={{ __html: geometry.head }} />
        </g>
      </>
    ),
    // Refs are stable; the id is fixed for the component's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  )

  return (
    <figure ref={stage} className={styles.workbench} data-mode={mode} data-open={open}>
      <svg
        className={`${styles.scene} rounded`}
        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        role="button"
        tabIndex={0}
        aria-pressed={open}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-desc`}
        onPointerEnter={(event) => {
          if (event.pointerType !== 'touch') hover.current(true)
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== 'touch') hover.current(false)
        }}
        onPointerDown={(event) => {
          if (event.button !== 0) return
          // Capture keeps the hold alive when the pointer drifts off the drawing; release still ends it.
          try {
            event.currentTarget.setPointerCapture(event.pointerId)
          } catch {
            // A synthetic or already-released pointer cannot be captured; the hold still works without it.
          }
          // A short delay lets a touch that becomes a scroll cancel before anything opens.
          if (event.pointerType === 'touch') touchTimer.current = setTimeout(() => hold.current(true), TOUCH_HOLD_DELAY)
          else hold.current(true)
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
        onContextMenu={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
            event.preventDefault()
            hold.current(true)
          } else if (event.key === 'Escape') release()
        }}
        onKeyUp={(event) => {
          if (event.key === ' ' || event.key === 'Enter') release()
        }}
        onBlur={release}
      >
        {drawing}
      </svg>
      <figcaption className={styles.caption} aria-label="Assembly controls">
        <span
          ref={status}
          className={styles.status}
          title="Six wireframe pieces, ready to assemble"
          aria-label="Six wireframe pieces, ready to assemble"
        >
          <span className={styles.dot} aria-hidden="true" />
          <span ref={readout} aria-hidden="true">
            0/6
          </span>
        </span>
        <span className={styles.divider} aria-hidden="true" />
        {(mode === 'building' || mode === 'paused') && (
          <button
            type="button"
            onClick={() => control.current('pause')}
            className={styles.control}
            aria-label={mode === 'paused' ? 'Resume assembly' : 'Pause assembly'}
            title={mode === 'paused' ? 'Resume assembly' : 'Pause assembly'}
          >
            <span className={styles.iconSwap} data-paused={mode === 'paused'} aria-hidden="true">
              <Play size={13} className={styles.playIcon} />
              <Pause size={13} className={styles.pauseIcon} />
            </span>
          </button>
        )}
        <button
          type="button"
          className={styles.control}
          onClick={() => control.current('build')}
          aria-label="Rebuild interface"
          title="Rebuild interface"
        >
          <RotateCcw size={14} strokeWidth={1.5} />
        </button>
      </figcaption>
      <p className={styles.hint} aria-hidden="true">
        <Layers size={10} strokeWidth={1.5} />
        <span className={styles.hintFine}>Hold</span>
        <span className={styles.hintTouch}>Press and hold</span>
        to open the layers
      </p>
      <span className={styles.srOnly} role="status" aria-live="polite">
        {announcement}
      </span>
    </figure>
  )
}
