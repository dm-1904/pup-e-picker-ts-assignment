// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

interface Props {
  handleFavClick: () => void;
  handleUnfavClick: () => void;
  handleCreateClick: () => void;
  displayFavorites: boolean;
  displayUnfavorites: boolean;
  favoritedCount: number;
  unfavoritedCount: number;
  fetchAndSetAllDogs: () => void;
  isCreateClicked: boolean;
  displayAll: boolean;
  allDogs: Dog[];
}

interface State {
  isLoading: boolean;
}

export class ClassSection extends Component<Props, State> {
  render() {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state = {
      isLoading: false,
    };
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
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                this.props.displayFavorites ? "active" : ""
              }`}
              onClick={() => {
                this.props.handleFavClick();
              }}
            >
              favorited ( {this.props.favoritedCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                this.props.displayUnfavorites ? "active" : ""
              }`}
              onClick={() => {
                this.props.handleUnfavClick();
              }}
            >
              unfavorited ( {this.props.unfavoritedCount} )
            </div>
            <div
              className={`selector ${
                this.props.isCreateClicked ? "active" : ""
              }`}
              onClick={() => {
                this.props.handleCreateClick();
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">
          {(this.props.displayAll ||
            this.props.displayFavorites ||
            this.props.displayUnfavorites) && (
            <ClassDogs
              displayFavorites={this.props.displayFavorites}
              displayUnfavorites={this.props.displayUnfavorites}
              displayAll={this.props.displayAll}
              allDogs={this.props.allDogs}
              fetchAndSetAllDogs={this.props.fetchAndSetAllDogs}
              isLoading={this.state.isLoading}
              setIsLoading={(isLoading: boolean) =>
                this.setState({ isLoading })
              }
            />
          )}
          {this.props.isCreateClicked && (
            <ClassCreateDogForm
              fetchAndSetAllDogs={this.props.fetchAndSetAllDogs}
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
