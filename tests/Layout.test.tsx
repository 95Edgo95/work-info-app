import {BrowserRouter} from "react-router-dom";
import Layout from "../src/components/Layout";
import store from "../__mocks__/storeMock";
import {Provider} from "react-redux";
import { mount } from "enzyme";
import * as React from "react";

describe('Layout', () => {
  it('should render correctly', () => {
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            Layout
          </Layout>
        </BrowserRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
