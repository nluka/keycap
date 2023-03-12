import React from 'react';
import { useAppSelector } from '../../../../../../redux/hooks';
import { PRACTICE_SETTINGS_ENGLISH_QUOTE_LENGTH_RANGE_LIMITS } from '../../../../../../utility/constants';
import convertNumberRangeToQuoteLength from '../../../../../../utility/functions/convertNumberRangeToQuoteLength';
import convertQuoteLengthToNumberRange from '../../../../../../utility/functions/convertQuoteLengthToNumberRange';
import PracticeSettingsBasicCardInputNumberRange from '../Input/NumberRange/PracticeSettingsBasicCardInputNumberRange';
import PracticeSettingsBasicCard from '../PracticeSettingsBasicCard';

export default function PracticeSettingsBasicCardEnglishQuoteLengthRange() {
  return (
    <PracticeSettingsBasicCard
      name="englishQuoteLengthRange"
      title={
        <>
          English Quote
          <br />
          Length Range
        </>
      }
    >
      <Input />
    </PracticeSettingsBasicCard>
  );
}

function Input() {
  const quoteLength = useAppSelector(
    (state) => state.practice.settings.current.englishQuoteLengthRange,
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
        limits={PRACTICE_SETTINGS_ENGLISH_QUOTE_LENGTH_RANGE_LIMITS}
        name="englishQuoteLengthRange"
        step={1}
        value={convertQuoteLengthToNumberRange(quoteLength)}
      />
    </div>
  );
}
