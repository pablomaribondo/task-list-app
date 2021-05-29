import {
  NotificationAction,
  NotificationState,
  SET_NOTIFICATION
} from '../types';

const INITIAL_STATE: NotificationState = {
  message: '',
  type: 'success'
};

export default (
  state = INITIAL_STATE, // eslint-disable-line default-param-last
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        message: action.payload.message,
        type: action.payload.type
      };
    default:
      return state;
  }
};
