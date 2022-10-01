import React from 'react';
import { useAppSelector } from '../../../../../../../redux/hooks';
import PracticeSettingsBasicCardInputRadio from '../../Input/Radio/PracticeSettingsBasicCardInputRadio';
import PracticeSettingsBasicCard from '../../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardTextType() {
  return (
    <PracticeSettingsBasicCard name="textType" title="Text Type">
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const textType = useAppSelector(
    (state) => state.practice.settings.current.textType,
  );

  return (
    <PracticeSettingsBasicCardInputRadio
      name="textType"
      options={['quote', 'medley', 'custom']}
      value={textType}
    />
  );
}
