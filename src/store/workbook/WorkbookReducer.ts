import {IWorkbookActionCreator} from "./WorkbookActionCreators";
import {WORKBOOK_REDUCER_ACTIONS} from "./WorkbookActions";
import {fromJS, List, Map} from "immutable";

export interface IWorkbook extends Map<string, any> {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passport: string;
  birthDate: string;
  currentWorkplaceId: string;
  workplacesIds: string[];
}


interface IWorkbookData extends Map<string, any> {
  workbooks: Map<string, IWorkbook>;
  errorFields: Map<string, string>;
  id: string;
  pagination: {
    count: number;
    limit: number;
    offset: number;
  };
}

const defaultWorkbookState: IWorkbookData = fromJS({
  errorFields: {},
  workbooks: {},
  pagination: {
    count: 0,
    limit: 0,
    offset: 0,
  },
  isLoading: false,
  id: '',
});

export default (state: IWorkbookData = defaultWorkbookState, {type, payload}: IWorkbookActionCreator) => {
  switch (type) {
    case WORKBOOK_REDUCER_ACTIONS.GET_WORKBOOKS_SUCCEED:
      let nextState;

      if (payload.replaceState) {
        nextState = state.set("workbooks", fromJS(payload.workbooks));
      } else {
        nextState = state.update("workbooks", workbooks => workbooks.merge(fromJS(payload.workbooks)));
      }

      return nextState.set("pagination", Map(payload.pagination));

    case WORKBOOK_REDUCER_ACTIONS.CREATE_WORKBOOK_SUCCEED:
    case WORKBOOK_REDUCER_ACTIONS.UPDATE_WORKBOOK_SUCCEED:
    case WORKBOOK_REDUCER_ACTIONS.GET_WORKBOOK_SUCCEED:
      return state.setIn(["workbooks", payload.workbook.id], fromJS(payload.workbook));

    case WORKBOOK_REDUCER_ACTIONS.CREATE_WORKBOOK_FAILED:
    case WORKBOOK_REDUCER_ACTIONS.UPDATE_WORKBOOK_FAILED:
      return state.set("errorFields", Map(payload.errors));

    case WORKBOOK_REDUCER_ACTIONS.DELETE_WORKBOOK_SUCCEED:
      return state.deleteIn(["workbooks", payload.id]);

    case WORKBOOK_REDUCER_ACTIONS.TOGGLE_LOADING:
      return state.set("isLoading", payload.isLoading);

    case WORKBOOK_REDUCER_ACTIONS.RESET_ERRORS:
      return state.set("errorFields", List());

    case WORKBOOK_REDUCER_ACTIONS.RESET:
      return defaultWorkbookState;

    default:
      return state;
  }
};
