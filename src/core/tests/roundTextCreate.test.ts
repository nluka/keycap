import { describe, expect, test } from '@jest/globals';
import roundTextCreate from '../roundTextCreate';
import type IRoundText from '../types/IRoundText';

describe('roundTextCreate', () => {
  describe('should', () => {
    function assertThrowsError(text: string) {
      test(`throw error when text=${JSON.stringify(text)}`, () => {
        expect(() => {
          roundTextCreate(text);
        }).toThrowError();
      });
    }
    assertThrowsError('');

    function assert(text: string, expected: IRoundText) {
      test(`return correct object when text=${JSON.stringify(text)}`, () => {
        expect(roundTextCreate(text)).toEqual(expected);
      });
    }
    assert('1', {
      items: [
        {
          chars: [{ actual: '1', input: null, mistakes: [] }],
          isCompleted: false,
        },
      ],
      itemsCompletedCount: 0,
      caretPosition: 0,
    });
    assert('single-long', {
      items: [
        {
          chars: [
            { actual: 's', input: null, mistakes: [] },
            { actual: 'i', input: null, mistakes: [] },
            { actual: 'n', input: null, mistakes: [] },
            { actual: 'g', input: null, mistakes: [] },
            { actual: 'l', input: null, mistakes: [] },
            { actual: 'e', input: null, mistakes: [] },
            { actual: '-', input: null, mistakes: [] },
            { actual: 'l', input: null, mistakes: [] },
            { actual: 'o', input: null, mistakes: [] },
            { actual: 'n', input: null, mistakes: [] },
            { actual: 'g', input: null, mistakes: [] },
          ],
          isCompleted: false,
        },
      ],
      itemsCompletedCount: 0,
      caretPosition: 0,
    });
    assert('A fake quote.', {
      items: [
        {
          chars: [
            { actual: 'A', input: null, mistakes: [] },
            { actual: ' ', input: null, mistakes: [] },
          ],
          isCompleted: false,
        },
        {
          chars: [
            { actual: 'f', input: null, mistakes: [] },
            { actual: 'a', input: null, mistakes: [] },
            { actual: 'k', input: null, mistakes: [] },
            { actual: 'e', input: null, mistakes: [] },
            { actual: ' ', input: null, mistakes: [] },
          ],
          isCompleted: false,
        },
        {
          chars: [
            { actual: 'q', input: null, mistakes: [] },
            { actual: 'u', input: null, mistakes: [] },
            { actual: 'o', input: null, mistakes: [] },
            { actual: 't', input: null, mistakes: [] },
            { actual: 'e', input: null, mistakes: [] },
            { actual: '.', input: null, mistakes: [] },
          ],
          isCompleted: false,
        },
      ],
      itemsCompletedCount: 0,
      caretPosition: 0,
    });
  });
});
