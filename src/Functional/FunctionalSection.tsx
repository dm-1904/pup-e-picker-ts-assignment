// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

export const FunctionalSection = ({
  allDogs,
  handleFavClick,
  handleUnfavClick,
  // handleUnClick,
  favoritedCount,
  unfavoritedCount,
}: {
  allDogs: Dog[];
  handleFavClick: () => void;
  handleUnfavClick: () => void;
  // handleUnClick: () => void;
  favoritedCount: number;
  unfavoritedCount: number;
}) => {
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
            className={`selector active`}
            onClick={() => {
              handleFavClick();
            }}
          >
            favorited ( {favoritedCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector`}
            onClick={() => {
              handleUnfavClick();
            }}
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector`}
            onClick={() => {}}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container"></div>
    </section>
  );
};
