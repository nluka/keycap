import type { IPracticeRoundResult } from './practice';

export default interface IStats {
  lastTenRoundResults: IPracticeRoundResult[];
  averageRoundResult: IPracticeRoundResult;
  roundsCompletedCount: number;
  roundsAbortedCount: number;
}
