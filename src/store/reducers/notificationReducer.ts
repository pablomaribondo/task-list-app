import { NotificationAction, NotificationState } from '../types';

const initialState: NotificationState = {
  message: '',
  type: 'success'
};

export default (
  state = initialState, // eslint-disable-line default-param-last
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    default:
      return state;
  }
};
