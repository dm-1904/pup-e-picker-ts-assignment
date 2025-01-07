import { useEffect, useState } from "react";
import { Requests } from "../api";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [favoritedDogs, setFavoritedDogs] = useState<Dog[]>([]);
  const [isFavClicked, setIsFavClicked] = useState<boolean>(false);
  const [isUnfavClicked, setIsUnfavClicked] = useState<boolean>(false);

  const handleFavClick = () => {
    isFavClicked ? setIsFavClicked(false) : setIsFavClicked(true),
      setIsUnfavClicked(false);
  };

  const handleUnfavClick = () => {
    isUnfavClicked ? setIsUnfavClicked(false) : setIsUnfavClicked(true),
      setIsFavClicked(false);
  };

  // const handleUnClick = () => {
  //   setIsUnfavClicked(false);
  //   setIsFavClicked(false);
  // };

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

  const displayFavorites = isFavClicked && !isUnfavClicked;
  const displayUnfavorites = isUnfavClicked && !isFavClicked;
  const displayAll = !isFavClicked && !isUnfavClicked;
  const favoritedCount = favoritedDogs.length;
  const unfavoritedCount = allDogs.length - favoritedCount;
  // console.log("fav", isFavClicked);
  // console.log("unfav", isUnfavClicked);
  return (
    <div
      className="App"
      style={{ backgroundColor: "skyblue" }}
    >
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        handleFavClick={handleFavClick}
        handleUnfavClick={handleUnfavClick}
        // handleUnClick={handleUnClick}
        favoritedCount={favoritedCount}
        unfavoritedCount={unfavoritedCount}
      />
      <FunctionalDogs
        displayFavorites={displayFavorites}
        displayUnfavorites={displayUnfavorites}
        displayAll={displayAll}
        allDogs={allDogs}
        fetchAndSetAllDogs={fetchAndSetAllDogs}
      />
      <FunctionalCreateDogForm />
    </div>
  );
}
