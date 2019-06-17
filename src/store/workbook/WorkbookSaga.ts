import {FORBIDDEN, INVALID_CSRF_MESSAGE, UNAUTHORIZED, VALIDATION_ERROR} from "configs/requestConsts";
import {addNotification} from "../notification/NotificationActionCreators";
import {getCsrf, request, tryToRefresh} from "helpers/RequestHelper";
import {WORKBOOK_REDUCER_ACTIONS} from "./WorkbookActions";
import {call, put, takeLatest} from "redux-saga/effects";
import {
  attemptCreateWorkbook as createWorkbookAction,
  attemptDeleteWorkbook as deleteWorkbookAction,
  attemptUpdateWorkbook as updateWorkbookAction,
  createWorkbookFailed,
  createWorkbookSucceed,
  deleteWorkbookSucceed,
  getWorkbooksSucceed,
  getWorkbookSucceed,
  IWorkbookActionCreator,
  toggleLoading,
  updateWorkbookFailed,
  updateWorkbookSucceed
} from "./WorkbookActionCreators";

function* attemptUpdateWorkbook({payload: {details, id}}: IWorkbookActionCreator): any {
  yield put(toggleLoading(true));

  try {
    const {data: {data: {workbook}}}: any = yield call(request, {
      url: `/workbooks/${id}`,
      method: "PATCH",
      data: details
    });
    yield put(updateWorkbookSucceed(workbook));
    yield put(toggleLoading(false));
  } catch ({response: {status, data: {errors, message}}}) {
    yield put(toggleLoading(false));
    if (status === UNAUTHORIZED) {
      yield tryToRefresh(attemptUpdateWorkbook, {payload: {details, id}});
    } else if (status === FORBIDDEN && message === INVALID_CSRF_MESSAGE) {
      yield getCsrf();
      yield put(updateWorkbookAction(details, id));
    } else if (status === VALIDATION_ERROR) {
      yield put(updateWorkbookFailed(errors));
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

function* attemptCreateWorkbook({payload: {workbook}}: IWorkbookActionCreator): any {
  yield put(toggleLoading(true));

  try {
    const {data: {data: {workbook: createdWorkbook}}}: any = yield call(request, {
      url: "/workbooks/",
      method: "POST",
      data: workbook
    });
    yield put(createWorkbookSucceed(createdWorkbook));
    yield put(toggleLoading(false));
  } catch ({response: {status, data: {errors, message}}}) {
    if (status === UNAUTHORIZED) {
      yield put(toggleLoading(false));
      yield tryToRefresh(attemptCreateWorkbook, {payload: {workbook}});
    } else if (status === FORBIDDEN && message === INVALID_CSRF_MESSAGE) {
      yield getCsrf();
      yield put(createWorkbookAction(workbook));
    } else if (status === VALIDATION_ERROR) {
      yield put(createWorkbookFailed(errors));
    } else {
      yield put(addNotification((errors && errors.message) || message));
    }
  }
}

function* attemptGetWorkbooks({payload: {params, replaceState}}: IWorkbookActionCreator): any {
  yield put(toggleLoading(true));

  try {
    const {data: {data: {workbooks, pagination}}}: any = yield call(request, {
      url: "/workbooks/",
      method: "GET"
    }, params);
    const mappedWorkbooks: any = {};

    for (let i: number = 0; i < workbooks.length; i++) {
      mappedWorkbooks[workbooks[i].id] = workbooks[i];
    }

    yield put(getWorkbooksSucceed(mappedWorkbooks, pagination, replaceState));
    yield put(toggleLoading(false));
  } catch ({response: {status, data: {errors, message}}}) {
    yield put(toggleLoading(false));
    if (status === UNAUTHORIZED) {
      yield tryToRefresh(attemptGetWorkbooks, {payload: {params, replaceState}});
    } else {
      yield put(addNotification((errors && errors.message) || message));
    }
  }
}

function* attemptDeleteWorkbook({payload: {id}}: IWorkbookActionCreator): any {
  yield put(toggleLoading(true));

  try {
    yield call(request, {url: `/workbooks/${id}`, method: "DELETE"});
    yield put(deleteWorkbookSucceed(id));
    yield put(toggleLoading(false));
  } catch ({response: {status, data: {errors, message}}}) {
    yield put(toggleLoading(false));
    if (status === UNAUTHORIZED) {
      yield tryToRefresh(attemptDeleteWorkbook, {payload: {id}});
    } else if (status === FORBIDDEN && message === INVALID_CSRF_MESSAGE) {
      yield getCsrf();
      yield put(deleteWorkbookAction(id));
    } else {
      yield put(addNotification((errors && errors.message) || message));
    }
  }
}

function* attemptGetWorkbook({payload: {id}}: IWorkbookActionCreator): any {
  yield put(toggleLoading(true));
  try {
    const {data: {data: {workbook}}}: any = yield call(request, {
      url: `/workbooks/${id}`,
      method: "GET"
    });

    yield put(getWorkbookSucceed(workbook));
    yield put(toggleLoading(false));
  } catch ({response: {status, data: {errors, message}}}) {
    if (status === UNAUTHORIZED) {
      yield tryToRefresh(attemptGetWorkbook, {payload: {id}});
    } else {
      yield put(addNotification((errors && errors.message) || message));
    }
  }
}

export default function* workbookSaga(): any {
  yield takeLatest(WORKBOOK_REDUCER_ACTIONS.ATTEMPT_CREATE_WORKBOOK, attemptCreateWorkbook);
  yield takeLatest(WORKBOOK_REDUCER_ACTIONS.ATTEMPT_UPDATE_WORKBOOK, attemptUpdateWorkbook);
  yield takeLatest(WORKBOOK_REDUCER_ACTIONS.ATTEMPT_DELETE_WORKBOOK, attemptDeleteWorkbook);
  yield takeLatest(WORKBOOK_REDUCER_ACTIONS.ATTEMPT_GET_WORKBOOKS, attemptGetWorkbooks);
  yield takeLatest(WORKBOOK_REDUCER_ACTIONS.ATTEMPT_GET_WORKBOOK, attemptGetWorkbook);
}
