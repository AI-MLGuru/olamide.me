/**
 * Deterministic "architecture glyph" for a project: a small layered graph whose shape is
 * seeded by the slug, with one highlighted path through it. Same slug → same picture.
 */

export interface GlyphNode {
  x: number;
  y: number;
  /** Part of the highlighted path. */
  lit: boolean;
}

export interface GlyphEdge {
  from: GlyphNode;
  to: GlyphNode;
  lit: boolean;
}

export interface Glyph {
  width: number;
  height: number;
  nodes: GlyphNode[];
  edges: GlyphEdge[];
}

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 — tiny, fast, good enough for layout. */
function rng(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildGlyph(seed: string, width = 320, height = 180): Glyph {
  const rand = rng(hash(seed));
  const pick = (min: number, max: number) => min + Math.floor(rand() * (max - min + 1));

  const layerCount = pick(4, 5);
  const padX = 34;
  const padY = 26;
  const layers: GlyphNode[][] = [];

  for (let l = 0; l < layerCount; l++) {
    // Narrow at the ends, wider in the middle — reads as input → processing → output.
    const edge = l === 0 || l === layerCount - 1;
    const count = edge ? pick(1, 2) : pick(2, 4);
    const x = padX + (l * (width - 2 * padX)) / (layerCount - 1);
    const span = height - 2 * padY;
    const layer: GlyphNode[] = [];
    for (let i = 0; i < count; i++) {
      const base = count === 1 ? height / 2 : padY + (i * span) / (count - 1);
      const jitter = (rand() - 0.5) * 14;
      layer.push({ x: Math.round(x), y: Math.round(base + jitter), lit: false });
    }
    layers.push(layer);
  }

  // Highlighted path: one node per layer.
  const path = layers.map((layer) => layer[Math.floor(rand() * layer.length)]!);
  path.forEach((node) => (node.lit = true));

  const edges: GlyphEdge[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const current = layers[l]!;
    const next = layers[l + 1]!;
    for (const from of current) {
      for (const to of next) {
        const onPath = path[l] === from && path[l + 1] === to;
        // Keep the graph sparse so it reads as a diagram, not a mesh.
        if (onPath || rand() < 0.55) edges.push({ from, to, lit: onPath });
      }
    }
    // Every node needs at least one outgoing edge.
    for (const from of current) {
      if (!edges.some((e) => e.from === from)) {
        edges.push({ from, to: next[Math.floor(rand() * next.length)]!, lit: false });
      }
    }
  }

  return { width, height, nodes: layers.flat(), edges };
}
