import { describe, expect, test } from '@jest/globals';
import generateRandPositiveIntInRange from '../generateRandPositiveIntInRange';

describe('generateRandPositiveIntInRange', () => {
  describe('should', () => {
    describe('throw error when', () => {
      function assertThrowsError(min: number, max: number) {
        test(`min=${min}, max=${max}`, () => {
          expect(() => generateRandPositiveIntInRange(min, max)).toThrowError();
        });
      }

      assertThrowsError(-1, 3);
      assertThrowsError(2, 1);
      assertThrowsError(2, -1);
    });

    describe('return', () => {
      function assert(min: number, max: number) {
        const NUMBER_OF_RUNS = 100;
        test(`number inclusively between ${min} and ${max} when min=${min}, max=${max}`, () => {
          for (let i = 0; i < NUMBER_OF_RUNS; ++i) {
            const num = generateRandPositiveIntInRange(min, max);
            expect(num).toBeGreaterThanOrEqual(min);
            expect(num).toBeLessThanOrEqual(max);
          }
        });
      }

      assert(0, 5);
      assert(1, 5);
    });
  });
});
