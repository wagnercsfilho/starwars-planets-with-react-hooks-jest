import React from "react";
import { shallow } from "enzyme";
import { Planet } from "./Planet";
import "../setupTests";

describe("Planet", () => {
  let props;

  beforeEach(() => {
    props = {
      planet: { name: "Plant" },
      remove: jest.fn()
    };
  });

  it("should render planet name", () => {
    const component = shallow(<Planet {...props} />);
    expect(component.find("div").contains(props.planet.name)).toBeTruthy();
  });

  it("should call remove function when button clicked", () => {
    const component = shallow(<Planet {...props} />);
    component.find("button").simulate("click");
    expect(props.remove).toHaveBeenCalledTimes(1);
  });
});
