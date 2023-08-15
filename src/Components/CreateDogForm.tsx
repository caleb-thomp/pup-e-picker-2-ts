import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Requests } from "../api";
import { Dog } from "../types";
import { toast } from "react-hot-toast";

export const CreateDogForm = () => {
  const queryClient = useQueryClient();

  const [name, setName] = useState<string>("");
  const [description, setDescription] =
    useState<string>("");
  const [image, setImage] = useState<string>(
    dogPictures.BlueHeeler
  );

  const addDog = useMutation({
    mutationFn: async (
      dog: Omit<Dog, "id" | "isFavorite">
    ) => {
      return await Requests.postDog(dog);
    },
    onSuccess: async () => {
      setName("");
      setDescription("");
      setImage(dogPictures.BlueHeeler);
      await queryClient.invalidateQueries({
        queryKey: ["dogs"],
      });
      toast.success("Added dog!");
    },
    onError: () => {
      toast.error("Error adding dog!");
    },
  });

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        addDog.mutate({
          name,
          description,
          image,
        });
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => {
          setImage(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(
          ([label, pictureValue]) => {
            return (
              <option
                value={pictureValue}
                key={pictureValue}
              >
                {label}
              </option>
            );
          }
        )}
      </select>
      <input type="submit" value="submit" />
    </form>
  );
};
