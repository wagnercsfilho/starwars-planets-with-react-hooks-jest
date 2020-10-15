import React from "react";

export const Planet = ({ planet, remove }) => {
  return (
    <div className="planet-item">
      <div>{planet.name}</div>{" "}
      <button type="button" onClick={remove}>
        remove
      </button>
    </div>
  );
};
