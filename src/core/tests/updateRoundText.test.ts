import { describe, expect, test } from '@jest/globals';
import createDeepCopy from '../../utility/functions/createDeepCopy';
import createRoundText from '../createRoundText';
import updateRoundText from '../updateRoundText';
import type { IRoundText } from '../types';

const text = createRoundText('One 2 three 4.');
const expected = createDeepCopy(text) as IRoundText;

describe('updateRoundText', () => {
  describe('should return correctly mutated object', () => {
    testCase(0, { currentInput: 'o', prevInput: '' }, expected, () => {
      expected.words[0].chars[0].input = 'o';
      expected.words[0].chars[0].mistakes.push({
        input: 'o',
        timeMade: -1,
      });
      ++expected.caretPosition;
    });

    testCase(0, { currentInput: 'on', prevInput: 'o' }, expected, () => {
      expected.words[0].chars[1].input = 'n';
      ++expected.caretPosition;
    });

    testCase(0, { currentInput: 'one ', prevInput: 'on' }, expected, () => {
      expected.words[0].chars[2].input = 'e';
      expected.words[0].chars[3].input = ' ';
      expected.caretPosition += 2;
    });

    testCase(
      [0, 1],
      { currentInput: 'one 2', prevInput: 'one ' },
      expected,
      () => {
        expected.words[1].chars[0].input = '2';
        ++expected.caretPosition;
      },
    );

    testCase(
      [0, 1],
      { currentInput: 'one 2 ', prevInput: 'one 2' },
      expected,
      () => {
        expected.words[1].chars[1].input = ' ';
        ++expected.caretPosition;
      },
    );

    testCase(
      [0, 1, 2],
      { currentInput: 'one 2 three ', prevInput: 'one 2 ' },
      expected,
      () => {
        expected.words[2].chars[0].input = 't';
        expected.words[2].chars[1].input = 'h';
        expected.words[2].chars[2].input = 'r';
        expected.words[2].chars[3].input = 'e';
        expected.words[2].chars[4].input = 'e';
        expected.words[2].chars[5].input = ' ';
        expected.caretPosition += 6;
      },
    );

    testCase(
      [0, 1, 2],
      { currentInput: 'one 2 ', prevInput: 'one 2 three ' },
      expected,
      () => {
        expected.words[2].chars[0].input = null;
        expected.words[2].chars[1].input = null;
        expected.words[2].chars[2].input = null;
        expected.words[2].chars[3].input = null;
        expected.words[2].chars[4].input = null;
        expected.words[2].chars[5].input = null;
        expected.caretPosition -= 6;
      },
    );

    testCase(
      [0, 1],
      { currentInput: 'one 2', prevInput: 'one 2 ' },
      expected,
      () => {
        expected.words[1].chars[1].input = null;
        expected.caretPosition--;
      },
    );

    testCase(
      [0, 1],
      { currentInput: 'one ', prevInput: 'one 2' },
      expected,
      () => {
        expected.words[1].chars[0].input = null;
        expected.caretPosition--;
      },
    );

    testCase(0, { currentInput: 'on', prevInput: 'one ' }, expected, () => {
      expected.words[0].chars[2].input = null;
      expected.words[0].chars[3].input = null;
      expected.caretPosition -= 2;
    });

    testCase(0, { currentInput: '', prevInput: 'on' }, expected, () => {
      expected.words[0].chars[0].input = null;
      expected.words[0].chars[1].input = null;
      expected.caretPosition -= 2;
    });

    testCase(0, { currentInput: 'Onee', prevInput: '' }, expected, () => {
      expected.words[0].chars[0].input = 'O';
      expected.words[0].chars[1].input = 'n';
      expected.words[0].chars[2].input = 'e';
      expected.words[0].chars[3].input = 'e';
      expected.words[0].chars[3].mistakes.push({ input: 'e', timeMade: -1 });
      expected.caretPosition += 4;
    });

    testCase(0, { currentInput: 'One ', prevInput: 'Onee' }, expected, () => {
      expected.words[0].chars[0].input = 'O';
      expected.words[0].chars[1].input = 'n';
      expected.words[0].chars[2].input = 'e';
      expected.words[0].chars[3].input = ' ';
      expected.words[0].isCompleted = true;
      expected.numWordsCompleted = 1;
    });

    testCase(1, { currentInput: '2', prevInput: 'One ' }, expected, () => {
      expected.words[1].chars[0].input = '2';
      ++expected.caretPosition;
    });

    testCase(1, { currentInput: '2 ', prevInput: '2' }, expected, () => {
      expected.words[1].chars[1].input = ' ';
      expected.words[1].isCompleted = true;
      expected.numWordsCompleted = 2;
      ++expected.caretPosition;
    });

    testCase(
      [2, 3],
      { currentInput: 'three 4', prevInput: '2 ' },
      expected,
      () => {
        expected.words[2].chars[0].input = 't';
        expected.words[2].chars[1].input = 'h';
        expected.words[2].chars[2].input = 'r';
        expected.words[2].chars[3].input = 'e';
        expected.words[2].chars[4].input = 'e';
        expected.words[2].chars[5].input = ' ';
        expected.words[3].chars[0].input = '4';
        expected.words[2].isCompleted = true;
        expected.numWordsCompleted = 3;
        expected.caretPosition += 7;
      },
    );

    testCase(3, { currentInput: '4,.', prevInput: 'three 4' }, expected, () => {
      expected.words[3].chars[0].input = '4';
      expected.words[3].chars[1].input = ',';
      expected.words[3].chars[1].mistakes.push({ input: ',', timeMade: -1 });
      ++expected.caretPosition;
    });

    testCase(3, { currentInput: '4,. ', prevInput: '4,.' }, expected);

    testCase(3, { currentInput: '4,.  ', prevInput: '4,. ' }, expected);

    testCase(3, { currentInput: '', prevInput: '4,. ' }, expected, () => {
      expected.words[3].chars[0].input = null;
      expected.words[3].chars[1].input = null;
      expected.caretPosition -= 2;
    });

    testCase(3, { currentInput: '4.', prevInput: '' }, expected, () => {
      expected.words[3].chars[0].input = '4';
      expected.words[3].chars[1].input = '.';
      expected.words[3].isCompleted = true;
      expected.numWordsCompleted = 4;
      expected.caretPosition += 2;
    });
  });
});

