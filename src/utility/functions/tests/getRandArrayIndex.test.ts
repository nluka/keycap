import { describe, expect, test } from '@jest/globals';
import getRandArrayIndex from '../getRandArrayIndex';

describe('getRandArrayIndex', () => {
  const array = [1, 2];
  const NUMBER_OF_RUNS = 100;

  describe('should always return', () => {
    test('a valid index', () => {
      for (let i = 0; i < NUMBER_OF_RUNS; ++i) {
        expect(getRandArrayIndex(array)).toBeLessThan(array.length);
      }
    });

    test('a positive number', () => {
      for (let i = 0; i < NUMBER_OF_RUNS; ++i) {
        expect(getRandArrayIndex(array)).toBeGreaterThanOrEqual(0);
      }
    });
  });
});
