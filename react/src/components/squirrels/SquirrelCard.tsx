import { useState } from "react";
import type { Squirrel } from "../../lib/squirrels";
import { Edit, Trash, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SquirrelDeleteDialog, SquirrelFormDialog } from "./SquirrelDialogs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  ControlledSquirrelForm,
  type SquirrelFormData,
} from "./ControlledSquirrelForm";

interface SquirrelCardProps {
  squirrel: Squirrel;
  onUpdate: (id: number, data: SquirrelFormData) => void;
  onDelete: (id: number) => void;
}

export default function SquirrelCard({
  squirrel,
  onUpdate,
  onDelete,
}: SquirrelCardProps) {
  const [count, setCount] = useState(squirrel.count);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const handleFeed = () => {
    if (count > 0) {
      setCount((c) => c - 1);
    }
  };

  const getStatusColor = () => {
    if (count === 0) return "var(--text-muted)";
    if (count === 1) return "#ef4444";
    if (count < 5) return "#f59e0b";
    return "var(--accent)";
  };

  return (
    <>
      <Card className="p-0 gap-0 border-border rounded-2xl shadow-sm transition-all duration-300  hover:shadow-xl hover:border-primary flex flex-col group relative animate-in fade-in zoom-in-95 overflow-hidden h-full">
        <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-white/30 focus-visible:ring-0 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full shadow-sm"
              >
                <MoreVertical size={16} />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => setShowUpdateDialog(true)}
                className="cursor-pointer"
              >
                <Button variant="ghost">
                  <Edit className="mr-2 size-4" />
                  Update
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="cursor-pointer text-red-600 focus:text-red-700"
              >
                <Button variant="ghost">
                  <Trash className="mr-2 size-4" />
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full h-60 relative shrink-0">
          <img
            src={squirrel.image}
            alt={squirrel.name}
            className="w-full h-full object-cover "
            loading="lazy"
          />
          <span className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase border border-white/30 shadow-sm">
            {squirrel.type}
          </span>
        </div>

        <CardHeader className="pt-6 pb-2">
          <CardTitle className="font-[Montserrat] font-bold text-2xl">
            {squirrel.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col grow pb-6">
          <CardDescription className="text-secondary-foreground/80 text-sm leading-relaxed mb-6 pt-1 grow">
            {squirrel.description}
          </CardDescription>

          <div className="flex items-center justify-between p-4 bg-muted rounded-xl mt-auto">
            <span className="font-semibold text-sm text-muted-foreground">
              Stock Status
            </span>
            <span
              className="font-extrabold text-xl font-[Montserrat]"
              style={{ color: getStatusColor() }}
            >
              {count} {count === 1 ? "Nut" : "Nuts"}
            </span>
          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-6">
          <Button
            className="w-full rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
            size="lg"
            onClick={handleFeed}
            disabled={count === 0}
          >
            {count === 0 ? "Out of Nuts!" : "Feed Nut"}
          </Button>
        </CardFooter>
      </Card>

      {/* Delete Confirmation */}
      <SquirrelDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        squirrelName={squirrel.name}
        onConfirm={() => onDelete(squirrel.id)}
      />

      {/* Update Dialog */}
      <SquirrelFormDialog
        open={showUpdateDialog}
        onOpenChange={setShowUpdateDialog}
        title={`Update ${squirrel.name}`}
      >
        <ControlledSquirrelForm
          initialData={squirrel}
          onSubmit={(data) => {
            onUpdate(squirrel.id, data);
            setShowUpdateDialog(false);
            setCount(data.count);
          }}
          onCancel={() => setShowUpdateDialog(false)}
        />
      </SquirrelFormDialog>
    </>
  );
}
