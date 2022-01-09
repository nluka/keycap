import React, { useState } from 'react';
import type IRoundTextItemCharMistake from '../../../../../../core/types/IRoundTextItemCharMistake';
import { SPACE } from '../../../../../../utility/constants';
import replaceControlCharsWithVisibleChars from '../../../../../../utility/functions/replaceControlCharsWithVisibleChars';
import type { ISelectedChar } from '../../../PracticePlayArea';
import './PracticePlayAreaTextCharAnalyzed.css';

interface IProps {
  actual: string;
  mistakes: IRoundTextItemCharMistake[];
  position: number;
  selectedChar: ISelectedChar | null;
  setSelectedChar: React.Dispatch<React.SetStateAction<ISelectedChar | null>>;
}

export default function PracticePlayAreaTextCharAnalyzed(props: IProps) {
  const isSelected = useState(
    props.selectedChar?.position === props.position,
  )[0];

  function getClasses() {
    const classes = ['char analyzed'];
    if (isSelected) {
      classes.push('selected');
    }
    return classes.join(SPACE);
  }

  function getDataMistakeCount() {
    switch (props.mistakes.length) {
      case 0:
        return 'none';
      case 1:
        return 'low';
      case 2:
        return 'medium';
      default:
        return 'high';
    }
  }

  return (
    <span
      className={getClasses()}
      data-mistake-count={getDataMistakeCount()}
      onClick={() =>
        props.setSelectedChar(
          isSelected
            ? null
            : {
                actual: props.actual,
                mistakes: props.mistakes,
                position: props.position,
              },
        )
      }
    >
      {replaceControlCharsWithVisibleChars(props.actual)}
    </span>
  );
}
