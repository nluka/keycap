import React, { useEffect, useRef, useState } from 'react';
import roundTextGetFirstUncompletedItemIndex from '../../../../core/roundTextGetFirstUncompletedItemIndex';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  actionCreatorPracticeRoundAbort,
  actionCreatorPracticeRoundInit,
  actionCreatorPracticeRoundUpdate,
} from '../../../../redux/roundActions';
import { PracticeStatus } from '../../../../redux/types';
import replaceControlCharsWithVisibleChars from '../../../../utility/functions/replaceControlCharsWithVisibleChars';
import './PracticePlayAreaInput.css';

type HtmlElementType = HTMLTextAreaElement;

export default function PracticePlayAreaInput() {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const roundStatus = useAppSelector(
    (state) => state.practice.playArea.roundStatus,
  );
  const textItems = useAppSelector(
    (state) => state.practice.playArea.roundText?.items,
  );
  const textItemsCompletedCount = useAppSelector(
    (state) => state.practice.playArea.roundText?.itemsCompletedCount,
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

  useEffect(() => setValue(''), [textItemsCompletedCount]);

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
    if (textItems === undefined || textItems.length === 0) {
      return false;
    }
    const currentItemIdx = roundTextGetFirstUncompletedItemIndex(textItems);
    if (currentItemIdx >= textItems.length) {
      // all items are completed and correct
      return false;
    }
    const currentItem = textItems[currentItemIdx];
    for (const char of currentItem.chars) {
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
      id="practiceInput"
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
