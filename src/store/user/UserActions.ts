export interface IUserReducerActions {
  ATTEMPT_GET_USER: string;
  GET_USER_SUCCEED: string;
  GET_USER_FAILED: string;
  ATTEMPT_SIGN_OUT: string;
  SIGN_OUT_SUCCEED: string;
  ATTEMPT_SIGN_IN: string;
  SIGN_IN_SUCCEED: string;
  SIGN_IN_FAILED: string;
  RESET_ERRORS: string;
  RESET: string;
}

export const USER_REDUCER_ACTIONS: IUserReducerActions = {
  ATTEMPT_GET_USER: "USER:ATTEMPT_GET_USER",
  GET_USER_SUCCEED: "USER:GET_USER_SUCCEED",
  GET_USER_FAILED: "USER:GET_USER_FAILED",
  ATTEMPT_SIGN_OUT: "USER:ATTEMPT_SIGN_OUT",
  SIGN_OUT_SUCCEED: "USER:SIGN_OUT_SUCCEED",
  ATTEMPT_SIGN_IN: "USER:ATTEMPT_SIGN_IN",
  SIGN_IN_SUCCEED: "USER:SIGN_IN_SUCCEED",
  SIGN_IN_FAILED: "USER:SIGN_IN_FAILED",
  RESET_ERRORS: "USER:RESET_ERRORS",
  RESET: "USER:RESET",
};
