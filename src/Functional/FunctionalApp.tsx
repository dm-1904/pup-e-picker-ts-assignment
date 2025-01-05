import { useEffect, useState } from "react";
import { Requests } from "../api";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  const fetchAndSetAllDogs = () => {
    return Requests.getAllDogs().then(setAllDogs);
  };

  useEffect(() => {
    fetchAndSetAllDogs();
  }, []);

  return (
    <div
      className="App"
      style={{ backgroundColor: "skyblue" }}
    >
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection />
      <FunctionalDogs allDogs={allDogs} />
      <FunctionalCreateDogForm />
    </div>
  );
}
