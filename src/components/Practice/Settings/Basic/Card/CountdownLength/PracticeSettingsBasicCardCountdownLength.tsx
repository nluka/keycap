import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
import PracticeSettingsBasicCardInputRadio from '../Input/Radio/PracticeSettingsBasicCardInputRadio';
import PracticeSettingsBasicCard from '../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardCountdownLength() {
  return (
    <PracticeSettingsBasicCard name="countdownLength" title="Countdown Length">
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const countdownLength = useAppSelector(
    (state) => state.practice.settings.current.countdownLength,
  );

  return (
    <div
      className="d-grid gap-1"
      style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
    >
      <PracticeSettingsBasicCardInputRadio
        name="countdownLength"
        options={[0, 1, 2, 3, 4, 5]}
        value={countdownLength}
      />
    </div>
  );
}
