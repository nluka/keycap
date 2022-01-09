import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
import PracticeSettingsBasicCardInputRadio from '../Input/Radio/PracticeSettingsBasicCardInputRadio';
import PracticeSettingsBasicCard from '../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardCaretStyle() {
  return (
    <PracticeSettingsBasicCard name="caretStyle" title="Caret Style">
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const caretStyle = useAppSelector(
    (state) => state.practice.settings.currentConfig.basic.config.caretStyle,
  );

  return (
    <div className="d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <PracticeSettingsBasicCardInputRadio
        name="caretStyle"
        options={['bar', 'block', 'underline', 'outline']}
        value={caretStyle}
      />
    </div>
  );
}
