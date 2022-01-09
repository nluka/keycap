import { PRACTICE_SETTINGS_MEDLEY_ITEM_COUNT_LIMITS } from 'keycap-foundation';
import React from 'react';
import { useAppSelector } from '../../../../../../../../redux/hooks';
import PracticeSettingsBasicCardInputNumber from '../../../Input/Number/PracticeSettingsBasicCardInputNumber';
import PracticeSettingsBasicCard from '../../../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardMedleyItemCount() {
  return (
    <PracticeSettingsBasicCard
      name="medleyItemCount"
      title={
        <>
          Medley
          <br />
          Item
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
  const medleyItemCount = useAppSelector(
    (state) =>
      state.practice.settings.currentConfig.basic.config.medleyItemCount,
  );

  return (
    <PracticeSettingsBasicCardInputNumber
      limits={PRACTICE_SETTINGS_MEDLEY_ITEM_COUNT_LIMITS}
      name="medleyItemCount"
      step={1}
      value={medleyItemCount}
    />
  );
}
