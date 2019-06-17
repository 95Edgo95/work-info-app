import Form from "../src/components/Form";
import { Map } from "immutable";
import { mount } from "enzyme";
import * as React from "react";

const clickFn = jest.fn();

describe('Form', () => {
  it('should render correctly', () => {
    const component = mount(
      <Form
        history={history}
        attemptCreateEntity={clickFn}
        attemptUpdateEntity={clickFn}
        entitiesSize={2}
        validations={{}}
        entity={Map()}
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
          },
          {
            placeholder: "Birth Date",
            name: "birthDate",
            defaultValue: "",
            type: "date"
          },
        ]}
      />
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
