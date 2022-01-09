import React, { useEffect, useRef, useState } from 'react';
import {
  actionCreatorPracticeRoundAbort,
  actionCreatorPracticeRoundInit,
  actionCreatorPracticeRoundUpdate,
} from '../../../../redux/actions/practice/practiceActionsRound';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { PracticeStatus } from '../../../../redux/types/IStatePractice';
import replaceControlCharsWithVisibleChars from '../../../../utility/functions/replaceControlCharsWithVisibleChars';
import './PracticePlayAreaInput.css';

type HtmlElementType = HTMLTextAreaElement;

export default function PracticePlayAreaInput() {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const roundStatus = useAppSelector(
    (state) => state.practice.playArea.roundStatus,
  );
  const textItemsCompletedCount = useAppSelector(
    (state) => state.practice.playArea.roundText?.itemsCompletedCount,
  );
  const element = useRef<HtmlElementType>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      roundStatus === PracticeStatus.running ||
      roundStatus === PracticeStatus.countingDown
    ) {
      element.current?.focus();
    }
    setValue('');
  }, [roundStatus]);

  useEffect(() => {
    setValue('');
  }, [textItemsCompletedCount]);

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
      return 'Press Enter to start';
    }
    if (
      roundStatus === PracticeStatus.countingDown ||
      roundStatus === PracticeStatus.generatingText
    ) {
      return 'Press Shift + Enter to abort';
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

  return (
    <textarea
      autoCapitalize="none"
      autoComplete="false"
      autoCorrect="false"
      autoFocus={true}
      className="text-norm py-1 rounded w-100"
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
