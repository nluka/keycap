import React from 'react';
import { useAppSelector } from '../../../../../../../redux/hooks';
import { PRACTICE_SETTINGS_MEDLEY_WORD_COUNT_LIMITS } from '../../../../../../../utility/constants';
import PracticeSettingsBasicCardInputNumber from '../../Input/Number/PracticeSettingsBasicCardInputNumber';
import PracticeSettingsBasicCard from '../../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardMedleyWordCount() {
  return (
    <PracticeSettingsBasicCard
      name="medleyWordCount"
      title={
        <>
          Medley
          <br />
          Word
          <br />
          Count
        </>
      }
    >
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const medleyWordCount = useAppSelector(
    (state) => state.practice.settings.current.medleyWordCount,
  );

  return (
    <PracticeSettingsBasicCardInputNumber
      limits={PRACTICE_SETTINGS_MEDLEY_WORD_COUNT_LIMITS}
      name="medleyWordCount"
      step={1}
      value={medleyWordCount}
    />
  );
}
