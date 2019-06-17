import {BrowserRouter} from "react-router-dom";
import Filter from "../src/components/Filter";
import { mount } from "enzyme";
import * as React from "react";

const clickFn = jest.fn();

describe('Filter', () => {
  it('should render correctly', () => {
    const component = mount(
      <BrowserRouter>
        <Filter
          attemptGetEntities={clickFn}
          createLink="create"
          inputs={[
            {
              placeholder: "First Name",
              name: "firstName",
              defaultValue: "",
            },
            {
              placeholder: "Last Name",
              defaultValue: "",
              name: "lastName",
            },
            {
              placeholder: "Passport",
              defaultValue: "",
              name: "passport",
            },
            {
              placeholder: "Email",
              defaultValue: "",
              name: "email",
            }
          ]}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly with additionalParams prop', () => {
    const component = mount(
      <BrowserRouter>
        <Filter
          attemptGetEntities={clickFn}
          createLink="create"
          inputs={[
            {
              placeholder: "First Name",
              name: "firstName",
              defaultValue: "",
            },
            {
              placeholder: "Last Name",
              defaultValue: "",
              name: "lastName",
            },
            {
              placeholder: "Passport",
              defaultValue: "",
              name: "passport",
            },
            {
              placeholder: "Email",
              defaultValue: "",
              name: "email",
            }
          ]}
          additionalParams={{ id: 1}}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
