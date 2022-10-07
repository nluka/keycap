import { describe, expect, test } from '@jest/globals';
import { SPACE } from '../../utility/constants';
import createRoundTextWord from '../createRoundTextWord';
import type { IRoundTextWord } from '../types';

describe('createRoundTextWord', () => {
  describe('should', () => {
    function assertThrowsError(text: string) {
      test(`throw error when text=${JSON.stringify(text)}`, () => {
        expect(() => {
          createRoundTextWord(text);
        }).toThrowError();
      });
    }
    assertThrowsError('');
    assertThrowsError(SPACE);
    assertThrowsError(SPACE + 'text');
    assertThrowsError(SPACE + SPACE + 'text');
    assertThrowsError(SPACE + SPACE + SPACE + 'text');
    assertThrowsError('text' + SPACE + SPACE);
    assertThrowsError('text' + SPACE + SPACE + SPACE);

    function assert(text: string, expected: IRoundTextWord) {
      test(`return correct object when text=${JSON.stringify(text)}`, () => {
        expect(createRoundTextWord(text)).toEqual(expected);
      });
    }
    assert('Yes ', {
      chars: [
        {
          actual: 'Y',
          input: null,
          mistakes: [],
        },
        {
          actual: 'e',
          input: null,
          mistakes: [],
        },
        {
          actual: 's',
          input: null,
          mistakes: [],
        },
        {
          actual: ' ',
          input: null,
          mistakes: [],
        },
      ],
      isCompleted: false,
    });
    assert('1_2 ', {
      chars: [
        {
          actual: '1',
          input: null,
          mistakes: [],
        },
        {
          actual: '_',
          input: null,
          mistakes: [],
        },
        {
          actual: '2',
          input: null,
          mistakes: [],
        },
        {
          actual: ' ',
          input: null,
          mistakes: [],
        },
      ],
      isCompleted: false,
    });
  });

  describe('should NOT', () => {
    function assertDoesNotThrowError(text: string) {
      test(`throw error when text=${JSON.stringify(text)}`, () => {
        expect(() => {
          createRoundTextWord(text);
        }).not.toThrowError();
      });
    }
    assertDoesNotThrowError('1');
    assertDoesNotThrowError('1 ');
    assertDoesNotThrowError('large_word');
    assertDoesNotThrowError('large_word ');
  });
});
