import React from 'react';
import { useAppSelector } from '../../../../../redux/hooks';
import { SPACE } from '../../../../../utility/constants';
import './PracticePlayAreaTextChar.css';
import type { PracticeMistakeHighlightStyle } from '../../../../../utility/types/practice';

interface IProps {
  actual: string;
  hasCaret: boolean;
  input: string | null;
}

const PracticePlayAreaTextChar = React.memo((props: IProps) => {
  const caretStyle = useAppSelector(
    (state) => state.practice.settings.current.caretStyle,
  );
  const caretDelay = useAppSelector(
    (state) => state.practice.settings.current.caretDelay,
  );
  const mistakeHighlightStyle = useAppSelector(
    (state) => state.practice.settings.current.mistakeHighlightStyle,
  );

  return (
    <>
      <span
        className="char"
        data-caret={props.hasCaret ? caretStyle : null}
        data-caret-delay={props.hasCaret ? caretDelay : null}
        data-correct={getDataCorrect(props)}
        data-mistake-highlight-style={getDataMistakeHighlightStyle(
          props,
          mistakeHighlightStyle,
        )}
        data-space={getDataSpace(props)}
      >
        {props.actual}
      </span>
    </>
  );
});

function getDataCorrect(props: IProps) {
  return props.input === null ? null : props.input === props.actual;
}

function getDataMistakeHighlightStyle(
  props: IProps,
  style: PracticeMistakeHighlightStyle,
) {
  return props.input === null || props.input === props.actual ? null : style;
}

function getDataSpace(props: IProps) {
  return props.input === null || props.input === props.actual
    ? null
    : props.actual === SPACE;
}

export default PracticePlayAreaTextChar;
