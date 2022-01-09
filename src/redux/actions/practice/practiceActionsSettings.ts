import axios from 'axios';
import {
  createDeepCopy,
  IPracticeSettings,
  IPracticeSettingsConfig,
  PracticeSettingName,
  PracticeSettingNameAdvanced,
  PracticeSettingNameBasic,
} from 'keycap-foundation';
import type { AnyAction, EmptyObject } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import localStorageItems, {
  localStorageSetPracticeSettings,
} from '../../../local-storage';
import type { RootState } from '../../store';
import type IAlert from '../../types/IAlert';
import type IStatePractice from '../../types/IStatePractice';
import type IStateUser from '../../types/IStateUser';
import { addAlert } from '../alertActions';
import { actionCreatorUserSignOut } from '../userActions';

export interface IActionPracticeSettingsCurrentConfigUpdatePayload {
  category: 'basic' | 'advanced';
  name: PracticeSettingName;
  value: any;
}
export function actionCreatorPracticeSettingsCurrentConfigUpdate(
  payload: IActionPracticeSettingsCurrentConfigUpdatePayload,
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch, getState) {
    const { category, name, value } = payload;
    const state = getState();

    const updatedSettings = createDeepCopy(
      state.practice.settings,
    ) as IPracticeSettings;

    /*
      Ignoring the error to avoid having to write a large switch, this shifts
      the type-checking responsibility to the client.
    */
    // @ts-expect-error
    updatedSettings.currentConfig[category].config[name] = value;

    update(dispatch, updatedSettings, state.user.isSignedIn);
  };
}

export interface IActionPracticeSettingsCurrentConfigPinnedUpdatePayload {
  category: 'basic' | 'advanced';
  action: 'pin' | 'unpin';
  name: PracticeSettingName;
}
export function actionCreatorPracticeSettingsCurrentConfigPinnedUpdate(
  payload: IActionPracticeSettingsCurrentConfigPinnedUpdatePayload,
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch, getState) {
    const { category, action, name } = payload;
    let actionCreator: (payload: any) => any;

    switch (category) {
      case 'basic':
        actionCreator =
          action === 'pin'
            ? _actionCreatorPracticeSettingsCurrentConfigBasicPin
            : _actionCreatorPracticeSettingsCurrentConfigBasicUnpin;
        break;
      case 'advanced':
        actionCreator =
          action === 'pin'
            ? _actionCreatorPracticeSettingsCurrentConfigAdvancedPin
            : _actionCreatorPracticeSettingsCurrentConfigAdvancedUnpin;
        break;
      default:
        throw new Error(`unknown category '${category}'`);
    }

    dispatch(actionCreator({ name }));
    const state = getState();
    update(dispatch, state.practice.settings, state.user.isSignedIn);
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

    updatedSettings.currentConfig = createDeepCopy(
      profile?.config,
    ) as IPracticeSettingsConfig;

    update(dispatch, updatedSettings, state.user.isSignedIn);
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

    updatedSettings.profiles[profileIndex].config = createDeepCopy(
      updatedSettings.currentConfig,
    );

    update(dispatch, updatedSettings, state.user.isSignedIn);
  };
}

type AnyDispatcher = ThunkDispatch<
  EmptyObject & {
    user: IStateUser;
    practice: IStatePractice;
    alerts: IAlert[];
  },
  unknown,
  AnyAction
>;

async function update(
  dispatch: AnyDispatcher,
  settings: IPracticeSettings,
  isUserSignedIn: boolean,
) {
  dispatch(_actionCreatorPracticeSettingsReplace({ settings }));

  localStorageSetPracticeSettings(settings);

  if (!isUserSignedIn) {
    return;
  }

  try {
    const res = await axios.put(
      '/user/practice-settings',
      {
        practiceSettings: settings,
      },
      { headers: { token: localStorage.getItem(localStorageItems.token) } },
    );
    console.log('Updated practice settings', res);
  } catch (err: any) {
    console.log('Updating practice settings failed', err.response);
    addAlert(dispatch, 'practiceSettingUpdateFailed', ['practice']);
    dispatch(actionCreatorUserSignOut());
  }
}

