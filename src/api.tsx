import { Dog } from "./types";

export const baseUrl = "http://localhost:3000/dogs";

const getAllDogs = async (): Promise<Dog[]> => {
  return fetch(baseUrl)
    .then((res) => res.json())
    .then((data: Dog[]) => data);
};

const postDog = (dog: Dog) => {
  const { name, description, isFavorite, image } = dog;
  const body = JSON.stringify({
    name,
    description,
    isFavorite,
    image,
  });

  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body,
  });
};

const deleteDogRequest = (dog: Dog) => {
  return fetch(`${baseUrl}/${dog.id}`);
};

const patchFavoriteForDog = (dog: Dog) => {
  const { isFavorite } = dog;
  return fetch(`${baseUrl}/${dog.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      isFavorite: !isFavorite,
    }),
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
