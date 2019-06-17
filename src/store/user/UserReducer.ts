import {IUserActionCreator} from "./UserActionCreators";
import {USER_REDUCER_ACTIONS} from "./UserActions";
import {fromJS, List, Map} from "immutable";

export interface IUser {
  id: number;
  username: string;
  token: string;
}

interface IUserData extends Map<string, any> {
  user: {
    uid: number;
    username: string;
    token: string;
  };
  isLoggedIn: boolean;
  errorFields: List<string>;
  signedInCheckCompleted: boolean;
}

const defaultUserState: IUserData = fromJS({
  signedInCheckCompleted: false,
  isLoggedIn: false,
  errorFields: [],
  user: null,
});

export default (state: IUserData = defaultUserState, {type, payload}: IUserActionCreator): IUserData => {
  switch (type) {
    case USER_REDUCER_ACTIONS.SIGN_OUT_SUCCEED:
      return state.set("user", null).set("isLoggedIn", false).set("signedInCheckCompleted", true);

    case USER_REDUCER_ACTIONS.GET_USER_FAILED:
      return state.set("signedInCheckCompleted", true);

    case USER_REDUCER_ACTIONS.GET_USER_SUCCEED:
      return state.set("user", fromJS(payload.user)).set("isLoggedIn", true).set("signedInCheckCompleted", true);

    case USER_REDUCER_ACTIONS.SIGN_IN_SUCCEED:
      return state.set("user", fromJS(payload.user)).set("isLoggedIn", true);

    case USER_REDUCER_ACTIONS.SIGN_IN_FAILED:
      return state.set("errorFields", List(payload.errors));

    case USER_REDUCER_ACTIONS.RESET_ERRORS:
      return state.set("errorFields", List());

    case USER_REDUCER_ACTIONS.RESET:
      return defaultUserState;

    default:
      return state;
  }
};
