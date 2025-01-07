import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

export const FunctionalDogs = ({
  displayFavorites,
  displayUnfavorites,
  displayAll,
  allDogs,
  fetchAndSetAllDogs,
}: {
  displayFavorites: boolean;
  displayUnfavorites: boolean;
  displayAll: boolean;
  allDogs: Dog[];
  fetchAndSetAllDogs: () => Promise<void>;
}) => {
  const handleFavoriteClick = (dog: Dog) => {
    const updatedDog = { ...dog, isFavorite: !dog.isFavorite };
    Requests.updateDog(dog.id, updatedDog).then(() => fetchAndSetAllDogs());
  };

  const renderDogCards = (dogs: Dog[]) => {
    return dogs.map((dog) => (
      <div key={dog.id}>
        <DogCard
          dog={dog}
          onTrashIconClick={() => {
            Requests.deleteDog(dog.id).then(() => fetchAndSetAllDogs());
          }}
          onHeartClick={() => handleFavoriteClick(dog)}
          onEmptyHeartClick={() => handleFavoriteClick(dog)}
          isLoading={false}
        />
      </div>
    ));
  };

  return (
    <>
      <section className="dog-section">
        {displayAll && renderDogCards(allDogs)}
        {displayFavorites &&
          renderDogCards(allDogs.filter((dog) => dog.isFavorite))}
        {displayUnfavorites &&
          renderDogCards(allDogs.filter((dog) => !dog.isFavorite))}
      </section>
    </>
  );
};
