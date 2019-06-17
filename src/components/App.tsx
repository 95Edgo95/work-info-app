import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "services/store";
import Main from "containers/Main";
import * as React from "react";

import "assets/css/app.css";

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
