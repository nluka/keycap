import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import roundTextCreate from '../core/roundTextCreate';
import type IRoundText from '../core/types/IRoundText';
import practiceContentGenerate from '../practice/practiceContentGenerate';
import { playSound, SoundName } from '../sound';
import type { RootState } from './store';
import store from './store';
import {
  _actionCreatorPracticeRoundCountdownSetInterval,
  _actionCreatorPracticeRoundCountdownStart,
  _actionCreatorPracticeRoundCountdownTick,
} from './countdownActions';
import { PracticeStatus } from './types';
import storage from '../local-storage';
import type { IPracticeRoundResult } from '../utility/types/practice';

export function actionCreatorPracticeRoundInit(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function (dispatch, getState) {
    const config = getState().practice.settings.current;

    dispatch(_actionCreatorPracticeTextGenerationStart());
    const content = await practiceContentGenerate(config);

    if (
      store.getState().practice.playArea.roundStatus !==
      PracticeStatus.generatingText
    ) {
      // Round was aborted while we were asynchronously generating the text
      return;
    }

    if (content instanceof Error) {
      // Something went wrong, we were unable to generate text
      dispatch(
        _actionCreatorPracticeRoundTextGenerationFailure({ error: content }),
      );
      return;
    }

    try {
      const text = roundTextCreate(content);
      dispatch(_actionCreatorPracticeRoundTextGenerationSuccess({ text }));
    } catch (err) {
      console.error('Failed to create text:', err);
      dispatch(
        _actionCreatorPracticeRoundTextGenerationFailure({
          error: new Error(
            'An unknown error occured. Please change your settings and try again.',
          ),
        }),
      );
      return;
    }

    if (config.countdownLength === 0) {
      // User has opted for no countdown, start round immediately
      dispatch(_actionCreatorPracticeRoundStart());
      return;
    }

    dispatch(
      _actionCreatorPracticeRoundCountdownStart({
        seconds: config.countdownLength,
      }),
    );

    tick(); // Always tick once
    const interval = setInterval(tick, 1000);

    function tick() {
      const config = getState().practice.settings.current;
      const secondsRemaining =
        getState().practice.playArea.countdown.secondsRemaining;

      if (secondsRemaining === 0) {
        // countdown is over
        if (interval !== null) {
          // if the countdown was > 1 second, clear the interval we set
          clearInterval(interval);
        }
        dispatch(
          _actionCreatorPracticeRoundCountdownSetInterval({ interval: null }),
        );
        // dispatch(_actionCreatorPracticeRoundCountdownTick());
        dispatch(_actionCreatorPracticeRoundStart());
        playSound(SoundName.countdownBeepLong, config.soundVolume);
      } else {
        // tick down again
        dispatch(_actionCreatorPracticeRoundCountdownTick());
        playSound(SoundName.countdownBeepShort, config.soundVolume);
      }
    }
  };
}

export const ACTION_TYPE_PRACTICE_ROUND_START = 'practice/roundStart';
export interface IActionPracticeRoundStart {
  type: typeof ACTION_TYPE_PRACTICE_ROUND_START;
}
export function _actionCreatorPracticeRoundStart(): IActionPracticeRoundStart {
  return {
    type: ACTION_TYPE_PRACTICE_ROUND_START,
  };
}

export function actionCreatorPracticeRoundAbort(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function (dispatch, getState) {
    const state = getState();

    const countdownInterval = state.practice.playArea.countdown.interval;
    if (countdownInterval !== null) {
      clearInterval(countdownInterval);
    }

    dispatch(_actionCreatorPracticeRoundAbort());

    if (state.practice.settings.current.isResultRecordingEnabled) {
      storage.addAbortedRound();
    }
  };
}

export const ACTION_TYPE_PRACTICE_ROUND_ABORT = 'practice/roundAbort';
export interface IActionPracticeRoundAbort {
  type: typeof ACTION_TYPE_PRACTICE_ROUND_ABORT;
}
export function _actionCreatorPracticeRoundAbort(): IActionPracticeRoundAbort {
  return {
    type: ACTION_TYPE_PRACTICE_ROUND_ABORT,
  };
}

export const ACTION_TYPE_PRACTICE_ROUND_UPDATE = 'practice/roundUpdate';
export interface IActionPracticeRoundUpdate {
  type: typeof ACTION_TYPE_PRACTICE_ROUND_UPDATE;
  payload: IActionPracticeRoundUpdatePayload;
}
export interface IActionPracticeRoundUpdatePayload {
  input: string;
}
export function actionCreatorPracticeRoundUpdate(
  payload: IActionPracticeRoundUpdatePayload,
): IActionPracticeRoundUpdate {
  return {
    type: ACTION_TYPE_PRACTICE_ROUND_UPDATE,
    payload,
  };
}

export function actionCreatorPracticeRoundEnd(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function (dispatch, getState) {
    dispatch(_actionCreatorPracticeRoundEnd());

    const state = getState();

    if (state.practice.settings.current.isResultRecordingEnabled) {
      storage.addCompletedRound(
        state.practice.roundResult as IPracticeRoundResult,
      );
    }
  };
}

export const ACTION_TYPE_PRACTICE_ROUND_END = 'practice/roundEnd';
export interface IActionPracticeRoundEnd {
  type: typeof ACTION_TYPE_PRACTICE_ROUND_END;
}
export function _actionCreatorPracticeRoundEnd(): IActionPracticeRoundEnd {
  return {
    type: ACTION_TYPE_PRACTICE_ROUND_END,
  };
}

export const ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_START =
  'practice/roundTextGenerationStart';
export interface IActionPracticeRoundTextGenerationStart {
  type: typeof ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_START;
}
export function _actionCreatorPracticeTextGenerationStart(): IActionPracticeRoundTextGenerationStart {
  return {
    type: ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_START,
  };
}

export const ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_SUCCESS =
  'practice/roundTextGenerationSuccess';
export interface IActionPracticeRoundTextGenerationSuccess {
  type: typeof ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_SUCCESS;
  payload: IActionPracticeRoundTextGenerationSuccessPayload;
}
export interface IActionPracticeRoundTextGenerationSuccessPayload {
  text: IRoundText;
}
export function _actionCreatorPracticeRoundTextGenerationSuccess(
  payload: IActionPracticeRoundTextGenerationSuccessPayload,
): IActionPracticeRoundTextGenerationSuccess {
  return {
    type: ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_SUCCESS,
    payload,
  };
}

export const ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_FAILURE =
  'practice/roundTextGenerationFailure';
export interface IActionPracticeRoundTextGenerationFailure {
  type: typeof ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_FAILURE;
  payload: IActionPracticeRoundTextGenerationFailurePayload;
}
export interface IActionPracticeRoundTextGenerationFailurePayload {
  error: Error;
}
export function _actionCreatorPracticeRoundTextGenerationFailure(
  payload: IActionPracticeRoundTextGenerationFailurePayload,
): IActionPracticeRoundTextGenerationFailure {
  return {
    type: ACTION_TYPE_PRACTICE_ROUND_TEXT_GENERATION_FAILURE,
    payload,
  };
}
