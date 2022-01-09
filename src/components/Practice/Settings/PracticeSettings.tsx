import axios from 'axios';
import type { IPracticeSettings } from 'keycap-foundation';
import React, { useEffect } from 'react';
import type { Dispatch } from 'redux';
import {
  addAlert,
  doesAlertExist,
  removeAlert,
} from '../../../redux/actions/alertActions';
import { _actionCreatorPracticeSettingsReplace } from '../../../redux/actions/practice/practiceActionsSettings';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import store from '../../../redux/store';
import PracticeSettingsAdvanced from './Advanced/PracticeSettingsAdvanced';
import PracticeSettingsBasic from './Basic/PracticeSettingsBasic';
import PracticeSettingsDangerZone from './DangerZone/PracticeSettingsDangerZone';
import './PracticeSettings.css';
import PracticeSettingsProfiles from './Profiles/PracticeSettingsProfiles';

export default function PracticeSettingsArea() {
  const user = useAppSelector((state) => state.user);
  const isUserSignedIn = user.isSignedIn && user.token !== null;
  const request = axios.CancelToken.source();
  const dispatch = useAppDispatch();

  useEffect(() => {
    removePracticeSettingsRetrievalFailureAlertIfPresent(dispatch);

    if (!isUserSignedIn) {
      return;
    }

    try {
      (async function fetchAndApplySettings() {
        const res = await axios.get('/user/practice-settings', {
          headers: { token: user.token },
          cancelToken: request.token,
        });
        console.log('Retrieved practice settings', res);
        const settings: IPracticeSettings = res.data.settings;
        dispatch(
          _actionCreatorPracticeSettingsReplace({
            settings,
          }),
        );
      })();
    } catch (err) {
      addPracticeSettingsRetrievalFailureAlertIfNotPresent(dispatch);
    }
  }, [user]);

  // Cleanup
  useEffect(() => () => request.cancel(), []);

  return (
    <div className="d-flex flex-column gap-3 px-0 py-2">
      <h2 className="text-norm m-0" style={{ userSelect: 'none' }}>
        Settings
      </h2>
      <PracticeSettingsProfiles />
      <PracticeSettingsBasic />
      <PracticeSettingsAdvanced />
      <PracticeSettingsDangerZone />
    </div>
  );
}

function removePracticeSettingsRetrievalFailureAlertIfPresent(
  dispatch: Dispatch,
) {
  if (
    doesAlertExist('practiceSettingsRetrievalFailure', store.getState().alerts)
  ) {
    removeAlert(dispatch, 'practiceSettingsRetrievalFailure');
  }
}

function addPracticeSettingsRetrievalFailureAlertIfNotPresent(
  dispatch: Dispatch,
) {
  if (
    doesAlertExist('practiceSettingsRetrievalFailure', store.getState().alerts)
  ) {
    addAlert(dispatch, 'practiceSettingsRetrievalFailure', ['practice']);
  }
}
