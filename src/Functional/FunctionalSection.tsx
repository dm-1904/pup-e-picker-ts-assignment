// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { Dog, TActiveTab } from "../types";
import { useState } from "react";

export const FunctionalSection = ({
  handleTabChange,
  activeTab,
  favoritedCount,
  unfavoritedCount,
  fetchAndSetAllDogs,
  allDogs,
}: {
  handleTabChange: (tabName: TActiveTab) => void;
  activeTab: TActiveTab;
  favoritedCount: number;
  unfavoritedCount: number;
  fetchAndSetAllDogs: () => void;
  allDogs: Dog[];
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const displayFavorites = activeTab === "fav";
  const displayUnfavorites = activeTab === "unfav";
  const displayAll = activeTab === "none";

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
          <div
            className={`selector ${displayFavorites ? "active" : ""}`}
            onClick={() => handleTabChange(displayFavorites ? "none" : "fav")}
          >
            favorited ( {favoritedCount} )
          </div>
          <div
            className={`selector ${displayUnfavorites ? "active" : ""}`}
            onClick={() =>
              handleTabChange(displayUnfavorites ? "none" : "unfav")
            }
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => {
              handleTabChange(activeTab === "create" ? "none" : "create");
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

        {activeTab === "create" && (
          <FunctionalCreateDogForm
            handleTabChange={handleTabChange}
            fetchAndSetAllDogs={fetchAndSetAllDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </section>
  );
};
