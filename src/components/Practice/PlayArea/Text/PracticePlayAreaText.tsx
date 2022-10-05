import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { actionCreatorPracticeRoundEnd } from '../../../../redux/roundActions';
import store from '../../../../redux/store';
import { PracticeStatus } from '../../../../redux/types';
import type { ISelectedChar } from '../PracticePlayArea';
import PracticePlayAreaTextCharAnalyzed from './Char/Analyzed/PracticePlayAreaTextCharAnalyzed';
import PracticePlayAreaTextChar from './Char/PracticePlayAreaTextChar';
import './PracticePlayAreaText.css';

interface IProps {
  selectedChar: ISelectedChar | null;
  setSelectedChar: React.Dispatch<React.SetStateAction<ISelectedChar | null>>;
}

export default function PracticePlayAreaText(props: IProps) {
  const roundStatus = useAppSelector(
    (state) => state.practice.playArea.roundStatus,
  );
  const roundText = useAppSelector(
    (state) => state.practice.playArea.roundText,
  );
  const roundTextGenerationError =
    store.getState().practice.playArea.roundTextGenerationError;
  const roundResult = useAppSelector((state) => state.practice.roundResult);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isRoundCompleted =
      roundStatus === PracticeStatus.running &&
      roundText !== null &&
      roundText.items.length > 0 &&
      roundText.itemsCompletedCount === roundText.items.length;

    if (isRoundCompleted) {
      dispatch(actionCreatorPracticeRoundEnd());
    }
  }, [roundText?.items.length, roundText?.itemsCompletedCount, roundStatus]);

  useEffect(() => {
    if (roundStatus !== PracticeStatus.idle) {
      props.setSelectedChar(null);
    }
  }, [roundStatus]);

  function getContent() {
    if (roundTextGenerationError !== null) {
      return <p className="text-danger m-0">{roundTextGenerationError}</p>;
    }
    if (roundText === null) {
      return <p className="text-danger m-0">Internal error</p>;
    }
    if (roundText.items.length === 0) {
      return (
        <p className="m-0">
          Use the button or the keyboard shortcuts <Key text="Enter" /> to
          start, and <Key text="Shift" /> + <Key text="Enter" /> to abort.
        </p>
      );
    }
    if (
      roundText.items.length > 0 &&
      roundStatus !== PracticeStatus.running &&
      roundResult !== null
    ) {
      return createAnalyzedChars();
    }
    return createChars();
  }

  function createChars() {
    const chars: JSX.Element[] = [];
    let position = 0;

    if (roundText === null) {
      throw new TypeError('roundText === null');
    }

    for (const item of roundText.items) {
      for (const char of item.chars) {
        chars.push(
          <PracticePlayAreaTextChar
            actual={char.actual}
            hasCaret={
              roundText.caretPosition === position &&
              roundStatus === PracticeStatus.running
            }
            input={char.input}
            key={position}
          />,
        );
        ++position;
      }
    }

    return chars;
  }

  function createAnalyzedChars() {
    const chars: JSX.Element[] = [];
    let position = 0;

    if (roundText === null) {
      throw new TypeError('roundText === null');
    }

    for (const item of roundText.items) {
      for (const char of item.chars) {
        chars.push(
          <PracticePlayAreaTextCharAnalyzed
            actual={char.actual}
            key={v4()}
            mistakes={char.mistakes}
            position={position}
            selectedChar={props.selectedChar}
            setSelectedChar={props.setSelectedChar}
          />,
        );
        ++position;
      }
    }

    return chars;
  }

  return (
    <div className="text-high w-100 rounded" id="practiceText">
      {getContent()}
    </div>
  );
}

function Key({ text }: { text: string }) {
  return <kbd className="rounded">{text}</kbd>;
}
