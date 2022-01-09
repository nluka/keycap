import type {
  IPracticeRoundResult,
  IPracticeSettings,
  Time,
} from 'keycap-foundation';
import type IRoundText from '../../core/types/IRoundText';

export default interface IStatePractice {
  playArea: IStatePracticePlayArea;
  roundResult: IPracticeRoundResult | null;
  settings: IPracticeSettings;
}

export interface IStatePracticePlayArea {
  roundStatus: PracticeStatus;
  countdown: {
    interval: NodeJS.Timer | null;
    secondsRemaining: number | null;
  };
  roundStartTime: Time | null;
  roundEndTime: Time | null;
  roundStopCode: PracticeRoundStopCode | null;
  roundText: IRoundText | null;
  roundTextGenerationError: string | null;
  input: string;
}

export enum PracticeStatus {
  idle,
  generatingText,
  countingDown,
  running,
}

export enum PracticeRoundStopCode {
  completed,
  aborted,
}
