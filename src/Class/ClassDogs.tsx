import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

interface DogProps {
  displayFavorites: boolean;
  displayUnfavorites: boolean;
  displayAll: boolean;
  allDogs: Dog[];
  fetchAndSetAllDogs: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export class ClassDogs extends Component<DogProps> {
  handleFavoriteClick = (dog: Dog) => {
    const updatedDog = { ...dog, isFavorite: !dog.isFavorite };
    Requests.updateDog(dog.id, updatedDog).then(() =>
      this.props.fetchAndSetAllDogs()
    );
  };

  renderDogCards = (dogs: Dog[]) => {
    return dogs.map((dog) => (
      <div key={dog.id}>
        <DogCard
          dog={dog}
          onTrashIconClick={() => {
            this.props.setIsLoading(true);
            Requests.deleteDog(dog.id)
              .then(() => this.props.fetchAndSetAllDogs())
              .finally(() => this.props.setIsLoading(false));
          }}
          onHeartClick={() => this.handleFavoriteClick(dog)}
          onEmptyHeartClick={() => this.handleFavoriteClick(dog)}
          isLoading={this.props.isLoading}
        />
      </div>
    ));
  };

  render() {
    return (
      <>
        <section className="dog-section">
          {this.props.displayAll && this.renderDogCards(this.props.allDogs)}
          {this.props.displayFavorites &&
            this.renderDogCards(
              this.props.allDogs.filter((dog) => dog.isFavorite)
            )}
          {this.props.displayUnfavorites &&
            this.renderDogCards(
              this.props.allDogs.filter((dog) => !dog.isFavorite)
            )}
        </section>
      </>
    );
  }
}
