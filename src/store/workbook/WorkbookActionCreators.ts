import {WORKBOOK_REDUCER_ACTIONS} from "./WorkbookActions";
import {IWorkbook} from "store/workbook/WorkbookReducer";

export interface IWorkbookActionCreator {
  type: string;
  payload?: {
    replaceState?: boolean;
    isLoading?: boolean;
    pagination?: any;
    workbooks?: any;
    workbook?: any;
    details?: any;
    errors?: any;
    params?: any;
    id?: string;
  };
}

export function attemptGetWorkbooks(params: any, replaceState: boolean): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.ATTEMPT_GET_WORKBOOKS, payload: {params, replaceState}};
}

export function getWorkbooksSucceed(workbooks: Map<number, IWorkbook>, pagination: any, replaceState: boolean): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.GET_WORKBOOKS_SUCCEED, payload: {workbooks, pagination, replaceState}};
}

export function toggleLoading(isLoading: boolean): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.TOGGLE_LOADING, payload: {isLoading}}
}

export function attemptGetWorkbook(id: string): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.ATTEMPT_GET_WORKBOOK, payload: {id}};
}

export function getWorkbookSucceed(workbook: IWorkbook): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.GET_WORKBOOK_SUCCEED, payload: {workbook}};
}

export function attemptCreateWorkbook(workbook: any): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.ATTEMPT_CREATE_WORKBOOK, payload: {workbook}};
}

export function createWorkbookSucceed(workbook: IWorkbook): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.CREATE_WORKBOOK_SUCCEED, payload: {workbook}};
}

export function createWorkbookFailed(errors: any): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.CREATE_WORKBOOK_FAILED, payload: {errors}};
}

export function attemptUpdateWorkbook(details: any, id: string): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.ATTEMPT_UPDATE_WORKBOOK, payload: {details, id}};
}

export function updateWorkbookSucceed(workbook: IWorkbook): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.UPDATE_WORKBOOK_SUCCEED, payload: {workbook}};
}

export function updateWorkbookFailed(errors: string[]): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.CREATE_WORKBOOK_FAILED, payload: {errors}};
}

export function attemptDeleteWorkbook(id: string): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.ATTEMPT_DELETE_WORKBOOK, payload: {id}};
}

export function deleteWorkbookSucceed(id: string): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.DELETE_WORKBOOK_SUCCEED, payload: {id}};
}

export function resetWorkbookErrors(): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.RESET_ERRORS};
}

export function resetWorkbookData(): IWorkbookActionCreator {
  return {type: WORKBOOK_REDUCER_ACTIONS.RESET};
}

