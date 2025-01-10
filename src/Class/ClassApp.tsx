import { Component } from "react";
import { Requests } from "../api";
import { Dog } from "../types";
import { ClassSection } from "./ClassSection";

interface State {
  allDogs: Dog[];
  favoritedDogs: Dog[];
  isFavClicked: boolean;
  isUnfavClicked: boolean;
  isCreateClicked: boolean;
}

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    allDogs: [],
    favoritedDogs: [],
    isFavClicked: false,
    isUnfavClicked: false,
    isCreateClicked: false,
  };

  componentDidMount() {
    this.fetchAndSetAllDogs();
  }

  fetchAndSetAllDogs = () => {
    Requests.getAllDogs().then((dogs) => {
      this.setState({ allDogs: dogs });
      this.fetchAndSetFavoritedDogs(dogs);
    });
  };

  fetchAndSetFavoritedDogs = (dogs: Dog[]) => {
    const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
    this.setState({ favoritedDogs });
  };

  handleFavClick = () => {
    this.setState((prevState) => ({
      isFavClicked: !prevState.isFavClicked,
      isUnfavClicked: false,
      isCreateClicked: false,
    }));
  };

  handleUnfavClick = () => {
    this.setState((prevState) => ({
      isUnfavClicked: !prevState.isUnfavClicked,
      isFavClicked: false,
      isCreateClicked: false,
    }));
  };

  handleCreateClick = () => {
    this.setState((prevState) => ({
      isCreateClicked: !prevState.isCreateClicked,
      isFavClicked: false,
      isUnfavClicked: false,
    }));
  };

  render() {
    const {
      allDogs,
      favoritedDogs,
      isFavClicked,
      isUnfavClicked,
      isCreateClicked,
    } = this.state;
    const displayFavorites =
      isFavClicked && !isUnfavClicked && !isCreateClicked;
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
          <h1>pup-e-picker (Class)</h1>
        </header>
        <ClassSection
          handleFavClick={this.handleFavClick}
          handleUnfavClick={this.handleUnfavClick}
          handleCreateClick={this.handleCreateClick}
          displayFavorites={displayFavorites}
          displayUnfavorites={displayUnfavorites}
          favoritedCount={favoritedCount}
          unfavoritedCount={unfavoritedCount}
          fetchAndSetAllDogs={this.fetchAndSetAllDogs}
          isCreateClicked={isCreateClicked}
          displayAll={displayAll}
          allDogs={allDogs}
        />
      </div>
    );
  }
}
