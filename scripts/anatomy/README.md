# Interface workbench

An original SVG gantry built with the MIT-licensed Anatomy kit by wheresryan22. The vendored kit and its license live in this directory; regenerating the drawing does not require a global skill installation.

```sh
node scripts/anatomy/build-workbench.mjs
node scripts/anatomy/check-workbench.mjs
```

`build-workbench.mjs` writes the committed geometry JSON used by the hero. The machine has a Z actuator and two travel axes: its bridge moves along Y, and its carriage moves along X. The pure TypeScript timeline in `interface-workbench/model.ts` positions both and takes each wireframe sheet from a visible stack, lifts it to a safe height, carries it with a small sway, and lowers it onto a blank browser canvas. The vacuum pad stays in contact with the carried sheet; transit clears the rails before lowering at the destination.

The React controller uses one animation frame loop, pauses outside the viewport, and paints transforms and piece positions through refs. Reduced motion displays the complete interface immediately. No WebGL or additional runtime package is required.

The hero uses Anatomy’s paper, graphite, and four light shading tones. Materials and geometry styles are scoped to the figure. The navbar changes to graphite while it overlaps the hero, retaining its existing colors on other sections and routes.
