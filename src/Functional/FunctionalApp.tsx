import { useEffect, useState } from "react";
import { Requests } from "../api";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, TActiveTab } from "../types";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [favoritedDogs, setFavoritedDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<TActiveTab>("none");

  const handleTabChange = (tabName: TActiveTab) => {
    setActiveTab(tabName);
  };

  const fetchAndSetAllDogs = () => {
    return Requests.getAllDogs().then(setAllDogs);
  };

  useEffect(() => {
    fetchAndSetAllDogs();
  }, []);

  const fetchAndSetFavoritedDogs = () => {
    const favorited = allDogs.filter((dog) => dog.isFavorite);
    setFavoritedDogs(favorited);
  };

  useEffect(() => {
    fetchAndSetFavoritedDogs();
  }, [allDogs]);

  const favoritedCount = favoritedDogs.length;
  const unfavoritedCount = allDogs.length - favoritedCount;

  return (
    <div
      className="App"
      style={{ backgroundColor: "skyblue" }}
    >
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        handleTabChange={handleTabChange}
        activeTab={activeTab}
        favoritedCount={favoritedCount}
        unfavoritedCount={unfavoritedCount}
        fetchAndSetAllDogs={fetchAndSetAllDogs}
        allDogs={allDogs}
      />
    </div>
  );
}
