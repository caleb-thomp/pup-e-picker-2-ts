import { useDog } from "../context";
import { DogContextType } from "../types";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const context = useDog();
  const {
    filteredDogs,
    deleteDog,
    patchFavoriteDog,
    isLoading,
  } = context as DogContextType;

  return (
    <>
      {filteredDogs?.map((dog) => {
        return (
          <DogCard
            dog={dog}
            key={dog.id}
            isLoading={isLoading}
            onEmptyHeartClick={() => patchFavoriteDog(dog)}
            onHeartClick={() => patchFavoriteDog(dog)}
            onTrashIconClick={() => deleteDog(dog)}
          />
        );
      })}
    </>
  );
};
