// Check the pick-carry-place motion against the actual TypeScript model.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'
const source = readFileSync('src/components/organisms/landing/hero-landing/interface-workbench/model.ts', 'utf8')
const exports = {}
runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports })
const { frameAt, BUILD_DURATION, MODULE_TIME, TOOL_OFFSET, SAFE_HEIGHT } = exports
const geometry = JSON.parse(
  readFileSync('src/components/organisms/landing/hero-landing/interface-workbench/geometry.json', 'utf8')
)
let previous = frameAt(0, geometry.rest, geometry.pieces)
for (let t = 1 / 240; t <= BUILD_DURATION; t += 1 / 240) {
  const f = frameAt(t, geometry.rest, geometry.pieces)
  assert.ok(f.x >= -330 && f.x <= 125, 'Carriage stays on its crossbeam')
  assert.ok(f.y >= -90 && f.y <= 100, 'Bridge stays on supported Y rails')
  assert.ok(f.progress >= 0 && f.progress <= 100)
  assert.ok(f.count >= previous.count && f.count <= 6)
  f.modules.forEach((m, i) => {
    const before = previous.modules[i]
    assert.ok(Math.hypot(m.x - before.x, m.y - before.y, m.z - before.z) < 3, 'A piece cannot jump between frames')
    const stage = Math.floor(t / MODULE_TIME),
      local = t / MODULE_TIME - stage
    if (i === stage && local >= 0.28 && local < 0.8) {
      assert.ok(
        Math.abs(m.position[0] - f.x) < 1e-8 && Math.abs(m.position[1] - f.y - TOOL_OFFSET) < 1e-8,
        'Carried piece stays under the gripper'
      )
      assert.ok(Math.abs(m.position[2] - 48 - f.toolZ) < 1e-8, 'Vacuum pad stays in contact with the piece')
    }
    if (i > stage)
      assert.ok(
        m.position.every((v, j) => v === geometry.pieces[i].source[j]),
        'Waiting pieces remain in their stack'
      )
    if (i < stage)
      assert.ok(
        m.position.every((v, j) => v === geometry.pieces[i].center[j]),
        'Placed pieces stay on the canvas'
      )
  })
  previous = f
}
const start = frameAt(0, geometry.rest, geometry.pieces),
  end = frameAt(BUILD_DURATION, geometry.rest, geometry.pieces)
assert.equal(start.count, 0)
assert.equal(start.progress, 0)
assert.equal(end.count, 6)
assert.equal(end.progress, 100)
assert.equal(end.done, true)
assert.equal(end.x, geometry.rest.x)
assert.equal(end.y, geometry.rest.y)
assert.equal(end.toolZ, SAFE_HEIGHT - 48)
assert.ok(end.modules.every((m) => m.x === 0 && m.y === 0 && m.z === 0 && m.tilt === 0))
console.log(
  'Pick/place checks passed: continuous travel, source stack, gripper contact, placed positions, rail limits, and completion.'
)
