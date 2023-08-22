import { ReactNode } from "react";
import { DogContextType } from "../types";
import { useDog } from "../context";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const {
    mode,
    handleModeChange,
    favoriteDogCount,
    unfavoriteDogCount,
  } = useDog() as DogContextType;

  const handleClick = (typeOfMode: string): void => {
    if (handleModeChange) {
      handleModeChange(typeOfMode);
    }
  };

  const renderSelector = (
    selectorMode: string,
    selectorText: string,
    dogCount: number
  ) => (
    <div
      className={`selector ${
        mode === selectorMode ? "active" : ""
      }`}
      onClick={() => handleClick(selectorMode)}
    >
      {selectorText} ( {dogCount} )
    </div>
  );

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {renderSelector(
            "favorite",
            "favorited",
            favoriteDogCount
          )}
          {renderSelector(
            "unfavorite",
            "unfavorited",
            unfavoriteDogCount
          )}
          {renderSelector("create", "create dog", 0)}
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
