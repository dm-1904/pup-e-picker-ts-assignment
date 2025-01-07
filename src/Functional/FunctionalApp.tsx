import { useEffect, useState } from "react";
import { Requests } from "../api";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [favoritedDogs, setFavoritedDogs] = useState<Dog[]>([]);
  const [isFavClicked, setIsFavClicked] = useState<boolean>(false);
  const [isUnfavClicked, setIsUnfavClicked] = useState<boolean>(false);
  const [isCreateClicked, setIsCreateClicked] = useState<boolean>(false);

  const handleFavClick = () => {
    isFavClicked ? setIsFavClicked(false) : setIsFavClicked(true),
      setIsUnfavClicked(false),
      setIsCreateClicked(false);
  };

  const handleUnfavClick = () => {
    isUnfavClicked ? setIsUnfavClicked(false) : setIsUnfavClicked(true),
      setIsFavClicked(false),
      setIsCreateClicked(false);
  };

  const handleCreateClick = () => {
    isCreateClicked ? setIsCreateClicked(false) : setIsCreateClicked(true),
      setIsFavClicked(false),
      setIsUnfavClicked(false);
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

  const displayFavorites = isFavClicked && !isUnfavClicked && !isCreateClicked;
  const displayUnfavorites =
    isUnfavClicked && !isFavClicked && !isCreateClicked;
  const displayAll = !isFavClicked && !isUnfavClicked && !isCreateClicked;
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
        handleFavClick={handleFavClick}
        handleUnfavClick={handleUnfavClick}
        displayFavorites={displayFavorites}
        displayUnfavorites={displayUnfavorites}
        favoritedCount={favoritedCount}
        unfavoritedCount={unfavoritedCount}
        handleCreateClick={handleCreateClick}
        isCreateClicked={isCreateClicked}
        fetchAndSetAllDogs={fetchAndSetAllDogs}
        displayAll={displayAll}
        allDogs={allDogs}
      />
    </div>
  );
}
