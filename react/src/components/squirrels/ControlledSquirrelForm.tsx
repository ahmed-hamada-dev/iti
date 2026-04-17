import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { SquirrelType } from "../../lib/squirrels";

export type SquirrelFormData = {
  name: string;
  image: string;
  description: string;
  count: number;
  type: SquirrelType;
};

interface ControlledFormProps {
  initialData?: SquirrelFormData;
  onSubmit: (data: SquirrelFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export function ControlledSquirrelForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: ControlledFormProps) {
  const [formData, setFormData] = useState<SquirrelFormData>({
    name: initialData?.name || "",
    image: initialData?.image || "",
    description: initialData?.description || "",
    count: initialData?.count ?? 0,
    type: initialData?.type || "brown",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "count" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) formData.name = "Unknown Squirrel";
    if (!formData.image) formData.image = "/images/brown-squirrel.png";
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid py-4 gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
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
        <Label htmlFor="count">Stock Count</Label>
        <Input
          id="count"
          name="count"
          type="number"
          min="0"
          value={formData.count}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end gap-3 pt-6 border-t border-border mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
