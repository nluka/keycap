import localStorageItems from '../../local-storage';
import UserActions, {
  ACTION_TYPE_USER_SIGN_IN,
  ACTION_TYPE_USER_SIGN_OUT,
} from '../actions/userActions';
import type IStateUser from '../types/IStateUser';

const initialState: IStateUser = {
  isSignedIn: localStorage.getItem(localStorageItems.token) !== null,
  token: localStorage.getItem(localStorageItems.token),
  name: localStorage.getItem(localStorageItems.username),
};

export default function userReducer(
  state = initialState,
  action: UserActions,
): IStateUser {
  switch (action.type) {
    case ACTION_TYPE_USER_SIGN_IN:
      return {
        isSignedIn: true,
        token: localStorage.getItem(localStorageItems.token),
        name: localStorage.getItem(localStorageItems.username),
      };
    case ACTION_TYPE_USER_SIGN_OUT:
      return {
        isSignedIn: false,
        token: null,
        name: null,
      };
    default:
      return state;
  }
}
