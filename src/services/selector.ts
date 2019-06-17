import notificationSelector, {
  INotificationModuleProps,
  INotificationSelectorVariables
} from "store/notification/NotificationSelector";
import workplaceSelector, {IWorkplaceModuleProps, IWorkplaceSelectorVariables} from "store/workplace/WorkplaceSelector";
import workbookSelector, {IWorkbookModuleProps, IWorkbookSelectorVariables} from "store/workbook/WorkbookSelector";
import userSelector, {IUserModuleProps, IUserSelectorVariables} from "store/user/UserSelector";

export interface IStoreProps extends INotificationModuleProps,
  IWorkplaceModuleProps,
  IWorkbookModuleProps,
  IUserModuleProps {
}

export interface ISelectorVariables {
  notification?: true | INotificationSelectorVariables;
  workplace?: true | IWorkplaceSelectorVariables;
  workbook?: true | IWorkbookSelectorVariables;
  user?: true | IUserSelectorVariables;
}

const selectors: any = {
  notification: notificationSelector,
  workplace: workplaceSelector,
  workbook: workbookSelector,
  user: userSelector
};

export default selectors;
