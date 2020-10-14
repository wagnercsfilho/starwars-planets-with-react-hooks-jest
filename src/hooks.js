import { useContext, useEffect, useRef, useState } from "react";
import { StarWarsContext } from "./context";
import * as api from "./service";

export const usePlanets = () => {
  const [state, dispatch] = useContext(StarWarsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const cacheRef = useRef();

  useEffect(() => {
    getPlanets();
  }, []);

  const getPlanets = () => {
    setIsLoading(true);
    setError(false);

    Promise.resolve().then(getFromCache).then(getFromApi);
  };

  const getFromApi = () => {
    return api
      .getPlanets()
      .then((data) => {
        dispatch({ type: "SET_PLANETS", planets: data.results });
        return data.results;
      })
      .then((data) => {
        cacheRef.current = data;
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getFromCache = () => {
    if (cacheRef.current) {
      dispatch({
        type: "SET_PLANETS",
        planets: cacheRef.current
      });
      setIsLoading(false);
      return;
    }
  };

  const remove = (planet) => () => {
    dispatch({ type: "REMOVE_PLANET", planet });
  };

  const refetch = () => {
    getPlanets();
  };

  return { planets: state.planets, remove, isLoading, error, refetch };
};
