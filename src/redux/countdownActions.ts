export const ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_START =
  'practice/roundCountdownStart';
export interface IActionPracticeRoundCountdownStart {
  type: typeof ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_START;
  payload: IActionPracticeRoundCountdownStartPayload;
}
export interface IActionPracticeRoundCountdownStartPayload {
  seconds: number;
}
export function _actionCreatorPracticeRoundCountdownStart(
  payload: IActionPracticeRoundCountdownStartPayload,
): IActionPracticeRoundCountdownStart {
  return {
    type: ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_START,
    payload,
  };
}

export const ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_SET_INTERVAL =
  'practice/roundCountdownSetInterval';
export interface IActionPracticeRoundCountdownSetInterval {
  type: typeof ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_SET_INTERVAL;
  payload: IActionPracticeRoundCountdownSetIntervalPayload;
}
export interface IActionPracticeRoundCountdownSetIntervalPayload {
  interval: NodeJS.Timeout | null;
}
export function _actionCreatorPracticeRoundCountdownSetInterval(
  payload: IActionPracticeRoundCountdownSetIntervalPayload,
): IActionPracticeRoundCountdownSetInterval {
  return {
    type: ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_SET_INTERVAL,
    payload,
  };
}

export const ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_TICK =
  'practice/roundCountdownTick';
export interface IActionPracticeRoundCountdownTick {
  type: typeof ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_TICK;
}
export function _actionCreatorPracticeRoundCountdownTick(): IActionPracticeRoundCountdownTick {
  return {
    type: ACTION_TYPE_PRACTICE_ROUND_COUNTDOWN_TICK,
  };
}
