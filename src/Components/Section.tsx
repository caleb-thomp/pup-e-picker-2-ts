import { ReactNode, useContext } from "react";
import { Context } from "../context";
import { Dog, SelectedState } from "../types";
import { Button } from "./Button";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const useAppContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error("useAppContext error");
    }
    return context;
  };
  const { dogsQuery } = useAppContext();
  const { data, isLoading, isError, error } = dogsQuery;

  const favorited: number =
    (data as Dog[])?.filter((dog: Dog) => dog.isFavorite)
      .length ?? 0;
  const unfavorited: number =
    (data as Dog[])?.filter((dog: Dog) => !dog.isFavorite)
      .length ?? 0;

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Error: {!!error ?? "Error"}</div>;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <Button
            type={SelectedState.All}
            label={`all ( ${(data as Dog[]).length ?? 0} )`}
          />
          <Button
            type={SelectedState.Favorited}
            label={`favorited ( ${favorited} )`}
          />
          <Button
            type={SelectedState.Unfavorited}
            label={`unfavorited ( ${unfavorited} )`}
          />
          <Button
            type={SelectedState.CreateDog}
            label={"create dog"}
          />
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
