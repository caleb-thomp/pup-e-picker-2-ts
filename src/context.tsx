import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, DogContextType } from "./types";
import { Requests } from "./api";
import { toast } from "react-hot-toast";

export const DogContext = createContext<
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
          toast.success(`Added to Favorites`);
        } else {
          toast.success(`Removed from Favorites`);
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
    <DogContext.Provider
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
    </DogContext.Provider>
  );
};

export const useDog = () => {
  const context = useContext(DogContext) || {};
  return context;
};
