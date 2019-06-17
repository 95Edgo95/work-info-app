import {WORKPLACE_REDUCER_ACTIONS} from "./WorkplaceActions";
import {IWorkplace} from "store/workplace/WorkplaceReducer";

export interface IWorkplaceActionCreator {
  type: string;
  payload?: {
    isLoading?: boolean;
    pagination?: any;
    workplaces?: any;
    workplace?: any;
    details?: any;
    errors?: any;
    params?: any;
    id?: number;
  };
}

export function attemptGetWorkplaces(params: any): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.ATTEMPT_GET_WORKPLACES, payload: {params}};
}

export function getWorkplacesSucceed(workplaces: Map<number, IWorkplace>, pagination: any): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.GET_WORKPLACES_SUCCEED, payload: {workplaces, pagination}};
}

export function toggleLoading(isLoading: boolean): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.TOGGLE_LOADING, payload: {isLoading}};
}

export function attemptGetWorkplace(id: number): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.ATTEMPT_GET_WORKPLACES, payload: {id}};
}

export function attemptCreateWorkplace(workplace: any): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.ATTEMPT_CREATE_WORKPLACE, payload: {workplace}};
}

export function createWorkplaceSucceed(workplace: IWorkplace): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.CREATE_WORKPLACE_SUCCEED, payload: {workplace}};
}

export function createWorkplaceFailed(errors: string[]): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.CREATE_WORKPLACE_FAILED, payload: {errors}};
}

export function attemptUpdateWorkplace(details: any, id: number): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.ATTEMPT_UPDATE_WORKPLACE, payload: {details, id}};
}

export function updateWorkplaceSucceed(workplace: IWorkplace): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.UPDATE_WORKPLACE_SUCCEED, payload: {workplace}};
}

export function updateWorkplaceFailed(errors: string[]): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.CREATE_WORKPLACE_FAILED, payload: {errors}};
}

export function attemptDeleteWorkplace(id: number): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.ATTEMPT_DELETE_WORKPLACE, payload: {id}};
}

export function deleteWorkplaceSucceed(id: number): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.DELETE_WORKPLACE_SUCCEED, payload: {id}};
}

export function resetWorkplaceErrors(): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.RESET_ERRORS};
}

export function resetWorkplaceData(): IWorkplaceActionCreator {
  return {type: WORKPLACE_REDUCER_ACTIONS.RESET};
}

