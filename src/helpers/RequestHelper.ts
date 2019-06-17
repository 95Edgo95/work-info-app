import {signInSucceed, signOutSucceed} from "store/user/UserActionCreators";
import axios, {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";
import {generateQueryString} from "helpers/RouteHelper";
import {call, put} from "redux-saga/effects";
import urls from "configs/urls";

export function request(data: AxiosRequestConfig, query: any = {}, headers: any = {}): AxiosPromise {
  return axios({
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-XSRF-Token": localStorage.getItem("csrf"),
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      ...headers
    },
    withCredentials: true,
    ...data,
    url: `${urls.apiUrl}${data.url}${Object.keys(query).length > 0 ? `?${generateQueryString(query)}` : ""}`,
  });
}

export function* tryToRefresh(failedFunction: any, params?: any): any {
  try {
    const {data: {data}}: any = yield request({url: "/auth/refresh-token", method: "PUT"});
    localStorage.setItem("token", data.accessToken);

    yield put(signInSucceed(data.user));

    if (failedFunction) {
      yield call(failedFunction, params);
    }
  } catch (error) {
    yield put(signOutSucceed());
  }
}

export function getCsrf(): Promise<void> {
  return axios.get(`${urls.apiUrl}/auth/get-csrf`, {
    withCredentials: true
  }).then(({data: {csrf}}: AxiosResponse) => {
    if (csrf) {
      localStorage.setItem("csrf", csrf);
    }
  });
}
