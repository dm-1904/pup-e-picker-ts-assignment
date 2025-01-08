// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { Dog } from "../types";
import { useState } from "react";

export const FunctionalSection = ({
  handleFavClick,
  handleUnfavClick,
  displayFavorites,
  displayUnfavorites,
  favoritedCount,
  unfavoritedCount,
  handleCreateClick,
  fetchAndSetAllDogs,
  isCreateClicked,
  displayAll,
  allDogs,
}: {
  handleFavClick: () => void;
  handleUnfavClick: () => void;
  displayFavorites: boolean;
  displayUnfavorites: boolean;
  favoritedCount: number;
  unfavoritedCount: number;
  handleCreateClick: () => void;
  fetchAndSetAllDogs: () => Promise<void>;
  isCreateClicked: boolean;
  displayAll: boolean;
  allDogs: Dog[];
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link
          to={"/class"}
          className="btn"
        >
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${displayFavorites ? "active" : ""}`}
            onClick={() => {
              handleFavClick();
            }}
          >
            favorited ( {favoritedCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${displayUnfavorites ? "active" : ""}`}
            onClick={() => {
              handleUnfavClick();
            }}
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector ${isCreateClicked ? "active" : ""}`}
            onClick={() => {
              handleCreateClick();
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {(displayAll || displayFavorites || displayUnfavorites) && (
          <FunctionalDogs
            displayFavorites={displayFavorites}
            displayUnfavorites={displayUnfavorites}
            displayAll={displayAll}
            allDogs={allDogs}
            fetchAndSetAllDogs={fetchAndSetAllDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        {isCreateClicked && (
          <FunctionalCreateDogForm
            fetchAndSetAllDogs={fetchAndSetAllDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </section>
  );
};
