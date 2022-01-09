import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
import PracticeSettingsBasicCardInputBoolean from '../Input/Boolean/PracticeSettingsBasicCardInputBoolean';
import PracticeSettingsBasicCard from '../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardIsResultRecordingEnabled() {
  return (
    <PracticeSettingsBasicCard
      name="isResultRecordingEnabled"
      title={
        <>
          Result
          <br />
          Recording
        </>
      }
    >
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const isResultRecordingEnabled = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.basic.config
        .isResultRecordingEnabled,
  );

  return (
    <PracticeSettingsBasicCardInputBoolean
      name="isResultRecordingEnabled"
      value={isResultRecordingEnabled}
    />
  );
}
