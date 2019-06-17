"use strict";

import {attemptGetUser} from "store/user/UserActionCreators";
import {getCsrf} from "helpers/RequestHelper";
import store from "services/store";
import {render} from "react-dom";
import App from "components/App";

const token = localStorage.getItem("token");

if (token) {
  store.dispatch(attemptGetUser());
}

getCsrf().then(() => {
  render(App(), document.getElementById("root"));
});
