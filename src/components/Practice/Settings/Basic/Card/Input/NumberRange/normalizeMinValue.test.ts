import { describe, expect, test } from '@jest/globals';
import NumberRange from 'nluka-number-range';
import normalizeMinValue from './normalizeMinValue';

describe('normalizeMinValue', () => {
  describe('should return', () => {
    const limits = new NumberRange(1, 50);

    function assert(
      min: number,
      max: number,
      limits: NumberRange,
      expected: number,
    ) {
      test(`${expected} when min=${min}, max=${max}, limits=${JSON.stringify(
        limits,
      )}`, () => {
        expect(normalizeMinValue(min, max, limits)).toBe(expected);
      });
    }

    assert(0, 10, limits, 1);
    assert(75, 100, limits, 50);
    assert(55, 1, limits, 1);
    assert(5, 10, limits, 5);
  });
});
