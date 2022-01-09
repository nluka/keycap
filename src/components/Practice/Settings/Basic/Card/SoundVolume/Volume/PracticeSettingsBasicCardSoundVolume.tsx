import { PRACTICE_SETTINGS_SOUND_VOLUME_LIMITS } from 'keycap-foundation';
import React from 'react';
import { useAppSelector } from '../../../../../../../redux/hooks';
import PracticeSettingsBasicCardInputNumber from '../../Input/Number/PracticeSettingsBasicCardInputNumber';
import PracticeSettingsBasicCard from '../../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardSoundVolume() {
  return (
    <PracticeSettingsBasicCard
      name="soundVolume"
      title={
        <>
          Sound
          <br />
          Volume
        </>
      }
    >
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const soundVolume = useAppSelector(
    (state) => state.practice.settings.currentConfig.basic.config.soundVolume,
  );

  return (
    <PracticeSettingsBasicCardInputNumber
      limits={PRACTICE_SETTINGS_SOUND_VOLUME_LIMITS}
      name="soundVolume"
      step={0.01}
      value={soundVolume}
    />
  );
}
