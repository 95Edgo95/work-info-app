export interface IWorkbookReducerActions {
  ATTEMPT_CREATE_WORKBOOK: string;
  CREATE_WORKBOOK_SUCCEED: string;
  CREATE_WORKBOOK_FAILED: string;
  ATTEMPT_UPDATE_WORKBOOK: string;
  UPDATE_WORKBOOK_SUCCEED: string;
  UPDATE_WORKBOOK_FAILED: string;
  ATTEMPT_DELETE_WORKBOOK: string;
  DELETE_WORKBOOK_SUCCEED: string;
  DELETE_WORKBOOK_FAILED: string;
  ATTEMPT_GET_WORKBOOKS: string;
  GET_WORKBOOKS_SUCCEED: string;
  GET_WORKBOOKS_FAILED: string;
  ATTEMPT_GET_WORKBOOK: string,
  GET_WORKBOOK_SUCCEED: string,
  SET_WORKBOOK_ID: string;
  TOGGLE_LOADING: string;
  RESET_ERRORS: string;
  RESET: string;
}

export const WORKBOOK_REDUCER_ACTIONS: IWorkbookReducerActions = {
  ATTEMPT_CREATE_WORKBOOK: "WORKBOOK:ATTEMPT_CREATE_WORKBOOK",
  CREATE_WORKBOOK_SUCCEED: "WORKBOOK:CREATE_WORKBOOK_SUCCEED",
  CREATE_WORKBOOK_FAILED: "WORKBOOK:CREATE_WORKBOOK_FAILED",
  ATTEMPT_UPDATE_WORKBOOK: "WORKBOOK:ATTEMPT_UPDATE_WORKBOOK",
  UPDATE_WORKBOOK_SUCCEED: "WORKBOOK:UPDATE_WORKBOOK_SUCCEED",
  UPDATE_WORKBOOK_FAILED: "WORKBOOK:UPDATE_WORKBOOK_FAILED",
  ATTEMPT_DELETE_WORKBOOK: "WORKBOOK:ATTEMPT_DELETE_WORKBOOK",
  DELETE_WORKBOOK_SUCCEED: "WORKBOOK:DELETE_WORKBOOK_SUCCEED",
  DELETE_WORKBOOK_FAILED: "WORKBOOK:DELETE_WORKBOOK_FAILED",
  ATTEMPT_GET_WORKBOOKS: "WORKBOOK:ATTEMPT_GET_WORKBOOKS",
  GET_WORKBOOKS_SUCCEED: "WORKBOOK:GET_WORKBOOKS_SUCCEED",
  GET_WORKBOOKS_FAILED: "WORKBOOK:GET_WORKBOOKS_FAILED",
  ATTEMPT_GET_WORKBOOK: "WORKBOOK:ATTEMPT_GET_WORKBOOK",
  GET_WORKBOOK_SUCCEED: "WORKBOOK:GET_WORKBOOK_SUCCEED",
  SET_WORKBOOK_ID: "WORKBOOK:SET_WORKBOOK_ID",
  TOGGLE_LOADING: "WORKBOOK:TOGGLE_LOADING",
  RESET_ERRORS: "WORKBOOK:RESET_ERRORS",
  RESET: "WORKBOOK:RESET",
};