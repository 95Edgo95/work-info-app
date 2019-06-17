import reducer from "services/reducer";
import {createStore} from "redux";
import {fromJS} from "immutable";

let store: any;

const initialState: any = fromJS({});

if (process.env && process.env.NODE_ENV !== "production") {
  store = createStore(reducer, initialState);
} else {
  store = createStore(reducer, initialState);
}

export default store;
