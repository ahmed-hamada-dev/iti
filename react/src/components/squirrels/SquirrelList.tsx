import { useState, useEffect } from "react";
import SquirrelCard from "./SquirrelCard";
import {
  ControlledSquirrelForm,
  type SquirrelFormData,
} from "./ControlledSquirrelForm";
import { Button } from "../ui/button";
import { SquirrelFormDialog } from "./SquirrelDialogs";
import { useSquirrels } from "../../hooks/SquirrelContext";
import { useSquirrelFilter, SquirrelFilterSelect } from "./SquirrelFilter";

export default function SquirrelList() {
  const { squirrels, loading, error, loadSquirrels, handleAdd, handleUpdate, handleDelete } = useSquirrels();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { filterValue: typeFilter, setFilterValue: setTypeFilter } = useSquirrelFilter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadSquirrels(searchTerm, typeFilter);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, typeFilter, loadSquirrels]);

  const onSubmitAdd = (data: SquirrelFormData) => {
    handleAdd(data);
    setShowAddDialog(false);
  };

  return (
    <section className="w-full px-4 md:px-8 py-16">
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
            <input
              type="text"
              placeholder="Search squirrels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <SquirrelFilterSelect value={typeFilter} onChange={setTypeFilter} />
            
            <Button
              size="lg"
              className="rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
              onClick={() => setShowAddDialog(true)}
            >
              Add Squirrel
            </Button>
          </div>
        </div>
      </header>
      
      {error && <div className="text-red-500 mb-8 font-bold">{error}</div>}
      
      {loading ? (
        <div className="text-center text-lg text-emerald-600 animate-pulse">Loading squirrels...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
          {squirrels.map((squirrel) => (
            <SquirrelCard
              key={squirrel.id}
              squirrel={squirrel}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
          {squirrels.length === 0 && !loading && !error && (
            <div className="col-span-full text-center text-slate-500 py-12">
              No squirrels found. Try adjusting your search or filter.
            </div>
          )}
        </div>
      )}

      {/* Add Dialog */}
      <SquirrelFormDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        title="Add New Squirrel"
      >
        <ControlledSquirrelForm
          onSubmit={onSubmitAdd}
          onCancel={() => setShowAddDialog(false)}
          submitLabel="Add Squirrel"
        />
      </SquirrelFormDialog>
    </section>
  );
}
