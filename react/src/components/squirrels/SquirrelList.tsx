import { useState } from "react";
import { squirrels as initialSquirrels } from "../../lib/squirrels";
import SquirrelCard from "./SquirrelCard";
import {
  ControlledSquirrelForm,
  type SquirrelFormData,
} from "./ControlledSquirrelForm";
import { Button } from "../ui/button";
import { UncontrolledSquirrelForm } from "./UncontrolledSquirrelForm";
import { SquirrelFormDialog } from "./SquirrelDialogs";

export default function SquirrelList() {
  const [squirrelsState, setSquirrelsState] = useState(initialSquirrels);
  const [showControlledAdd, setShowControlledAdd] = useState(false);
  const [showUncontrolledAdd, setShowUncontrolledAdd] = useState(false);

  const handleAdd = (data: SquirrelFormData) => {
    const newId =
      squirrelsState.length > 0
        ? Math.max(...squirrelsState.map((s) => s.id)) + 1
        : 1;
    setSquirrelsState([...squirrelsState, { ...data, id: newId }]);
    setShowControlledAdd(false);
    setShowUncontrolledAdd(false);
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
    <section className="w-full px-4 md:px-8  py-16">
      {" "}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row w-full items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="font-[Montserrat] font-extrabold text-4xl sm:text-5xl mb-4 bg-linear-to-br from-emerald-500 to-emerald-700 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-600">
              Squirrel Forest
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Meet our squirrels and help them prepare for the winter! Each nut
              you feed them will decrease their current stock status.
            </p>
          </div>
          <div className="flex flex-wrap shrink-0 justify-center gap-4 mt-6 md:mt-0">
            <Button
              size="lg"
              className="rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
              onClick={() => setShowControlledAdd(true)}
            >
              Add (Controlled)
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl font-bold shadow-sm active:scale-95 transition-all"
              onClick={() => setShowUncontrolledAdd(true)}
            >
              Add (Uncontrolled)
            </Button>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {squirrelsState.map((squirrel) => (
          <SquirrelCard
            key={squirrel.id}
            squirrel={squirrel}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {/* Add Dialog (Controlled) */}
      <SquirrelFormDialog
        open={showControlledAdd}
        onOpenChange={setShowControlledAdd}
        title="Add New Squirrel (Controlled Form)"
      >
        <ControlledSquirrelForm
          onSubmit={handleAdd}
          onCancel={() => setShowControlledAdd(false)}
          submitLabel="Add Squirrel"
        />
      </SquirrelFormDialog>
      {/* Add Dialog (Uncontrolled) */}
      <SquirrelFormDialog
        open={showUncontrolledAdd}
        onOpenChange={setShowUncontrolledAdd}
        title="Add New Squirrel (Uncontrolled Form)"
      >
        <UncontrolledSquirrelForm
          onSubmit={handleAdd}
          onCancel={() => setShowUncontrolledAdd(false)}
        />
      </SquirrelFormDialog>
    </section>
  );
}
