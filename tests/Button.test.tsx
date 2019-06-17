import Button from "../src/components/Button";
import { mount } from "enzyme";
import * as React from "react";

const clickFn = jest.fn();

describe('Button', () => {
  it('should render correctly', () => {
    const component = mount(<Button>Primary</Button>);

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly secondary button', () => {
    const component = mount(<Button secondary>Secondary</Button>);

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly disabled button', () => {
    const component = mount(<Button secondary>Secondary</Button>);

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should click button without throwing error', () => {
    const component = mount(<Button onClick={clickFn}>Click</Button>);

    component
      .find('button')
      .simulate('click');

    expect(component).toMatchSnapshot();
    expect(clickFn).toHaveBeenCalled();
    component.unmount();
  });
});
