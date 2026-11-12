import { describe, expect, it } from 'vitest';
import { parseSavedIds } from './storage';

describe('saved favourite storage boundary', () => {
  it('recovers from malformed and non-array browser values', () => {
    for (const raw of [null, '{broken', 'null', '{}', '42']) expect(parseSavedIds(raw)).toEqual([]);
  });
  it('keeps only bounded IDs and removes duplicates', () => {
    expect(parseSavedIds(JSON.stringify(['burger', 'burger', '', 12, {}, 'x'.repeat(129), 'cake']))).toEqual(['burger', 'cake']);
    expect(parseSavedIds(JSON.stringify(Array.from({length: 600}, (_, i) => `dish-${i}`)))).toHaveLength(500);
  });
});
