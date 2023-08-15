import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { SelectedState } from "./types";
import { Requests } from "./api";

export const Context = createContext<
  | {
      dogsQuery: ReturnType<typeof useQuery>;
      selected: SelectedState;
      setSelected: React.Dispatch<
        React.SetStateAction<SelectedState>
      >;
    }
  | undefined
>(undefined);

type ContextProps = {
  children: React.ReactNode;
};

export const Provider: React.FC<ContextProps> = ({
  children,
}) => {
  const [selected, setSelected] = useState<SelectedState>(
    SelectedState.All
  );
  const dogsQuery = useQuery({
    queryKey: ["dogs"],
    queryFn: Requests.getAllDogs,
  });

  return (
    <Context.Provider
      value={{ selected, setSelected, dogsQuery }}
    >
      {children}
    </Context.Provider>
  );
};
