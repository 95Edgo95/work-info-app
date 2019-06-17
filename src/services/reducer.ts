import notificationData from "../store/notification/NotificationReducer";
import workplaceData from "../store/workplace/WorkplaceReducer";
import workbookData from "../store/workbook/WorkbookReducer";
import userData from "../store/user/UserReducer";
import {combineReducers} from "redux-immutable";

export default combineReducers({
  notificationData,
  workplaceData,
  workbookData,
  userData
});
