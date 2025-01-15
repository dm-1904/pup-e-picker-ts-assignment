import { Component } from "react";
import { Link } from "react-router-dom";
import { Dog, TActiveTab } from "../types";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

interface Props {
  handleTabChange: (tabName: TActiveTab) => void;
  activeTab: TActiveTab;
  favoritedCount: number;
  unfavoritedCount: number;
  fetchAndSetAllDogs: () => void;
  allDogs: Dog[];
}

interface State {
  isLoading: boolean;
}

export class ClassSection extends Component<Props, State> {
  state = {
    isLoading: false,
  };

  render() {
    const {
      activeTab,
      handleTabChange,
      favoritedCount,
      unfavoritedCount,
      allDogs,
      fetchAndSetAllDogs,
    } = this.props;
    const displayFavorites = activeTab === "fav";
    const displayUnfavorites = activeTab === "unfav";
    const displayAll = activeTab === "none";

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link
            to={"/functional"}
            className="btn"
          >
            Change to Functional
          </Link>
          <div className="selectors">
            <div
              className={`selector ${displayFavorites ? "active" : ""}`}
              onClick={() => handleTabChange(displayFavorites ? "none" : "fav")}
            >
              favorited ({favoritedCount})
            </div>
            <div
              className={`selector ${displayUnfavorites ? "active" : ""}`}
              onClick={() =>
                handleTabChange(displayUnfavorites ? "none" : "unfav")
              }
            >
              unfavorited ({unfavoritedCount})
            </div>
            <div
              className={`selector ${activeTab === "create" ? "active" : ""}`}
              onClick={() =>
                handleTabChange(activeTab === "create" ? "none" : "create")
              }
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">
          {(displayAll || displayFavorites || displayUnfavorites) && (
            <ClassDogs
              displayFavorites={displayFavorites}
              displayUnfavorites={displayUnfavorites}
              displayAll={displayAll}
              allDogs={allDogs}
              fetchAndSetAllDogs={fetchAndSetAllDogs}
              isLoading={this.state.isLoading}
              setIsLoading={(isLoading: boolean) =>
                this.setState({ isLoading })
              }
            />
          )}
          {activeTab === "create" && (
            <ClassCreateDogForm
              handleTabChange={handleTabChange}
              fetchAndSetAllDogs={fetchAndSetAllDogs}
              isLoading={this.state.isLoading}
              setIsLoading={(isLoading: boolean) =>
                this.setState({ isLoading })
              }
            />
          )}
        </div>
      </section>
    );
  }
}
