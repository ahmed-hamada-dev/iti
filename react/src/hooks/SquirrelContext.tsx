import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type Squirrel } from "../lib/squirrels";
import { type SquirrelFormData } from "../components/squirrels/ControlledSquirrelForm";
import * as api from "../lib/api";

interface SquirrelContextType {
  squirrels: Squirrel[];
  loading: boolean;
  error: string | null;
  loadSquirrels: (search?: string, type?: string) => Promise<void>;
  handleAdd: (data: SquirrelFormData) => Promise<void>;
  handleUpdate: (id: number, data: SquirrelFormData) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}

const SquirrelContext = createContext<SquirrelContextType | undefined>(undefined);

export function SquirrelProvider({ children }: { children: ReactNode }) {
  const [squirrelsState, setSquirrelsState] = useState<Squirrel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSquirrels = useCallback(async (search?: string, type?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getSquirrels(search, type);
      setSquirrelsState(data);
    } catch (err: any) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAdd = async (data: SquirrelFormData) => {
    try {
      const newSquirrel = await api.createSquirrel(data);
      setSquirrelsState((prev) => [...prev, newSquirrel]);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: number, data: SquirrelFormData) => {
    try {
      const updated = await api.updateSquirrel(id, data);
      setSquirrelsState((prev) => prev.map((sq) => (sq.id === id ? updated : sq)));
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteSquirrel(id);
      setSquirrelsState((prev) => prev.filter((sq) => sq.id !== id));
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <SquirrelContext.Provider
      value={{
        squirrels: squirrelsState,
        loading,
        error,
        loadSquirrels,
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
