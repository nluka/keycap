import { describe, expect, test } from '@jest/globals';
import createRoundTextWord from '../createRoundTextWord';
import updateRoundTextWord from '../updateRoundTextWord';
import type { IRoundTextWord } from '../types';

describe('updateRoundTextWord', () => {
  describe('should return correct remainder and correctly mutate object when', () => {
    testCase(
      'input is empty',
      {
        word: createRoundTextWord('Hello'),
        currentInputBuffer: '',
        prevInputBuffer: '',
        leadingWords: [],
      },
      {
        remainders: ['', ''],
        isCompleted: false,
      },
    );

    describe('input shorter than chars', () => {
      describe('without mistakes', () => {
        testCase(
          'length 1',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: 'H',
            prevInputBuffer: '',
            leadingWords: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );

        testCase(
          'length 2',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: 'He',
            prevInputBuffer: 'H',
            leadingWords: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );

        testCase(
          'length 3',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: 'Hel',
            prevInputBuffer: 'He',
            leadingWords: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );
      });

      describe('with mistakes', () => {
        testCase(
          'length 1',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: '@',
            prevInputBuffer: '',
            leadingWords: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );

        testCase(
          'length 2',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: 'H@',
            prevInputBuffer: 'H',
            leadingWords: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );

        testCase(
          'length 3',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: '@e@',
            prevInputBuffer: '@e',
            leadingWords: [],
          },
          {
            remainders: ['', ''],
            isCompleted: false,
          },
        );
      });
    });

    describe('input equal in length to chars', () => {
      testCase(
        '0 mistakes',
        {
          word: createRoundTextWord('Hello'),
          currentInputBuffer: 'Hello',
          prevInputBuffer: 'Hell',
          leadingWords: [],
        },
        {
          remainders: ['', ''],
          isCompleted: true,
        },
      );

      testCase(
        '1 mistake',
        {
          word: createRoundTextWord('Hello'),
          currentInputBuffer: 'Hell@',
          prevInputBuffer: 'Hell',
          leadingWords: [],
        },
        {
          remainders: ['', ''],
          isCompleted: false,
        },
      );

      testCase(
        '2 mistakes',
        {
          word: createRoundTextWord('Hello'),
          currentInputBuffer: '@ell@',
          prevInputBuffer: '@ell',
          leadingWords: [],
        },
        {
          remainders: ['', ''],
          isCompleted: false,
        },
      );

      testCase(
        '3 mistakes',
        {
          word: createRoundTextWord('Hello'),
          currentInputBuffer: '@e@l@',
          prevInputBuffer: '@e@l',
          leadingWords: [],
        },
        {
          remainders: ['', ''],
          isCompleted: false,
        },
      );
    });

    describe('input longer than chars', () => {
      describe('without mistakes', () => {
        testCase(
          'by 1',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: 'Hello1',
            prevInputBuffer: 'Hello',
            leadingWords: [],
          },
          {
            remainders: ['1', ''],
            isCompleted: true,
          },
        );

        testCase(
          'by 2',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: 'Hello12',
            prevInputBuffer: 'Hello1',
            leadingWords: [],
          },
          {
            remainders: ['12', '1'],
            isCompleted: true,
          },
        );

        testCase(
          'by 3',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: 'Hello123',
            prevInputBuffer: 'Hello12',
            leadingWords: [],
          },
          {
            remainders: ['123', '12'],
            isCompleted: true,
          },
        );
      });

      describe('with mistakes', () => {
        testCase(
          'by 1',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: 'He@lo1',
            prevInputBuffer: 'He@lo',
            leadingWords: [],
          },
          {
            remainders: ['1', ''],
            isCompleted: false,
          },
        );

        testCase(
          'by 2',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: 'He@l@12',
            prevInputBuffer: 'He@l@1',
            leadingWords: [],
          },
          {
            remainders: ['12', '1'],
            isCompleted: false,
          },
        );

        testCase(
          'by 3',
          {
            word: createRoundTextWord('Hello'),
            currentInputBuffer: '@@@@@123',
            prevInputBuffer: '@@@@@12',
            leadingWords: [],
          },
          {
            remainders: ['123', '12'],
            isCompleted: false,
          },
        );
      });
    });
  });
});

interface IParams {
  word: IRoundTextWord;
  currentInputBuffer: string;
  prevInputBuffer: string;
  leadingWords: IRoundTextWord[];
}

interface IExpected {
  remainders: Remainders;
  isCompleted: boolean;
}

type Remainders = [string, string];

function testCase(name: string, params: IParams, expected: IExpected) {
  const {
    word,
    currentInputBuffer: currentInput,
    prevInputBuffer: prevInput,
    leadingWords,
  } = params;
  const { remainders, isCompleted } = expected;

  test(name, () => {
    const result = updateRoundTextWord(
      word,
      currentInput,
      prevInput,
      leadingWords,
    );
    assertRemainders(result, remainders);
    assertMutation(word, currentInput, isCompleted);
  });
}

function assertRemainders(result: Remainders, expectedRemainders: Remainders) {
  expect(result).toEqual(expectedRemainders);
}

function assertMutation(
  word: IRoundTextWord,
  currentInput: string,
  expectedIsCompleted: boolean,
) {
  word.chars.forEach((char, index) => {
    const input = currentInput.charAt(index);
    expect(char.input).toBe(input === '' ? null : input);
  });
  expect(word.isCompleted).toBe(expectedIsCompleted);
}
