import { describe, expect, test } from '@jest/globals';
import getRandArrayElement from '../getRandArrayElement';

describe('getRandArrayElement', () => {
  describe('should', () => {
    describe('throw error when', () => {
      function assertThrowsError(array: any[]) {
        test(`throw error when array=${JSON.stringify(array)}`, () => {
          expect(() => getRandArrayElement(array)).toThrowError();
        });
      }

      assertThrowsError([]);
    });

    describe('return', () => {
      function assert(array: any[], expected: any) {
        test(`${JSON.stringify(expected)} when array=${JSON.stringify(
          array,
        )}`, () => {
          expect(getRandArrayElement(array)).toBe(expected);
        });
      }

      assert([1], 1);
      assert([2], 2);
      assert([null], null);
      assert(['string'], 'string');
    });
  });
});
