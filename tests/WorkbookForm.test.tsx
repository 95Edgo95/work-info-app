import WorkbookForm from "../src/containers/WorkbookForm";
import {BrowserRouter} from "react-router-dom";
import store from "../__mocks__/storeMock";
import {Provider} from "react-redux";
import { mount } from "enzyme";
import * as React from "react";

describe('WorkbookForm', () => {
  it('should render correctly', () => {
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <WorkbookForm match={{ params: { id: "asdf" } }} />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
