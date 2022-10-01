import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
import { PRACTICE_SETTINGS_QUOTE_LENGTH_LIMITS } from '../../../../../../utility/constants';
import convertNumberRangeToQuoteLength from '../../../../../../utility/functions/convertNumberRangeToQuoteLength';
import convertQuoteLengthToNumberRange from '../../../../../../utility/functions/convertQuoteLengthToNumberRange';
import PracticeSettingsBasicCardInputNumberRange from '../Input/NumberRange/PracticeSettingsBasicCardInputNumberRange';
import PracticeSettingsBasicCard from '../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardQuoteLength() {
  return (
    <PracticeSettingsBasicCard name="quoteLength" title="Quote Length">
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const quoteLength = useAppSelector(
    (state) => state.practice.settings.current.quoteLength,
  );

  return (
    <div
      className="d-grid gap-2"
      style={{
        gridTemplateColumns: 'minmax(auto, 35px) minmax(auto, 80px)',
      }}
    >
      <PracticeSettingsBasicCardInputNumberRange
        converter={convertNumberRangeToQuoteLength}
        limits={PRACTICE_SETTINGS_QUOTE_LENGTH_LIMITS}
        name="quoteLength"
        step={1}
        value={convertQuoteLengthToNumberRange(quoteLength)}
      />
    </div>
  );
}
