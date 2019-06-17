import {BrowserRouter} from "react-router-dom";
import store from "../__mocks__/storeMock";
import Main from "../src/containers/Main";
import {Provider} from "react-redux";
import { mount } from "enzyme";
import * as React from "react";

describe('Layout', () => {
  it('should render correctly', () => {
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
