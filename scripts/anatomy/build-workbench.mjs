// Interface workbench — original geometry using wheresryan22/anatomy (MIT).
// Regenerate committed geometry with: node scripts/anatomy/build-workbench.mjs
// The scene itself lives in workbench-scene.mjs so the page can re-project it while it turns.
import { readFileSync, writeFileSync } from 'node:fs'
import { buildScene } from './workbench-scene.mjs'

const logo = readFileSync('public/static/icons/white-logo.svg', 'utf8')
  .replace(/^<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replaceAll('#fff', '#57575a')
  .replaceAll('clip0_3_2', 'wb-logo-clip')
const output = { ...buildScene({ logo }), logo }
writeFileSync('src/components/organisms/landing/hero-landing/interface-workbench/geometry.json', JSON.stringify(output))
console.log(`Built interface workbench: ${output.parts} solids, ${output.pieces.length} interface modules`)
