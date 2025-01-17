import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

export const FunctionalDogs = ({
  allDogs,
  fetchAndSetAllDogs,
  displayAll,
  displayFavorites,
  displayUnfavorites,
  isLoading,
  setIsLoading,
}: {
  allDogs: Dog[];
  fetchAndSetAllDogs: () => void;
  displayAll: boolean;
  displayFavorites: boolean;
  displayUnfavorites: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
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
            setIsLoading(true);
            Requests.deleteDog(dog.id)
              .then(() => fetchAndSetAllDogs())
              .finally(() => setIsLoading(false));
          }}
          onHeartClick={() => handleFavoriteClick(dog)}
          onEmptyHeartClick={() => handleFavoriteClick(dog)}
          isLoading={isLoading}
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
