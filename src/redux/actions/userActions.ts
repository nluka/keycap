import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import {
  localStorageRemoveSignInItems,
  localStorageSetSignInItems,
} from '../../local-storage';
import type { RootState } from '../store';
import { PAGES_ALL } from '../types/Page';
import { addAlert, doesAlertExist, removeAlert } from './alertActions';

interface IActionUserSignInPayload {
  token: string;
  name: string;
}
export function actionCreatorUserSignIn({
  token,
  name,
}: IActionUserSignInPayload): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch, getState) {
    localStorageSetSignInItems(token, name);

    dispatch(
      _actionCreatorUserSignIn({
        token,
        name,
      }),
    );

    if (doesAlertExist('userSignedOut', getState().alerts)) {
      removeAlert(dispatch, 'userSignedOut');
    }
  };
}

export const ACTION_TYPE_USER_SIGN_IN = 'user/signIn';
interface IActionUserSignIn {
  type: typeof ACTION_TYPE_USER_SIGN_IN;
  payload: IActionUserSignInPayload;
}
export function _actionCreatorUserSignIn(
  payload: IActionUserSignInPayload,
): IActionUserSignIn {
  return {
    type: ACTION_TYPE_USER_SIGN_IN,
    payload,
  };
}

export function actionCreatorUserSignOut(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function (dispatch) {
    localStorageRemoveSignInItems(); // must happen before dispatch

    dispatch(_actionCreatorUserSignOut());

    addAlert(dispatch, 'userSignedOut', PAGES_ALL);
  };
}

export const ACTION_TYPE_USER_SIGN_OUT = 'user/signOut';
export interface IActionUserSignOut {
  type: typeof ACTION_TYPE_USER_SIGN_OUT;
}
export function _actionCreatorUserSignOut(): IActionUserSignOut {
  return {
    type: ACTION_TYPE_USER_SIGN_OUT,
  };
}

type UserActions = IActionUserSignIn | IActionUserSignOut;

export default UserActions;
