import Icon from "../src/components/Icon";
import { mount } from "enzyme";
import * as React from "react";

describe('Icon', () => {
  it('should render correctly', () => {
    const component = mount(
      <Icon
        name="pencil"
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly with size', () => {
    const component = mount(
      <Icon
        name="pencil"
        size={32}
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly with color', () => {
    const component = mount(
      <Icon
        name="pencil"
        color="red"
        size={32}
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly with style', () => {
    const component = mount(
      <Icon
        style={{ margin: "0 auto" }}
        name="pencil"
        color="red"
        size={32}
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
