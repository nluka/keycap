import { describe, expect, test } from '@jest/globals';
import createRoundTextChar from '../createRoundTextChar';
import type { IRoundTextChar } from '../types';

describe('createRoundTextChar', () => {
  describe('should', () => {
    function assertThrowsError(char: string) {
      test(`throw error when char=${JSON.stringify(char)}`, () => {
        expect(() => {
          createRoundTextChar(char);
        }).toThrowError();
      });
    }
    assertThrowsError('12');
    assertThrowsError('123');

    function assert(char: string, expected: IRoundTextChar) {
      test(`return ${JSON.stringify(expected)} when char=${JSON.stringify(
        char,
      )}`, () => {
        expect(createRoundTextChar('A')).toEqual({
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
