import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
import { PRACTICE_SETTINGS_RUSSIAN_QUOTE_SENTENCES_LIMITS } from '../../../../../../utility/constants';
import PracticeSettingsBasicCardInputNumber from '../Input/Number/PracticeSettingsBasicCardInputNumber';
import PracticeSettingsBasicCard from '../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardRussianQuoteSentences() {
  return (
    <PracticeSettingsBasicCard
      name="russianQuoteSentences"
      title={
        <>
          Russian
          <br />
          Quote
          <br />
          Sentences
        </>
      }
    >
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const sentences = useAppSelector(
    (state) => state.practice.settings.current.russianQuoteSentences,
  );

  return (
    <div className="d-grid gap-2">
      <PracticeSettingsBasicCardInputNumber
        limits={PRACTICE_SETTINGS_RUSSIAN_QUOTE_SENTENCES_LIMITS}
        name="russianQuoteSentences"
        step={1}
        value={sentences}
      />
    </div>
  );
}
