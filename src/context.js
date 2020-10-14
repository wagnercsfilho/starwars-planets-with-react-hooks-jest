import React from "react";
const { createContext, useReducer } = require("react");

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PLANETS":
      return {
        ...state,
        planets: action.planets
      };
    case "REMOVE_PLANET":
      return {
        ...state,
        planets: state.planets.filter((p) => p !== action.planet)
      };
    default:
      return state;
  }
};

const initialState = {
  planets: []
};

export const StarWarsContext = createContext();
export const StarWarsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StarWarsContext.Provider value={[state, dispatch]}>
      {children}
    </StarWarsContext.Provider>
  );
};
