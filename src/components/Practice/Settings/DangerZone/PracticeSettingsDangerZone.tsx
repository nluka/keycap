import React from 'react';
import storage from '../../../../local-storage';
import { useAppDispatch } from '../../../../redux/hooks';
import { actionCreatorPracticeSettingsReplace } from '../../../../redux/settingsActions';
import store from '../../../../redux/store';
import { DEFAULT_PRACTICE_SETTINGS } from '../../../../utility/constants';
import createDeepCopy from '../../../../utility/functions/createDeepCopy';
import type { IPracticeSettings } from '../../../../utility/types/practice';
import BootstrapButton from '../../../Bootstrap/Button/BootstrapButton';
import Panel from '../../../Panel/Panel';

export default function PracticeSettingsDangerZone() {
  return (
    <Panel
      classes="practice-settings"
      collapseLocalStorageKey={
        storage.items.isPanelCollapsedPracticeSettingsDangerZone
      }
      heading="Danger Zone"
      id="practiceSettingsDangerZone"
    >
      <div className="d-flex flex-wrap gap-2">
        <UnpinAll />
        <RestoreDefaults />
      </div>
    </Panel>
  );
}

function UnpinAll() {
  const dispatch = useAppDispatch();

  return (
    <BootstrapButton
      classes="d-flex align-items-center gap-2"
      isOutline={true}
      onClick={() => {
        const answer = confirm(
          'Are you sure you want to unpin all settings?\nThis action is irreversible.',
        );
        if (answer) {
          const newSettings = createDeepCopy(
            store.getState().practice.settings,
          ) as IPracticeSettings;

          newSettings.pinned = [];

          dispatch(
            actionCreatorPracticeSettingsReplace({
              settings: newSettings,
            }),
          );
        }
      }}
      theme="warning"
    >
      <i className="bi bi-pin-angle"></i>
      <span>Unpin All Settings</span>
    </BootstrapButton>
  );
}

function RestoreDefaults() {
  const dispatch = useAppDispatch();

  return (
    <BootstrapButton
      classes="d-flex align-items-center gap-2"
      isOutline={true}
      onClick={() => {
        const choice = confirm(
          'Are you sure you want to reset all settings to their default value?\nThis action is irreversible.',
        );
        if (choice) {
          dispatch(
            actionCreatorPracticeSettingsReplace({
              settings: DEFAULT_PRACTICE_SETTINGS,
            }),
          );
        }
      }}
      theme="danger"
    >
      <i className="bi bi-arrow-counterclockwise"></i>
      <span>Restore Default Settings</span>
    </BootstrapButton>
  );
}
