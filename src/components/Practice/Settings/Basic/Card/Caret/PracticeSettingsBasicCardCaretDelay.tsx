import { PRACTICE_SETTINGS_CARET_DELAY_LIMITS } from 'keycap-foundation';
import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
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
    (state) => state.practice.settings.currentConfig.basic.config.caretDelay,
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
