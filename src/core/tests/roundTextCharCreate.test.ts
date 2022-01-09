import { describe, expect, test } from '@jest/globals';
import roundTextCharCreate from '../roundTextCharCreate';
import type IRoundTextItemChar from '../types/IRoundTextItemChar';

describe('roundTextCharCreate', () => {
  describe('should', () => {
    function assertThrowsError(char: string) {
      test(`throw error when char=${JSON.stringify(char)}`, () => {
        expect(() => {
          roundTextCharCreate(char);
        }).toThrowError();
      });
    }
    assertThrowsError('12');
    assertThrowsError('123');

    function assert(char: string, expected: IRoundTextItemChar) {
      test(`return ${JSON.stringify(expected)} when char=${JSON.stringify(
        char,
      )}`, () => {
        expect(roundTextCharCreate('A')).toEqual({
          actual: 'A',
          input: null,
          mistakes: [],
        });
      });
    }
    assert('A', {
      actual: 'A',
      input: null,
      mistakes: [],
    });
    assert('\\', {
      actual: '\\',
      input: null,
      mistakes: [],
    });
    assert('1', {
      actual: '1',
      input: null,
      mistakes: [],
    });
  });
});
