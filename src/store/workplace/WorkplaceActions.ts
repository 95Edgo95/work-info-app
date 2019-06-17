export interface IWorkplaceReducerActions {
  ATTEMPT_CREATE_WORKPLACE: string;
  CREATE_WORKPLACE_SUCCEED: string;
  CREATE_WORKPLACE_FAILED: string;
  ATTEMPT_UPDATE_WORKPLACE: string;
  UPDATE_WORKPLACE_SUCCEED: string;
  UPDATE_WORKPLACE_FAILED: string;
  ATTEMPT_DELETE_WORKPLACE: string;
  DELETE_WORKPLACE_SUCCEED: string;
  DELETE_WORKPLACE_FAILED: string;
  ATTEMPT_GET_WORKPLACES: string;
  GET_WORKPLACES_SUCCEED: string;
  GET_WORKPLACES_FAILED: string;
  TOGGLE_LOADING: string;
  RESET_ERRORS: string;
  RESET: string;
}

export const WORKPLACE_REDUCER_ACTIONS: IWorkplaceReducerActions = {
  ATTEMPT_CREATE_WORKPLACE: "WORKPLACE:ATTEMPT_CREATE_WORKPLACE",
  CREATE_WORKPLACE_SUCCEED: "WORKPLACE:CREATE_WORKPLACE_SUCCEED",
  CREATE_WORKPLACE_FAILED: "WORKPLACE:CREATE_WORKPLACE_FAILED",
  ATTEMPT_UPDATE_WORKPLACE: "WORKPLACE:ATTEMPT_UPDATE_WORKPLACE",
  UPDATE_WORKPLACE_SUCCEED: "WORKPLACE:UPDATE_WORKPLACE_SUCCEED",
  UPDATE_WORKPLACE_FAILED: "WORKPLACE:UPDATE_WORKPLACE_FAILED",
  ATTEMPT_DELETE_WORKPLACE: "WORKPLACE:ATTEMPT_DELETE_WORKPLACE",
  DELETE_WORKPLACE_SUCCEED: "WORKPLACE:DELETE_WORKPLACE_SUCCEED",
  DELETE_WORKPLACE_FAILED: "WORKPLACE:DELETE_WORKPLACE_FAILED",
  ATTEMPT_GET_WORKPLACES: "WORKPLACE:ATTEMPT_GET_WORKPLACES",
  GET_WORKPLACES_SUCCEED: "WORKPLACE:GET_WORKPLACES_SUCCEED",
  GET_WORKPLACES_FAILED: "WORKPLACE:GET_WORKPLACES_FAILED",
  TOGGLE_LOADING: "WORKPLACE:TOGGLE_LOADING",
  RESET_ERRORS: "WORKPLACE:RESET_ERRORS",
  RESET: "WORKPLACE:RESET",
};
