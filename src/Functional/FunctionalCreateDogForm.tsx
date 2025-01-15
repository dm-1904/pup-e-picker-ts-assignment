import { useState } from "react";
import { Requests } from "../api";
import { dogPictures } from "../dog-pictures";
import { toast } from "react-hot-toast";
import { TActiveTab } from "../types";

export const FunctionalCreateDogForm = ({
  handleTabChange,
  setIsLoading,
  fetchAndSetAllDogs,
  isLoading,
}: {
  handleTabChange: (tabName: TActiveTab) => void;
  setIsLoading: (isLoading: boolean) => void;
  fetchAndSetAllDogs: () => void;
  isLoading: boolean;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(Object.values(dogPictures)[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const newDog = {
      name,
      description,
      image: picture,
      isFavorite: false,
    };
    Requests.postDog(newDog)
      .then(() => {
        fetchAndSetAllDogs();
        setName("");
        setDescription("");
        setPicture(Object.values(dogPictures)[0]);
      })
      .then(() => handleTabChange("none"))
      .then(() => toast.success(`✅ ${name} has been added! 🐾`))
      .finally(() => setIsLoading(false));
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
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        id="description"
        cols={80}
        rows={10}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
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
      <input
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
};
