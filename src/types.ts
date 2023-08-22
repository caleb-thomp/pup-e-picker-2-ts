import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;

export type DogContextType = {
  mode: string;
  setMode: (mode: string) => void;
  addDog: (dog: Dog) => void;
  deleteDog: (dog: Dog) => void;
  patchFavoriteDog: (dog: Dog) => void;
  favoriteDogCount: number;
  unfavoriteDogCount: number;
  filteredDogs: Dog[];
  handleModeChange: (dogMode: string) => void;
  isLoading: boolean;
};
