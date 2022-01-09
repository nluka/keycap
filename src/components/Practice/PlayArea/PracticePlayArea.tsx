import React, { useState } from 'react';
import type IRoundTextItemCharMistake from '../../../core/types/IRoundTextItemCharMistake';
import PracticePlayAreaAccuracyMeter from './AccuracyMeter/PracticePlayAreaAccuracyMeter';
import PracticePlayAreaActionButton from './ActionButton/PracticePlayAreaActionButton';
import PracticePlayAreaCountdownTimer from './CountdownTimer/PracticePlayAreaCountdownTimer';
import PracticePlayAreaInput from './Input/PracticePlayAreaInput';
import PracticePlayAreaMistakeAnalysis from './MistakeAnalysis/PracticePlayAreaMistakeAnalysis';
import PracticePlayAreaStopwatch from './Stopwatch/PracticePlayAreaStopwatch';
import PracticePlayAreaText from './Text/PracticePlayAreaText';
import PracticePlayAreaWpmCounter from './WpmCounter/PracticePlayAreaWpmCounter';

export interface ISelectedChar {
  actual: string;
  mistakes: IRoundTextItemCharMistake[];
  position: number;
}

export default function PracticePlayArea() {
  const [selectedChar, setSelectedChar] = useState<ISelectedChar | null>(null);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between gap-2">
        <div className="d-flex align-items-center gap-2">
          <PracticePlayAreaCountdownTimer />
          <PracticePlayAreaStopwatch />
          <PracticePlayAreaWpmCounter />
          <PracticePlayAreaAccuracyMeter />
        </div>
      </div>
      <PracticePlayAreaText
        selectedChar={selectedChar}
        setSelectedChar={setSelectedChar}
      />
      <div className="d-flex gap-2">
        <PracticePlayAreaInput />
        <PracticePlayAreaActionButton />
      </div>
      <PracticePlayAreaMistakeAnalysis selectedChar={selectedChar} />
    </>
  );
}
