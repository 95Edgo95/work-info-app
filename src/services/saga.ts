import workplaceSaga from "../store/workplace/WorkplaceSaga";
import workbookSaga from "../store/workbook/WorkbookSaga";
import userSaga from "../store/user/UserSaga";
import {all} from "redux-saga/effects";

export default function* (): any {
  yield all([
    workplaceSaga(),
    workbookSaga(),
    userSaga(),
  ]);
}
