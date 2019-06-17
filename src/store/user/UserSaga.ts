import {
  attemptSignIn as signInAction,
  attemptSignOut as signOutAction, getUserFailed, getUserSucceed,
  IUserActionCreator,
  resetUserData,
  signInFailed,
  signInSucceed,
  signOutSucceed,
} from "./UserActionCreators";
import {FORBIDDEN, INVALID_CSRF_MESSAGE, UNAUTHORIZED, VALIDATION_ERROR} from "configs/requestConsts";
import {addNotification, resetNotificationData} from "../notification/NotificationActionCreators";
import {resetWorkplaceData, resetWorkplaceErrors} from "store/workplace/WorkplaceActionCreators";
import {resetWorkbookData, resetWorkbookErrors} from "store/workbook/WorkbookActionCreators";
import {getCsrf, request, tryToRefresh} from "helpers/RequestHelper";
import {call, put, takeLatest} from "redux-saga/effects";
import {USER_REDUCER_ACTIONS} from "./UserActions";

function* attemptSignIn({payload}: IUserActionCreator): any {
  try {
    const {data: {data: {user}}}: any = yield call(request, {
      data: payload,
      url: "/auth/sign-in",
      method: "POST",
      auth: {
        username: payload.username,
        password: payload.password
      }
    });

    localStorage.setItem("token", user.token);
    delete user.token;
    yield put(signInSucceed(user));
  } catch ({response: {status, data: {errors, message}}}) {
    if (status === FORBIDDEN && message === INVALID_CSRF_MESSAGE) {
      yield getCsrf();
      yield put(signInAction(payload.username, payload.password));
    } else if (status === VALIDATION_ERROR) {
      yield put(signInFailed(Object.keys(errors)));
    } else {
      const notificationMessage: string = (errors && errors.message) || message;

      yield put(addNotification({
        id: Math.floor((Math.random() * 1000) + 1),
        message: notificationMessage,
        type: "error"
      }));
    }
  }
}

function* attemptSignOut(): any {
  try {
    yield call(request, {url: "/auth/sign-out", method: "POST"});
    localStorage.clear();
    yield put(resetNotificationData());
    yield put(resetWorkbookErrors());
    yield put(resetWorkplaceErrors());
    yield put(resetWorkbookData());
    yield put(resetWorkplaceData());
    yield put(resetUserData());
    yield put(signOutSucceed());
  } catch ({response: {status, data: {errors, message}}}) {
    if (status === UNAUTHORIZED) {
      yield tryToRefresh(attemptSignOut);
    } else if (status === FORBIDDEN && message === INVALID_CSRF_MESSAGE) {
      yield getCsrf();
      yield put(signOutAction());
    } else {
      const notificationMessage: string = (errors && errors.message) || message;

      yield put(addNotification({
        id: Math.floor((Math.random() * 1000) + 1),
        message: notificationMessage,
        type: "error"
      }));
    }
  }
}

function* attemptGetUser(): any {
  try {
    const {data: {data: {user}}}: any = yield call(request, {url: "/auth/get-user", method: "GET"});
    yield put(getUserSucceed(user));
  } catch ({response: {status, data: {errors, message}}}) {
    yield put(resetNotificationData());
    yield put(resetWorkbookErrors());
    yield put(resetWorkplaceErrors());
    yield put(resetWorkbookData());
    yield put(resetWorkplaceData());
    yield put(resetUserData());
    yield put(getUserFailed());
  }
}

export default function* userSaga(): any {
  yield takeLatest(USER_REDUCER_ACTIONS.ATTEMPT_SIGN_OUT, attemptSignOut);
  yield takeLatest(USER_REDUCER_ACTIONS.ATTEMPT_GET_USER, attemptGetUser);
  yield takeLatest(USER_REDUCER_ACTIONS.ATTEMPT_SIGN_IN, attemptSignIn);
}
