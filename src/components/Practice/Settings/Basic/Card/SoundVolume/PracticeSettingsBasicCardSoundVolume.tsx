import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
import { PRACTICE_SETTINGS_SOUND_VOLUME_LIMITS } from '../../../../../../utility/constants';
import PracticeSettingsBasicCardInputNumber from '../Input/Number/PracticeSettingsBasicCardInputNumber';
import PracticeSettingsBasicCard from '../PracticeSettingsBasicCard';

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
    (state) => state.practice.settings.current.soundVolume,
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
