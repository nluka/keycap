import { afterEach, describe, expect, test } from '@jest/globals';
import countCompletedRoundTextWords from '../countCompletedRoundTextWords';
import createRoundText from '../createRoundText';
import type { IRoundTextWord } from '../types';

const text = createRoundText('one two three');
const words = text.words;

afterEach(() => {
  for (const word of words) {
    word.isCompleted = false;
  }
});

describe('countCompletedRoundTextWords', () => {
  describe('should', () => {
    function assert(words: IRoundTextWord[], expected: number) {
      test(`return ${JSON.stringify(
        expected,
      )} when ${expected} words are completed`, () => {
        for (let i = 0; i < expected; ++i) {
          const word = words[i];
          word.isCompleted = true;
        }
        expect(countCompletedRoundTextWords(words)).toBe(expected);
      });
    }
    assert([], 0);
    assert(words, 0);
    assert(words, 1);
    assert(words, 2);
    assert(words, 3);
  });
});
