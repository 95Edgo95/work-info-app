import WorkplaceForm from "../src/containers/WorkplaceForm";
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
          <WorkplaceForm match={{ params: { id: "qwer", workbookId: "asdf" } }} />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
