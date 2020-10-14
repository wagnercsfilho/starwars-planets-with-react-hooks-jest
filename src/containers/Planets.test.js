import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import { Planets } from "./Planets";
import "../setupTests";
import * as hooks from "../hooks";
import { Planet } from "../components/Planet";

describe("Planets", () => {
  it("should render plant list with 10 items", () => {
    const planets = Array.from(new Array(10)).map((p) => ({
      name: `Planet ${p}`
    }));
    sinon.stub(hooks, "usePlanets").callsFake(() => {
      return {
        planets,
        remove: jest.fn().mockReturnValue(jest.fn)
      };
    });

    const component = shallow(<Planets />);
    expect(component.find(Planet)).toHaveLength(planets.length);
    expect(component.find(Planet).at(0).props().planet).toEqual(planets[0]);
  });
});
