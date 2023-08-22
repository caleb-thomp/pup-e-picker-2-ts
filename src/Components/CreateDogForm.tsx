import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDog } from "../context";
import { DogContextType } from "../types";

export const CreateDogForm = () => {
  const { addDog, isLoading } = useDog() as DogContextType;

  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] =
    useState("");
  const [selectedImage, setSelectedImage] = useState(
    dogPictures.BlueHeeler
  );

  const handleSubmit = (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    addDog({
      id: Number(),
      name: nameInput,
      description: descriptionInput,
      image: selectedImage,
      isFavorite: false,
    });
    setNameInput("");
    setDescriptionInput("");
    setSelectedImage(dogPictures.BlueHeeler);
  };

  return (
    <form id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={nameInput}
        disabled={isLoading}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        cols={80}
        rows={10}
        value={descriptionInput}
        onChange={(e) =>
          setDescriptionInput(e.target.value)
        }
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        onChange={(e) => setSelectedImage(e.target.value)}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(
          ([label, pictureValue]) => (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          )
        )}
      </select>
      <input
        type="submit"
        value="submit"
        disabled={isLoading}
      />
    </form>
  );
};
