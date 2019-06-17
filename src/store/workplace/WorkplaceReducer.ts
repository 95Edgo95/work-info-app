import {IWorkplaceActionCreator} from "./WorkplaceActionCreators";
import {WORKPLACE_REDUCER_ACTIONS} from "./WorkplaceActions";
import {fromJS, List, Map} from "immutable";

export interface IWorkplace extends Map<string, any>  {
  id: string;
  workplaceId: string;
  startDate: string;
  endDate: string;
  company: string;
  country: string;
  city: string;
}


interface IWorkplaceData extends Map<string, any> {
  workplaces: Map<string, IWorkplace>;
  errorFields: Map<string, string>;
  pagination: {
    count: number;
    limit: number;
    offset: number;
  };
  isLoading: boolean;
}

const defaultWorkplaceState: IWorkplaceData = fromJS({
  errorFields: {},
  workplaces: {},
  pagination: {
    count: 0,
    limit: 0,
    offset: 0,
  },
  isLoading: false
});

export default (state: IWorkplaceData = defaultWorkplaceState, {type, payload}: IWorkplaceActionCreator) => {
  switch (type) {
    case WORKPLACE_REDUCER_ACTIONS.GET_WORKPLACES_SUCCEED:
      return state.set("workplaces", fromJS(payload.workplaces)).set("pagination", Map(payload.pagination));

    case WORKPLACE_REDUCER_ACTIONS.CREATE_WORKPLACE_SUCCEED:
    case WORKPLACE_REDUCER_ACTIONS.UPDATE_WORKPLACE_SUCCEED:
      return state.setIn(["workplaces", payload.workplace.id], fromJS(payload.workplace));

    case WORKPLACE_REDUCER_ACTIONS.CREATE_WORKPLACE_FAILED:
    case WORKPLACE_REDUCER_ACTIONS.UPDATE_WORKPLACE_FAILED:
      return state.set("errorFields", List(payload.errors));

    case WORKPLACE_REDUCER_ACTIONS.DELETE_WORKPLACE_SUCCEED:
      return state.deleteIn(["workplaces", payload.id]);

    case WORKPLACE_REDUCER_ACTIONS.TOGGLE_LOADING:
      return state.set("isLoading", payload.isLoading);

    case WORKPLACE_REDUCER_ACTIONS.RESET_ERRORS:
      return state.set("errorFields", List());

    case WORKPLACE_REDUCER_ACTIONS.RESET:
      return defaultWorkplaceState;

    default:
      return state;
  }
};
