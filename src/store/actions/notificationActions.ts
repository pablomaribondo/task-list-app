import { NotificationAction, SET_NOTIFICATION } from '../types';

export const setNotification = (
  message: string,
  type: string = 'success'
): NotificationAction => {
  return {
    type: SET_NOTIFICATION,
    payload: {
      message,
      type
    }
  };
};
