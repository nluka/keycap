import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks';
import store from '../../../../redux/store';
import { PracticeStatus } from '../../../../redux/types/IStatePractice';
import getSecondsElapsed from '../../../../utility/functions/getSecondsElapsed';
import { getTimeElapsedText } from '../../../../utility/functions/getTimeElapsedText';
import { getTimeString } from './getTimeString';
import './PracticePlayAreaStopwatch.css';

const UPDATE_INTERVAL_MS = 100;

/**
 * Summary:
 * - Starts off hidden
 * - Hidden during round countdown
 * - Acts as a stopwatch while round is running
 * - If round is completed, displays elapsed time
 * - If round is aborted, gets hidden
 */
export default function PracticePlayAreaStopwatch() {
  const [time, setTime] = useState<string | null>(null);
  const roundStatus = useAppSelector(
    (state) => state.practice.playArea.roundStatus,
  );
  const interval = useRef<NodeJS.Timeout | null>(null);
  const practiceState = store.getState().practice;
  const roundStartTime = practiceState.playArea.roundStartTime;
  const roundResult = practiceState.roundResult;

  useEffect(() => {
    if (roundStatus === PracticeStatus.running) {
      setTime(getTimeString(0));
      interval.current = setInterval(update, UPDATE_INTERVAL_MS);
      return;
    }

    clearInterval(interval.current as NodeJS.Timeout);

    setTime(
      roundResult === null
        ? null
        : getTimeString(roundResult.timeElapsed / 1000),
    );
  }, [roundStatus]);

  // Cleanup
  useEffect(() => () => clearTimeout(interval.current as NodeJS.Timeout), []);

  function update() {
    const timeString = getTimeString(
      getSecondsElapsed(roundStartTime as number, Date.now()),
    );
    setTime(timeString);
  }

  function getTitle() {
    if (roundStatus !== PracticeStatus.running && roundResult === null) {
      return undefined;
    }
    if (roundResult !== null) {
      return `Time elapsed: ${getTimeElapsedText(roundResult.timeElapsed)}`;
    }
    return 'Time elapsed';
  }

  return (
    <div
      className="text-high px-2 py-1 rounded"
      data-active={
        roundStatus === PracticeStatus.running || roundResult !== null
      }
      id="practiceStopwatch"
      title={getTitle()}
    >
      {time || '-:--'}
    </div>
  );
}
