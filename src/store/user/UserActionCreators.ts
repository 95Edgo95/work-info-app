import {USER_REDUCER_ACTIONS} from "./UserActions";
import {IUser} from "./UserReducer";

export interface IUserActionCreator {
  type: string;
  payload?: {
    username?: string;
    password?: string;
    errors?: string[];
    user?: IUser;
  };
}

export function attemptSignIn(username: string, password: string): IUserActionCreator {
  return {type: USER_REDUCER_ACTIONS.ATTEMPT_SIGN_IN, payload: {username, password}};
}

export function signInSucceed(user: any): IUserActionCreator {
  return {type: USER_REDUCER_ACTIONS.SIGN_IN_SUCCEED, payload: {user}};
}

export function signInFailed(errors: any): IUserActionCreator {
  return {type: USER_REDUCER_ACTIONS.SIGN_IN_FAILED, payload: {errors}};
}

export function attemptGetUser(): IUserActionCreator {
  return {type: USER_REDUCER_ACTIONS.ATTEMPT_GET_USER};
}

export function getUserSucceed(user: any): IUserActionCreator {
  return {type: USER_REDUCER_ACTIONS.GET_USER_SUCCEED, payload: {user}};
}

export function getUserFailed(): IUserActionCreator {
  return {type: USER_REDUCER_ACTIONS.GET_USER_FAILED};
}

export function attemptSignOut(): IUserActionCreator {
  return {type: USER_REDUCER_ACTIONS.ATTEMPT_SIGN_OUT};
}

export function signOutSucceed(): IUserActionCreator {
  return {type: USER_REDUCER_ACTIONS.SIGN_OUT_SUCCEED};
}

export function resetUserErrors(): IUserActionCreator {
  return {type: USER_REDUCER_ACTIONS.RESET_ERRORS};
}

export function resetUserData(): IUserActionCreator {
  return {type: USER_REDUCER_ACTIONS.RESET};
}
