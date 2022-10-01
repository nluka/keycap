import React from 'react';
import { useAppSelector } from '../../../../redux/hooks';
import store from '../../../../redux/store';
import { PracticeStatus } from '../../../../redux/types';
import './PracticePlayAreaCountdownTimer.css';

export default function PracticePlayAreaCountdownTimer() {
  const secondsRemaining = useAppSelector(
    (state) => state.practice.playArea.countdown.secondsRemaining,
  );
  const roundStatus = store.getState().practice.playArea.roundStatus;

  function getTextColorClass() {
    if (secondsRemaining === null) {
      return 'text-warning';
    }
    return `text-${secondsRemaining > 0 ? 'warning' : 'danger'}`;
  }

  return (
    <div
      id="practiceCountdownTimer"
      className={`text-high ${getTextColorClass()} px-2 py-1`}
      data-visible={
        roundStatus === PracticeStatus.countingDown && secondsRemaining !== null
      }
    >
      {secondsRemaining === null ? '···' : secondsRemaining + 1}
    </div>
  );
}
