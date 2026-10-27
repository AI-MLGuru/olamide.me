import { describe, expect, it } from 'vitest';
import { buildGlyph } from './glyph';

describe('buildGlyph', () => {
  it('is deterministic for a seed', () => {
    expect(buildGlyph('koda')).toEqual(buildGlyph('koda'));
  });

  it('varies between seeds', () => {
    expect(buildGlyph('koda')).not.toEqual(buildGlyph('paxli'));
  });

  it('keeps every node inside the canvas', () => {
    const glyph = buildGlyph('build');
    for (const node of glyph.nodes) {
      expect(node.x).toBeGreaterThanOrEqual(0);
      expect(node.x).toBeLessThanOrEqual(glyph.width);
      expect(node.y).toBeGreaterThanOrEqual(0);
      expect(node.y).toBeLessThanOrEqual(glyph.height);
    }
  });

  it('lights one connected path from the first layer to the last', () => {
    const glyph = buildGlyph('ajo-savings-circle');
    const lit = glyph.edges.filter((e) => e.lit);
    expect(lit.length).toBeGreaterThanOrEqual(3);
    for (let i = 0; i < lit.length - 1; i++) {
      expect(lit[i]!.to).toBe(lit[i + 1]!.from);
    }
  });
});
