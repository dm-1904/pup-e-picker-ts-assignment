import { Component } from "react";
import { Requests } from "../api";
import { Dog, TActiveTab } from "../types";
import { ClassSection } from "./ClassSection";

interface State {
  allDogs: Dog[];
  favoritedDogs: Dog[];
  activeTab: TActiveTab;
}

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    allDogs: [],
    favoritedDogs: [],
    activeTab: "none",
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

  handleTabChange = (tabName: TActiveTab) => {
    this.setState(() => ({
      activeTab: tabName,
    }));
  };

  render() {
    const { allDogs, favoritedDogs, activeTab } = this.state;
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
          handleTabChange={this.handleTabChange}
          activeTab={activeTab}
          favoritedCount={favoritedCount}
          unfavoritedCount={unfavoritedCount}
          fetchAndSetAllDogs={this.fetchAndSetAllDogs}
          allDogs={allDogs}
        />
      </div>
    );
  }
}
