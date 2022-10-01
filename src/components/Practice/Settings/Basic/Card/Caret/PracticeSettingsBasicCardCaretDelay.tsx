import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
import { PRACTICE_SETTINGS_CARET_DELAY_LIMITS } from '../../../../../../utility/constants';
import PracticeSettingsBasicCardInputNumber from '../Input/Number/PracticeSettingsBasicCardInputNumber';
import PracticeSettingsBasicCard from '../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardCaretDelay() {
  return (
    <PracticeSettingsBasicCard
      name="caretDelay"
      title={
        <>
          Caret
          <br />
          Delay
        </>
      }
    >
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const caretDelay = useAppSelector(
    (state) => state.practice.settings.current.caretDelay,
  );

  return (
    <PracticeSettingsBasicCardInputNumber
      name="caretDelay"
      limits={PRACTICE_SETTINGS_CARET_DELAY_LIMITS}
      value={caretDelay}
      step={0.01}
    />
  );
}
