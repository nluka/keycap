import type { AnyAction, Dispatch } from 'redux';
import type AlertId from '../types/AlertId';
import type IAlert from '../types/IAlert';
import type Page from '../types/Page';

export const ACTION_TYPE_ALERT_ADD = 'alert/add';
interface IActionAlertAdd {
  type: typeof ACTION_TYPE_ALERT_ADD;
  payload: IActionAlertAddPayload;
}
interface IActionAlertAddPayload {
  id: AlertId;
  pagesToShowOn: Page[];
}
export function actionCreatorAlertAdd(
  payload: IActionAlertAddPayload,
): IActionAlertAdd {
  return {
    type: ACTION_TYPE_ALERT_ADD,
    payload,
  };
}

export const ACTION_STRING_ALERT_REMOVE = 'alert/remove';
interface IActionAlertRemove {
  type: typeof ACTION_STRING_ALERT_REMOVE;
  payload: IActionAlertRemovePayload;
}
interface IActionAlertRemovePayload {
  id: AlertId;
}
export function actionCreatorAlertRemove(
  payload: IActionAlertRemovePayload,
): IActionAlertRemove {
  return {
    type: ACTION_STRING_ALERT_REMOVE,
    payload,
  };
}

type AlertActions = IActionAlertAdd | IActionAlertRemove;
export default AlertActions;

export function doesAlertExist(id: AlertId, alerts: IAlert[]) {
  return alerts.some((alert) => alert.id === id);
}

export function addAlert(
  dispatch: Dispatch<AnyAction>,
  id: AlertId,
  pagesToShowOn: Page[],
) {
  dispatch(
    actionCreatorAlertAdd({
      id,
      pagesToShowOn,
    }),
  );
}

export function removeAlert(dispatch: Dispatch<AnyAction>, id: AlertId) {
  dispatch(
    actionCreatorAlertRemove({
      id,
    }),
  );
}
