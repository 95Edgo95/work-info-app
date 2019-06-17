import Input from "../src/components/Input";
import { mount } from "enzyme";
import * as React from "react";

const changeFn = jest.fn();

describe('Input', () => {
  it('should render correctly', () => {
    const component = mount(
      <Input
        onChange={changeFn}
        value="test"
        name="test"
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly passport input', () => {
    const component = mount(
      <Input
        onChange={changeFn}
        value="test"
        name="test"
        type="password"
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly hidden input', () => {
    const component = mount(
      <Input
        onChange={changeFn}
        value="test"
        name="test"
        type="hidden"
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly with placeholder', () => {
    const component = mount(
      <Input
        onChange={changeFn}
        value="test"
        name="test"
        placeholder="Test"
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly error input', () => {
    const component = mount(
      <Input
        onChange={changeFn}
        value="test"
        name="test"
        hasError
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly with error message', () => {
    const component = mount(
      <Input
        onChange={changeFn}
        error="You have error"
        value="test"
        name="test"
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly disabled input', () => {
    const component = mount(
      <Input
        onChange={changeFn}
        value="test"
        name="test"
        disabled
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly valid input', () => {
    const component = mount(
      <Input
        onChange={changeFn}
        value="test"
        name="test"
        isValid
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
