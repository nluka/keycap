import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
import PracticeSettingsBasicCardInputBoolean from '../Input/Boolean/PracticeSettingsBasicCardInputBoolean';
import PracticeSettingsBasicCard from '../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardIsPunctuationEnabled() {
  return (
    <PracticeSettingsBasicCard name="isPunctuationEnabled" title="Punctuation">
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const isPunctuationEnabled = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.basic.config.isPunctuationEnabled,
  );

  return (
    <PracticeSettingsBasicCardInputBoolean
      name="isPunctuationEnabled"
      value={isPunctuationEnabled}
    />
  );
}
