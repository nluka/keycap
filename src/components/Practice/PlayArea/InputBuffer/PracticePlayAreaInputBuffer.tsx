import React, { useEffect, useRef, useState } from 'react';
import firstUncompletedRoundTextWordIdx from '../../../../core/firstUncompletedRoundTextWordIdx';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  actionCreatorPracticeRoundAbort,
  actionCreatorPracticeRoundInit,
  actionCreatorPracticeRoundUpdate,
} from '../../../../redux/roundActions';
import { PracticeStatus } from '../../../../redux/types';
import replaceControlCharsWithVisibleChars from '../../../../utility/functions/replaceControlCharsWithVisibleChars';
import './PracticePlayAreaInputBuffer.css';

type HtmlElementType = HTMLTextAreaElement;

export default function PracticePlayAreaInputBuffer() {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const roundStatus = useAppSelector(
    (state) => state.practice.playArea.roundStatus,
  );
  const words = useAppSelector(
    (state) => state.practice.playArea.roundText?.words,
  );
  const wordsCompletedCount = useAppSelector(
    (state) => state.practice.playArea.roundText?.numWordsCompleted,
  );
  const element = useRef<HtmlElementType>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      [PracticeStatus.running, PracticeStatus.countingDown].includes(
        roundStatus,
      )
    ) {
      element.current?.focus();
    }
    setValue('');
  }, [roundStatus]);

  useEffect(() => setValue(''), [wordsCompletedCount]);

  // Cleanup
  useEffect(
    () => () => {
      if (roundStatus === PracticeStatus.running) {
        dispatch(
          actionCreatorPracticeRoundUpdate({
            input: '',
          }),
        );
      }
    },
    [],
  );

  function getPlaceholder() {
    if (!isFocused) {
      return undefined;
    }
    if (roundStatus === PracticeStatus.idle) {
      return 'Enter to start';
    }
    if (
      roundStatus === PracticeStatus.countingDown ||
      roundStatus === PracticeStatus.generatingText
    ) {
      return 'Shift + Enter to abort';
    }
    return undefined;
  }

  function handleKeyPress(event: React.KeyboardEvent<HtmlElementType>) {
    if (event.key !== 'Enter') {
      return;
    }

    if (event.shiftKey) {
      if (roundStatus !== PracticeStatus.idle) {
        dispatch(actionCreatorPracticeRoundAbort());
      }
    } else {
      if (roundStatus === PracticeStatus.idle) {
        dispatch(actionCreatorPracticeRoundInit());
      }
    }
  }

  function handleChange(event: React.ChangeEvent<HtmlElementType>) {
    if (roundStatus !== PracticeStatus.running) {
      return;
    }
    if (element.current?.value === null) {
      throw new Error('element.current.value === null');
    }

    const value = replaceControlCharsWithVisibleChars(event.target.value);
    setValue(value);
    dispatch(
      actionCreatorPracticeRoundUpdate({
        input: value,
      }),
    );
  }

  function areThereUncorrectedMistakesInBuffer() {
    if (words === undefined || words.length === 0) {
      return false;
    }
    const currentWordIdx = firstUncompletedRoundTextWordIdx(words);
    if (currentWordIdx >= words.length) {
      // all words are completed and correct
      return false;
    }
    const currentWord = words[currentWordIdx];
    for (const char of currentWord.chars) {
      if (char.input === null) {
        // reached end of input
        return false;
      } else if (char.input !== char.actual) {
        return true;
      }
    }
    return false;
  }

  return (
    <textarea
      autoCapitalize="none"
      autoComplete="false"
      autoCorrect="false"
      autoFocus={true}
      className="text-norm py-1 rounded w-100"
      data-has-mistakes={areThereUncorrectedMistakesInBuffer()}
      id="practiceInputBuffer"
      onBlur={() => setIsFocused(false)}
      onChange={handleChange}
      onFocus={() => setIsFocused(true)}
      onKeyPress={handleKeyPress}
      placeholder={getPlaceholder()}
      ref={element}
      rows={1}
      spellCheck="false"
      value={value}
    />
  );
}
