import { PRACTICE_SETTINGS_MEDLEY_PUNCTUATION_FREQUENCY_LIMITS } from 'keycap-foundation';
import React from 'react';
import { useAppSelector } from '../../../../../../../redux/hooks';
import PracticeSettingsBasicCardInputNumber from '../../Input/Number/PracticeSettingsBasicCardInputNumber';
import PracticeSettingsBasicCard from '../../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardMedleyPunctuationFrequency() {
  return (
    <PracticeSettingsBasicCard
      name="medleyPunctuationFrequency"
      title={
        <>
          Medley
          <br />
          Punctuation
          <br />
          Frequency
        </>
      }
    >
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const medleyPunctuationFrequency = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.basic.config
        .medleyPunctuationFrequency,
  );

  return (
    <PracticeSettingsBasicCardInputNumber
      limits={PRACTICE_SETTINGS_MEDLEY_PUNCTUATION_FREQUENCY_LIMITS}
      name="medleyPunctuationFrequency"
      step={0.01}
      value={medleyPunctuationFrequency}
    />
  );
}
