import {NOTIFICATION_REDUCER_ACTIONS} from "./NotificationActions";
import {INotificationActions} from "./NotificationActionCreators";
import {fromJS, Map} from "immutable";

interface INotificationData extends Map<string, any> {
  notifications: any;
}

const defaultNotificationState: INotificationData = fromJS({
  notifications: []
});

export default (state: INotificationData = defaultNotificationState, {type, payload}: INotificationActions) => {
  switch (type) {
    case NOTIFICATION_REDUCER_ACTIONS.ADD_NOTIFICATION:
      return state.update("notifications", notifications => notifications.push(fromJS(payload.notification)));

    case NOTIFICATION_REDUCER_ACTIONS.REMOVE_NOTIFICATION:
      return state
        .update("notifications", notifications => notifications
          .filter(notification => notification.get("id") !== payload.id));

    case NOTIFICATION_REDUCER_ACTIONS.RESET:
      return defaultNotificationState;

    default:
      return state;
  }
};
