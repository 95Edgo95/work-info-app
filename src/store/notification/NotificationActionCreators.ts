import {NOTIFICATION_REDUCER_ACTIONS} from "./NotificationActions";

export interface INotificationActions {
    type: string;
    payload?: {
        notification?: any;
        id?: number;
    };
}

export function addNotification(notification: any): INotificationActions {
    return {type: NOTIFICATION_REDUCER_ACTIONS.ADD_NOTIFICATION, payload: {notification}};
}

export function removeNotification(id: number): INotificationActions {
    return {type: NOTIFICATION_REDUCER_ACTIONS.REMOVE_NOTIFICATION, payload: {id}};
}

export function resetNotificationData(): INotificationActions {
    return {type: NOTIFICATION_REDUCER_ACTIONS.RESET};
}
