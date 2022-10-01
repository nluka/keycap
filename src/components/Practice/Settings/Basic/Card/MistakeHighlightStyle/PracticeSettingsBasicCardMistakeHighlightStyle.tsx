import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
import PracticeSettingsBasicCardInputRadio from '../Input/Radio/PracticeSettingsBasicCardInputRadio';
import PracticeSettingsBasicCard from '../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardMistakeHighlightStyle() {
  return (
    <PracticeSettingsBasicCard
      name="mistakeHighlightStyle"
      title={
        <>
          Mistake
          <br />
          Highlight
          <br />
          Style
        </>
      }
    >
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const mistakeHighlightStyle = useAppSelector(
    (state) => state.practice.settings.current.mistakeHighlightStyle,
  );

  return (
    <PracticeSettingsBasicCardInputRadio
      name="mistakeHighlightStyle"
      options={['text', 'background']}
      value={mistakeHighlightStyle}
    />
  );
}
