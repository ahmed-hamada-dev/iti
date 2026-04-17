import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { SquirrelType } from "../../lib/squirrels";
import type { SquirrelFormData } from "./ControlledSquirrelForm";

export function UncontrolledSquirrelForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: SquirrelFormData) => void;
  onCancel: () => void;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: SquirrelFormData = {
      name: nameRef.current?.value || "Unknown Squirrel",
      image: imageRef.current?.value || "/images/brown-squirrel.png",
      description: descriptionRef.current?.value || "",
      count: parseInt(countRef.current?.value || "0"),
      type: (typeRef.current?.value as SquirrelType) || "brown",
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="grid py-4 gap-6">
      <div className="grid gap-2">
        <Label htmlFor="uncontrolled-name">Name</Label>
        <Input id="uncontrolled-name" ref={nameRef} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="uncontrolled-image">Image URL</Label>
        <Input id="uncontrolled-image" ref={imageRef} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="uncontrolled-description">Description</Label>
        <Input id="uncontrolled-description" ref={descriptionRef} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="uncontrolled-type">Type</Label>
        <select
          id="uncontrolled-type"
          ref={typeRef}
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="red" className="bg-background text-foreground">Red</option>
          <option value="gray" className="bg-background text-foreground">Gray</option>
          <option value="black" className="bg-background text-foreground">Black</option>
          <option value="white" className="bg-background text-foreground">White</option>
          <option value="brown" className="bg-background text-foreground">Brown</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="uncontrolled-count">Stock Count</Label>
        <Input
          id="uncontrolled-count"
          type="number"
          min="0"
          ref={countRef}
        />
      </div>
      <div className="flex justify-end gap-3 pt-6 border-t border-border mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add (Uncontrolled)</Button>
      </div>
    </form>
  );
}
