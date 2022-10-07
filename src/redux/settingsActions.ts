import type { AnyAction, EmptyObject } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import storage from '../local-storage';
import createDeepCopy from '../utility/functions/createDeepCopy';
import type {
  IPracticeConfig,
  IPracticeSettings,
  PracticeSettingName,
} from '../utility/types/practice';
import type { RootState } from './store';
import type { IStatePractice } from './types';

export interface IActionPracticeSettingsCurrentConfigUpdatePayload {
  name: PracticeSettingName;
  value: any;
}
export function actionCreatorPracticeSettingsCurrentConfigUpdate(
  payload: IActionPracticeSettingsCurrentConfigUpdatePayload,
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch, getState) {
    const { name, value } = payload;
    const state = getState();

    const settings = createDeepCopy(
      state.practice.settings,
    ) as IPracticeSettings;

    // To avoid writing an obscene amount of code, we simply trust that the
    // client gave the correct type for `value`.
    // @ts-expect-error
    settings.current[name] = value;

    dispatch(_actionCreatorPracticeSettingsReplace({ settings }));

    updateSettings(dispatch, settings);
  };
}

export interface IActionPracticeSettingsCurrentConfigPinnedUpdatePayload {
  action: 'pin' | 'unpin';
  name: PracticeSettingName;
}
export function actionCreatorPracticeSettingsCurrentConfigPinnedUpdate(
  payload: IActionPracticeSettingsCurrentConfigPinnedUpdatePayload,
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch, getState) {
    const { action, name } = payload;

    if (action == 'pin') {
      dispatch(_actionCreatorPracticeSettingsPin({ name }));
    } else {
      dispatch(_actionCreatorPracticeSettingsUnpin({ name }));
    }

    const state = getState();

    updateSettings(dispatch, state.practice.settings);
  };
}

export interface IActionPracticeSettingsProfileLoadPayload {
  profileName: string;
}
export function actionCreatorPracticeSettingsProfileLoad(
  payload: IActionPracticeSettingsProfileLoadPayload,
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch, getState) {
    const state = getState();

    const profile = state.practice.settings.profiles.find(
      (profile) => profile.name === payload.profileName,
    );

    if (profile === undefined) {
      console.warn('Unable to load profile: failed to find profile');
      return;
    }

    const updatedSettings = createDeepCopy(
      state.practice.settings,
    ) as IPracticeSettings;

    updatedSettings.current = createDeepCopy(profile.config) as IPracticeConfig;

    updateSettings(dispatch, updatedSettings);
  };
}

export interface IActionPracticeSettingsProfileSavePayload {
  profileName: string;
}
export function actionCreatorPracticeSettingsProfileSave(
  payload: IActionPracticeSettingsProfileSavePayload,
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch, getState) {
    const state = getState();

    const profileIndex = state.practice.settings.profiles.findIndex(
      (profile) => profile.name === payload.profileName,
    );

    if (profileIndex === -1) {
      console.warn('Unable to save profile: failed to find profile');
      return;
    }

    const updatedSettings = createDeepCopy(
      state.practice.settings,
    ) as IPracticeSettings;

    // Not sure if the deep copy is needed here, but let's be safe
    updatedSettings.profiles[profileIndex].config = createDeepCopy(
      updatedSettings.current,
    );

    updateSettings(dispatch, updatedSettings);
  };
}

type AnyDispatcher = ThunkDispatch<
  EmptyObject & {
    practice: IStatePractice;
  },
  unknown,
  AnyAction
>;

async function updateSettings(
  dispatch: AnyDispatcher,
  settings: IPracticeSettings,
) {
  dispatch(_actionCreatorPracticeSettingsReplace({ settings }));
  storage.setPracticeSettings(settings);
}

export interface IActionPracticeSettingsReplacePayload {
  settings: IPracticeSettings;
}
export function actionCreatorPracticeSettingsReplace(
  payload: IActionPracticeSettingsReplacePayload,
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch) {
    updateSettings(dispatch, payload.settings);
  };
}

export const ACTION_TYPE_PRACTICE_SETTINGS_REPLACE = 'practice/settingsReplace';
export interface IActionPracticeSettingsReplace {
  type: typeof ACTION_TYPE_PRACTICE_SETTINGS_REPLACE;
  payload: IActionPracticeSettingsReplacePayload;
}
export function _actionCreatorPracticeSettingsReplace(
  payload: IActionPracticeSettingsReplacePayload,
): IActionPracticeSettingsReplace {
  return {
    type: ACTION_TYPE_PRACTICE_SETTINGS_REPLACE,
    payload,
  };
}

export const ACTION_TYPE_PRACTICE_SETTINGS_PIN = 'practice/settingsPin';
export interface IActionPracticeSettingsPin {
  type: typeof ACTION_TYPE_PRACTICE_SETTINGS_PIN;
  payload: IActionPracticeSettingsPinPayload;
}
export interface IActionPracticeSettingsPinPayload {
  name: PracticeSettingName;
}
export function _actionCreatorPracticeSettingsPin(
  payload: IActionPracticeSettingsPinPayload,
): IActionPracticeSettingsPin {
  return {
    type: ACTION_TYPE_PRACTICE_SETTINGS_PIN,
    payload,
  };
}

export const ACTION_TYPE_PRACTICE_SETTINGS_UNPIN = 'practice/settingsUnpin';
export interface IActionPracticeSettingsUnpin {
  type: typeof ACTION_TYPE_PRACTICE_SETTINGS_UNPIN;
  payload: IActionPracticeSettingsUnpinPayload;
}
export interface IActionPracticeSettingsUnpinPayload {
  name: PracticeSettingName;
}
export function _actionCreatorPracticeSettingsUnpin(
  payload: IActionPracticeSettingsUnpinPayload,
): IActionPracticeSettingsUnpin {
  return {
    type: ACTION_TYPE_PRACTICE_SETTINGS_UNPIN,
    payload,
  };
}
