import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import localStorageItems, { localStorageGetBool } from '../../local-storage';
import { addAlert, removeAlert } from '../../redux/actions/alertActions';
import { actionCreatorUserSignOut } from '../../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type AlertId from '../../redux/types/AlertId';
import type IAlert from '../../redux/types/IAlert';
import type Page from '../../redux/types/Page';
import './Alerts.css';
import AlertPracticeNotSignedIn from './PracticeNotSignedIn/AlertPracticeNotSignedIn';
import AlertPracticeSettingsRetrievalFailed from './PracticeSettingsRetrievalFailed/AlertPracticeSettingsRetrievalFailed';
import AlertPracticeSettingUpdateFailed from './PracticeSettingUpdateFailed/AlertPracticeSettingUpdateFailed';
import AlertUserSignedOut from './TokenValidationFailed/AlertTokenValidationFailed';
import AlertValidatingToken from './ValidatingToken/AlertValidatingToken';

export default function Alerts() {
  const user = useAppSelector((state) => state.user);
  const alerts = useAppSelector((state) => state.alerts);
  const location = useLocation();
  const isTokenCurrentlyBeingValidated = useRef(false);
  const isUserSignedIn = user.isSignedIn && user.token !== null;
  const request = axios.CancelToken.source();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isUserSignedIn || isTokenCurrentlyBeingValidated.current) {
      return;
    }

    (async function validateToken() {
      isTokenCurrentlyBeingValidated.current = true;
      // addAlert(dispatch, 'validatingToken', PAGES_ALL);
      try {
        // const startTime = Date.now();
        const res = await axios.post('/user/check-token', null, {
          headers: {
            token: user.token,
          },
          cancelToken: request.token,
        });
        console.log('Validated token', res);
        // const endTime = Date.now();
        // const secondsElapsed = getSecondsElapsed(startTime, endTime);
        // if (secondsElapsed < 1.0) {
        //   await sleep(1000 - secondsElapsed * 1000);
        // }
      } catch (err) {
        dispatch(actionCreatorUserSignOut());
      } finally {
        isTokenCurrentlyBeingValidated.current = false;
        // removeAlert(dispatch, 'validatingToken');
      }
    })();
  }, [location, isTokenCurrentlyBeingValidated]);

  useEffect(() => {
    if (!isUserSignedIn && isPracticeNotSignedInAlertEnabled()) {
      addAlert(dispatch, 'practiceNotSignedIn', ['practice']);
    } else {
      removeAlert(dispatch, 'practiceNotSignedIn');
    }
  }, [user]);

  // Cleanup
  useEffect(() => () => request.cancel(), []);

  return (
    <div className="d-flex flex-column align-items-end gap-2 m-3" id="alerts">
      {getVisibleAlerts(alerts, pathNameToPageMap.get(location.pathname))}
    </div>
  );
}

function getVisibleAlerts(alerts: IAlert[], currentPage?: Page) {
  if (currentPage === undefined) {
    return [];
  }
  const visibleAlerts = alerts.filter((alert) =>
    alert.pagesToShowOn.includes(currentPage),
  );
  return visibleAlerts.map((alert) => (
    <React.Fragment key={v4()}>
      {alertIdToComponentMap.get(alert.id)}
    </React.Fragment>
  ));
}

const pathNameToPageMap = new Map<string, Page>([
  ['/', 'home'],
  ['/create-account', 'createAccount'],
  ['/practice', 'practice'],
  ['/profile', 'profile'],
]);

const alertIdToComponentMap = new Map<AlertId, JSX.Element>([
  ['validatingToken', <AlertValidatingToken key={v4()} />],
  ['userSignedOut', <AlertUserSignedOut key={v4()} />],
  [
    'practiceSettingsRetrievalFailure',
    <AlertPracticeSettingsRetrievalFailed key={v4()} />,
  ],
  [
    'practiceSettingUpdateFailed',
    <AlertPracticeSettingUpdateFailed key={v4()} />,
  ],
  ['practiceNotSignedIn', <AlertPracticeNotSignedIn key={v4()} />],
]);

function isPracticeNotSignedInAlertEnabled() {
  return !localStorageGetBool(
    localStorageItems.isAlertDisabledPracticeNotSignedIn,
  );
}
