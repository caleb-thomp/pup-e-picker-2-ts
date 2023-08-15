// const getAllDogs = () => {
//   // fill out method
// };

// const postDog = () => {
//   // fill out method
// };
// const deleteDogRequest = () => {
//   // fill out method
// };

// const patchFavoriteForDog = () => {
//   // fill out method
// };

// export const Requests = {
//   postDog,
//   deleteDogRequest,
//   patchFavoriteForDog,
//   getAllDogs,
// };

import { z } from "zod";
import { Dog, dogSchema } from "./types";
import { v4 as uuidV4 } from "uuid";

const getUniqueId = () => {
  const userIdFromLocalStorage = localStorage.getItem(
    "pup-e-picker-user-id"
  );
  if (!userIdFromLocalStorage) {
    const newId = (uuidV4 as () => string)();
    localStorage.setItem("pup-e-picker-user-id", newId);
    return newId;
  }
  return userIdFromLocalStorage;
};

const getAuthHeader = () => ({
  "pup-e-picker-user-id": getUniqueId(),
});

export const baseUrl = "http://localhost:3000";

const getAllDogs = () =>
  fetch(`${baseUrl}/dogs`, {
    headers: {
      ...getAuthHeader(),
    },
  })
    .then((response) => response.json())
    .then((data) => z.array(dogSchema).parse(data));

const postDog = (dog: Omit<Dog, "id" | "isFavorite">) =>
  fetch(`${baseUrl}/dogs`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ ...dog, isFavorite: false }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create dog");
    }
    return response;
  });

const deleteDogRequest = (dogId: number) =>
  fetch(`${baseUrl}/dogs/${dogId}`, {
    method: "delete",
    headers: {
      ...getAuthHeader(),
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create dog");
    }
    return response;
  });

const patchFavoriteForDog = ({
  dogId,
  isFavorite,
}: {
  dogId: number;
  isFavorite: boolean;
}) =>
  fetch(`${baseUrl}/dogs/${dogId}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    method: "PATCH",
    body: JSON.stringify({
      isFavorite,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("could not update dog");
    }
    return response;
  });

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
