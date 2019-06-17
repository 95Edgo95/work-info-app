import CardRow from "../src/components/CardRow";
import { mount } from "enzyme";
import * as React from "react";

describe('CardRow', () => {
  it('should render correctly', () => {
    const component = mount(
      <CardRow value="test" icon="trash" />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly with number', () => {
    const component = mount(
      <CardRow value={2} icon="trash" />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
