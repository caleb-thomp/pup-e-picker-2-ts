import { useContext } from "react";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { Context } from "./context";
import { SelectedState } from "./types";

export function App() {
  const useAppContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error("useAppContext error");
    }
    return context;
  };
  const { selected } = useAppContext();

  return (
    <div
      className="App"
      style={{ backgroundColor: "skyblue" }}
    >
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {selected !== SelectedState.CreateDog && <Dogs />}
        {selected === SelectedState.CreateDog && (
          <CreateDogForm />
        )}
      </Section>
    </div>
  );
}
