import React, { useMemo, useRef } from "react";
import { Planet } from "../components/Planet";
import { usePlanets } from "../hooks";

export const Planets = () => {
  const { planets, remove, isLoading, isError, refetch } = usePlanets();

  const selectRef = useRef();

  const orderedPlanets = useMemo(
    () =>
      planets.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0)),
    [planets]
  );

  const renderItem = (planet) => (
    <Planet key={planet.name} planet={planet} remove={remove(planet)} />
  );

  const renderLoading = () => isLoading && <div>loading...</div>;

  const renderEmpty = () =>
    !isLoading &&
    !orderedPlanets.length && (
      <div>
        No plant found{" "}
        <button type="button" onClick={refetch}>
          Find
        </button>
      </div>
    );

  const renderError = () =>
    isError && (
      <div>
        An error has occurred.
        <button type="button" onClick={refetch}>
          try again
        </button>
      </div>
    );

  const renderList = () => orderedPlanets.map(renderItem);

  const renderSelectList = () => (
    <div>
      <select ref={selectRef}>
        <option value="">-- Selecione --</option>
        {orderedPlanets.map((planet) => (
          <option key={planet.name} value={planet.name}>
            {planet.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          if (selectRef.current.value) {
            remove(
              orderedPlanets.find((p) => p.name === selectRef.current.value)
            )();
          }
        }}
      >
        remove
      </button>
    </div>
  );

  return (
    <div className="planet-list">
      <h1>Lista de planetas</h1>
      {renderLoading()}
      {renderEmpty()}
      {renderError()}
      {renderSelectList()}
      {renderList()}
    </div>
  );
};

Planets.defaultProps = {
  planets: []
};
