import { describe, expect, test } from '@jest/globals';
import createRoundText from '../createRoundText';
import type { IRoundText } from '../types';

describe('createRoundText', () => {
  describe('should', () => {
    function assertThrowsError(text: string) {
      test(`throw error when text=${JSON.stringify(text)}`, () => {
        expect(() => {
          createRoundText(text);
        }).toThrowError();
      });
    }
    assertThrowsError('');

    function assert(text: string, expected: IRoundText) {
      test(`return correct object when text=${JSON.stringify(text)}`, () => {
        expect(createRoundText(text)).toEqual(expected);
      });
    }
    assert('1', {
      words: [
        {
          chars: [{ actual: '1', input: null, mistakes: [] }],
          isCompleted: false,
        },
      ],
      numWordsCompleted: 0,
      caretPosition: 0,
    });
    assert('single-long', {
      words: [
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
      numWordsCompleted: 0,
      caretPosition: 0,
    });
    assert('A fake quote.', {
      words: [
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
      numWordsCompleted: 0,
      caretPosition: 0,
    });
  });
});
