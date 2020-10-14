import React from "react";
import { StarWarsProvider } from "./context";
import { Planets } from "./containers/Planets";
import "./styles.css";

export default function App() {
  return (
    <StarWarsProvider>
      <div className="App">
        <Planets />
      </div>
    </StarWarsProvider>
  );
}
