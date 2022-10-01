import React from 'react';
import { useAppSelector } from '../../../../redux/hooks';
import store from '../../../../redux/store';
import { PracticeStatus } from '../../../../redux/types';
import './PracticePlayAreaAccuracyMeter.css';

export default function PracticePlayAreaAccuracyMeter() {
  const roundResult = useAppSelector((state) => state.practice.roundResult);
  const roundStatus = store.getState().practice.playArea.roundStatus;

  const isIdleAndAtLeastOneRoundHasBeenCompleted =
    roundStatus === PracticeStatus.idle && roundResult !== null;

  function getTitle() {
    if (roundResult !== null) {
      return `Accuracy: ${roundResult.accuracyPercentage.toFixed(1)}%`;
    }
    return undefined;
  }

  return (
    <div
      className="text-high px-2 py-1"
      data-visible={isIdleAndAtLeastOneRoundHasBeenCompleted}
      id="practiceAccuracyMeter"
      title={getTitle()}
    >
      {`${
        isIdleAndAtLeastOneRoundHasBeenCompleted
          ? roundResult?.accuracyPercentage.toFixed(0)
          : null
      }%`}
    </div>
  );
}
