import {BrowserRouter} from "react-router-dom";
import Header from "../src/components/Header";
import store from "../__mocks__/storeMock";
import {Provider} from "react-redux";
import { mount } from "enzyme";
import * as React from "react";

describe('Header', () => {
  it('should render correctly', () => {
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
