import Workplaces from "../src/containers/Workplaces";
import {BrowserRouter} from "react-router-dom";
import store from "../__mocks__/storeMock";
import {Provider} from "react-redux";
import { mount } from "enzyme";
import * as React from "react";

describe('Workplaces', () => {
  it('should render correctly', () => {
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Workplaces match={{ params: { workbookId: "asdf" } }} />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