interface IParams {
  currentInput: string;
  prevInput: string;
}

function testCase(
  wordNums: number | number[],
  params: IParams,
  expected: IRoundText,
  updateExpected?: () => void,
) {
  const { currentInput, prevInput } = params;
  test(`word ${
    Array.isArray(wordNums) ? wordNums.join('+') : wordNums
  }, currentInput=${JSON.stringify(currentInput)}, prevInput=${JSON.stringify(
    prevInput,
  )}`, () => {
    updateRoundText(text, currentInput, prevInput);
    if (updateExpected !== undefined) {
      updateExpected();
    }

    expect(text.caretPosition).toBe(expected.caretPosition);
    expect(text.numWordsCompleted).toBe(text.numWordsCompleted);

    // Check each word
    for (let i = 0; i < text.words.length; ++i) {
      const actualWord = text.words[i];
      const expectedWord = expected.words[i];

      expect(actualWord.isCompleted).toBe(expectedWord.isCompleted);

      // Check each char
      for (let c = 0; c < actualWord.chars.length; ++c) {
        const actualChar = actualWord.chars[c];
        const expectedChar = expectedWord.chars[c];

        expect(actualChar.actual).toBe(expectedChar.actual);
        expect(actualChar.input).toBe(expectedChar.input);

        // Check each mistake
        for (let m = 0; m < actualChar.mistakes.length; ++m) {
          const actualMistake = actualChar.mistakes[m];
          const expectedMistake = expectedChar.mistakes[m];

          expect(actualMistake.input).toBe(expectedMistake.input);
        }
      }
    }
    expect(text.words);
  });
}
