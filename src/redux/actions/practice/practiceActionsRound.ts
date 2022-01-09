import axios from 'axios';
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import roundTextCreate from '../../../core/roundTextCreate';
import type IRoundText from '../../../core/types/IRoundText';
import practiceContentGenerate from '../../../practice/practiceContentGenerate';
import playSound, { SoundName } from '../../../sound';
import type { RootState } from '../../store';
import store from '../../store';
import { PracticeStatus } from '../../types/IStatePractice';
import { actionCreatorUserSignOut } from '../userActions';
import {
  _actionCreatorPracticeRoundCountdownSetInterval,
  _actionCreatorPracticeRoundCountdownStart,
  _actionCreatorPracticeRoundCountdownTick,
} from './practiceActionsCountdown';

export function actionCreatorPracticeRoundInit(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function (dispatch, getState) {
    const settings = getState().practice.settings;

    dispatch(_actionCreatorPracticeTextGenerationStart());
    const content = await practiceContentGenerate(settings);
    if (
      store.getState().practice.playArea.roundStatus !==
      PracticeStatus.generatingText
    ) {
      // Round was aborted during text generation
      return;
    }
    if (content instanceof Error) {
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

    const basicConfig = settings.currentConfig.basic.config;

    if (basicConfig.countdownLength === 0) {
      dispatch(_actionCreatorPracticeRoundStart());
      return;
    }

    dispatch(
      _actionCreatorPracticeRoundCountdownStart({
        seconds: basicConfig.countdownLength,
      }),
    );

    tick();
    const interval = setInterval(tick, 1000);

    function tick() {
      const basicConfig =
        getState().practice.settings.currentConfig.basic.config;
      const secondsRemaining =
        getState().practice.playArea.countdown.secondsRemaining;

      if (secondsRemaining === 0) {
        dispatch(
          _actionCreatorPracticeRoundCountdownSetInterval({ interval: null }),
        );
        clearInterval(interval);
        playSound(SoundName.countdownBeepLong, basicConfig.soundVolume);
        dispatch(_actionCreatorPracticeRoundStart());
      } else {
        playSound(SoundName.countdownBeepShort, basicConfig.soundVolume);
      }
      dispatch(_actionCreatorPracticeRoundCountdownTick());
    }

    dispatch(
      _actionCreatorPracticeRoundCountdownSetInterval({ interval: interval }),
    );
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

    if (
      !state.user.isSignedIn ||
      state.user.token === null ||
      !state.practice.settings.currentConfig.basic.config
        .isResultRecordingEnabled
    ) {
      return;
    }

    try {
      const res = await axios.post(
        '/user/practice-stats/round-abortion',
        null,
        {
          headers: { token: state.user.token },
        },
      );
      console.log('Incremented rounds aborted', res);
    } catch (err: any) {
      console.error('Failed to increment rounds aborted', err.response);
      dispatch(actionCreatorUserSignOut());
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

    playSound(
      SoundName.roundCompletion,
      state.practice.settings.currentConfig.basic.config.soundVolume,
    );

    if (
      !state.user.isSignedIn ||
      state.user.token === null ||
      !state.practice.settings.currentConfig.basic.config
        .isResultRecordingEnabled
    ) {
      return;
    }

    console.log(state.practice.roundResult);
    try {
      const res = await axios.post(
        '/user/practice-stats/round-completion',
        {
          roundResult: state.practice.roundResult,
        },
        {
          headers: { token: state.user.token },
        },
      );
      console.log('Round completion recorded', res);
    } catch (err: any) {
      console.error('Failed to record round completion', err.response);
      dispatch(actionCreatorUserSignOut());
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
  'practice/textGenerationStart';
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
