import {createSelector} from "helpers/StoreHelper";
import {IUser} from "store/user/UserReducer";
import {List, Map} from "immutable";

const userDataSelector: any = state => state.get("userData");

export const errorFieldsSelector: any = createSelector(
  userDataSelector, userData => userData.get("errorFields")
);

export const isLoggedInSelector: any = createSelector(
  userDataSelector, userData => userData.get("isLoggedIn")
);

export const signedInCheckCompletedSelector: any = createSelector(
  userDataSelector, userData => userData.get("signedInCheckCompleted")
);

export const userSelector: any = createSelector(
  userDataSelector, userData => userData.get("user")
);

export const usernameSelector: any = createSelector(
  userSelector, user => user && user.get("username")
);

export const roleSelector: any = createSelector(
  userSelector, user => user && user.get("role")
);

export interface IUserModuleProps extends Map<string, any> {
  signedInCheckCompleted: boolean;
  errorFields: List<string>;
  isLoggedIn: boolean;
  username: string;
  role: string;
  user: IUser;
}

export interface IUserSelectorVariables {
  signedInCheckCompleted?: boolean;
  errorFields?: boolean;
  isLoggedIn?: boolean;
  username?: boolean;
  role?: boolean;
  user?: boolean;
}

export default {
  main: state => ({user: userDataSelector(state)}),
  signedInCheckCompleted: signedInCheckCompletedSelector,
  errorFields: errorFieldsSelector,
  isLoggedIn: isLoggedInSelector,
  username: usernameSelector,
  role: roleSelector,
  user: userSelector,
};
