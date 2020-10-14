export const getPlanets = () => {
  return fetch("https://swapi.dev/api/planets/", {
    headers: {
      "content-type": "application/json"
    }
  }).then((result) => result.json());
};
