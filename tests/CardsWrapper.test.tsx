import CardsWrapper from "../src/containers/CardsWrapper";
import * as React from "react";
import {Map} from "immutable";
import {mount} from "enzyme";

const getFn = jest.fn();

describe('CardsWrapper', () => {
  it('should render correctly', () => {
    const component = mount(
      <CardsWrapper
        getDetails={() => [{value: "test", icon: "trash"}]}
        pagination={Map({count: 2})}
        attemptGetEntities={getFn}
        entities={Map()}
      >
        Test
      </CardsWrapper>
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
