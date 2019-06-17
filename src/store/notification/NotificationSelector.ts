import {createSelector} from "helpers/StoreHelper";
import {Map} from "immutable";

const notificationDataSelector: any = state => state.get("notificationData");

export const notificationsSelector: any = createSelector(
    notificationDataSelector, notificationData => notificationData.get("notifications")
);

export interface INotificationModuleProps extends Map<string, any> {
    notifications: any;
}

export interface INotificationSelectorVariables {
    notifications?: boolean;
}

export default {
    notifications: notificationsSelector,
    main: notificationsSelector,
};
