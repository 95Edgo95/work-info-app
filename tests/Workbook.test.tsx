import Workbooks from "../src/containers/Workbooks";
import {BrowserRouter} from "react-router-dom";
import store from "../__mocks__/storeMock";
import {Provider} from "react-redux";
import { mount } from "enzyme";
import * as React from "react";

describe('Workbook', () => {
  it('should render correctly', () => {
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Workbooks />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
