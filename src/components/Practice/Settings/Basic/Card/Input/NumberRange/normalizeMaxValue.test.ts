import { describe, expect, test } from '@jest/globals';
import NumberRange from 'nluka-number-range';
import normalizeMaxValue from './normalizeMaxValue';

describe('normalizeMaxValue', () => {
  describe('should return', () => {
    const limits = new NumberRange(1, 50);

    function assert(
      max: number,
      min: number,
      limits: NumberRange,
      expected: number,
    ) {
      test(`${expected} when max=${max}, min=${min}, limits=${JSON.stringify(
        limits,
      )}`, () => {
        expect(normalizeMaxValue(max, min, limits)).toBe(expected);
      });
    }

    assert(10, 20, limits, 20);
    assert(0, 0, limits, 1);
    assert(55, 10, limits, 50);
    assert(0, 10, limits, 10);
  });
});
