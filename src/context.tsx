import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, DogContextType } from "./types";
import { Requests } from "./api";
import { toast } from "react-hot-toast";

export const DogContext2 = createContext<
  DogContextType | undefined
>(undefined);

export const DogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState("all");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refetchDogs = () => {
    Requests.getAllDogs()
      .then((res) => {
        setDogs(res);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  const addDog = (dog: Dog) => {
    Requests.postDog({
      id: dog.id,
      name: dog.name,
      description: dog.description,
      image: dog.image,
      isFavorite: false,
    })
      .then(() => refetchDogs())
      .catch((err) => console.log(err));
  };

  const deleteDog = (dog: Dog) => {
    Requests.deleteDogRequest(dog)
      .then(() => {
        return refetchDogs();
      })
      .catch((err) => console.log(err));
  };

  const patchFavoriteDog = (dog: Dog) => {
    setIsLoading(true);
    Requests.patchFavoriteForDog(dog)
      .then(() => refetchDogs())
      .then(() => {
        if (dog.isFavorite === false) {
          toast.success(`You've favorite a good boi`);
        } else {
          toast.success(`You've unfavorited a good boi`);
        }
      })
      .finally(() => setIsLoading(false))
      .catch((err) => console.log(err));
  };

  const favorite = dogs.filter(
    (dog) => dog.isFavorite === true
  );
  const unfavorite = dogs.filter(
    (dog) => dog.isFavorite === false
  );

  const favoriteDogCount = favorite.length;
  const unfavoriteDogCount = unfavorite.length;

  const handleModeChange = (dogMode: string) => {
    if (mode === dogMode) {
      setMode("all");
      return;
    }
    setMode(dogMode);
  };

  const filteredDogs: Dog[] = (() => {
    if (mode === "favorited") {
      return favorite;
    }

    if (mode === "unfavorited") {
      return unfavorite;
    }
    return dogs;
  })();

  return (
    <DogContext2.Provider
      value={{
        mode,
        setMode,
        addDog,
        deleteDog,
        patchFavoriteDog,
        favoriteDogCount,
        unfavoriteDogCount,
        filteredDogs,
        handleModeChange,
        isLoading,
      }}
    >
      {children}
    </DogContext2.Provider>
  );
};

export const useDog = () => {
  const context = useContext(DogContext2) || {};
  return context;
};
