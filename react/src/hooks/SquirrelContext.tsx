import { createContext, useContext, useState, type ReactNode } from "react";
import { squirrels as initialSquirrels, type Squirrel } from "../lib/squirrels";
import { type SquirrelFormData } from "../components/squirrels/ControlledSquirrelForm";

interface SquirrelContextType {
  squirrels: Squirrel[];
  handleAdd: (data: SquirrelFormData) => void;
  handleUpdate: (id: number, data: SquirrelFormData) => void;
  handleDelete: (id: number) => void;
}

const SquirrelContext = createContext<SquirrelContextType | undefined>(undefined);

export function SquirrelProvider({ children }: { children: ReactNode }) {
  const [squirrelsState, setSquirrelsState] = useState<Squirrel[]>(initialSquirrels);

  const handleAdd = (data: SquirrelFormData) => {
    const newId =
      squirrelsState.length > 0
        ? Math.max(...squirrelsState.map((s) => s.id)) + 1
        : 1;
    setSquirrelsState([...squirrelsState, { ...data, id: newId }]);
  };

  const handleUpdate = (id: number, data: SquirrelFormData) => {
    setSquirrelsState(
      squirrelsState.map((sq) => (sq.id === id ? { ...sq, ...data } : sq)),
    );
  };

  const handleDelete = (id: number) => {
    setSquirrelsState(squirrelsState.filter((sq) => sq.id !== id));
  };

  return (
    <SquirrelContext.Provider
      value={{
        squirrels: squirrelsState,
        handleAdd,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </SquirrelContext.Provider>
  );
}

export function useSquirrels() {
  const context = useContext(SquirrelContext);
  if (context === undefined) {
    throw new Error("useSquirrels must be used within a SquirrelProvider");
  }
  return context;
}
