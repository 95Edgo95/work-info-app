import NotFound from "../src/components/NotFound";
import { mount } from "enzyme";
import * as React from "react";

describe('NotFound', () => {
  it('should render correctly', () => {
    const component = mount(
      <NotFound />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
