import React, { useState } from 'react';
import { v4 } from 'uuid';
import storage from '../../../local-storage';
import { DEFAULT_PRACTICE_STATS } from '../../../utility/constants';
import average from '../../../utility/functions/average';
import { getTimeElapsedText } from '../../../utility/functions/getTimeElapsedText';
import type IPracticeStats from '../../../utility/types/practice';
import BootstrapButton from '../../Bootstrap/Button/BootstrapButton';
import BootstrapTable from '../../Bootstrap/Table/BootstrapTable';
import Panel from '../../Panel/Panel';
import './ProfilePracticeStats.css';

export default function ProfilePracticeStats() {
  return (
    <Panel
      classes="d-flex flex-column"
      collapseLocalStorageKey={
        storage.items.isPanelCollapsedProfilePracticeResults
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
  const [stats, setStats] = useState<IPracticeStats>(storage.getStats());
  const isLastTenRoundResultsPopulated =
    stats !== null && stats.lastTenRoundResults.length > 0;

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
              {stats.lastTenRoundResults.length === 0
                ? '···'
                : average(
                    stats.lastTenRoundResults.map(
                      (result) => result.netWordsPerMinute,
                    ),
                  ).toFixed(1)}
            </td>
            <td>
              {stats.lastTenRoundResults.length === 0
                ? '···'
                : average(
                    stats.lastTenRoundResults.map(
                      (result) => result.accuracyPercentage,
                    ),
                  ).toFixed(1)}
            </td>
            <td>
              {stats.lastTenRoundResults.length === 0
                ? '···'
                : getTimeElapsedText(
                    average(
                      stats.lastTenRoundResults.map(
                        (result) => result.timeElapsed,
                      ),
                    ),
                  )}
            </td>
          </tr>
          <tr className="highlighted">
            <th scope="row">Overall avg.</th>
            <td>
              {stats.averageRoundResult.netWordsPerMinute === 0
                ? '···'
                : stats.averageRoundResult.netWordsPerMinute.toFixed(1)}
            </td>
            <td>
              {stats.averageRoundResult.accuracyPercentage === 0
                ? '···'
                : stats.averageRoundResult.accuracyPercentage.toFixed(1)}
            </td>
            <td>
              {stats.averageRoundResult.timeElapsed === 0
                ? '···'
                : getTimeElapsedText(stats.averageRoundResult.timeElapsed)}
            </td>
          </tr>
          {isLastTenRoundResultsPopulated && (
            <tr>
              <th scope="row">1 (most recent)</th>
              <td>
                {stats.lastTenRoundResults[
                  stats.lastTenRoundResults.length - 1
                ].netWordsPerMinute.toFixed(1)}
              </td>
              <td>
                {stats.lastTenRoundResults[
                  stats.lastTenRoundResults.length - 1
                ].accuracyPercentage.toFixed(1)}
              </td>
              <td>
                {getTimeElapsedText(
                  stats.lastTenRoundResults[
                    stats.lastTenRoundResults.length - 1
                  ].timeElapsed,
                )}
              </td>
            </tr>
          )}
          {isLastTenRoundResultsPopulated &&
            stats.lastTenRoundResults
              .slice(0, stats.lastTenRoundResults.length - 1)
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
        <div>{`Rounds completed: ${stats.roundsCompletedCount}`}</div>
        <div>{`Rounds aborted: ${
          stats.roundsAbortedCount
        } (${calcRoundAbortPercentage(
          stats.roundsCompletedCount,
          stats.roundsAbortedCount,
        )}%)`}</div>
      </div>

      <BootstrapButton
        classes="reset-practice-stats d-flex align-items-center gap-2"
        isOutline={true}
        onClick={() => {
          const choice = confirm(
            'Are you sure you want to reset your practice statistics?\nThis action is irreversible.',
          );
          if (!choice) {
            return;
          }

          storage.resetStats();
          setStats(DEFAULT_PRACTICE_STATS);
        }}
        theme="warning"
      >
        <i className="bi bi-arrow-counterclockwise"></i>
        <span>Reset Stats</span>
      </BootstrapButton>
    </>
  );
}

function calcRoundAbortPercentage(
  completedCount: number,
  abortedCount: number,
) {
  return Math.round(
    (abortedCount / (completedCount + abortedCount) || 0) * 100,
  );
}
