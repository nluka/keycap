import AlertActions, {
  ACTION_STRING_ALERT_REMOVE,
  ACTION_TYPE_ALERT_ADD,
} from '../actions/alertActions';
import type IAlert from '../types/IAlert';

const initialState: IAlert[] = [];

export default function alertReducer(
  state = initialState,
  action: AlertActions,
): IAlert[] {
  switch (action.type) {
    case ACTION_TYPE_ALERT_ADD:
      if (state.some((alert) => alert.id === action.payload.id)) {
        return state;
      }
      return [
        ...state,
        {
          id: action.payload.id,
          pagesToShowOn: action.payload.pagesToShowOn,
        },
      ];
    case ACTION_STRING_ALERT_REMOVE:
      return state.filter((alert) => alert.id !== action.payload.id);
    default:
      return state;
  }
}
