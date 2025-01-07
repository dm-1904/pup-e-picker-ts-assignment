import { useState } from "react";
import { Requests } from "../api";
import { dogPictures } from "../dog-pictures";

export const FunctionalCreateDogForm = ({
  fetchAndSetAllDogs,
}: {
  fetchAndSetAllDogs: () => Promise<void>;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(Object.values(dogPictures)[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDog = {
      name,
      description,
      image: picture,
      isFavorite: false,
    };
    Requests.postDog(newDog).then(() => {
      fetchAndSetAllDogs();
      setName("");
      setDescription("");
      setPicture(Object.values(dogPictures)[0]);
    });
  };

  return (
    <form
      id="create-dog-form"
      onSubmit={handleSubmit}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={false}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        id="description"
        cols={80}
        rows={10}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={false}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => (
          <option
            value={pictureValue}
            key={pictureValue}
          >
            {label}
          </option>
        ))}
      </select>
      <input type="submit" />
    </form>
  );
};
