import {
  DEFAULT_PRACTICE_SETTINGS,
  IPracticeSettings,
} from 'keycap-foundation';
import parseBool from './utility/functions/parseBool';

const localStorageItems = {
  token: 'token',
  username: 'username',
  isAlertDisabledPracticeNotSignedIn: 'isAlertDisabledPracticeNotSignedIn',
  isPanelCollapsedPracticeSettingsProfiles:
    'isPanelCollapsedPracticeSettingsProfiles',
  isPanelCollapsedPracticeSettingsBasic:
    'isPanelCollapsedPracticeSettingsBasic',
  isPanelCollapsedPracticeSettingsAdvanced:
    'isPanelCollapsedPracticeSettingsAdvanced',
  isPanelCollapsedPracticeSettingsDangerZone:
    'isPanelCollapsedPracticeSettingsDangerZone',
  practiceSettings: 'practiceSettings_3', // Increment trailing number when any properties change
  onlyShowPinnedPracticeSettingsBasic: 'onlyShowPinnedPracticeSettingsBasic',
  onlyShowPinnedPracticeSettingsAdvanced:
    'onlyShowPinnedPracticeSettingsAdvanced',
  isPanelCollapsedProfileDangerZone: 'isPanelCollapsedProfileDangerZone',
  isPanelCollapsedProfilePracticeResults:
    'isPanelCollapsedProfilePracticeResults',
};

export default localStorageItems;

export function localStorageCleanAndFix() {
  removeInvalidItems();
  fixPracticeSettings();
}

function removeInvalidItems() {
  for (let i = 0; i < localStorage.length; ++i) {
    const item = localStorage.key(i);
    if (item !== null && !isItemValid(item)) {
      localStorage.removeItem(item);
    }
  }
}

function isItemValid(item: string) {
  return Object.prototype.hasOwnProperty.call(localStorageItems, item);
}

function fixPracticeSettings() {
  if (localStorage.getItem(localStorageItems.practiceSettings) === null) {
    localStorage.setItem(
      localStorageItems.practiceSettings,
      JSON.stringify(DEFAULT_PRACTICE_SETTINGS),
    );
  }
}

export function localStorageSetSignInItems(token: string, username: string) {
  localStorage.setItem(localStorageItems.token, token);
  localStorage.setItem(localStorageItems.username, username);
}

export function localStorageRemoveSignInItems() {
  localStorage.removeItem(localStorageItems.token);
  localStorage.removeItem(localStorageItems.username);
}

export function localStorageSetPracticeSettings(settings: IPracticeSettings) {
  localStorage.setItem(
    localStorageItems.practiceSettings,
    JSON.stringify(settings),
  );
}

export function localStorageGetBool(key: string) {
  const stored = localStorage.getItem(key);
  return stored !== null ? parseBool(stored) : false;
}

export function localStorageSetBool(key: string, value: boolean) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function localStorageGetUsername() {
  const username = localStorage.getItem(localStorageItems.username);
  return username !== null ? username : 'Unknown User';
}
