import Card from "../src/components/Card";
import { mount } from "enzyme";
import * as React from "react";
import {BrowserRouter} from "react-router-dom";

describe('Card', () => {
  it('should render correctly', () => {
    const component = mount(
      <Card
        details={[
          {
            value: "test@test.com",
            icon: "email",
          },
          {
            value: "TE12345678",
            icon: "passport",
          },
          {
            value: "14/11/1995",
            icon: "birthday",
          },
          {
            value: 5,
            icon: "workplace",
          },
        ]}
      >
        <div />
      </Card>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly with title', () => {
    const component = mount(
      <Card
        details={[
          {
            value: "test@test.com",
            icon: "email",
          },
          {
            value: "TE12345678",
            icon: "passport",
          },
          {
            value: "14/11/1995",
            icon: "birthday",
          },
          {
            value: 5,
            icon: "workplace",
          },
        ]}
        title="Title"
      >
        <div />
      </Card>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly with link', () => {
    const component = mount(
      <BrowserRouter>
        <Card
          details={[
            {
              value: "test@test.com",
              icon: "email",
            },
            {
              value: "TE12345678",
              icon: "passport",
            },
            {
              value: "14/11/1995",
              icon: "birthday",
            },
            {
              value: 5,
              icon: "workplace",
            },
          ]}
          link="/test/id"
        >
          <div />
        </Card>
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render correctly with title and link', () => {
    const component = mount(
      <BrowserRouter>
        <Card
          details={[
            {
              value: "test@test.com",
              icon: "email",
            },
            {
              value: "TE12345678",
              icon: "passport",
            },
            {
              value: "14/11/1995",
              icon: "birthday",
            },
            {
              value: 5,
              icon: "workplace",
            },
          ]}
          title="Title"
          link="/test/id"
        >
          <div />
        </Card>
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
