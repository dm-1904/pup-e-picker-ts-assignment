import { DogCard } from "../Shared/DogCard";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

export const FunctionalDogs = ({ allDogs }: { allDogs: Dog[] }) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {/* <DogCard
        dog={{
          id: 1,
          image: dogPictures.BlueHeeler,
          description: "Example Description",
          isFavorite: false,
          name: "Cute Blue Heeler",
        }}
        key={1}
        onTrashIconClick={() => {
          alert("clicked trash");
        }}
        onHeartClick={() => {
          alert("clicked heart");
        }}
        onEmptyHeartClick={() => {
          alert("clicked empty heart");
        }}
        isLoading={false}
      /> */}
      <section className="dog-section">
        {allDogs.map((dog) => (
          <div key={dog.id}>
            <DogCard
              dog={dog}
              onTrashIconClick={() => {
                alert("clicked trash");
              }}
              onHeartClick={() => {
                alert("clicked heart");
              }}
              onEmptyHeartClick={() => {
                alert("clicked empty heart");
              }}
              isLoading={false}
            />
          </div>
        ))}
      </section>
    </>
  );
};
