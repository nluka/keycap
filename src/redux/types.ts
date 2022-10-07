import type { IRoundText } from '../core/types';
import type {
  IPracticeRoundResult,
  IPracticeSettings,
} from '../utility/types/practice';
import type Time from '../utility/types/Time';

export interface IStatePractice {
  playArea: IStatePracticePlayArea;
  roundResult: IPracticeRoundResult | null;
  settings: IPracticeSettings;
}

export interface IStateApp {
  practice: IStatePractice;
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
