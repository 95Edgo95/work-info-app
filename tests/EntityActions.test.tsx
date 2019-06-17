import EntityActions from "../src/components/EntityActions";
import { mount } from "enzyme";
import * as React from "react";

const clickFn = jest.fn();

describe('EntityActions', () => {
  it('should render correctly', () => {
    const component = mount(
      <EntityActions
        handleDelete={clickFn}
        handleEdit={clickFn}
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
