import {FORBIDDEN, INVALID_CSRF_MESSAGE, UNAUTHORIZED, VALIDATION_ERROR} from "configs/requestConsts";
import {addNotification} from "../notification/NotificationActionCreators";
import {getCsrf, request, tryToRefresh} from "helpers/RequestHelper";
import {WORKPLACE_REDUCER_ACTIONS} from "./WorkplaceActions";
import {call, put, takeLatest} from "redux-saga/effects";
import {
  attemptCreateWorkplace as createWorkplaceAction,
  attemptDeleteWorkplace as deleteWorkplaceAction,
  attemptUpdateWorkplace as updateWorkplaceAction,
  createWorkplaceFailed,
  createWorkplaceSucceed,
  deleteWorkplaceSucceed,
  getWorkplacesSucceed,
  IWorkplaceActionCreator, toggleLoading,
  updateWorkplaceFailed,
  updateWorkplaceSucceed
} from "./WorkplaceActionCreators";

function* attemptUpdateWorkplace({payload: {details, id}}: IWorkplaceActionCreator): any {
  try {
    const {data: {data: {workplace}}}: any = yield call(request, {
      url: `/workplaces/${id}`,
      method: "PATCH",
      data: details
    });
    yield put(updateWorkplaceSucceed(workplace));
  } catch ({response: {status, data: {errors, message}}}) {
    if (status === UNAUTHORIZED) {
      yield tryToRefresh(attemptUpdateWorkplace, {payload: {details, id}});
    } else if (status === FORBIDDEN && message === INVALID_CSRF_MESSAGE) {
      yield getCsrf();
      yield put(updateWorkplaceAction(details, id));
    } else if (status === VALIDATION_ERROR) {
      yield put(updateWorkplaceFailed(Object.keys(errors)));
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

function* attemptCreateWorkplace({payload: {workplace}}: IWorkplaceActionCreator): any {
  try {
    const {data: {data: {workplace: createdWorkplace}}}: any = yield call(request, {
      url: "/workplaces/",
      method: "POST",
      data: workplace
    });
    yield put(createWorkplaceSucceed(createdWorkplace));
  } catch ({response: {status, data: {errors, message}}}) {
    if (status === UNAUTHORIZED) {
      yield tryToRefresh(attemptCreateWorkplace, {payload: {workplace}});
    } else if (status === FORBIDDEN && message === INVALID_CSRF_MESSAGE) {
      yield getCsrf();
      yield put(createWorkplaceAction(workplace));
    } else if (status === VALIDATION_ERROR) {
      yield put(createWorkplaceFailed(Object.keys(errors)));
    } else {
      yield put(addNotification((errors && errors.message) || message));
    }
  }
}

function* attemptGetWorkplaces({payload: {params}}: IWorkplaceActionCreator): any {
  yield put(toggleLoading(true));

  try {
    const {data: {data: {workplaces, pagination}}}: any = yield call(request, {
      url: "/workplaces/",
      method: "GET"
    }, params);
    const mappedWorkplaces: any = {};

    for (let i: number = 0; i < workplaces.length; i++) {
      mappedWorkplaces[workplaces[i].id] = workplaces[i];
    }

    yield put(getWorkplacesSucceed(mappedWorkplaces, pagination));
    yield put(toggleLoading(false));
  } catch ({response: {status, data: {errors, message}}}) {
    yield put(toggleLoading(false));
    if (status === UNAUTHORIZED) {
      yield tryToRefresh(attemptGetWorkplaces, {payload: {params}});
    } else {
      yield put(addNotification((errors && errors.message) || message));
    }
  }
}

function* attemptDeleteWorkplace({payload: {id}}: IWorkplaceActionCreator): any {
  try {
    yield call(request, {url: `/workplaces/${id}`, method: "DELETE"});
    yield put(deleteWorkplaceSucceed(id));
  } catch ({response: {status, data: {errors, message}}}) {
    if (status === UNAUTHORIZED) {
      yield tryToRefresh(attemptDeleteWorkplace, {payload: {id}});
    } else if (status === FORBIDDEN && message === INVALID_CSRF_MESSAGE) {
      yield getCsrf();
      yield put(deleteWorkplaceAction(id));
    } else {
      yield put(addNotification((errors && errors.message) || message));
    }
  }
}

export default function* workplaceSaga(): any {
  yield takeLatest(WORKPLACE_REDUCER_ACTIONS.ATTEMPT_CREATE_WORKPLACE, attemptCreateWorkplace);
  yield takeLatest(WORKPLACE_REDUCER_ACTIONS.ATTEMPT_UPDATE_WORKPLACE, attemptUpdateWorkplace);
  yield takeLatest(WORKPLACE_REDUCER_ACTIONS.ATTEMPT_DELETE_WORKPLACE, attemptDeleteWorkplace);
  yield takeLatest(WORKPLACE_REDUCER_ACTIONS.ATTEMPT_GET_WORKPLACES, attemptGetWorkplaces);
}
