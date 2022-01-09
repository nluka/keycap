import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
import PracticeSettingsBasicCardInputRadio from '../Input/Radio/PracticeSettingsBasicCardInputRadio';
import PracticeSettingsBasicCard from '../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardCustomTextActive() {
  return (
    <PracticeSettingsBasicCard
      name="customTextActive"
      title={
        <>
          Active
          <br />
          Custom
          <br />
          Text
        </>
      }
    >
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const customTexts = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.advanced.config.customTexts,
  );
  const customTextActive = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.basic.config.customTextActive,
  );
  const textNames = customTexts.map((text) => text.name);

  return (
    <PracticeSettingsBasicCardInputRadio
      name="customTextActive"
      noOptionsMessage="No available texts"
      options={textNames}
      value={customTextActive}
    />
  );
}
