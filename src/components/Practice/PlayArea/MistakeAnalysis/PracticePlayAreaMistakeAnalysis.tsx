import React from 'react';
import { v4 } from 'uuid';
import { useAppSelector } from '../../../../redux/hooks';
import store from '../../../../redux/store';
import { SPACE } from '../../../../utility/constants';
import { getTimeElapsedText } from '../../../../utility/functions/getTimeElapsedText';
import replaceControlCharsWithVisibleChars from '../../../../utility/functions/replaceControlCharsWithVisibleChars';
import type { ISelectedChar } from '../PracticePlayArea';
import './PracticePlayAreaMistakeAnalysis.css';

interface IProps {
  selectedChar: ISelectedChar | null;
}

export default function PracticePlayAreaMistakeAnalysis(props: IProps) {
  const roundResult = useAppSelector((state) => state.practice.roundResult);
  const roundStartTime = store.getState().practice.playArea.roundStartTime;

  function getContent() {
    if (
      props.selectedChar === null ||
      props.selectedChar.mistakes.length === 0
    ) {
      return 'Select a highlighted character to view mistakes';
    }

    return (
      <>
        <span>Mistakes:</span>
        {props.selectedChar.mistakes.map((m, index) => {
          return (
            <div
              key={v4()}
              className="mistake p-0 rounded"
              title={`Mistake ${index + 1}`}
            >
              <span className="input px-2">
                {m.input === SPACE
                  ? 'space'
                  : replaceControlCharsWithVisibleChars(m.input)}
              </span>
              <span className="time px-2">
                {getTimeElapsedText(m.timeMade - (roundStartTime as number))}
              </span>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div
      className="text-norm d-flex align-items-center gap-1 ps-1 mt-1"
      data-visible={
        roundResult !== null && roundResult.accuracyPercentage !== 100.0
      }
      id="practiceMistakeAnalysis"
    >
      {getContent()}
    </div>
  );
}
