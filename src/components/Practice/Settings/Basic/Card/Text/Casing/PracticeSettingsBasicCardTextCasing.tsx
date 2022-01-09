import React from 'react';
import { useAppSelector } from '../../../../../../../redux/hooks';
import PracticeSettingsBasicCardInputRadio from '../../Input/Radio/PracticeSettingsBasicCardInputRadio';
import PracticeSettingsBasicCard from '../../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardTextCasing() {
  return (
    <PracticeSettingsBasicCard name="textCasing" title="Text Casing">
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const textCasing = useAppSelector(
    (state) => state.practice.settings.currentConfig.basic.config.textCasing,
  );

  return (
    <PracticeSettingsBasicCardInputRadio
      name="textCasing"
      options={['dynamic', 'force-lower', 'force-upper']}
      value={textCasing}
    />
  );
}