export interface IActionPracticeSettingsReplacePayload {
  settings: IPracticeSettings;
}
export function actionCreatorPracticeSettingsReplace(
  payload: IActionPracticeSettingsReplacePayload,
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch, getState) {
    update(dispatch, payload.settings, getState().user.isSignedIn);
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

export const ACTION_TYPE_PRACTICE_SETTINGS_BASIC_PIN =
  'practice/settingsBasicPin';
export interface IActionPracticeSettingsBasicPin {
  type: typeof ACTION_TYPE_PRACTICE_SETTINGS_BASIC_PIN;
  payload: IActionPracticeSettingsBasicPinPayload;
}
export interface IActionPracticeSettingsBasicPinPayload {
  name: PracticeSettingNameBasic;
}
export function _actionCreatorPracticeSettingsCurrentConfigBasicPin(
  payload: IActionPracticeSettingsBasicPinPayload,
): IActionPracticeSettingsBasicPin {
  return {
    type: ACTION_TYPE_PRACTICE_SETTINGS_BASIC_PIN,
    payload,
  };
}

export const ACTION_TYPE_PRACTICE_SETTINGS_BASIC_UNPIN =
  'practice/settingsBasicUnpin';
export interface IActionPracticeSettingsBasicUnpin {
  type: typeof ACTION_TYPE_PRACTICE_SETTINGS_BASIC_UNPIN;
  payload: IActionPracticeSettingsBasicUnpinPayload;
}
export interface IActionPracticeSettingsBasicUnpinPayload {
  name: PracticeSettingNameBasic;
}
export function _actionCreatorPracticeSettingsCurrentConfigBasicUnpin(
  payload: IActionPracticeSettingsBasicUnpinPayload,
): IActionPracticeSettingsBasicUnpin {
  return {
    type: ACTION_TYPE_PRACTICE_SETTINGS_BASIC_UNPIN,
    payload,
  };
}

export const ACTION_TYPE_PRACTICE_SETTINGS_ADVANCED_PIN =
  'practice/settingsAdvancedPin';
export interface IActionPracticeSettingsAdvancedPin {
  type: typeof ACTION_TYPE_PRACTICE_SETTINGS_ADVANCED_PIN;
  payload: IActionPracticeSettingsAdvancedPinPayload;
}
export interface IActionPracticeSettingsAdvancedPinPayload {
  name: PracticeSettingNameAdvanced;
}
export function _actionCreatorPracticeSettingsCurrentConfigAdvancedPin(
  payload: IActionPracticeSettingsAdvancedPinPayload,
): IActionPracticeSettingsAdvancedPin {
  return {
    type: ACTION_TYPE_PRACTICE_SETTINGS_ADVANCED_PIN,
    payload,
  };
}

export const ACTION_TYPE_PRACTICE_SETTINGS_ADVANCED_UNPIN =
  'practice/settingsAdvancedUnpin';
export interface IActionPracticeSettingsAdvancedUnpin {
  type: typeof ACTION_TYPE_PRACTICE_SETTINGS_ADVANCED_UNPIN;
  payload: IActionPracticeSettingsAdvancedUnpinPayload;
}
export interface IActionPracticeSettingsAdvancedUnpinPayload {
  name: PracticeSettingNameAdvanced;
}
export function _actionCreatorPracticeSettingsCurrentConfigAdvancedUnpin(
  payload: IActionPracticeSettingsAdvancedUnpinPayload,
): IActionPracticeSettingsAdvancedUnpin {
  return {
    type: ACTION_TYPE_PRACTICE_SETTINGS_ADVANCED_UNPIN,
    payload,
  };
}
