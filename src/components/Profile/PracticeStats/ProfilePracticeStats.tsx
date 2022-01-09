import axios from 'axios';
import type { IPracticeRoundResult } from 'keycap-foundation';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import localStorageItems from '../../../local-storage';
import { actionCreatorUserSignOut } from '../../../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import store from '../../../redux/store';
import calcAverage from '../../../utility/functions/calcAverage';
import displayAlert from '../../../utility/functions/displayAlert';
import { getTimeElapsedText } from '../../../utility/functions/getTimeElapsedText';
import BootstrapButton from '../../Bootstrap/Button/BootstrapButton';
import BootstrapTable from '../../Bootstrap/Table/BootstrapTable';
import Panel from '../../Panel/Panel';
import './ProfilePracticeStats.css';

export default function ProfilePracticeStats() {
  return (
    <Panel
      classes="d-flex flex-column"
      collapseLocalStorageKey={
        localStorageItems.isPanelCollapsedProfilePracticeResults
      }
      contentGap={3}
      heading="Practice Results"
      id="profilePracticeResults"
    >
      <Content />
    </Panel>
  );
}

function Content() {
  const [practiceStats, setPracticeStats] = useState<IStats | null>(null);
  const [
    isAwaitingPracticeStatsResetRequest,
    setIsAwaitingPracticeStatsResetRequest,
  ] = useState(false);
  const user = useAppSelector((state) => state.user);
  const request = axios.CancelToken.source();
  const isLastTenRoundResultsPopulated =
    practiceStats !== null && practiceStats.lastTenRoundResults.length > 0;
  const dispatch = useAppDispatch();

  async function handleResetStats() {
    const choice = confirm(
      'Are you sure you want to reset your practice statistics?\nThis action is irreversible.',
    );
    if (!choice) {
      return;
    }

    setIsAwaitingPracticeStatsResetRequest(true);
    try {
      await axios.delete('/user/practice-stats', {
        headers: { token: store.getState().user.token },
      });
      setPracticeStats(null);
    } catch (err) {
      displayAlert(`Failed to reset practice statistics.\nReason: ${err}`);
    }
    setIsAwaitingPracticeStatsResetRequest(false);
  }

  async function fetchPracticeStats() {
    try {
      const res = await axios.get('/user/practice-stats', {
        headers: { token: user.token },
        cancelToken: request.token,
      });
      console.log('Retrieved practice stats', res);
      setPracticeStats(res.data);
    } catch (err) {
      console.error('Failed to fetch practice stats', err);
      dispatch(actionCreatorUserSignOut());
    }
  }

  if (!user.isSignedIn || user.token === null) {
    return <span className="text-danger">Error: not signed in</span>;
  }

  if (practiceStats === null) {
    fetchPracticeStats();
    return (
      <div className="d-flex align-items-center gap-2">
        <span className="text-norm">Fetching</span>
        <span
          className="text-norm spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
      </div>
    );
  }

  return (
    <>
      <BootstrapTable>
        <thead>
          <tr>
            <th scope="col">Round history</th>
            <th
              scope="col"
              title="Net words per minute"
              style={{ cursor: 'help' }}
            >
              Net WPM
            </th>
            <th scope="col">Accuracy %</th>
            <th scope="col">Time elapsed</th>
          </tr>
        </thead>
        <tbody>
          <tr className="highlighted">
            <th scope="row">Last 10 avg.</th>
            <td>
              {practiceStats.lastTenRoundResults.length === 0
                ? '···'
                : calcAverage(
                    practiceStats.lastTenRoundResults.map(
                      (result) => result.netWordsPerMinute,
                    ),
                  ).toFixed(1)}
            </td>
            <td>
              {practiceStats.lastTenRoundResults.length === 0
                ? '···'
                : calcAverage(
                    practiceStats.lastTenRoundResults.map(
                      (result) => result.accuracyPercentage,
                    ),
                  ).toFixed(1)}
            </td>
            <td>
              {practiceStats.lastTenRoundResults.length === 0
                ? '···'
                : getTimeElapsedText(
                    calcAverage(
                      practiceStats.lastTenRoundResults.map(
                        (result) => result.timeElapsed,
                      ),
                    ),
                  )}
            </td>
          </tr>
          <tr className="highlighted">
            <th scope="row">Overall avg.</th>
            <td>
              {practiceStats.averageRoundResult.netWordsPerMinute === 0
                ? '···'
                : practiceStats.averageRoundResult.netWordsPerMinute.toFixed(1)}
            </td>
            <td>
              {practiceStats.averageRoundResult.accuracyPercentage === 0
                ? '···'
                : practiceStats.averageRoundResult.accuracyPercentage.toFixed(
                    1,
                  )}
            </td>
            <td>
              {practiceStats.averageRoundResult.timeElapsed === 0
                ? '···'
                : getTimeElapsedText(
                    practiceStats.averageRoundResult.timeElapsed,
                  )}
            </td>
          </tr>
          {isLastTenRoundResultsPopulated && (
            <tr>
              <th scope="row">1 (most recent)</th>
              <td>
                {practiceStats.lastTenRoundResults[
                  practiceStats.lastTenRoundResults.length - 1
                ].netWordsPerMinute.toFixed(1)}
              </td>
              <td>
                {practiceStats.lastTenRoundResults[
                  practiceStats.lastTenRoundResults.length - 1
                ].accuracyPercentage.toFixed(1)}
              </td>
              <td>
                {getTimeElapsedText(
                  practiceStats.lastTenRoundResults[
                    practiceStats.lastTenRoundResults.length - 1
                  ].timeElapsed,
                )}
              </td>
            </tr>
          )}
          {isLastTenRoundResultsPopulated &&
            practiceStats.lastTenRoundResults
              .slice(0, practiceStats.lastTenRoundResults.length - 1)
              .reverse()
              .map((result, index) => (
                <tr key={v4()}>
                  <th scope="row">{index + 2}</th>
                  <td>{result.netWordsPerMinute.toFixed(1)}</td>
                  <td>{result.accuracyPercentage.toFixed(1)}</td>
                  <td>{getTimeElapsedText(result.timeElapsed)}</td>
                </tr>
              ))}
        </tbody>
      </BootstrapTable>

      <div className="d-flex flex-column gap-2">
        <div>{`Rounds completed: ${practiceStats.roundsCompletedCount}`}</div>
        <div>{`Rounds aborted: ${
          practiceStats.roundsAbortedCount
        } (${calcRoundAbortPercentage(
          practiceStats.roundsCompletedCount,
          practiceStats.roundsAbortedCount,
        )}%)`}</div>
      </div>

      <BootstrapButton
        classes="reset-practice-stats d-flex align-items-center gap-2"
        isOutline={true}
        onClick={handleResetStats}
        theme="warning"
      >
        {isAwaitingPracticeStatsResetRequest ? (
          <>
            <div className="d-flex align-items-center gap-2">
              <span>Working</span>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            </div>
          </>
        ) : (
          <>
            <i className="bi bi-arrow-counterclockwise"></i>
            <span>Reset Stats</span>
          </>
        )}
      </BootstrapButton>
    </>
  );
}

interface IStats {
  lastTenRoundResults: IPracticeRoundResult[];
  averageRoundResult: IPracticeRoundResult;
  roundsCompletedCount: number;
  roundsAbortedCount: number;
}

function calcRoundAbortPercentage(
  completedCount: number,
  abortedCount: number,
) {
  return Math.round(
    (abortedCount / (completedCount + abortedCount) || 0) * 100,
  );
}
